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

    const user2 = {
      username: "mike",
      name: "Michael Chan",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
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
      cy.get("html").should("contain", "Edsger W. Dijkstra logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();

      cy.get("input:first").type("edsgar");

      cy.get("input:last").type("programme");

      cy.get("#login-button").click();

      cy.contains("failed to log in");
      cy.get("html").should("not.contain", "logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();

      cy.get("input:first").type("edsgar");

      cy.get("input:last").type("programmer");

      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#author").type("Edsger");
      cy.get("#title").type("new blog from cypress");
      cy.get("#url").type("cypress.com");
      cy.get("form").submit();
      cy.get("html").should(
        "contain",
        "new blog from cypress Edsger W. Dijkstra"
      );
    });

    describe("User can like a blog", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get("#author").type("Edsger");
        cy.get("#title").type("new blog from cypress");
        cy.get("#url").type("cypress.com");
        cy.get("form").submit();
      });
      it("like a blog", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.get("html").should("contain", "1");
        cy.contains("like").click();
        cy.get("html").should("contain", "2");
      });
      it("delete by the author", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should(
          "not.contain",
          "new blog from cypress Edsger W. Dijkstra"
        );
      });
      it("another user can not delete", function () {
        cy.contains("logout").click();
        cy.contains("login").click();

        cy.get("input:first").type("mike");

        cy.get("input:last").type("secret");

        cy.get("#login-button").click();
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should(
          "contain",
          "new blog from cypress Edsger W. Dijkstra"
        );
      });
    });

    describe('blog ordered by likes', function(){
        beforeEach(function(){
        cy.contains("new blog").click();
        cy.get("#author").type("Edsger");
        cy.get("#title").type("first blog");
        cy.get("#url").type("cypress.com");
        cy.get("form").submit();

        cy.get("#author").type("Edsger");
        cy.get("#title").type("second blog");
        cy.get("#url").type("cypress.com");
        cy.get("form").submit();

        cy.get("#author").type("Edsger");
        cy.get("#title").type("third blog");
        cy.get("#url").type("cypress.com");
        cy.get("form").submit();

        })

        it.only('like',function(){
            cy.contains("first blog").parent().contains('view').click()
            cy.contains("second blog").parent().contains('view').click()

            cy.contains("second blog").parent().contains('like').click()
            cy.contains("second blog").parent().contains('like').click()
            cy.contains("second blog").parent().contains('like').click()

            cy.contains("third blog").parent().contains('view').click()
            


            cy.contains("third blog").parent().contains('like').click()
            cy.contains("third blog").parent().contains('like').click()
            
            cy.get('html').should("contain","2").and("contain","3").and("contain","0")

            cy.get('.blog:first').contains('second blog')
            cy.get('.blog:last').contains('first blog')

        })
    })

  });
});
