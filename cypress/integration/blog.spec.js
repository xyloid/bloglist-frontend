const { func } = require("prop-types");

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "edsgar",
      name: "Edsger W. Dijkstra",
      password: "programmer",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();

      cy.get("input:first").type("edsgar");

      cy.get("input:last").type("programmer");

      cy.get("#login-button").click();

      cy.contains("logged in");
      cy.get('html').should('contain','Edsger W. Dijkstra logged in')
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();

      cy.get("input:first").type("edsgar");

      cy.get("input:last").type("programme");

      cy.get("#login-button").click();

      cy.contains("failed to log in");
        cy.get('html').should('not.contain', 'logged in')

    });
  });
});
