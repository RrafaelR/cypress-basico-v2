Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName) => { // pode receber parametros
    cy.get('#firstName').type(firstName) //# na frente significa que e um id
        cy.get('#lastName').type(lastName)
        cy.get('#email').type("rafaelchagas@email.com")
        cy.get('#phone').type("999999999")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Minha televisao quebrou")
        cy.get('.button[type="submit"]').click() 
})