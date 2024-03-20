/// <reference types="Cypress" />


describe("Central de Atendimento ao Cliente TAT", function () {
    const TRHEE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit("./src/index.html");
    })

    it("verifica o título da aplicação", function () {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    })

    it("Preenche os campos obrigatórios e envia o formulário", function () {
        const logtext =
            "lorem ipsum dolor sit amet, consectetur adip occurence odio erat, consectetur adip dolor sit amet, consectetur adip";
         //Com a funcinalidade cy.clock(), você pode "congelar" o relógio do navegador. 
        cy.clock()

        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo.com")
        cy.get("#open-text-area").type(logtext, { delay: 0 })
        cy.contains("button", "Enviar").click()
        cy.get(".success").should("be.visible")

        //Com a funcionalidade cy.tick(), você pode avançar no tempo.
        cy.tick(TRHEE_SECONDS_IN_MS)
        cy.get(".success").should("not.be.visible")
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        //Com a funcinalidade cy.clock(), você pode "congelar" o relógio do navegador. 
        cy.clock()

        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo,com")
        cy.get("#open-text-area").type("teste")
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")

        //Com a funcionalidade cy.tick(), você pode avançar no tempo. 
        cy.tick(TRHEE_SECONDS_IN_MS)
        cy.get(".error").should("not.be.visible")
    })

    it("Campo de telefone continua vazio", () => {
        cy.get("#phone").type("Abcefgij").should("have.value", "")
    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulári", () => {
        cy.clock()

        cy.get("#firstName").type("Erika")
        cy.get("#lastName").type("Dias")
        cy.get("#email").type("erika@exemplo.com")
        cy.get("#phone-checkbox").check()
        cy.get("#open-text-area").type("teste")
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")

        cy.tick(TRHEE_SECONDS_IN_MS)
        cy.get(".error").should("not.be.visible")
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
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

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
        cy.clock()
        cy.contains("button", "Enviar").click()
        cy.get(".error").should("be.visible")
        cy.tick(TRHEE_SECONDS_IN_MS)
        cy.get(".error").should("not.be.visible")
    })

    //A funcionalidade _.times() serve para você executar uma função de callback um certo número de vezes, onde o número de vezes é o primeiro argumento, e a função de callback é o segundo.
    Cypress._.times(5, () => {
        it("envia o formuário com sucesso usando um comando customizado", () => {
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit()
            cy.get(".success").should("be.visible")
            cy.tick(TRHEE_SECONDS_IN_MS)
            cy.get(".success").should("not.be.visible")
        })
    })
    // it("envia o formuário com sucesso usando um comando customizado", () => {
    //     cy.clock()
    //     cy.fillMandatoryFieldsAndSubmit()
    //     cy.get(".success").should("be.visible")
    //     cy.tick(TRHEE_SECONDS_IN_MS)
    //     cy.get(".success").should("not.be.visible")
    // })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')               
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')                 
    });

    it('marca ambos checkboxes, depois desmarca com uncheck() com value', () => {
        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .uncheck('email')
            .should('not.be.checked')                 
    });

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/example.txt')
            .then(input => {
                console.log(input)
                expect(input[0].files[0].name).to.equal('example.txt')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.txt', { action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.txt')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.txt').as('mydocument')
        cy.get('input[type=file]').selectFile('@mydocument')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.txt')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
            cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      //A funcionalidade _.repeat() serve para repetir uma string um certo número de vezes, onde o primeiro argumento é a string a qual deseja-se repetir, e o segundo argumento quantas vezes tal string deve ser repetida.
      it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
      });

      it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')  
        .should((response) => {
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      });

      it.only('Encontro o gato escondido com .invoke', () => {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            // .invoke('hide')
            // .should('not.be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu 💙 Gatinhos')
      })
});
