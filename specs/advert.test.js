let credentials = require( '../utils/credentials' );
let createAccount = require( '../actions/createAccount' );
let loginAccount = require( '../actions/loginAccount' );
let userAccount = require( '../actions/userAccount' );
let commonAction = require('../actions/commonAction');
let advertAccount = require('../actions/advertAccount')

jest.setTimeout(60000);

async function logInIfNotLogged() {
  if (! await commonAction.isLoggedIn()) {
    await loginAccount.login(credential.email, credential.password);
  }
}

async function logOutIfNotLogged() {
  if (await commonAction.isLoggedIn()) {
    await userAccount.logout();
  }
}

describe('Basic authentication e2e tests', () => {
  let credential;
  beforeAll( async () => {
  // Set a definite site for the page viewport so view is consistent across browsers
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );
		
    credential = credentials();	
    createAccount = await createAccount(page);
    loginAccount = await loginAccount(page);
    userAccount = await userAccount(page)
    commonAction = await commonAction(page);
    advertAccount = await advertAccount(page);

    await createAccount.signup( credential.username, credential.email, credential.password );
  } );

  it( 'Should be able to create an advert if logged', async () => {
    await logInIfNotLogged();
    expect(await commonAction.isLoggedIn()).toBe(true)
    await advertAccount.createAdvert("FYCZ-ljX0AE4eXW.jpg", true, "title", "description", 3, "123456789")
  });
  
	
  // it( 'Should be able to create an account', async () => {
  //   let signedIn = await createAccount.signup( credential.username, credential.email, credential.password );
  //   expect(signedIn).toBe(true)
  // });

  // it( 'Should be able to logout', async () => {
  //   let loggedOut = await userAccount.logout();
  //   expect(loggedOut).toBe(true)
  // });

  // it( 'Should be able to login', async () => {
  //   let loggedIn = await loginAccount.login(credential.email, credential.password);
  //   expect(loggedIn).toBe(true)
  //   await userAccount.logout();
  // });

  // it( 'Should not be able to login', async () => {
  //   await loginAccount.login(credential.email, credential.password+"wrongpassword");
  //   let alertMessage = await commonAction.checkAlertMessage()
  //   expect(alertMessage).toBe("\"notValidCredentials\"")
  // });

} );