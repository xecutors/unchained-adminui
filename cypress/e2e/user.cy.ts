import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  createUserRequestVariables,
  CreateUserResponse,
  SetUsernameResponse,
  SingleUserResponse,
  UpdateUserResponse,
  UserListResponse,
  UserOperations,
} from '../mock/user';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  CreateUser: 'EnrollUser',
  UpdateUser: 'UpdateUserProfile',
  SetUsername: 'SetUsername',
};

describe('User', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, UserOperations.GetUserList)) {
        const { body } = req;
        if (body.variables?.includeGuests || body.variables?.queryString) {
          aliasQuery(req, UserOperations.GetUserList);
        }
        req.reply(UserListResponse);
      }
      if (hasOperationName(req, UserOperations.GetSingle)) {
        req.reply(SingleUserResponse);
      }
      if (hasOperationName(req, UserOperations.CreateUser)) {
        aliasMutation(req, ALIASES.CreateUser);
        req.reply(CreateUserResponse);
      }
      if (hasOperationName(req, UserOperations.UpdateUser)) {
        aliasMutation(req, ALIASES.UpdateUser);
        req.reply(UpdateUserResponse);
      }
      if (hasOperationName(req, UserOperations.SetUsername)) {
        aliasMutation(req, ALIASES.SetUsername);
        req.reply(SetUsernameResponse);
      }
    });
  });

  it('Show Navigate to [USER] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('li').should('have.length', 5);
  });

  it('Toggling status toggle should update route', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('button[role="switch"]').click();

    cy.wait(fullAliasName(UserOperations.GetUserList))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(UserListResponse);
      })
      .its('request.body.variables.includeGuests')
      .should('be.true');

    cy.url().should('contain', '/users?includeGuests=true');
    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/users?includeGuests=false');
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');

    cy.get('input[type="search"]').type('search');

    cy.wait(fullAliasName(UserOperations.GetUserList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(response.body).to.deep.eq(UserListResponse);
        expect(request.body.variables).to.deep.eq({
          includeGuests: false,
          limit: 50,
          offset: 0,
          queryString: 'search',
        });
      },
    );

    cy.location().then((current) => {
      expect(current.pathname).to.eq('/users');
      expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
        queryString: 'search',
      });
    });

    cy.get('input[type="search"]').type(' input');

    cy.wait(fullAliasName(UserOperations.GetUserList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(response.body).to.deep.eq(UserListResponse);
        expect(request.body.variables).to.deep.eq({
          includeGuests: false,
          limit: 50,
          offset: 0,
          queryString: 'search input',
        });
      },
    );

    cy.location().then((current) => {
      expect(current.pathname).to.eq('/users');
      expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
        queryString: 'search input',
      });
    });
  });

  it('Show Navigate to [NEW USER] form page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');
  });

  it('Show [ADD USER] successfully', () => {
    const { enrollUser } = CreateUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');

    cy.url().should('contain', '/users/new');
    cy.get('input#email').type(createUserRequestVariables.email);
    cy.get('input#password').type(createUserRequestVariables.plainPassword);
    cy.get('input#displayName').type(
      createUserRequestVariables.profile.displayName,
    );
    cy.get('select#gender').select(createUserRequestVariables.profile.gender);
    cy.get('input[name="birthday"]').focus();
    cy.get('select.react-datepicker__month-select').select(3);
    cy.get('select.react-datepicker__year-select').select('1992');
    cy.get('div.react-datepicker__day.react-datepicker__day--011').click();
    cy.get('input#phoneMobile').type(
      createUserRequestVariables.profile.phoneMobile,
    );

    cy.get('input#firstName').type(
      createUserRequestVariables.profile.address.firstName,
    );
    cy.get('input#lastName').type(
      createUserRequestVariables.profile.address.lastName,
    );
    cy.get('input#company').type(
      createUserRequestVariables.profile.address.company,
    );
    cy.get('input#addressLine').type(
      createUserRequestVariables.profile.address.addressLine,
    );
    cy.get('input#addressLine2').type(
      createUserRequestVariables.profile.address.addressLine2,
    );
    cy.get('input#regionCode').type(
      createUserRequestVariables.profile.address.regionCode,
    );
    cy.get('input#postalCode').type(
      createUserRequestVariables.profile.address.postalCode,
    );
    cy.get('input#city').type(createUserRequestVariables.profile.address.city);
    cy.get('input#countryCode').type(
      createUserRequestVariables.profile.address.countryCode,
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .last()
      .click();

    cy.wait(fullAliasMutationName(ALIASES.CreateUser)).then(
      (currentSubject) => {
        expect({
          ...currentSubject.request.body.variables,
          profile: {
            ...currentSubject.request.body.variables.profile,
            birthday: null,
          },
        }).to.deep.eq({
          ...createUserRequestVariables,
          profile: {
            ...createUserRequestVariables.profile,
            birthday: null,
          },
        });

        // expect(currentSubject.request.body.variables.profile.birthday).to.eq.(
        //   createUserRequestVariables.profile.birthday,
        // );

        expect(currentSubject.response.body).to.deep.eq(CreateUserResponse);
      },
    );

    cy.url().should('contains', `/users/${enrollUser._id}`);
  });

  it('Show [CANCEL USER] successfully on new user', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');

    cy.url().should('contain', '/users/new');
    cy.get('input#email').type('redi@hotmail.com');
    cy.get('input#firstName').type('Rediet');

    cy.get('button').contains(localizations.en.cancel).click();

    cy.url().should('contains', '/users');
  });

  it('Show [ERROR] when required fields are not provided in add user', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');
    cy.get('input[name="birthday"]').clear();
    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .last()
      .click();

    cy.get('label[for="email"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_email,
        localizations.en.email,
      ),
    );

    cy.get('label[for="birthday"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_invalid_date,
        localizations.en.birthday,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .should('be.disabled');
  });

  it('Show [INITIALIZE USER] successfully', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get('button')
      .should('contain', localizations.en.update_profile)
      .last()
      .click();

    cy.get('input#displayName').should('have.value', user.profile.displayName);
    cy.get('select#gender').should('have.value', user.profile.gender);
    // cy.get('input[name="birthday"]').should(
    //   'have.value',
    //   user.profile.birthday,
    // );
    cy.get('input#phoneMobile').should('have.value', user.profile.phoneMobile);

    cy.get('input#firstName').should(
      'have.value',
      user.profile.address.firstName,
    );
    cy.get('input#lastName').should(
      'have.value',
      user.profile.address.lastName,
    );
    cy.get('input#company').should('have.value', user.profile.address.company);
    cy.get('input#addressLine').should(
      'have.value',
      user.profile.address.addressLine,
    );
    cy.get('input#addressLine2').should(
      'have.value',
      user.profile.address.addressLine2,
    );
    cy.get('input#regionCode').should(
      'have.value',
      user.profile.address.regionCode,
    );
    cy.get('input#postalCode').should(
      'have.value',
      user.profile.address.postalCode,
    );
    cy.get('input#city').should('have.value', user.profile.address.city);
    cy.get('input#countryCode').should(
      'have.value',
      user.profile.address.countryCode,
    );
  });

  it('Show [UPDATE USER] successfully', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get('button')
      .should('contain', localizations.en.update_profile)
      .last()
      .click();

    cy.get('input#displayName').clear().type(user.profile.displayName);

    cy.get('input[name="birthday"]').focus();
    cy.get('select.react-datepicker__month-select').select(3);
    cy.get('select.react-datepicker__year-select').select('1992');
    cy.get('div.react-datepicker__day.react-datepicker__day--011').click();

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .last()
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateUser)).then(
      (currentSubject) => {
        expect({
          ...currentSubject.request.body.variables,
          profile: {
            ...currentSubject.request.body.variables.profile,
            birthday: null,
          },
        }).to.deep.eq({
          profile: { ...createUserRequestVariables.profile, birthday: null },
          userId: user._id,
        });
        expect(currentSubject.response.body).to.deep.eq(UpdateUserResponse);
      },
    );
  });

  it('Show [CANCEL UPDATE USER] successfully on new user', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get('button')
      .should('contain', localizations.en.update_profile)
      .last()
      .click();

    cy.get('input#displayName').clear().type(user.profile.displayName);
    cy.get('button').contains(localizations.en.cancel).last().click();

    cy.url().should('contain', `/users/${user._id}`);
  });

  it('Show Navigate to [USER ACCOUNT] page successfully', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);

    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);
  });

  it('Show Navigate to [USER ACCOUNT ON MOBILE] page successfully', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1000, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`select#selected-tab`).select(localizations.en.account);
    cy.url().should('contain', `/users/${user._id}?tab=account`);
  });

  it("Show [INITIALIZE USER'S USERNAME ] successfully", () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);

    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    cy.get('button.rounded-md.border.border-slate-300.bg-white')
      .contains(localizations.en.update)
      .click();
    cy.get('input#username').should('have.value', user.username);
  });

  it("Show [UPDATE USER'S USERNAME ] successfully", () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);

    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    cy.get('button.rounded-md.border.border-slate-300.bg-white')
      .contains(localizations.en.update)
      .click();
    cy.get('input#username').clear().type(user.username);

    cy.get('button[type="submit"]').contains(localizations.en.save).click();

    cy.wait(fullAliasMutationName(ALIASES.SetUsername)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          username: user.username,
          userId: user._id,
        });
        expect(currentSubject.response.body).to.deep.eq(SetUsernameResponse);
      },
    );

    cy.url().should('contain', `/users/${user._id}?tab=account`);
  });

  it("Show [CANCEL USER'S USERNAME] successfully on new user", () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    cy.get('button.rounded-md.border.border-slate-300.bg-white')
      .contains(localizations.en.update)
      .click();
    cy.get('button').contains(localizations.en.cancel).first().click();

    cy.url().should('contain', `/users/${user._id}`);
  });

  it("Show [ERROR] when required fields are not provided in update user's username", () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    cy.get('button.rounded-md.border.border-slate-300.bg-white')
      .contains(localizations.en.update)
      .click();
    cy.get('input#username').clear().blur();

    cy.get('label[for="username"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.username,
      ),
    );
  });
});
