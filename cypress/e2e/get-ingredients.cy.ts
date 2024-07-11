describe('get ingredients', function () {
  this.beforeEach(() => {
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
      fixture: 'mock-ingredients.json'
    });
    cy.visit('http://localhost:4000/');
  });

  it('get ingredients request with succsess while visitint page', function () {
    cy.get('[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa0941]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa093e]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get('[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa093c]').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa0942]').should(
      'contain',
      'Соус Spicy-X'
    );
  });
});
