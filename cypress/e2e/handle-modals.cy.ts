function findAndClickOnIngredient() {
  const ingredient = cy.get(
    '[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa0941] > a'
  );
  ingredient.click();
}

describe('handle modals', function () {
  this.beforeEach(() => {
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
      fixture: 'mock-ingredients.json'
    });
    cy.visit('http://localhost:4000/');
  });

  it('shoud open ingredient modal', function () {
    findAndClickOnIngredient();
    cy.location('href').should(
      'eq',
      'http://localhost:4000/ingredients/643d69a5c3f7b9001cfa0941'
    );

    const ingredientDetails = cy.get('[data-cy=ingredientDetails]');
    ingredientDetails.should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('shoud close ingredient modal by click on x', function () {
    findAndClickOnIngredient();
    const ingredientDetails = cy.get('[data-cy=modalCloseButton]');
    ingredientDetails.click();
    cy.location('href').should('eq', 'http://localhost:4000/');
  });
});
