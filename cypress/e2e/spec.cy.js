let newProjectUrl = "";

beforeEach(() => {
  Cypress.on("uncaught:exception", (error) => {
    if (error) {
        return false;
    }
  });
  cy.visit(`/login`);
  cy.get("#email").type("cypress-crashing-demo-test@gmail.com");
  cy.get("#password").type("cypresstest{enter}");
  cy.get(`[data-cy="profileHandleHeader"]`, {timeout: 60000}).should(
      "contain",
      "cypress-crashing-demo-test",
  );
  cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen').callsFake(url => win.location.href = url);
  });
  cy.get("#nav-action-menu-button").click();
  cy.get(`[data-cy="createNewProjectMenuButton"]`).click();
  cy.wait(5000);
  cy.get('div[role="progressbar"][aria-label="Loading"]', {timeout: 60000}).should("not.exist");
  cy.url().then((url) => {
      newProjectUrl = url;
  });
});

describe("project page", () => {
  for (let i = 0; i < 100; i++) {
    it(`top right menu buttons work properly - attempt ${i+1}`, () => {
        const menuOptions = {
            Profile: {
                expectedUrl: new RegExp(`.*/cypress-crashing-demo-test$`),
            },
            Documentation: {
                origin: "docs.flux.ai",
                expectedUrl: "docs.flux.ai",
            },
            Tutorials: {
                origin: "docs.flux.ai",
                expectedUrl: "/tutorials",
            },
            "Featured Projects": {
                origin: "www.flux.ai",
                expectedUrl: "/p/projects",
            },
            Community: {
                origin: "fluxcommunity.slack.com",
                expectedUrl: "fluxcommunity.slack.com",
            },
            "Report an Issue": {
                origin: "feedback.flux.ai",
                expectedUrl: "feedback.flux.ai/bugreports",
            },
            "Log out": {
                expectedUrl: "/login",
            },
        };
        cy.intercept("POST", "**/Write/channel?database**").as("writeChannelRequest");
        cy.visit(`${newProjectUrl}`);
        cy.wait("@writeChannelRequest");
        
        for (const option in menuOptions) {
            const menuData = menuOptions[option];
            cy.wait(2000);

            cy.get("#nav-account-menu-button").click();
            // to get rid of "Leave site?" warning
            cy.on('window:before:unload', (e) => {
              e.stopImmediatePropagation();
            });
            cy.wait(2000);
            cy.get('[role="menuitem"]').contains(option).invoke("removeAttr", "target").click();
            cy.wait(2000);

            if (menuData.origin) {
                cy.origin(menuData.origin, {args: {expectedUrl: menuData.expectedUrl}}, ({expectedUrl}) => {
                    cy.url().should("include", expectedUrl);
                }).then(() => false);
            } else {
                cy.url()
                    .should(menuData.expectedUrl instanceof RegExp ? "match" : "include", menuData.expectedUrl)
                    .then(() => false);
            }
            cy.wait(2000);
            cy.visit(newProjectUrl);
        }
    });
  }
});
