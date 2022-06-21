const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      chromeWebSecurity: false
      // implement node event listeners here
    },
  },
  env: {
    client_id: '268780840668-747lcajtjrvqoa0qgpcf8bqbihagm11h.apps.googleusercontent.com',
    client_secret: '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',
    refresh_token: '1//042kYluo3KOpECgYIARAAGAQSNwF-L9IrcG6ixWMQJvs8Y3SEQXcbWSCcOWVTChgAyLlRYX2jkoclfrjt-WyhLmCR7QAxjpW9m00',
    api_url: 'http://localhost:3001/api/v1/auth/google',
    frontend_url: 'http://localhost:3000/',
    google_auth_url: 'https://www.googleapis.com/oauth2/v4/token',
  }
});
