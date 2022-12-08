const chalk = require( 'chalk' );
const url = require('url');

class userAccount {
  constructor( page ) {
    this.url = "http://localhost:8080/"
    this.page = page;
    this.myAccountSessionItemMenu = "#myAccountSessionItemMenu";
    this.myAdvertsSessionItemMenu = "#myAdvertsSessionItemMenu";
    this.myMessagesSessionItemMenu = "#myMessagesSessionItemMenu";
    this.myFavouritesSessionItemMenu = "#myFavouritesSessionItemMenu";
    this.helpSessionItemMenu = "#helpSessionItemMenu";
    this.logoutSessionItemMenu = "#logoutSessionItemMenu";
    this.avatar = "#avatar"
  }

  async logout() {
    try {
      if((new URL(this.url)).href !== (new URL(page.url())).href){
        await page.goto(this.url);
      }
      await page.click(this.avatar)
      await page.waitForSelector(this.logoutSessionItemMenu, {visible: true})
      await page.waitForTimeout(2000)
      await page.click(this.logoutSessionItemMenu)
      await page.waitForTimeout(2000)
      
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
    return false
  }
}


module.exports = ( page ) => new userAccount( page );
