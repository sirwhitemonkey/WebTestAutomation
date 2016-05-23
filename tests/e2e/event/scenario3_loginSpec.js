var domain = "https://x3u9.us.xmsymphony.com";
var username = "kyle";
var password = "mytoshiba1234";
var incorrectPassword=password + "_incorrect";

describe('Login page', function() {

  var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  };

  function prepareBrowser() {
    browser.get(domain);
    return true;
  }

  function wait(timeout) {
    browser.sleep(timeout);
  }


  beforeEach(function () {
    prepareBrowser();
  },30000);


  it('should be invalid credentials', function() {

    var linkLogin = $('.link-login');

    if (!linkLogin.isPresent()) {
      $('.link-logout').click()
          .then(function() {

            wait(1000);
            unauthorize();
          });
    } else {

      unauthorize();
    }

    function  unauthorize() {
      linkLogin = $('.link-login');
      expect(linkLogin.isPresent()).toBe(true);

      linkLogin.click()
          .then(function() {
            $('#email').sendKeys(username);
            $('#pass').sendKeys(incorrectPassword);
            $('#send2').click()
                .then(function() {

                  wait(5000);

                  var errorMsg=$('div.error.error-msg > p');
                  expect(errorMsg.getText()).toContain('Username and/or password is wrong. Please try again!');
                });
          });
    }

  });

  it('should be successful login', function() {

    wait(1000);

    var linkLogin = $('.link-login');

    if (!linkLogin.isPresent()) {
      $('.link-logout').click()
          .then(function() {

            wait(1000);
            authenticate();
          });
    } else {

      authenticate();
    }


    function authenticate() {
      linkLogin = $('.link-login');
      linkLogin.click()
          .then(function() {

            wait(1000);

            $('#email').sendKeys(username);
            $('#pass').sendKeys(password);
            $('#send2').click()
                .then(function() {

                  wait(1000);

                  var linkAccount = $('.link-account');
                  expect(linkAccount.isPresent()).toBe(true);
                });
          });
    }

  });

});
