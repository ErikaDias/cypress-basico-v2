Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
    cy.get("#firstName").type("Erika")
    cy.get("#lastName").type("Dias")
    cy.get("#email").type("erika@exemplo.com")
    // cy.get("#open-text-area").type(logtext, { delay: 0 });
    cy.get("#open-text-area").type("Teste digitação no campo")
    cy.contains("button", "Enviar").click()
})
