const chalk = require( 'chalk' );

class CommonAction {
  constructor( page ) {
    
    this.page = page;
    this.alertDialog = "#alertDialog";
    this.alertDialogText = "#alertDialogText";
    this.alertDialogCloseButton = "#alertDialogCloseButton"
    this.avatarItem = "#avatar"
  }

  async checkAlertMessage() {
    try {
      await page.waitForSelector(this.alertDialogText)
      await page.waitForTimeout(1000)
      const alertMessage = await page.$eval(this.alertDialogText, el => {
        return el.innerText
      });

      await page.click(this.alertDialogCloseButton)

      await page.waitForTimeout(1000)

      return alertMessage
      
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
      return null
    }

  }

  async isLoggedIn() {
    await page.waitForTimeout(2000)

    if (await page.$(this.avatarItem)) {
      return true
    } else {
      return false
    }
  }
}

module.exports = ( page ) => new CommonAction( page );;