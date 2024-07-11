import { testUrl } from "cypress/constants/constants";

describe('handle order', function () {
  this.beforeEach(() => {
    cy.intercept('POST', `api/auth/login`, {
      fixture: 'mock-user-data.json'
    });
    cy.intercept('GET', `api/auth/user`, {
      fixture: 'mock-user.json'
    });
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'mock-ingredients.json'
    });
    cy.intercept('POST', `api/orders`, {
      fixture: 'mock-order.json'
    });

    cy.setCookie('accessToken', '123key');
    window.localStorage.setItem('key', '123');
    cy.visit(testUrl);
  });

  this.afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('key');
  });

  it('burger should build and ordered', function () {
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

    const orderButton = cy.get('[data-cy=orderButton] > button');
    orderButton.click();

    const modalContainer = cy.get('[data-cy=modalContainer]');
    modalContainer.should('contain', '11111');

    const modalCloseButton = cy.get('[data-cy=modalCloseButton]');
    modalCloseButton.click();
    modalContainer.should('not.exist');

    const constructorContainer = cy.get('[data-cy=constructorContainer');
    constructorContainer
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });
});
