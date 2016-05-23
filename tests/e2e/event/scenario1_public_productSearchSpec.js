var domain = "https://x3u9.us.xmsymphony.com";
var username = "kyle";
var password = "mytoshiba1234";

describe('Product search page', function() {

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


  it('(Guest)should display auto complete search results', function() {

    $('#search').sendKeys('dom');

    wait(5000);

    var result = $('#inline-search-results').$('ul li:first-child');
    expect(result.isPresent()).toBe(true);

    var link = result.$('a');
    expect(link.getText()).toContain('dom test');

    link.click()
        .then(function() {
          wait(1000);
          var pageTitle = $('.page-title.category-title');
          expect(pageTitle.isPresent()).toBe(true);
          expect(pageTitle.getText()).toContain('Search');
        });


  });

  it('(Guest)should display phrase suggestion results', function() {

    wait(1000);

    $('#search').sendKeys('dom testtt');

    $('.button.button-search').click()
        .then(function() {

          wait(5000);
          var pageTitle = $('.page-title.category-title');
          expect(pageTitle.isPresent()).toBe(true);
          expect(pageTitle.getText()).toContain('Did you mean');

          var link = pageTitle.$('a');
          expect(link.getText()).toContain('dom test');

          link.click()
              .then(function() {
                wait(1000);
                pageTitle = $('.page-title.category-title');
                expect(pageTitle.isPresent()).toBe(true);
                expect(pageTitle.getText()).toContain('Search');
              });
        });

  });

  it('(Session)should display auto complete search results', function() {

    var linkLogin = $('.link-login');
    expect(linkLogin.isPresent()).toBe(true);

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

                $('#search').sendKeys('dom');

                wait(5000);

                var result = $('#inline-search-results').$('ul li:first-child');
                expect(result.isPresent()).toBe(true);

                var link = result.$('a');
                expect(link.getText()).toContain('Dom test distribution');

                link.click()
                    .then(function() {
                      wait(1000);
                      var pageTitle = $('.page-title.category-title');
                      expect(pageTitle.isPresent()).toBe(false);
                    });

              });
        });



  });

  it('(Session)should display phrase suggestion results', function() {

    wait(1000);

    $('#search').sendKeys('dom testtt');

    $('.button.button-search').click()
        .then(function() {

          wait(5000);
          var pageTitle = $('.page-title.category-title');
          expect(pageTitle.isPresent()).toBe(true);
          expect(pageTitle.getText()).toContain('Search');

        });

  });

});
