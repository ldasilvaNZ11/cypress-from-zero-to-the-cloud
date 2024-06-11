describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it('check the application title', () => {
    cy.title().should("be.equal", "TAT Customer Service Center")
  })

  it('fills in the required fields and submits the form', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Travolta')
    cy.get('#phone').type('043587889')
    cy.get('#email').type('test@123.com')
    cy.get('#open-text-area').type('I love your services, so thank you very much my friend I love fruit and bananas. I eat pasta too!', {delay: 0})
    cy.contains('button', 'Send').click()
    
    cy.get('.success').should('be.visible')
    
    // cy.get('@successToast')
    // .should('have.text', 'Message successfully sent.')  

  })

  it('fills in the required fields and submits the form', () => {

    const longText = Cypress._.repeat('abcdefghij', 10)
    
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Travolta')
    cy.get('#phone').type('043587889')
    cy.get('#email').type('test@123.')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Send').click()
    
    cy.get('.error').should('be.visible')
  
  })

  it('phone field only accepts numbers', () => {
    
    cy.get('#phone')
      .type('abcsefg')
      .should('have.value', '')
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Travolta')
    cy.get('#email').type('test@123.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("test")
    cy.contains('button', 'Send').click()

    cy.get('.error').should('be.visible')
  
  })

  it('fills and clears the first name, last name, email, and phone fields', () => {
  
    cy.get('#firstName')
      .type('Lucas')
      .should('have.value', 'Lucas')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')

      cy.get('#email')
      .type('lucas.cord@hotmail.com')
      .should('have.value', 'lucas.cord@hotmail.com')
      .clear()
      .should('have.value', '')

      cy.get('#phone')
      .type('2456796')
      .should('have.value', '2456796')
      .clear()
      .should('have.value', '')
  
  })

  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.contains('button', 'Send').click()
      .get('.error').should('be.visible')
  })

  it('successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit('carlos', 'mano', '123456', 'test@gmail.com', 'this is my feedback.')
      .get('.success').should('be.visible')
  })

  it('selects a product (YouTube) by its content', () => {
    cy.get('select').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('selects a product (Mentorship) by its value', () => {
    cy.get('select').select('mentorship') //cy.get('#product').select('mentorship') 
      .should('have.value', 'mentorship')
  })

  it('selects a product (Blog) by its index', () => {
    cy.get('select').select(1)
      .should('have.value', 'blog')
  })

  it('checks the type of service "Feedback"', () => {
    cy.get('input[type=radio][value="feedback"]').check()
      .should('be.checked')
  })

  it('checks each type of service', () => {
    cy.get('#support-type')
      .find('input[type="radio"]')
      .each((typesOfServices) => {
        cy.wrap(typesOfServices)
          .check()
          .should('be.checked')
    });
  })

  it('checks both checkboxes, then unchecks the last one', () => {
    cy.get('#check')
      .find('input[type="checkbox"]').as('checkboxes')
      .each((preferredOptions) => {
        cy.wrap(preferredOptions)
          .check()
          .should('be.checked')
    });

    cy.get('@checkboxes').last().uncheck()
    .should('not.be.checked')

  })

  // different solution from mine
  // it.only('checks both checkboxes, then unchecks the last one', () => {
  //   cy.get('input[type="checkbox"]')
  //   .check()
  //   .should('be.checked')
  //   .last()
  //   .uncheck()
  //   .should('not.be.checked')
  // })

  it('selects a file from the fixtures folder', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
       //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file simulating a drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })


  it('selects a file using a fixture to which an alias was given', () => {
      cy.fixture('example.json', null).as('sampleFile')
      cy.get('input[type=file]').selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.contains('a', 'Privacy Policy')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('access the privacy policy page by removing the target, then clicking on the link.', () => {
    cy.contains('a', 'Privacy Policy')
      .invoke('removeAttr', 'target') // Would be good to know why invoke is necessary here, rather than just removing this line and letting Privacy Policy to be clicked
      .click()
   
    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
  })
})