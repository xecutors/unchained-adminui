import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  AddEmailResponse,
  BuildSecretTOTPAuthURLResponse,
  CurrentUserResponse,
  DisableTOTPResponse,
  EnableTOTPResponse,
  RemoveEmailResponse,
  SendVerificationEmailResponse,
  SetPasswordResponse,
  SetRolesResponse,
  SetUsernameResponse,
  SetUserTagsResponse,
  SingleUserResponse,
  SystemRolesResponse,
  UnsuccessfulDisableTOTPResponse,
  UnsuccessfulEnableTOTPResponse,
  UserListResponse,
  UserOperations,
} from '../mock/user';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  SetUsername: 'SetUsername',
  SendVerificationEmail: 'SendVerificationEmail',
  RemoveEmail: 'RemoveEmail',
  AddEmail: 'AddEmail',
  SetUserTags: 'setUserTags',
  SetRoles: 'SetRoles',
  SetPassword: 'SetPassword',
  BuildSecretTOTPAuthURL: 'BuildSecretTOTPAuthURL',
  EnableTOTP: 'EnableTOTP',
  DisableTOTP: 'DisableTOTP',
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
      if (hasOperationName(req, UserOperations.BuildSecretTOTPAuthURL)) {
        aliasMutation(req, ALIASES.BuildSecretTOTPAuthURL);
        req.reply(BuildSecretTOTPAuthURLResponse);
      }
      if (hasOperationName(req, UserOperations.EnableTOTP)) {
        const { body } = req;
        if (body.variables?.code?.length === 6) {
          aliasMutation(req, ALIASES.EnableTOTP);
          req.reply(EnableTOTPResponse);
        } else {
          aliasMutation(req, ALIASES.EnableTOTP);
          req.reply(UnsuccessfulEnableTOTPResponse);
        }
      }
      if (hasOperationName(req, UserOperations.DisableTOTP)) {
        if (req.body.variables?.code?.length === 6) {
          aliasMutation(req, ALIASES.DisableTOTP);
          req.reply(DisableTOTPResponse);
        } else {
          aliasMutation(req, ALIASES.DisableTOTP);
          req.reply(UnsuccessfulDisableTOTPResponse);
        }
      }
    });
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
    cy.get('input[type="submit"]').contains(localizations.en.add_email).click();

    cy.wait(fullAliasMutationName(ALIASES.AddEmail)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        email: user?.email,
        userId: user._id,
      });
      expect(currentSubject.response.body).to.deep.eq(AddEmailResponse);
    });

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

    cy.wait(fullAliasMutationName(ALIASES.SetRoles)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        roles: ['admin'],
        userId: user._id,
      });
      expect(currentSubject.response.body).to.deep.eq(SetRolesResponse);
    });

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

  it('Show [TOTP] successfully', () => {
    const { user } = SingleUserResponse.data;
    const { me } = CurrentUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (user.isTwoFactorEnabled && user.roles.includes('admin')) {
      cy.get('input#code');
      cy.get('input[type="submit"]').should(
        'contain',
        localizations.en.disable_totp,
      );
    }
    if (me._id === user._id && !user.isTwoFactorEnabled) {
      cy.get('button[role="switch"]').click();

      cy.wait(fullAliasMutationName(ALIASES.BuildSecretTOTPAuthURL)).then(
        (currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            BuildSecretTOTPAuthURLResponse,
          );
        },
      );

      cy.get('input#code');
      cy.get('input[type="submit"]').should('contain', localizations.en.enable);
    }
  });

  it('Show [ENABLE TOTP] successfully', () => {
    const { user } = SingleUserResponse.data;
    const { me } = CurrentUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (me._id === user._id && !user.isTwoFactorEnabled) {
      cy.get('button[role="switch"]').click();

      cy.wait(fullAliasMutationName(ALIASES.BuildSecretTOTPAuthURL)).then(
        (currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            BuildSecretTOTPAuthURLResponse,
          );
        },
      );

      cy.get('input#code').type('213746');
      cy.get('input[type="submit"]').contains(localizations.en.enable).click();

      cy.wait(fullAliasMutationName(ALIASES.EnableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213746',
            secretBase32:
              'otpauth://totp/SecretKey?secret=PVJS4TSIGNJSS63YNMYGCZKUKJ2SG6R6',
          });
          expect(currentSubject.response.body).to.deep.eq(EnableTOTPResponse);
        },
      );
    }
  });

  it('Show [ERROR] when required fields are not provided in enable totp', () => {
    const { user } = SingleUserResponse.data;
    const { me } = CurrentUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (me._id === user._id && !user.isTwoFactorEnabled) {
      cy.get('button[role="switch"]').click();

      cy.wait(fullAliasMutationName(ALIASES.BuildSecretTOTPAuthURL)).then(
        (currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            BuildSecretTOTPAuthURLResponse,
          );
        },
      );

      cy.get('input#code').type('1234').clear().blur();
      cy.get('label[for="code"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.totp_code,
        ),
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.enable)
        .should('be.disabled');
    }
  });

  it('Show [ERROR] when enable totp unsuccessful', () => {
    const { user } = SingleUserResponse.data;
    const { me } = CurrentUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (me._id === user._id && !user.isTwoFactorEnabled) {
      cy.get('button[role="switch"]').click();

      cy.wait(fullAliasMutationName(ALIASES.BuildSecretTOTPAuthURL)).then(
        (currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            BuildSecretTOTPAuthURLResponse,
          );
        },
      );

      cy.get('input#code').type('213');
      cy.get('input[type="submit"]').contains(localizations.en.enable).click();

      cy.wait(fullAliasMutationName(ALIASES.EnableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213',
            secretBase32:
              'otpauth://totp/SecretKey?secret=PVJS4TSIGNJSS63YNMYGCZKUKJ2SG6R6',
          });
          expect(currentSubject.response.body).to.deep.eq(
            UnsuccessfulEnableTOTPResponse,
          );
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.enable)
        .should('be.disabled');
    }
  });

  it('Show [DISABLE TOTP] successfully', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (user.isTwoFactorEnabled && user.roles.includes('admin')) {
      cy.get('input#code').type('213746');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.DisableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213746',
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(DisableTOTPResponse);
        },
      );
    }
  });

  it('Show [ERROR] when required fields are not provided in disable totp', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (user.isTwoFactorEnabled && user.roles.includes('admin')) {
      cy.get('input#code').type('2137').clear().blur();

      cy.get('label[for="code"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.totp_code,
        ),
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .should('be.disabled');
    }
  });

  it('Show [ERROR] when disable totp unsuccessful', () => {
    const { user } = SingleUserResponse.data;

    cy.visit('/');
    cy.viewport(1280, 1000);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get(`a[href="/users/${user._id}"]`).click();
    cy.url().should('contain', `/users/${user._id}`);
    cy.get(`a`).contains(localizations.en.account).click();
    cy.url().should('contain', `/users/${user._id}?tab=account`);

    if (user.isTwoFactorEnabled && user.roles.includes('admin')) {
      cy.get('input#code').type('213');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.DisableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213',
            userId: user._id,
          });
          expect(currentSubject.response.body).to.deep.eq(
            UnsuccessfulDisableTOTPResponse,
          );
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .should('be.disabled');
    }
  });
});
