var domain = "<DOMAIN>";
var username = "<USERNAME>";
var password = "<PASSWORD>";

describe('Logout page', function() {

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


  it('should perform logout', function() {

    var linkLogout = $('.link-logout');
    expect(linkLogout.isPresent()).toBe(true);

    linkLogout.click()
        .then(function() {
          wait(1000);
            expect($('.link-login').isPresent()).toBe(true);
          expect($('.link-register').isPresent()).toBe(true);

        });
  });

});
