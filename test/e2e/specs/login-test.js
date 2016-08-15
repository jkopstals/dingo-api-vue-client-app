// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'loginTest' : function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.form-signin')
      .setValue('input[type=email]', 'jk@jk.jk')
      .setValue('input[type=password]', 'password')
      .keys(browser.Keys.ENTER)
      // .click('button#submit-login')
      // click doesn't submit the form?
      .waitForElementVisible('.form-update', 2000)
      .waitForElementVisible('li.logout',1000)
      .waitForElementVisible('a[name=logout]',1000) // is visible
      .click('a[name=logout]') // has no effect
      .waitForElementVisible('.form-signin',3000) // doesn't pass because click didn't work
      .end()
  }
};
