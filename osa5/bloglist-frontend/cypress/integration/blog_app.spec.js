describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testaaja',
      username: 'testaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  /*
  Kirjautumislomaketta ei sovelluksessa näytetä oletusarvoisesti, sillä
  se oli näin tehty aikaisemmin, joten testin tarkoituksena on tarkastaa näkyykö
  kirjautumislomake, kun nappia painetaan
  */
  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.login({ username: 'testaaja', password: 'salainen' })
    })

    it('it fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Testi Testaaja logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.login({ username: 'testaaja', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'Adding blogs with Cypress', author: 'Testi Testaaja', url: 'https://github.com/paavkar' })
      cy.contains('Adding blogs with Cypress')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'Adding blogs with Cypress', author: 'Testi Testaaja', url: 'https://github.com/paavkar' })
      cy.contains('Adding blogs with Cypress')
        .contains('view')
        .click()
      cy.contains('like')
        .click()
    })

    it('A Blog can be removed', function() {
      cy.createBlog({ title: 'Adding blogs with Cypress', author: 'Testi Testaaja', url: 'https://github.com/paavkar' })
      cy.contains('Adding blogs with Cypress')
        .contains('view')
        .click()
      cy.contains('remove')
        .click()
    })
  })
})