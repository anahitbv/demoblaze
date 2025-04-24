import loginPage from '../pages/loginPage';
import homePage from '../pages/homePage';
import cartPage from '../pages/cartPage';

describe('Demoblaze Tests', () => {
  const username = 'Anahittest';
  const password = '12345678';
  const product = 'Samsung galaxy s6';

  beforeEach(() => {
    cy.visit('https://demoblaze.com/');
  });

  it('1. should successfully log in', () => {
    loginPage.openLoginModal();
    cy.wait(1000); // wait for modal animation

    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
    loginPage.submitLogin();

    loginPage.assertLoginSuccess(username);
  });

  it('2. should add a product to the cart and verify it', () => {
    homePage.selectProduct(product);

    cy.url().should('include', 'prod.html');
    homePage.addToCart();

    // Assert alert text
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Product added');
    });

    // Go back and check the cart
    cy.go('back');
    cartPage.goToCart();
    cartPage.verifyProductInCart(product);
  });
});
