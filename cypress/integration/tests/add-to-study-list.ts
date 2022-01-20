/// <reference types="cypress" />

describe("add-to-study-list", () => {
  beforeEach(() => {
    cy.visit("https://frontend-c3c4.netlify.app/");
  });

  it("Modal appears when button is clicked", () => {
    cy.get(".login-dropdown").select(3);

    cy.get(".rec-preview .rec-preview-title", { timeout: 20000 }).eq(0).click();

    cy.get(".recommendation-page");

    cy.get(".rec-preview-add-button", { timeout: 20000 }).click();

    cy.get(".study-list-button .sidebarbutton", { timeout: 20000 }).click();

    cy.get(".study-list-top-title")
      .eq(0)
      .should("have.text", "Click test in Cypress");
  });
});
