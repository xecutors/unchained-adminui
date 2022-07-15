import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  createUserRequestVariables,
  CreateUserResponse,
  SingleUserResponse,
  SystemRolesResponse,
  UpdateUserResponse,
  UserListResponse,
  UserOperations,
} from '../mock/user';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  CreateUser: 'EnrollUser',
  UpdateUser: 'UpdateUserProfile',
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
      if (hasOperationName(req, UserOperations.SystemRoles)) {
        req.reply(SystemRolesResponse);
      }
      if (hasOperationName(req, UserOperations.CreateUser)) {
        aliasMutation(req, ALIASES.CreateUser);
        req.reply(CreateUserResponse);
      }
      if (hasOperationName(req, UserOperations.UpdateUser)) {
        aliasMutation(req, ALIASES.UpdateUser);
        req.reply(UpdateUserResponse);
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

    cy.get('input[type="search"]').type('s');

    cy.wait(fullAliasName(UserOperations.GetUserList))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(UserListResponse);
      })
      .its('request.body.variables.queryString')
      .should('eq', 's');

    cy.url().should('contain', '/users?queryString=s');
    cy.get('input[type="search"]').type('a');

    cy.wait(fullAliasName(UserOperations.GetUserList))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(UserListResponse);
      })
      .its('request.body.variables.queryString')
      .should('eq', 'sa');

    cy.url().should('contain', '/users?queryString=sa');
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
          profile: {
            ...createUserRequestVariables.profile,
            birthday: null,
          },
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
});
