const chalk = require( 'chalk' );
var path = require('path');

class userAccount {
  constructor( page ) {
    this.assetsFolder = path.dirname(__dirname)+"\\assets";
    this.url = "http://localhost:8080"
    this.page = page;
    this.newAdvertButton = "#newAdvertButton";
    this.employeSelectorPrefix = "#employSelector";
    this.newAdvertImageDragAndDrop = "#newAdvertImageDragAndDrop"
    this.publishTypeOffer = "#publishTypeOffer"
    this.publishTypeDemand = "#publishTypeDemand"
    this.publishFormTitle = "#publishFormTitle"
    this.publishFormDescription = "#publishFormDescription"
    this.publishFormLocalitySelector = "#publishFormLocalitySelector"
    this.itemSelect = "#list-item-70-0"
    this.publishFormTelephone = "#publishFormTelephone"
    this.publishFormPublishButton = "#publishFormPublishButton"

    this.localitySelectorItem = ".v-list-item"

  }

  async createAdvert(assetImage, isOffer, title, description, localityIndex, telephone) {
    
    this.page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    await page.goto(this.url);
    await page.click(this.newAdvertButton)
    
    await page.waitForTimeout(2000)

    await page.waitForSelector(this.employeSelectorPrefix + "employ")
    await page.click(this.employeSelectorPrefix + "employ")

    await page.waitForTimeout(2000)

    await page.waitForSelector(this.employeSelectorPrefix + "farming")
    await page.click(this.employeSelectorPrefix + "farming")

    await page.waitForTimeout(2000)

    if (assetImage) {
      const element = await page.waitForSelector(this.newAdvertImageDragAndDrop)
      await page.waitForTimeout(1000)

      const input = await element.$("input[type=file]")

      try {

        await input.uploadFile(this.assetsFolder + "\\" + assetImage)
      } catch (error) {
        console.log(error)
      }

      await page.waitForTimeout(1000)
    }

    if (isOffer) {
      await page.click(this.publishTypeOffer)
    } else {
      await page.click(this.publishTypeDemand)
    }

    await page.focus(this.publishFormTitle)
    await page.keyboard.type(title)

    await page.focus(this.publishFormDescription)
    await page.keyboard.type(description)

    if (localityIndex) {
      await page.click(this.publishFormLocalitySelector)
      await page.waitForTimeout(1000)

      await page.click(this.localitySelectorItem+":nth-child(" + localityIndex +")")
    }
    await page.waitForTimeout(1000)

    await page.focus(this.publishFormTelephone)
    await page.keyboard.type(telephone)

    await page.waitForTimeout(1000)
    await page.click(this.publishFormPublishButton)

  }
}


module.exports = ( page ) => new userAccount( page );
