const credentials = require( '../utils/credentials' );
const createAccount = require( '../actions/createAccount' );
const loginAccount = require( '../actions/loginAccount' );
const userAccount = require( '../actions/userAccount' );
const commonAction = require('../actions/commonAction');

jest.setTimeout(120000);

let credential
let createAccountService
let loginAccountService
let userAccountService
let commonActionService

let logInIfNotLogged
let logOutIfLogged

describe('Basic authentication e2e tests', () => {

  let credential;
  beforeAll( async () => {
  // Set a definite site for the page viewport so view is consistent across browsers
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );

    page.goto("http://localhost:8080")
    page.waitForTimeout(2000)
		
    this.credential = credentials();	
    this.createAccountService = await createAccount( page );
    this.loginAccountService = await loginAccount( page );
    this.userAccountService = await userAccount(page)
    this.commonActionService = await commonAction(page);

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
    
    await this.logOutIfLogged()
    await this.createAccountService.signup( this.credential.username, this.credential.email, this.credential.password );
    let isLoggedIn = await this.commonActionService.isLoggedIn()
    expect(isLoggedIn).toBe(true)
    await this.userAccountService.logout();
    await page.waitForTimeout(2000);
  });

  it( 'Should be able to logout', async () => {
    await this.logInIfNotLogged()
    await this.userAccountService.logout();
    let isLoggedIn = await this.commonActionService.isLoggedIn()
    expect(isLoggedIn).toBe(false)
  });


  it( 'Should not be able to login', async () => {
    await this.logOutIfLogged()
    await this.loginAccountService.login(this.credential.email, this.credential.password+"wrongpassword");
    let alertMessage = await this.commonActionService.checkAlertMessage()
    let isLoggedIn = await this.commonActionService.isLoggedIn()
    expect(alertMessage).toBe("\"notValidCredentials\"")
    expect(isLoggedIn).toBe(false)
  });

} );