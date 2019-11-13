import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("Register a new user named 'realUser' ", () => {
    page.navigateToLogin();
    page.register();
    expect(page.getText()).toEqual('You have successfully registered.');

  });

  it("Log in as 'realUser' ", () => {
    page.navigateToLogin();
    page.login('realUser', '1234');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/main');
  });

  it("Create a new article and validate the article appears in the feed", () => {
    page.postArticle();
    expect(page.getNewArticle()).toEqual('This is new article');
  });

  it("Update the status headline and verify the change", () => {
    page.updateStatus();
    expect(page.getNewStatus()).toEqual('This is new status');
  });

  it("Log out 'realUser' ", () => {
    page.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+ '/#/auth');
  });

  it("Log in as test user ", () => {
    page.login('John','123456');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/main');
  });

  it("Search for a keyword that matches only one of test user's articles", () => {
    page.searchText();
    expect(page.textAuthor()).toEqual('John');
    expect(page.articleNum()).toEqual(1);
  });

  it("Log out test user", () => {
    page.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+ '/#/auth');
  });




  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
