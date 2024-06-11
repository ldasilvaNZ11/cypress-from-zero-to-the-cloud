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
  cy.get('#firstName').type(name)
  cy.get('#lastName').type(surname)
  cy.get('#phone').type('043587889')
  cy.get('#email').type(email)
  cy.get('#phone-checkbox').click()
  cy.get('#open-text-area').type("test")
  cy.contains('button', 'Send').click()

}})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingObject', (data = {
  firstName: 'Lucas',
  lastName: 'Silva',
  email: 'lucas@test.co.nz',
  text: 'test'
}) => {
  cy.get('#firstName').type(data.name)
  cy.get('#lastName').type(data.surname)
  cy.get('#phone').type(data.phoneNumber)
  cy.get('#open-text-area').type(text)
  cy.contains('button', 'Send').click()

})