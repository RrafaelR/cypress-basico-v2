Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ // pode receber parametros
    cy.get('#firstName').type("Rafael") //# na frente significa que e um id
        cy.get('#lastName').type("Chagas")
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone').type("999999999")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.get('.button[type="submit"]').click() 
})