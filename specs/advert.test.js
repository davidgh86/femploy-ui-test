let credentials = require( '../utils/credentials' );
let createAccount = require( '../actions/createAccount' );
let loginAccount = require( '../actions/loginAccount' );
let userAccount = require( '../actions/userAccount' );
let commonAction = require('../actions/commonAction');
let advertAccount = require('../actions/advertAccount');

let credential
let createAccountService
let loginAccountService
let userAccountService
let commonActionService
let advertAccountService

let logInIfNotLogged
let logOutIfLogged

jest.setTimeout(60000);

describe('Basic authentication e2e tests', () => {
  beforeAll( async () => {
  // Set a definite site for the page viewport so view is consistent across browsers
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );
		
    this.credential = credentials();	
    this.createAccountService = await createAccount( page );
    this.loginAccountService = await loginAccount( page );
    this.userAccountService = await userAccount(page)
    this.commonActionService = await commonAction(page);
    this.advertAccountService = await advertAccount(page);

    this.logInIfNotLogged = async () => {
      if (! await this.commonActionService.isLoggedIn()) {
        await this.loginAccountService.login(this.credential.email, this.credential.password);
      }
    }
    
    this.logOutIfLogged = async () => {
      if (await this.commonActionService.isLoggedIn()) {
        await this.userAccountService.logout();
      }
    }

    await page.goto("http://localhost:8080")

    await page.waitForTimeout(2000)

    await this.createAccountService.signup( this.credential.username, this.credential.email, this.credential.password );

  } );

  it( 'Should be able to create an advert if logged', async () => {
    await this.logInIfNotLogged();
    expect(await this.commonActionService.isLoggedIn()).toBe(true)
    await this.advertAccountService.createAdvert("FYCZ-ljX0AE4eXW.jpg", true, "title", "description", 3, "123456789")
  });
  

} );