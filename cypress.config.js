const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
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
