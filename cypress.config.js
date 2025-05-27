const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "2e8tj9",
  e2e: {
    baseUrl: 'https://r0974916-realbeans.myshopify.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.js'
  },
})
