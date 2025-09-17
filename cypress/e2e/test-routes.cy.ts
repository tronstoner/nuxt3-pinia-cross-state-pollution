/// <reference types="cypress" />

describe('Simple article route rendering', () => {
  const articleIds = [1, 2, 3]
  it('should render correct article titles for each route', () => {
    articleIds.forEach((id) => {
      cy.visit(`http://localhost:3000/article/${id}`)
      cy.get('h1').should('contain', `${id}`)
    })
  })
})
