class HomePage {
    selectProduct(productName) {
      cy.contains('.card-title', productName).click();
    }
  
    addToCart() {
      cy.contains('Add to cart').click();
    }
  }
  
  export default new HomePage();
  