/// <reference types="cypress" />

describe('post-new-rec', () => {

    beforeEach(() => {
      cy.visit('https://frontend-c3c4.netlify.app/')
    })
  
  
  it('displays create new rec button', () => {
    cy.get('#newrec .span').should('have.text', '+ Create New Recommendation')
  })

  it('Modal appears when button is clicked', () => {
    cy.get('#newrec', { timeout: 20000 })
        // .find('#mymodal')
        .click()
        .get('#mymodal')

        cy.get('.nav .title').should('have.text', 'Create New Recommendation')


        cy.get('#titleinput')
            .type('Click test in Cypress').should('have.value', 'Click test in Cypress')
        
        cy.get('#linkInput')
        .type('https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/').should('have.value', 'https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/')

        cy.get('#authorInput')
            .type('Gleb Bahmutov').should('have.value', 'Gleb Bahmutov')

        cy.get('#typeInput').select('article').should('have.value', 'article')

        cy.get('#recommendedCheckboxes').check('recommended').should('have.value', 'recommended')

        cy.get('#reasonInput')
            .type('I can now test clicks in Cypress').should('have.value', 'I can now test clicks in Cypress')

        cy.get('#summaryInput')
            .type('He explains how to test clicks in Cypress').should('have.value', 'He explains how to test clicks in Cypress')

        cy.get('#tagInput').select('API')//.should('have.value', 'article')
            .select('HTML')

  })


  })


  
  //displays 10 reccomendation on the homepage by default