import LoginPage from '../../support/pageObjects/loginPage';
import AdminPage from '../../support/pageObjects/adminPage';

describe('Scenario 1: Resetting User Password', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    LoginPage.login('Admin', 'admin123');
  });

  it('should reset the user password successfully', () => {
    const username = 'Admin';
    const newPassword = 'NewPassword123!';

    AdminPage.openAdminSection();
    AdminPage.openUserManagementTab();

    AdminPage.searchUserByUsername(username);

    AdminPage.editUser(username);

    AdminPage.clickResetPasswordToggle();

    AdminPage.enterNewPassword(newPassword);

    AdminPage.saveChanges();

    AdminPage.verifyPasswordResetSuccess();
  });
});
