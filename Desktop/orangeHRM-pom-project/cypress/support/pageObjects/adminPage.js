class AdminPage {
  openAdminSection() {
    cy.get('nav[aria-label="Topbar Menu"]').should('be.visible');
    cy.contains('span', 'Admin').click();
  }

  openUserManagementTab() {
    cy.contains('span', 'User Management').click();
  }

  searchUserByUsername(username) {
    cy.get('input[placeholder="Type for hints..."]').type(username);
    cy.contains('button', 'Search').click();
  }

  editUser(username) {
    cy.contains('div.oxd-table-row', username)
      .within(() => {
        cy.get('button')
          .find('i.bi-pencil-fill') 
          .parents('button') 
          .click();        
      });
  }

  clickResetPasswordToggle() {
    cy.get('div.oxd-form-loader').should('not.exist');
    cy.get('span.oxd-checkbox-input').click();
  }

  enterNewPassword(password) {
    cy.get('input[type="password"]').eq(0).clear().type(password); 

    cy.get('input[type="password"]').eq(1).clear().type(password);
  }

  saveChanges() {
    cy.contains('button', 'Save').click();
  }

  verifyPasswordResetSuccess() {
    cy.get('.oxd-toast').should('contain', 'Success');
  }

createUser(username, employeeName, password, role, status) {
  cy.contains('button', 'Add').click();

  cy.contains('h6', 'Add User').should('be.visible');

  cy.get('.oxd-form')
    .find('div.oxd-select-wrapper')
    .eq(0)
    .click();

  cy.get('.oxd-select-dropdown')
    .should('be.visible')
    .find('div[role="option"]')
    .contains(role)
    .click();

  cy.get('input[placeholder="Type for hints..."]')
  .type(employeeName, { delay: 500 });

cy.get('.oxd-autocomplete-dropdown')
  .should('be.visible')
  .within(() => {
    cy.contains('div', employeeName).click();
  });

  cy.get('.oxd-form')
    .find('div.oxd-select-wrapper')
    .eq(1)
    .click();

  cy.get('.oxd-select-dropdown')
    .find('div[role="option"]')
    .contains(status)
    .click();

  cy.get('input.oxd-input').eq(1).type(username);

  cy.get('input[type="password"]').eq(0).type(password);
  cy.get('input[type="password"]').eq(1).type(password);

  cy.get('button[type="submit"]').click();
}



  verifyRoleForUser(username, role) {
    cy.contains('div.oxd-table-row', username)
      .within(() => {
        cy.get('div.oxd-table-cell').contains(role);
      });
  }
}

export default new AdminPage();
