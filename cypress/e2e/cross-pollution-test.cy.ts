/// <reference types="cypress" />

const articleIds = [1, 2, 3, 1, 3, 2, 3, 2, 1, 2, 1, 3, 2, 3, 1, 1, 2, 2, 3, 3]
// const articleIds = [1, 2, 3]

describe('SSR cross-state pollution (broken SSR)', () => {
  it('should never match SSR HTML id when breakSSR=true', () => {
    cy.wrap(articleIds).each((id) => {
      cy.request(`http://localhost:3000/article/${id}?breakSSR=true`).then((response) => {
        expect(response.status).to.eq(200)
        // The SSR id should never match the requested id
        expect(response.body).not.to.include(`<h2 class="articleId">${id}</h2>`)
      })
    })
  })

  it('should never match hydrated id when breakSSR=true', () => {
    cy.wrap(articleIds).each((id) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(`http://localhost:3000/article/${id}?breakSSR=true`)
      cy.get('h2.articleId').should('not.contain', `${id}`)
    })
  })
})

describe('SSR cross-state pollution (broken SSR), Pinia Store', () => {
  it('should never match SSR HTML id when breakSSR=true', () => {
    cy.wrap(articleIds).each((id) => {
      cy.request(`http://localhost:3000/article-pinia/${id}?breakSSR=true`).then((response) => {
        expect(response.status).to.eq(200)
        // The SSR id should never match the requested id
        expect(response.body).not.to.include(`<h2 class="articleId">${id}</h2>`)
      })
    })
  })

  it('should never match hydrated id when breakSSR=true, Pinia Store', () => {
    cy.wrap(articleIds).each((id) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(`http://localhost:3000/article-pinia/${id}?breakSSR=true`)
      cy.get('h2.articleId').should('not.contain', `${id}`)
    })
  })
})

describe('SSR cross-state pollution (parallel requests)', () => {
  it('should return correct SSR HTML for all articles in parallel', () => {
    cy.wrap(articleIds).each((id) => {
      cy.request(`http://localhost:3000/article/${id}`).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.include(`<h2 class="articleId">${id}</h2>`)
      })
    })
  })

  it('should hydrate correctly for all articles in parallel', () => {
    cy.wrap(articleIds).each((id) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(`http://localhost:3000/article/${id}`)
      cy.get('h2.articleId').should('contain', `${id}`)
    })
  })

  describe('SSR cross-state pollution (Pinia store)', () => {
    it('should return correct SSR HTML for all articles in parallel using Pinia', () => {
      cy.wrap(articleIds).each((id) => {
        cy.request(`http://localhost:3000/article-pinia/${id}?testPinia=true`).then((response) => {
          console.log('Response for article-pinia', id, response.status)
          expect(response.status).to.eq(200)
          expect(response.body).to.include(`<h2 class="articleId">${id}</h2>`)
        })
      })
    })

    it('should hydrate correctly for all articles using Pinia', () => {
      cy.wrap(articleIds).each((id) => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit(`http://localhost:3000/article-pinia/${id}?testPinia=true`)
        cy.get('h2.articleId').should('contain', `${id}`)
      })
    })
  })
})
