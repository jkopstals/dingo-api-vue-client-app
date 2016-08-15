// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'seeLoginPage': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.form-signin')
      .assert.containsText('h2', 'Please sign in')
      .assert.elementCount('input', 2)
      .end()
  }
}
