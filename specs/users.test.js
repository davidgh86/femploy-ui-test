let credentials = require( '../utils/credentials' );
let createAccount = require( '../actions/createAccount' );
let loginAccount = require( '../actions/loginAccount' );
let userAccount = require( '../actions/userAccount' );
let commonAction = require('../actions/commonAction');

jest.setTimeout(120000);

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
		
    credential = credentials();	
    createAccount = await createAccount( page );
    loginAccount = await loginAccount( page );
    userAccount = await userAccount(page)
    commonAction = await commonAction(page);

    let logInIfNotLogged = async () => {
      if (! await commonAction.isLoggedIn()) {
        await loginAccount.login(credential.email, credential.password);
      }
    }
    
    let logOutIfLogged = async () => {
      if (await commonAction.isLoggedIn()) {
        await userAccount.logout();
      }
    }
    
    logOutIfLogged()
    await createAccount.signup( credential.username, credential.email, credential.password );
    let isLoggedIn = await commonAction.isLoggedIn()
    expect(isLoggedIn).toBe(true)
    await userAccount.logout();
    await page.waitForTimeout(2000);
  });
	
  // it( 'Should be able to create an account', async () => {
  //   logOutIfLogged()
  //   await createAccount.signup( credential.username, credential.email, credential.password );
  //   let isLoggedIn = await commonAction.isLoggedIn()
  //   expect(isLoggedIn).toBe(true)
  //   await userAccount.logout();
  //   isLoggedIn = await commonAction.isLoggedIn()
  //   expect(isLoggedIn).toBe(false)
  //   await loginAccount.login(credential.email, credential.password);
  //   isLoggedIn = await commonAction.isLoggedIn()
  //   expect(isLoggedIn).toBe(true)
  //   await userAccount.logout();
  //   isLoggedIn = await commonAction.isLoggedIn()
  //   expect(isLoggedIn).toBe(false)
  // });

  it( 'Should be able to logout', async () => {
    logInIfNotLogged()
    await userAccount.logout();
    let isLoggedIn = await commonAction.isLoggedIn()
    expect(isLoggedIn).toBe(false)
  });


  it( 'Should not be able to login', async () => {
    logOutIfLogged()
    await loginAccount.login(credential.email, credential.password+"wrongpassword");
    let alertMessage = await commonAction.checkAlertMessage()
    let isLoggedIn = await commonAction.isLoggedIn()
    expect(alertMessage).toBe("\"notValidCredentials\"")
    expect(isLoggedIn).toBe(false)
  });

} );