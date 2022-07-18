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

const ALIASES = {
  UpdateUserProfile: 'UpdateUserProfile',
  ChangePassword: 'ChangePassword',
  SendVerificationEmail: 'SendVerificationEmail',
  RemoveEmail: 'RemoveEmail',
  AddEmail: 'AddEmail',
  BuildSecretTOTPAuthURL: 'BuildSecretTOTPAuthURL',
  DisableTOTP: 'DisableTOTP',
  EnableTOTP: 'EnableTOTP',
};

describe('Account', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AccountOperations.CurrentUser)) {
        req.reply(CurrentUserResponse);
      }
      if (hasOperationName(req, AccountOperations.UpdateUserProfile)) {
        aliasMutation(req, ALIASES.UpdateUserProfile);
        req.reply(UpdateUserResponse);
      }
      if (hasOperationName(req, AccountOperations.ChangePassword)) {
        aliasMutation(req, ALIASES.ChangePassword);
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
        aliasMutation(req, ALIASES.BuildSecretTOTPAuthURL);
        req.reply(BuildSecretTOTPAuthURLResponse);
      }
      if (hasOperationName(req, AccountOperations.EnableTOTP)) {
        const { body } = req;
        if (body.variables?.code?.length === 6) {
          aliasMutation(req, ALIASES.EnableTOTP);
          req.reply(EnableTOTPResponse);
        } else {
          aliasMutation(req, ALIASES.EnableTOTP);
          req.reply(UnsuccessfulEnableTOTPResponse);
        }
      }
      if (hasOperationName(req, AccountOperations.DisableTOTP)) {
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

  it('Show Navigate to [ACCOUNT] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
  });

  it('Show [INITIALIZE ACCOUNT] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.get('button#update_cancel').first().click();

    cy.get('input#displayName').should(
      'have.value',
      currentUser.profile.displayName,
    );
    cy.get('select#gender').should('have.value', currentUser.profile.gender);
    // cy.get('input[name="birthday"]').should(
    //   'have.value',
    //   currentUser.profile.birthday,
    // );
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
    cy.get('input#city').should('have.value', currentUser.profile.address.city);
    cy.get('input#countryCode').should(
      'have.value',
      currentUser.profile.address.countryCode,
    );
  });

  it('Show [UPDATE ACCOUNT] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.wait(100);
    cy.get('button#update_cancel').first().click();

    cy.get('input#displayName').clear().type(currentUser.profile.displayName);
    cy.get('input[name="birthday"]').focus();
    cy.get('select.react-datepicker__month-select').select(3);
    cy.get('select.react-datepicker__year-select').select('1992');
    cy.get('div.react-datepicker__day.react-datepicker__day--011').click();

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .first()
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateUserProfile)).then(
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
          userId: currentUser._id,
        });
        expect(currentSubject.response.body).to.deep.eq(UpdateUserResponse);
      },
    );
  });

  it('Show [CANCEL UPDATE ACCOUNT] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.wait(100);

    cy.get('button#update_cancel').last().click();
    cy.get('input#displayName').clear().type(currentUser.profile.displayName);
    cy.get('button').contains(localizations.en.cancel).last().click();

    cy.url().should('contain', `/account`);
  });

  it('Show [UPDATE PASSWORD] successfully', () => {
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.get('input#oldPassword').type('password');
    cy.get('input#newPassword').type('password2');
    cy.get('input[type="submit"]')
      .contains(localizations.en.change_password)
      .first()
      .click();

    cy.wait(fullAliasMutationName(ALIASES.ChangePassword)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          oldPassword: 'password',
          newPassword: 'password2',
        });
        expect(currentSubject.response.body).to.deep.eq(ChangePasswordResponse);
      },
    );

    cy.url().should('contain', '/account');
  });

  it('Show [ERROR] when required fields are not provided in change password', () => {
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
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

    cy.get('input[type="submit"]')
      .contains(localizations.en.change_password)
      .should('be.disabled');
  });

  it('Show [ERROR] when change password failed', () => {
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    cy.get('input#oldPassword').type('pass');
    cy.get('input#newPassword').type('password2');

    cy.get('input[type="submit"]')
      .contains(localizations.en.change_password)
      .first()
      .click();

    cy.wait(fullAliasMutationName(ALIASES.ChangePassword)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          oldPassword: 'pass',
          newPassword: 'password2',
        });
        expect(currentSubject.response.body).to.deep.eq({
          data: {
            changePassword: {
              success: false,
              __typename: 'SuccessResponse',
            },
          },
        });
      },
    );

    cy.get('ul#form-errors li').should(
      'contain.text',
      localizations.en.password_change_failed,
    );

    cy.url().should('contain', '/account');
  });

  it('Show [SEND VERIFICATION EMAIL] button is visible successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    // eslint-disable-next-line array-callback-return
    currentUser?.emails?.map((email) => {
      if (!email.verified) {
        cy.get('a#send_verification_mail')
          .contains(localizations.en.send_verification_mail)
          .should('be.visible');
      }
      cy.get('button#delete_button').should('be.visible');
    });
  });

  it('Show [SEND VERIFICATION EMAIL] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (!currentUser?.emails?.every((email) => email.verified === true)) {
      cy.get('a#send_verification_mail')
        .contains(localizations.en.send_verification_mail)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.SendVerificationEmail)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            email: currentUser?.emails?.find(
              (email) => email.verified === false,
            ).address,
          });
          expect(currentSubject.response.body).to.deep.eq(
            SendVerificationEmailResponse,
          );
        },
      );
    }

    cy.url().should('contain', '/account');
  });

  it('Show [DELETE EMAIL] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    cy.get('button#delete_button').first().click();

    cy.get('button#danger_continue')
      .contains(localizations.en.delete_email)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveEmail)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          email: currentUser?.email,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveEmailResponse);
      },
    );

    cy.url().should('contain', 'account');
  });

  it('Show [ADD EMAIL] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    cy.get('input#email').type(currentUser.email);
    cy.get('input[type="submit"]').contains(localizations.en.add_email).click();

    cy.wait(fullAliasMutationName(ALIASES.AddEmail)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        email: currentUser?.email,
      });
      expect(currentSubject.response.body).to.deep.eq(AddEmailResponse);
    });

    cy.url().should('contain', '/account');
  });

  it('Show [ERROR] when required fields are not provided in add email', () => {
    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
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

  it('Show [TOTP] successfully', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (currentUser.isTwoFactorEnabled) {
      cy.get('input#code');
      cy.get('input[type="submit"]').should(
        'contain',
        localizations.en.disable_totp,
      );
    }
    if (!currentUser.isTwoFactorEnabled) {
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
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (!currentUser.isTwoFactorEnabled) {
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
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (!currentUser.isTwoFactorEnabled) {
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
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (!currentUser.isTwoFactorEnabled) {
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
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');
    if (currentUser.isTwoFactorEnabled) {
      cy.get('input#code').type('213746');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.DisableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213746',
          });
          expect(currentSubject.response.body).to.deep.eq(DisableTOTPResponse);
        },
      );
    }
  });

  it('Show [ERROR] when required fields are not provided in disable totp', () => {
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (currentUser.isTwoFactorEnabled) {
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
    const { me: currentUser } = CurrentUserResponse.data;

    cy.visit('/');
    cy.get('a[href="/account"]')
      .contains(localizations.en.account)
      .click({ force: true });

    cy.location('pathname').should('eq', '/account');

    if (currentUser.isTwoFactorEnabled) {
      cy.get('input#code').type('213');
      cy.get('input[type="submit"]')
        .contains(localizations.en.disable_totp)
        .click();

      cy.wait(fullAliasMutationName(ALIASES.DisableTOTP)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            code: '213',
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
