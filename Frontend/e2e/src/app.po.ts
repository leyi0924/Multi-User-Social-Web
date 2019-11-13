import { browser, by, element } from 'protractor';

export class AppPage {


  navigateToLogin() {
    return browser.get('/');
  }

  register() {
    element(by.css('input[id=acctname]')).sendKeys('realUser');
    element(by.css('input[id=email]')).sendKeys('ld31@rice.edu');
    element(by.css('input[id=tel]')).sendKeys('909-614-5566');
    element(by.css('input[id=dob]')).sendKeys('09/24/1996');
    element(by.css('input[id=zip]')).sendKeys('77005');
    element(by.css('input[id=password2]')).sendKeys('1234');
    element(by.css('input[id=passcon]')).sendKeys('1234');
    element(by.css('input[id=regButt]')).click();
  }

  getText() {
    return element(by.css('div[id=message3]')).getText();
  }

  login(username, password) {
    element(by.css('input[id=username]')).sendKeys(username);
    element(by.css('input[id=password]')).sendKeys(password);
    element(by.css('button[id=loginBtn]')).click();
  }

  postArticle(){
    element(by.css('textarea[id=postArea]')).sendKeys('This is new article')
    element(by.css('button[id=postBtn]')).click();
  }

  getNewArticle(){
    return element(by.css('span[id=articleText0]')).getText();
  }

  updateStatus(){
    element(by.css('input[id=statusUp]')).sendKeys('This is new status')
    element(by.css('button[id=statusBtn]')).click();
  }

  getNewStatus(){
    return element(by.css('span[id=status]')).getText();
  }

  logout(){
    element(by.css('button[id=logout]')).click();
  }

  searchText(){
    element(by.css('input[id=searchArea]')).sendKeys('This is a tiger')
    element(by.css('button[id=searchBtn]')).click();
  }

  textAuthor(){
    return element(by.css('span[id=textAuthor0]')).getText();
  }

  articleNum(){
    return element.all(by.css('.articlesShown')).count();
  }
}
