const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.APP_URL || 'http://127.0.0.1:8000',
    setupNodeEvents(on) {
        on('task', {
          log(message) {
            console.log(message)

            return null
          },
          table(message) {
            console.table(message)

            return null
          }
        })
    },
  },
});
