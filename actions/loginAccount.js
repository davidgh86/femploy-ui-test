const chalk = require( 'chalk' );
const url = require('url');

class LoginAccount {
  constructor( page ) {
    this.url = "http://localhost:8080"
    this.page = page;
    this.loginBtn = "#buttonLogin";
    this.continueWithMailButton = "#continueWithMailButton";
    this.signInAccountTab = "#mailLoginTab0";
    this.signupFormEmailText = "#signInByMailFormInputMail";
    this.signupFormPasswordText = "#signInByMailFormInputPassword";
    this.signupBtn = "#signInByMailAcceptBtn";
    this.avatarItem = "#avatar"
  }

  async login( email, password ) {
    try {
      if((new URL(this.url)).href !== (new URL(page.url())).href){
        await page.goto(this.url);
      }
      await page.click(this.loginBtn)
      await page.waitForSelector(this.continueWithMailButton, {visible: true})
      await page.waitForTimeout(1000)
      await page.click(this.continueWithMailButton)
      await page.waitForTimeout(2000)
      await page.click(this.signInAccountTab)
      await page.waitForTimeout(2000)
      
      await page.focus(this.signupFormEmailText)
      await page.keyboard.type(email)
      await page.waitForTimeout(1000)
      
      await page.focus(this.signupFormPasswordText)
      await page.keyboard.type(password)
      await page.waitForTimeout(1000)
      
      await page.click(this.signupBtn)

    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
    
  }
}

module.exports = ( page ) => new LoginAccount( page );