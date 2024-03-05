/// <reference types="Cypress" />


describe("Central de Atendimento ao Cliente TAT", function () {
    beforeEach(() => {
        cy.visit("./src/index.html");
    })

    it.only("verifica o título da aplicação", function () {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    })

    it.only("Preenche os campos obrigatórios e envia o formulário", function () {
        const logtext =
            "lorem ipsum dolor sit amet, consectetur adip occurence odio erat, consectetur adip dolor sit amet, consectetur adip";

        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo.com")
        cy.get("#open-text-area").type(logtext, { delay: 0 })
        cy.contains("button", "Enviar").click()
        cy.get(".success").should("be.visible")
    })

    it.only("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo,com")
        cy.get("#open-text-area").type("teste")
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")
    })

    it.only("Campo de telefone continua vazio", () => {
        cy.get("#phone").type("Abcefgij").should("have.value", "")
    })

    it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulári", () => {
        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo.com")
        cy.get("#phone-checkbox").check()
        cy.get("#open-text-area").type("teste")
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")
    })

    it.only("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
        cy.get("#firstName")
            .type("Erika")
            .should("have.value", "Erika")
            .clear()
            .should("have.value", "")
        cy.get("#lastName")
            .type("Dias")
            .should("have.value", "Dias")
            .clear()
            .should("have.value", "")
        cy.get("#email")
            .type("erika@exemplo.com")
            .should("have.value", "erika@exemplo.com")
            .clear()
            .should("have.value", "")
        cy.get("#phone")
            .type("12345678")
            .should("have.value", "12345678")
            .clear()
            .should("have.value", "")
    })

    it.only("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")
    })

    it.only("envia o formuário com sucesso usando um comando customizado", () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get(".success").should("be.visible")
    })

    it.only('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it.only('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    
    it.only('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it.only('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    });

    it.only('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')               
            })
    });

    it.only('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')                 
    });

    it.only('marca ambos checkboxes, depois desmarca com uncheck() com value', () => {
        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .uncheck('email')
            .should('not.be.checked')                 
    });

    it.only('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/example.txt')
            .then(input => {
                console.log(input)
                expect(input[0].files[0].name).to.equal('example.txt')
            })
    });

    it.only('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.txt', { action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.txt')
            })
    });

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.txt').as('mydocument')
        cy.get('input[type=file]').selectFile('@mydocument')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.txt')
        })
    });

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
            cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

});
