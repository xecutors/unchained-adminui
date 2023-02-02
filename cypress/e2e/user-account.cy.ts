import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  AddEmailResponse,
  BuildSecretTOTPAuthURLResponse,
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
  TOTPEnabledUser,
  UnsuccessfulDisableTOTPResponse,
  UnsuccessfulEnableTOTPResponse,
  UserListResponse,
  UserOperations,
} from '../mock/user';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('User', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, UserOperations.GetUserList)) {
        aliasQuery(req, UserOperations.GetUserList);
        req.reply(UserListResponse);
      }
      if (hasOperationName(req, UserOperations.GetSingle)) {
        aliasQuery(req, UserOperations.GetSingle);
        req.reply({
          data: {
            user: UserListResponse.data.users.find(
              ({ _id }) => _id === req.body.variables.userId,
            ),
          },
        });
      }
      if (hasOperationName(req, UserOperations.SystemRoles)) {
        aliasQuery(req, UserOperations.SystemRoles);
        req.reply(SystemRolesResponse);
      }
      if (hasOperationName(req, UserOperations.SetUsername)) {
        aliasMutation(req, UserOperations.SetUsername);
        req.reply(SetUsernameResponse);
      }
      if (hasOperationName(req, UserOperations.SendVerificationEmail)) {
        aliasMutation(req, UserOperations.SendVerificationEmail);
        req.reply(SendVerificationEmailResponse);
      }
      if (hasOperationName(req, UserOperations.RemoveEmail)) {
        aliasMutation(req, UserOperations.RemoveEmail);
        req.reply(RemoveEmailResponse);
      }
      if (hasOperationName(req, UserOperations.AddEmail)) {
        aliasMutation(req, UserOperations.AddEmail);
        req.reply(AddEmailResponse);
      }
      if (hasOperationName(req, UserOperations.SetUserTags)) {
        aliasMutation(req, UserOperations.SetUserTags);
        req.reply(SetUserTagsResponse);
      }
      if (hasOperationName(req, UserOperations.SetRoles)) {
        aliasMutation(req, UserOperations.SetRoles);
        req.reply(SetRolesResponse);
      }
      if (hasOperationName(req, UserOperations.SetPassword)) {
        aliasMutation(req, UserOperations.SetPassword);
        req.reply(SetPasswordResponse);
      }
      if (hasOperationName(req, UserOperations.BuildSecretTOTPAuthURL)) {
        aliasMutation(req, UserOperations.BuildSecretTOTPAuthURL);
        req.reply(BuildSecretTOTPAuthURLResponse);
      }
      if (hasOperationName(req, UserOperations.EnableTOTP)) {
        aliasMutation(req, UserOperations.EnableTOTP);
        const { body } = req;
        if (body.variables?.code === '123456') {
          req.reply(EnableTOTPResponse);
        } else {
          req.reply(UnsuccessfulEnableTOTPResponse);
        }
      }
      if (hasOperationName(req, UserOperations.DisableTOTP)) {
        aliasMutation(req, UserOperations.DisableTOTP);
        if (req.body.variables?.code === '123456') {
          req.reply(DisableTOTPResponse);
        } else {
          req.reply(UnsuccessfulDisableTOTPResponse);
        }
      }
    });
    cy.visit('/');
    cy.viewport(1200, 800);
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.location('pathname').should('eq', '/users');
    cy.get('h2').should('contain.text', localizations.en.users);
  });

  context('Username', () => {
    const { user } = SingleUserResponse.data;

    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it("Should [INITIALIZE USER'S USERNAME ] successfully", () => {
      cy.get('[data-id="cancel_update"]').click();
      cy.get('input#username').should('have.value', user.username);
    });

    it("Should [UPDATE USER'S USERNAME ] successfully", () => {
      cy.get('[data-id="cancel_update"]').click();
      cy.get('input#username').clear().type(user.username);

      cy.get('button[type="submit"]').contains(localizations.en.save).click();

      cy.wait(fullAliasMutationName(UserOperations.SetUsername)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            username: user.username,
            userId: user._id,
          });
          expect(response.body).to.deep.eq(SetUsernameResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it("Should [CANCEL USER'S USERNAME] successfully on new user", () => {
      cy.get('[data-id="cancel_update"]').click();
      cy.get('[data-id="cancel_update"]').click();

      cy.location('pathname').should('eq', `/users/${user._id}`);
    });

    it("Should [ERROR] when required fields are not provided in update user's username", () => {
      cy.get('[data-id="cancel_update"]').click();
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

  context('Email', () => {
    const { user } = SingleUserResponse.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [SEND VERIFICATION EMAIL] button is visible successfully', () => {
      // eslint-disable-next-line array-callback-return
      user?.emails?.map((email) => {
        if (!email.verified) {
          cy.get('a#send_verification_mail')
            .contains(localizations.en.send_verification_mail)
            .should('be.visible');
        }
        cy.get('button#delete_button').should('be.visible');
      });
    });

    it('Should [SEND VERIFICATION EMAIL] successfully', () => {
      if (!user?.emails?.every((email) => email.verified === true)) {
        cy.get('a#send_verification_mail')
          .contains(localizations.en.send_verification_mail)
          .click();

        cy.wait(
          fullAliasMutationName(UserOperations.SendVerificationEmail),
        ).then((currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            email: user?.emails?.find((email) => email.verified === false)
              .address,
          });
          expect(response.body).to.deep.eq(SendVerificationEmailResponse);
        });
      }

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [DELETE EMAIL] successfully', () => {
      cy.get('button#delete_button').first().click();

      cy.get('button#danger_continue')
        .contains(localizations.en.delete_email)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.RemoveEmail)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            email: user?.email,
            userId: user._id,
          });
          expect(response.body).to.deep.eq(RemoveEmailResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [ADD EMAIL] successfully', () => {
      cy.get('input#email').type(user.email);
      cy.get('input[type="submit"]')
        .contains(localizations.en.add_email)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.AddEmail)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            email: user?.email,
            userId: user._id,
          });
          expect(response.body).to.deep.eq(AddEmailResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [ERROR] when required fields are not provided in add email', () => {
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
  });

  context('Tags', () => {
    const { user } = SingleUserResponse.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [ADD TAGS] successfully', () => {
      cy.get('button#add_tag').click();
      cy.get('input#tags').type('new');
      cy.contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').contains(localizations.en.save).click();

      cy.wait(fullAliasMutationName(UserOperations.SetUserTags)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            tags: ['new'],
            userId: user._id,
          });
          expect(response.body).to.deep.eq(SetUserTagsResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });
  });

  context('Role', () => {
    const { user } = SingleUserResponse.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [UPDATE ROLES] successfully', () => {
      cy.get('input[type="submit"]')
        .contains(localizations.en.update_role)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.SetRoles)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            roles: ['admin'],
            userId: user._id,
          });
          expect(response.body).to.deep.eq(SetRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });
  });

  context('Change password', () => {
    const { user } = SingleUserResponse.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [UPDATE PASSWORD] successfully', () => {
      cy.get('input#oldPassword').type('password');
      cy.get('input#newPassword').type('password1');
      cy.get('input[type="submit"]')
        .contains(localizations.en.change_password)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.SetPassword)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;

          expect(request.body.variables).to.deep.eq({
            newPassword: 'password1',
            oldPassword: 'password',
          });
          expect(response.body).to.deep.eq(SetPasswordResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [ERROR] when required fields are not provided in change password', () => {
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

  context('TOTP Disabled', () => {
    const { user } = SingleUserResponse.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );

      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [ENABLE TOTP] successfully', () => {
      cy.get('button[role="switch"]#totp-toggle').click();

      cy.wait(
        fullAliasMutationName(UserOperations.BuildSecretTOTPAuthURL),
      ).then((currentSubject) => {
        const { response } = currentSubject;
        expect(response.body).to.deep.eq(BuildSecretTOTPAuthURLResponse);
      });

      cy.get('input#code').type('123456');
      cy.get('input[type="submit"]').contains(localizations.en.enable).click();

      cy.wait(fullAliasMutationName(UserOperations.EnableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '123456',
            secretBase32:
              BuildSecretTOTPAuthURLResponse.data.buildSecretTOTPAuthURL?.split(
                '=',
              )[1],
          });
          expect(response.body).to.deep.eq(EnableTOTPResponse);
        },
      );
    });

    it('Should [ERROR] when required fields are not provided in enable totp', () => {
      cy.get('button[role="switch"]#totp-toggle').click();

      cy.wait(
        fullAliasMutationName(UserOperations.BuildSecretTOTPAuthURL),
      ).then((currentSubject) => {
        const { response } = currentSubject;
        expect(response.body).to.deep.eq(BuildSecretTOTPAuthURLResponse);
      });

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
    });

    it('Should [ERROR] when enable totp unsuccessful', () => {
      cy.get('button[role="switch"]#totp-toggle').click();

      cy.wait(
        fullAliasMutationName(UserOperations.BuildSecretTOTPAuthURL),
      ).then((currentSubject) => {
        const { response } = currentSubject;
        expect(response.body).to.deep.eq(BuildSecretTOTPAuthURLResponse);
      });

      cy.get('input#code').type('213');
      cy.get('input[type="submit"]').contains(localizations.en.enable).click();

      cy.wait(fullAliasMutationName(UserOperations.EnableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213',
            secretBase32:
              BuildSecretTOTPAuthURLResponse.data.buildSecretTOTPAuthURL?.split(
                'secret=',
              )[1],
          });
          expect(response.body).to.deep.eq(UnsuccessfulEnableTOTPResponse);
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.enable)
        .should('be.disabled');
    });
  });
  context('TOTP Enabled', () => {
    const { user } = TOTPEnabledUser.data;
    beforeEach(() => {
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.location('pathname').should('eq', `/users/${user._id}`);
      cy.get(`a#account`).contains(localizations.en.account).click();

      cy.wait(fullAliasName(UserOperations.SystemRoles)).then(
        (currentSubject) => {
          const { response } = currentSubject;
          expect(response.body).to.deep.eq(SystemRolesResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq(`/users/${user._id}`);
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tab: 'account',
        });
      });
    });

    it('Should [DISABLE TOTP] successfully', () => {
      cy.get('input#code').type('123456');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.DisableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '123456',
            userId: user._id,
          });
          expect(response.body).to.deep.eq(DisableTOTPResponse);
        },
      );
    });

    it('Should [ERROR] when required fields are not provided in disable totp', () => {
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
    });

    it('Should [ERROR] when disable totp unsuccessful', () => {
      cy.get('input#code').type('213');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(UserOperations.DisableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213',
            userId: user._id,
          });
          expect(response.body).to.deep.eq(UnsuccessfulDisableTOTPResponse);
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .should('be.disabled');
    });
  });
});
