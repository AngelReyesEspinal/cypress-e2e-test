describe('Google Login', () => {
    it('should input email and password', { baseUrl:  'https://accounts.google.com' }, function() {
      // Handling all errors and 'skipping' test to avoid global failure.
      cy.on('uncaught:exception', (err, runnable) => {
        console.error('Google Login -> uncaught:exception', err);
        // Skip test from https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__errors
        return false;
      });

      //cy.visit('/ServiceLogin');
      cy.visit('/ServiceLogin?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1');

      cy.wait(3000);

      // Google Login Redirection: Email Input
      cy.url().should('contain', 'accounts.google.com')
        .get('input[type="email"]').type('cypresstester007@gmail.com')
        .type('{enter}').wait(3000);

      // Google Login Redirection: Password Input
        cy.url().should('contain', 'accounts.google.com')
            .get('input[type="password"]').type('Cypresstester#007')
            .type('{enter}').wait(3000);
    });
});

// https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin