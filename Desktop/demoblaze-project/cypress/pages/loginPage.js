class LoginPage {
    openLoginModal() {
      cy.get('#login2').click();
    }
  
    enterUsername(username) {
      cy.get('#loginusername').clear().type(username);
    }
  
    enterPassword(password) {
      cy.get('#loginpassword').clear().type(password);
    }
  
    submitLogin() {
      cy.get('button[onclick="logIn()"]').click();
    }
  
    assertLoginSuccess(username) {
      cy.contains('#nameofuser', `Welcome ${username}`).should('be.visible');
      cy.contains('Log out').should('be.visible');
      cy.get('#logInModal').should('not.be.visible');
    }
  }
  
  export default new LoginPage();
  