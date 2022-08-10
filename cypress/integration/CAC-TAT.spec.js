/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(()=> {
        cy.visit("../../src/index.html")
    })
    it('verifica o título da aplicação', function() {
        cy.title().should("eq", "Central de Atendimento ao Cliente TAT")
    })
    it('preencher campos obrigatorios e enviar formulario', function() {
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone').type("999999999", {delay: 0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.get('.button[type="submit"]').click()  // identifica pela propriedade button [do tipo tal]
        cy.get('.success').should('be.visible') // . signifca que ele pegou a classe
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email,com")
        cy.get('#phone').type("999999999")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('verifica se o campo de telefone so aceita numeros', function(){
        cy.get('#phone').type("abcdefgh").should('have.text','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type("Rafael").should('have.value','Rafael').clear().should('have.value','')
        cy.get('#lastName').type("Chagas").should('have.value','Chagas').clear().should('have.value','')
        cy.get('#email').type("rafaelchagas@email.com").should('have.value','rafaelchagas@email.com')
        .clear().should('have.value','')
        cy.get('#phone').type("999999999").should('have.value','999999999').clear().should('have.value','')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit() // pode passar parametros
        cy.get('.success').should('be.visible')
    })
  })