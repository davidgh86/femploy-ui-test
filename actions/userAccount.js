const chalk = require( 'chalk' );

class userAccount {
  constructor( page ) {
    this.url = "http://localhost:8080"
    this.page = page;
    this.avatar = "#avatar";
    this.myAccountSessionItemMenu = "#myAccountSessionItemMenu";
    this.myAdvertsSessionItemMenu = "#myAdvertsSessionItemMenu";
    this.myMessagesSessionItemMenu = "#myMessagesSessionItemMenu";
    this.myFavouritesSessionItemMenu = "#myFavouritesSessionItemMenu";
    this.helpSessionItemMenu = "#helpSessionItemMenu";
    this.logoutSessionItemMenu = "#logoutSessionItemMenu";
  }

  async logout() {
    try {
      await page.goto(this.url);
      await page.click(this.avatar)
      await page.waitForSelector(this.logoutSessionItemMenu, {visible: true})
      await page.waitForTimeout(1000)
      await page.click(this.logoutSessionItemMenu)
      await page.waitForTimeout(1000)

      await page.$(this.avatar)

      return true
      
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
    return false
  }
}


module.exports = ( page ) => new userAccount( page );
