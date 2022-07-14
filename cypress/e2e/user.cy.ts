import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  AddEmailResponse,
  createUserRequestVariables,
  CreateUserResponse,
  RemoveEmailResponse,
  SendVerificationEmailResponse,
  SetPasswordResponse,
  SetRolesResponse,
  SetUsernameResponse,
  SetUserTagsResponse,
  SingleUserResponse,
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
  SetUsername: 'SetUsername',
  SendVerificationEmail: 'SendVerificationEmail',
  RemoveEmail: 'RemoveEmail',
  AddEmail: 'AddEmail',
  SetUserTags: 'setUserTags',
  SetRoles: 'SetRoles',
  SetPassword: 'SetPassword',
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
      if (hasOperationName(req, UserOperations.SendVerificationEmail)) {
        aliasMutation(req, ALIASES.SendVerificationEmail);
        req.reply(SendVerificationEmailResponse);
      }
      if (hasOperationName(req, UserOperations.RemoveEmail)) {
        aliasMutation(req, ALIASES.RemoveEmail);
        req.reply(RemoveEmailResponse);
      }
      if (hasOperationName(req, UserOperations.AddEmail)) {
        aliasMutation(req, ALIASES.AddEmail);
        req.reply(AddEmailResponse);
      }
      if (hasOperationName(req, UserOperations.SetUserTags)) {
        aliasMutation(req, ALIASES.SetUserTags);
        req.reply(SetUserTagsResponse);
      }
      if (hasOperationName(req, UserOperations.SetRoles)) {
        aliasMutation(req, ALIASES.SetRoles);
        req.reply(SetRolesResponse);
      }
      if (hasOperationName(req, UserOperations.SetPassword)) {
        aliasMutation(req, ALIASES.SetPassword);
        req.reply(SetPasswordResponse);
      }
    });
  });

  context('Profile Tab', () => {
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
      cy.get('input#city').type(
        createUserRequestVariables.profile.address.city,
      );
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

      cy.get('input#displayName').should(
        'have.value',
        user.profile.displayName,
      );
      cy.get('select#gender').should('have.value', user.profile.gender);
      // cy.get('input[name="birthday"]').should(
      //   'have.value',
      //   user.profile.birthday,
      // );
      cy.get('input#phoneMobile').should(
        'have.value',
        user.profile.phoneMobile,
      );

      cy.get('input#firstName').should(
        'have.value',
        user.profile.address.firstName,
      );
      cy.get('input#lastName').should(
        'have.value',
        user.profile.address.lastName,
      );
      cy.get('input#company').should(
        'have.value',
        user.profile.address.company,
      );
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

  context('Account Tab', () => {
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

    it('Show [SEND VERIFICATION EMAIL] button is visible successfully', () => {
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

      // eslint-disable-next-line array-callback-return
      user?.emails?.map((email) => {
        if (!email.verified) {
          cy.get('a')
            .contains(localizations.en.send_verification_mail)
            .should('be.visible');
        }
        cy.get('button.rounded-full.bg-white.px-1.py-1').should('be.visible');
      });
    });

    it('Show [SEND VERIFICATION EMAIL] successfully', () => {
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

      if (!user?.emails?.every((email) => email.verified === true)) {
        cy.contains(localizations.en.send_verification_mail).click();

        cy.wait(fullAliasMutationName(ALIASES.SendVerificationEmail)).then(
          (currentSubject) => {
            expect(currentSubject.request.body.variables).to.deep.eq({
              email: user?.emails?.find((email) => email.verified === false)
                .address,
            });
            expect(currentSubject.response.body).to.deep.eq(
              SendVerificationEmailResponse,
            );
          },
        );
      }

      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [DELETE EMAIL] successfully', () => {
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

      cy.get('button.rounded-full.bg-white.px-1.py-1.text-sm.text-red-500')
        .first()
        .click();

      cy.contains(localizations.en.delete_email).click();

      cy.wait(fullAliasMutationName(ALIASES.RemoveEmail)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            email: user?.email,
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(RemoveEmailResponse);
        },
      );

      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [ADD EMAIL] successfully', () => {
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

      cy.get('input#email').type(user.email);
      cy.get('input[type="submit"]')
        .contains(localizations.en.add_email)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.AddEmail)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            email: user?.email,
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(AddEmailResponse);
        },
      );

      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [ERROR] when required fields are not provided in add email', () => {
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

      cy.get('input#email').clear().blur();

      cy.get('label[for="email"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.email,
        ),
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.add_email)
        .should('be.disabled');
    });

    it('Show [ADD TAGS] successfully', () => {
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

      cy.get('button.inline-flex.items-center.border.bg-indigo-500').click();
      cy.get('input#tags').type('new');
      cy.contains(localizations.en.add_tag).click();

      cy.get('input[type="submit"]').contains(localizations.en.save).click();

      cy.wait(fullAliasMutationName(ALIASES.SetUserTags)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            tags: ['new'],
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(SetUserTagsResponse);
        },
      );

      cy.contains(localizations.en.cancel).click();
      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [UPDATE ROLES] successfully', () => {
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

      cy.get('input[type="submit"]')
        .contains(localizations.en.update_role)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.SetRoles)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            roles: ['admin'],
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(SetRolesResponse);
        },
      );

      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [UPDATE PASSWORD] successfully', () => {
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

      cy.get('input#newPassword').type('password');
      cy.get('input[type="submit"]')
        .contains(localizations.en.change_password)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.SetPassword)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            newPassword: null,
            newPlainPassword: 'password',
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(SetPasswordResponse);
        },
      );

      cy.url().should('contain', `/users/${user._id}?tab=account`);
    });

    it('Show [ERROR] when required fields are not provided in change password', () => {
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

      cy.get('input#newPassword').clear().blur();

      cy.get('label[for="newPassword"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.new_password,
        ),
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.change_password)
        .should('be.disabled');
    });
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
