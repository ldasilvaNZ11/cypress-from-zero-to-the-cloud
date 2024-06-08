// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, surname, phoneNumber, email, praiseTextBox) => {{
    cy.get('#firstName').as('firstName')
    .should('be.visible')
    .type(name)

    cy.get('#lastName').as('lastName')
    .should('be.visible')
    .type(surname)

    cy.get('#phone').as('phone')
    .should('be.visible')
    .type(phoneNumber)

    cy.get('#email').as('email')
    .should('be.visible')
    .type(email)

    cy.get('#open-text-area').as('praiseTextBox')
    .should('be.visible')
    .click()
    .type(praiseTextBox, {delay:0})

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.success').as('successToast')
      .should('be.visible')
}})