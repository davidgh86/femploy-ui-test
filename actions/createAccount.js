const chalk = require( 'chalk' );

class createAccount {
  constructor( page ) {
    this.url = "http://localhost:8080"
    this.page = page;
    this.loginBtn = "#buttonLogin";
    this.continueWithMailButton = "#continueWithMailButton";
    this.createAccountTab = "#mailLoginTab1";
    this.signupFormNameText = "#signUpFormName";
    this.signupFormEmailText = "#signUpFormEmail";
    this.signupFormPasswordText = "#signUpFormPassword";
    this.signupAcceptCheck = "#signUpFormAcceptConditions";
    this.signupBtn = "#signUpFormSignUp";
    
  }

  async signup( username, email, password ) {
    try {
      if(this.url !== page.url()){
        await page.goto(this.url);
      }
      
      await page.click(this.loginBtn)
      await page.waitForSelector(this.continueWithMailButton, {visible: true})
      await page.waitForTimeout(1000)
      await page.click(this.continueWithMailButton)
      await page.waitForTimeout(2000)
      await page.click(this.createAccountTab)
      await page.waitForTimeout(2000)
      
      await page.focus(this.signupFormNameText)
      await page.keyboard.type(username)
      await page.waitForTimeout(1000)
      
      await page.focus(this.signupFormEmailText)
      await page.keyboard.type(email)
      await page.waitForTimeout(1000)
      
      await page.focus(this.signupFormPasswordText)
      await page.keyboard.type(password)
      await page.waitForTimeout(1000)
      
      await page.click(this.signupAcceptCheck)
      await page.waitForTimeout(1000)
      
      await page.click(this.signupBtn)
      await page.waitForTimeout(2000)
      
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }

  }
}


module.exports = ( page ) => new createAccount( page );
