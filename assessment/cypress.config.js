const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports/mocha", // Directory for reports
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    // Specifying the pattern to match your test files
    specPattern: 'cypress/e2e/**/*.cy.js', // Update this path based on where your tests are stored

    // Optionally, set up a base URL for your app
    // baseUrl: 'http://localhost:3000',
    // Replace with your app's base URL

    // Support file to load global configurations or utilities
    supportFile: 'cypress/support/e2e.js', // Update the support file location if needed

    setupNodeEvents(on, config) {
      // Add any custom event listeners here, such as for test retries or video recording
    },
  },
});
