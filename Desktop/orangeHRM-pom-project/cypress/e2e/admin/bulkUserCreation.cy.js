import LoginPage from '../../support/pageObjects/loginPage';
import AdminPage from '../../support/pageObjects/adminPage';

describe('Scenario 3: Bulk User Creation and Validation', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    LoginPage.login('Admin', 'admin123');
  });

  it('should create multiple users and validate their presence', () => {
    const users = [
      { username: `user1`, employeeName: 'James', password: 'Password123!', role: 'Admin', status: 'Enabled'},
      { username: `user2`, employeeName: 'Rahul', password: 'Password123!', role: 'ESS', status: 'Disabled' },
      { username: `user3`, employeeName: 'Joseph', password: 'Password123!', role: 'Admin', status: 'Enabled' }
    ];

    AdminPage.openAdminSection();

    users.forEach(user => {
      AdminPage.createUser(user.username, user.employeeName, user.password, user.role, user.status);
        
      cy.url().should('include', '/admin/viewSystemUsers');
      cy.get('input[placeholder="Type for hints..."]').should('be.visible');

      AdminPage.searchUserByUsername(user.username);

      cy.contains('div.oxd-table-cell', user.username).should('be.visible');

      AdminPage.verifyRoleForUser(user.username, user.role);
    });
  });
});
