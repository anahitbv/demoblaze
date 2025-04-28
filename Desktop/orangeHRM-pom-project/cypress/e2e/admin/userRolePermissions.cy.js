import LoginPage from '../../support/pageObjects/loginPage';
import AdminPage from '../../support/pageObjects/adminPage';

describe('Scenario 2: Validating User Role Permissions', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    LoginPage.login('Admin', 'admin123');
  });

  it('should validate the user role permissions for ESS', () => {
    const newUser = { 
      username: 'new user username', 
      employeeName: 'Peter', 
      password: 'Password123!', 
      role: 'ESS', 
      status: 'Enabled'
    };

    AdminPage.openAdminSection();
    AdminPage.openUserManagementTab();
    AdminPage.createUser(newUser.username, newUser.employeeName, newUser.password, newUser.role, newUser.status);
    AdminPage.verifyRoleForUser(newUser.username, newUser.role);

    cy.get('.oxd-userdropdown-tab').click();

    cy.contains('a.oxd-userdropdown-link', 'Logout').click();

    LoginPage.login(newUser.username, newUser.password);
 
    cy.get('nav[aria-label="Topbar Menu"]').should('not.contain', 'Admin');
  });
});
