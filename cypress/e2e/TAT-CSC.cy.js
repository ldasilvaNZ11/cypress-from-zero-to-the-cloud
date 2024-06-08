describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it('check the application title', () => {
    cy.title().should("be.equal", "TAT Customer Service Center")
  })


  it('fills in the required fields and submits the form', () => {
    cy.get('#firstName').as('firstName')
    .should('be.visible')
    .type('Lucas')

    cy.get('#lastName').as('lastName')
    .should('be.visible')
    .type('Travolta')

    cy.get('#phone').as('phone')
    .should('be.visible')
    .type('043587889')

    cy.get('#email').as('email')
    .should('be.visible')
    .type('test@123.com')

    cy.get('#open-text-area').as('praiseTextBox')
    .should('be.visible')
    .click()
    .type('I love your services, so thank you very much my friend I love fruit and bananas. I eat pasta too!', {delay: 0})

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.success').as('successToast')
      .should('be.visible')
    
    // cy.get('@successToast')
    // .should('have.text', 'Message successfully sent.')  

  })

  it('fills in the required fields and submits the form', () => {
    
    cy.get('#firstName').as('firstName')
    .should('be.visible')
    .type('Lucas')

    cy.get('#lastName').as('lastName')
    .should('be.visible')
    .type('Travolta')

    cy.get('#phone').as('phone')
    .should('be.visible')
    .type('043587889')

    cy.get('#email').as('email')
    .should('be.visible')
    .type('test@123.')

    cy.get('#open-text-area').as('praiseTextBox')
    .should('be.visible')
    .click()
    .type('I dont love your services, so thank you very much my friend I love fruit and bananas. I eat pasta too!', {delay:0})

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.error').as('errorToast')
      .should('be.visible')
  
  })

  it('phone field only accepts numbers', () => {
    
    cy.get('#phone').as('phone')
    .should('be.visible')
    .type('abcsefg')

    cy.get('@phone')
    .should('have.value', '')
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    
    cy.get('#firstName').as('firstName')
    .should('be.visible')
    .type('Lucas')

    cy.get('#lastName').as('lastName')
    .should('be.visible')
    .type('Travolta')

    cy.get('#email').as('email')
    .should('be.visible')
    .type('test@123.com')

    cy.get('#phone-checkbox').as('phoneCheckbox')
    .should('be.visible')
    .click()

    cy.get('#open-text-area').as('praiseTextBox')
    .should('be.visible')
    .click()
    .type('I dont love your services, so thank you very much my friend I love fruit and bananas. I eat pasta too!', {delay:0})

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.error').as('errorToast')
      .should('be.visible')
  
  })

  it('fills and clears the first name, last name, email, and phone fields', () => {
  
    cy.get('#firstName').as('firstName')
    .should('be.visible')
    .type('Lucas')
    .should('have.value', 'Lucas')

    cy.get('@firstName')
    .clear()
    .should('have.value', '')

    cy.get('#lastName').as('lastName')
    .should('be.visible')
    .type('Silva')
    .should('have.value', 'Silva')

    cy.get('@lastName')
    .clear()
    .should('have.value', '')

    cy.get('#email').as('email')
    .should('be.visible')
    .type('lucas.cord@hotmail.com')
    .should('have.value', 'lucas.cord@hotmail.com')

    cy.get('@email')
    .clear()
    .should('have.value', '')

    cy.get('#phone-checkbox').as('phoneCheckbox')
    .should('be.visible')
    .click()

    cy.get('#open-text-area').as('praiseTextBox')
    .should('be.visible')
    .click()
    .type('I dont love your services, so thank you very much my friend I love fruit and bananas. I eat pasta too!', {delay:0})

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.error').as('errorToast')
      .should('be.visible')
  
  })

  it('displays an error message when submitting the form without filling the required fields', () => {
    
    //cy.get('#email-checkbox').as('emailCheckbox')
    cy.contains('.field', 'Email').should('be.visible').click()

    cy.get('input[type="radio"][value="help"]').as('helpRadioButton')
    .should('be.visible')
    .click()

    cy.get('button[type="submit"]').as('send')
    .should('be.visible')
    .click()

    cy.get('.error').as('errorToast')
      .should('be.visible')
  
  })

  it('successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit('carlos', 'mano', '123456', 'test@gmail.com', 'this is my feedback.')
  })

})