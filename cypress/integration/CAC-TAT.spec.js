/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS = 3000;
    beforeEach(()=> {
        cy.visit("../../src/index.html")
    })
    it('verifica o título da aplicação', function() {
        cy.title().should("eq", "Central de Atendimento ao Cliente TAT")
    })
    it('preencher campos obrigatorios e enviar formulario', function() {
        cy.clock() // congela o tempo no navegador
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone').type("999999999", {delay: 0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.get('.button[type="submit"]').click()  // identifica pela propriedade button [do tipo tal]
        cy.get('.success').should('be.visible') // . signifca que ele pegou a classe
        cy.tick(THREE_SECONDS) // avança o tempo no navegador
        cy.get('.success').should('be.not.visible') 
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock() // congela o tempo no navegador
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email,com")
        cy.get('#phone').type("999999999")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS) // avança o tempo no navegador
        cy.get('.error').should('be.not.visible')
    })
    it('verifica se o campo de telefone so aceita numeros', function(){
        cy.get('#phone').type("abcdefgh").should('have.text','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock() // congela o tempo no navegador
        cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS) // avança o tempo no navegador
        cy.get('.error').should('not.be.visible')
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
        cy.clock() // congela o tempo no navegador
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS) // avança o tempo no navegador
        cy.get('.error').should('be.not.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.clock() // congela o tempo no navegador
        cy.fillMandatoryFieldsAndSubmit("Rafael", "Chagas") // pode passar parametros
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS) // avança o tempo no navegador
        cy.get('.success').should('be.not.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select').select('YouTube').should('have.value', 'youtube')
        cy.get('select').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento como feedback', ()=>{
        //cy.get('input[type="radio"][value="feedback"]').check()
        //cy.get('input[type="radio"]').should('be.checked')
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
                cy.wait(2000)
            })
        cy.get('input[type="radio"]').should('be.checked')
    })
    it('marca ambos checkboxes, depois desmarca o último', ()=>{
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures e verifica se o mesmo foi selecionado', ()=>{
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando drag-and-drop', ()=>{
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        cy.get('input[type="file"]').then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', ()=>{
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () =>{
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')

        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')
    })
    it('preenche a area de texto usando o comando invoke', () =>{
        const valor = Cypress._.repeat('Rafael Chagas', 40) // Escreve 40 vezes a String Rafael Chagas 
        cy.get('#open-text-area').invoke('val', valor).should('have.value', valor) // invoca o texto da string acima no campo e verifica o valor
    })
    it.only('faz requisição HTTP',()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response) =>{
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
        expect(response.body).to.include('CAC TAT');
        //other way
        // const (status, statusText, body) = response
        // expect(status).to.equal(200);
        // expect(statusText).to.equal('OK');
        // expect(body).to.include('CAC TAT');
        })
    })
})