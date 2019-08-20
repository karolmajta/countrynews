/// <reference types="Cypress" />

context("App navigation happy path", () => {
  it("can go from landing to country detail", () => {
    cy.visit("http://localhost:3000");
    cy.get('g[id="asia"]').click();
    cy.get('[data-cy="country-item"]')
      .first()
      .click();
    cy.get('[data-cy="news-item"]');
  });

  it("can start on different page than landing page and go back to landing page", () => {
    cy.visit("http://localhost:3000/EU/PL");
    cy.get('[data-cy="back-to-continent"]').click();
    cy.get('[data-cy="back-to-all"]').click();
    cy.get('g[id="asia"]');
  });

  it("handles browser back/forward gracefully", () => {
    cy.visit("http://localhost:3000");
    cy.get('g[id="asia"]').click();
    cy.get('[data-cy="country-item"]');
    cy.go(-1);
    cy.get('g[id="asia"]');
    cy.go(1);
    cy.get('[data-cy="country-item"]')
      .first()
      .click();
    cy.get('[data-cy="news-item"]');
    cy.go(-1);
    cy.get('[data-cy="country-item"]');
  });
});
