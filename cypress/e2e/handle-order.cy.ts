describe('handle order', function () {
  this.beforeEach(() => {
    cy.intercept('POST', `https://norma.nomoreparties.space/api/auth/login`, {
      fixture: 'mock-user-data.json'
    });
    cy.intercept('GET', `https://norma.nomoreparties.space/api/auth/user`, {
      fixture: 'mock-user.json'
    });
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
      fixture: 'mock-ingredients.json'
    });
    cy.intercept('POST', `https://norma.nomoreparties.space/api/orders`, {
      fixture: 'mock-order.json'
    });

    cy.setCookie('accessToken', '123key');
    cy.visit('http://localhost:4000/');
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
