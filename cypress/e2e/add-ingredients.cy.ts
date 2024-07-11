import { testUrl } from "cypress/constants/constants";

describe('handle add ingredient', function () {
  this.beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'mock-ingredients.json'
    });
    cy.visit(testUrl);
  });

  it('add ingredient on button click', function () {
    const mainButton = cy.get(
      '[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa093e] > button'
    );
    const bunButton = cy.get(
      '[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa093c] > button'
    );
    const sauceButton = cy.get(
      '[data-cy=ingredientsContainer-643d69a5c3f7b9001cfa0942] > button'
    );

    mainButton.click();
    bunButton.click();
    sauceButton.click();

    cy.get('[data-cy=constructorBunTopIngredient]').should('exist');
    cy.get('[data-cy=constructorBunBottomIngredient]').should('exist');
    cy.get('[data-cy=constructorIngredient-643d69a5c3f7b9001cfa093e]').should(
      'exist'
    );
    cy.get('[data-cy=constructorIngredient-643d69a5c3f7b9001cfa0942]').should(
      'exist'
    );
  });
});
