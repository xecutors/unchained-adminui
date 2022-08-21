import localizations from '../../i18n';
import { AccountOperations, ChangePasswordResponse } from '../mock/account';
import {
  AddEmailResponse,
  BuildSecretTOTPAuthURLResponse,
  createUserRequestVariables,
  CurrentUserResponse,
  DisableTOTPResponse,
  EnableTOTPResponse,
  RemoveEmailResponse,
  SendVerificationEmailResponse,
  UnsuccessfulDisableTOTPResponse,
  UnsuccessfulEnableTOTPResponse,
  UpdateUserResponse,
} from '../mock/user';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Account', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AccountOperations.UpdateUserProfile)) {
        aliasMutation(req, AccountOperations.UpdateUserProfile);
        req.reply(UpdateUserResponse);
      }
      if (hasOperationName(req, AccountOperations.ChangePassword)) {
        aliasMutation(req, AccountOperations.ChangePassword);
        if (req.body.variables?.oldPassword === 'pass') {
          req.reply({
            data: {
              changePassword: {
                success: false,
                __typename: 'SuccessResponse',
              },
            },
          });
        } else {
          req.reply(ChangePasswordResponse);
        }
      }
      if (hasOperationName(req, AccountOperations.SendVerificationEmail)) {
        aliasMutation(req, AccountOperations.SendVerificationEmail);
        req.reply(SendVerificationEmailResponse);
      }
      if (hasOperationName(req, AccountOperations.RemoveEmail)) {
        aliasMutation(req, AccountOperations.RemoveEmail);
        req.reply(RemoveEmailResponse);
      }
      if (hasOperationName(req, AccountOperations.AddEmail)) {
        aliasMutation(req, AccountOperations.AddEmail);
        req.reply(AddEmailResponse);
      }
      if (hasOperationName(req, AccountOperations.BuildSecretTOTPAuthURL)) {
        aliasMutation(req, AccountOperations.BuildSecretTOTPAuthURL);
        req.reply(BuildSecretTOTPAuthURLResponse);
      }
      if (hasOperationName(req, AccountOperations.EnableTOTP)) {
        const { body } = req;
        if (body.variables?.code?.length === 6) {
          aliasMutation(req, AccountOperations.EnableTOTP);
          req.reply(EnableTOTPResponse);
        } else {
          aliasMutation(req, AccountOperations.EnableTOTP);
          req.reply(UnsuccessfulEnableTOTPResponse);
        }
      }
      if (hasOperationName(req, AccountOperations.DisableTOTP)) {
        if (req.body.variables?.code?.length === 6) {
          aliasMutation(req, AccountOperations.DisableTOTP);
          req.reply(DisableTOTPResponse);
        } else {
          aliasMutation(req, AccountOperations.DisableTOTP);
          req.reply(UnsuccessfulDisableTOTPResponse);
        }
      }
    });
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.get('h2').should('contain.text', localizations.en.account);
  });

  context('General', () => {
    const { me: currentUser } = CurrentUserResponse.data;
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (hasOperationName(req, AccountOperations.CurrentUser)) {
          req.reply(CurrentUserResponse);
        }
      });
    });
    it('Should [INITIALIZE ACCOUNT] successfully', () => {
      cy.get('button#cancel_update').first().click();

      cy.get('input#displayName').should(
        'have.value',
        currentUser.profile.displayName,
      );
      cy.get('select#gender').should('have.value', currentUser.profile.gender);

      cy.get('input#phoneMobile').should(
        'have.value',
        currentUser.profile.phoneMobile,
      );

      cy.get('input#firstName').should(
        'have.value',
        currentUser.profile.address.firstName,
      );
      cy.get('input#lastName').should(
        'have.value',
        currentUser.profile.address.lastName,
      );
      cy.get('input#company').should(
        'have.value',
        currentUser.profile.address.company,
      );
      cy.get('input#addressLine').should(
        'have.value',
        currentUser.profile.address.addressLine,
      );
      cy.get('input#addressLine2').should(
        'have.value',
        currentUser.profile.address.addressLine2,
      );
      cy.get('input#regionCode').should(
        'have.value',
        currentUser.profile.address.regionCode,
      );
      cy.get('input#postalCode').should(
        'have.value',
        currentUser.profile.address.postalCode,
      );
      cy.get('input#city').should(
        'have.value',
        currentUser.profile.address.city,
      );
      cy.get('input#countryCode').should(
        'have.value',
        currentUser.profile.address.countryCode,
      );
    });

    it('Should [UPDATE ACCOUNT] successfully', () => {
      cy.get('button#cancel_update').first().click();

      cy.get('input#displayName').clear().type(currentUser.profile.displayName);
      cy.get('input[name="birthday"]').focus();
      cy.get('select.react-datepicker__month-select').select(3);
      cy.get('select.react-datepicker__year-select').select('1992');
      cy.get('div.react-datepicker__day.react-datepicker__day--011').click();

      cy.get('input[type="submit"]')
        .should('have.value', localizations.en.save)
        .first()
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.UpdateUserProfile)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect({
            ...request.body.variables,
            profile: {
              ...request.body.variables.profile,
              birthday: null,
            },
          }).to.deep.eq({
            profile: {
              ...createUserRequestVariables.profile,
              birthday: null,
            },
            userId: currentUser._id,
          });
          expect(response.body).to.deep.eq(UpdateUserResponse);
        },
      );
    });

    it('Should [CANCEL UPDATE ACCOUNT] successfully', () => {
      cy.get('button#cancel_update').last().click();
      cy.get('input#displayName').clear().type(currentUser.profile.displayName);
      cy.get('button').contains(localizations.en.cancel).last().click();

      cy.location('pathname').should('eq', `/account`);
    });
  });

  context('Password', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (hasOperationName(req, AccountOperations.CurrentUser)) {
          req.reply(CurrentUserResponse);
        }
      });
    });

    it('Should [UPDATE PASSWORD] successfully', () => {
      cy.get('input#oldPassword').type('password');
      cy.get('input#newPassword').type('password2');
      cy.get(
        `input[type="submit"][aria-label="${localizations.en.change_password}"]`,
      )
        .should('have.value', localizations.en.change_password)
        .first()
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.ChangePassword)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            oldPassword: 'password',
            newPassword: 'password2',
          });
          expect(response.body).to.deep.eq(ChangePasswordResponse);
        },
      );

      cy.location('pathname').should('eq', '/account');
    });
    it('Should [ERROR] when required fields are not provided in change password', () => {
      cy.get('input#oldPassword').type('password').clear().blur();
      cy.get('input#newPassword').type('password2').clear().blur();

      cy.get('label[for="oldPassword"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.current_password,
        ),
      );

      cy.get('label[for="newPassword"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.new_password,
        ),
      );

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.change_password}"]`,
      )
        .should('have.value', localizations.en.change_password)
        .should('be.disabled');
    });

    it('Should [ERROR] when change password failed', () => {
      cy.get('input#oldPassword').type('pass');
      cy.get('input#newPassword').type('password2');

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.change_password}"]`,
      )
        .should('have.value', localizations.en.change_password)
        .first()
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.ChangePassword)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            oldPassword: 'pass',
            newPassword: 'password2',
          });
          expect(response.body).to.deep.eq({
            data: {
              changePassword: {
                success: false,
                __typename: 'SuccessResponse',
              },
            },
          });
        },
      );

      cy.get('ul li').should(
        'contain.text',
        localizations.en.password_change_failed,
      );

      cy.location('pathname').should('eq', '/account');
    });
  });

  context('Email', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (hasOperationName(req, AccountOperations.CurrentUser)) {
          req.reply(CurrentUserResponse);
        }
      });
    });
    it('Should [SEND VERIFICATION EMAIL] button is visible successfully', () => {
      cy.get('a#send_verification_mail')
        .contains(localizations.en.send_verification_mail)
        .should('be.visible');

      cy.get('button#delete_button').should('be.visible');
    });

    it('Should [SEND VERIFICATION EMAIL] successfully', () => {
      const { me: currentUser } = CurrentUserResponse.data;

      cy.get('a#send_verification_mail')
        .contains(localizations.en.send_verification_mail)
        .click();

      cy.wait(
        fullAliasMutationName(AccountOperations.SendVerificationEmail),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          email: currentUser?.emails?.find((email) => email.verified === false)
            .address,
        });
        expect(response.body).to.deep.eq(SendVerificationEmailResponse);
      });

      cy.location('pathname').should('eq', '/account');
    });

    it('Should [DELETE EMAIL] successfully', () => {
      const { me: currentUser } = CurrentUserResponse.data;

      cy.get('button#delete_button').first().click();

      cy.get('button#danger_continue')
        .contains(localizations.en.delete_email)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.RemoveEmail)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            email: currentUser?.email,
          });
          expect(response.body).to.deep.eq(RemoveEmailResponse);
        },
      );

      cy.location('pathname').should('eq', '/account');
    });

    it('Should [ADD EMAIL] successfully', () => {
      const { me: currentUser } = CurrentUserResponse.data;

      cy.get('input#email').type(currentUser.email);
      cy.get(`input[type="submit"][aria-label="${localizations.en.add_email}"]`)
        .should('have.value', localizations.en.add_email)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.AddEmail)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            email: currentUser?.email,
          });
          expect(response.body).to.deep.eq(AddEmailResponse);
        },
      );

      cy.location('pathname').should('eq', '/account');
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

      cy.get(`input[type="submit"][aria-label="${localizations.en.add_email}"]`)
        .should('have.value', localizations.en.add_email)

        .should('be.disabled');
    });
  });

  context('Enable TOTP', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (hasOperationName(req, AccountOperations.CurrentUser)) {
          req.reply(CurrentUserResponse);
        }
      });

      cy.get('button[role="switch"]').click();

      cy.wait(
        fullAliasMutationName(AccountOperations.BuildSecretTOTPAuthURL),
      ).then((currentSubject) => {
        const { response } = currentSubject;
        expect(response.body).to.deep.eq(BuildSecretTOTPAuthURLResponse);
      });
    });

    it('Should [ENABLE TOTP] successfully', () => {
      cy.get('input#code').type('213746');
      cy.get(`input[type="submit"][aria-label="${localizations.en.enable}"]`)
        .should('have.value', localizations.en.enable)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.EnableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213746',
            secretBase32:
              'otpauth://totp/SecretKey?secret=PVJS4TSIGNJSS63YNMYGCZKUKJ2SG6R6',
          });
          expect(response.body).to.deep.eq(EnableTOTPResponse);
        },
      );
    });

    it('Should [ERROR] when required fields are not provided in enable totp', () => {
      cy.get('input#code').type('1234').clear().blur();
      cy.get('label[for="code"]').should(
        'contain.text',
        replaceIntlPlaceholder(
          localizations.en.error_required,
          localizations.en.totp_code,
        ),
      );

      cy.get(`input[type="submit"][aria-label="${localizations.en.enable}"]`)
        .should('have.value', localizations.en.enable)
        .should('be.disabled');
    });

    it('Should [ERROR] when enable totp unsuccessful', () => {
      cy.get('input#code').type('213');
      cy.get(`input[type="submit"][aria-label="${localizations.en.enable}"]`)
        .should('have.value', localizations.en.enable)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.EnableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213',
            secretBase32:
              'otpauth://totp/SecretKey?secret=PVJS4TSIGNJSS63YNMYGCZKUKJ2SG6R6',
          });
          expect(response.body).to.deep.eq(UnsuccessfulEnableTOTPResponse);
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get(`input[type="submit"][aria-label="${localizations.en.enable}"]`)
        .should('have.value', localizations.en.enable)

        .should('be.disabled');
    });
  });

  context('Disable TOTP', () => {
    const { me } = CurrentUserResponse.data;
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (hasOperationName(req, AccountOperations.CurrentUser)) {
          req.reply({
            ...CurrentUserResponse,
            data: {
              ...CurrentUserResponse.data,
              me: {
                ...CurrentUserResponse.data.me,
                isTwoFactorEnabled: true,
              },
            },
          });
        }
      });
      cy.visit('/account');
    });
    it('Should [DISABLE TOTP] successfully', () => {
      cy.get('input#code').type('213746');
      cy.get(
        `input[type="submit"][aria-label="${localizations.en.disable_totp}"]`,
      )
        .should('have.value', localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.DisableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213746',
            userId: me._id,
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

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.disable_totp}"]`,
      )
        .should('have.value', localizations.en.disable_totp)

        .should('be.disabled');
    });

    it('Should [ERROR] when disable totp unsuccessful', () => {
      cy.get('input#code').type('213');
      cy.get(
        `input[type="submit"][aria-label="${localizations.en.disable_totp}"]`,
      )
        .should('have.value', localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(AccountOperations.DisableTOTP)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            code: '213',
            userId: me._id,
          });
          expect(response.body).to.deep.eq(UnsuccessfulDisableTOTPResponse);
        },
      );

      cy.get('label[for="code"]').should(
        'contain.text',
        localizations.en.totp_code_not_match,
      );

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.disable_totp}"]`,
      )
        .should('have.value', localizations.en.disable_totp)

        .should('be.disabled');
    });
  });
});
