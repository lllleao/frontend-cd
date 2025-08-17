/// <reference types="cypress" />

describe('Verifica a conexão com o backend', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })
    it('Intercepta chamada da API', () => {
        cy.intercept('GET', '**/books/free').as(
            'getPublicBooks'
        )

        cy.visit('/', {
            onBeforeLoad(win) {
                win.fetch = (
                    (originalFetch) =>
                    (...args) =>
                        originalFetch(args[0], {
                            ...args[1],
                            cache: 'no-store'
                        })
                )(win.fetch)
            }
        })

        cy.wait('@getPublicBooks', { timeout: 10000 })
            .its('response.statusCode')
            .should('eq', 200)
    })
})
