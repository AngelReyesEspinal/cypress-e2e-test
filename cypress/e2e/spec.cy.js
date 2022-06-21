describe('empty spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('frontend_url'));

    cy.request({
      method: 'POST',
      url: Cypress.env('google_auth_url'),
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('client_id'),
        client_secret: Cypress.env('client_secret'),
        refresh_token: Cypress.env('refresh_token'),
      },
    }).then(({ body }) => {
      const { id_token } = body

      cy.request('POST', Cypress.env('api_url'), { token: id_token })
        .then( ({ body }) => {
          window.localStorage.setItem('currentUser', body.email)
          window.localStorage.setItem('token', body.sub)
        })

        cy.wait(1000);

        cy.get('#textareaId')
          .type(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`)

        for (let index = 0; index < 7; index++) {
          const iteration = index + 1;
          cy.get(`:nth-child(${iteration}) > .checkmark`).click();
        }

        cy.get('.button').click();
        
    })
  })
})