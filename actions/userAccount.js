const chalk = require( 'chalk' );

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
      if(this.url !== page.url()){
        await page.goto(this.url);
      }
      await page.click(this.avatar)
      await page.waitForSelector(this.logoutSessionItemMenu, {visible: true})
      await page.waitForTimeout(1000)
      await page.click(this.logoutSessionItemMenu)
      await page.waitForTimeout(1000)
      
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
    return false
  }
}


module.exports = ( page ) => new userAccount( page );
