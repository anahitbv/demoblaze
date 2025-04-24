class CartPage {
    goToCart() {
      cy.get('#cartur').click();
    }
  
    verifyProductInCart(productName) {
      cy.contains('td', productName).should('be.visible');
    }
  }
  
  export default new CartPage();
  