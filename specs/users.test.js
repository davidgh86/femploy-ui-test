let credentials = require( '../utils/credentials' );
let createAccount = require( '../actions/createAccount' );
let loginAccount = require( '../actions/loginAccount' );
let userAccount = require( '../actions/userAccount' );

jest.setTimeout(60000);

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
    createAccount = await createAccount( page );
    loginAccount = await loginAccount( page );
    userAccount = await userAccount(page)
  } );
	
  it( 'Should be able to create an account', async () => {
    let signedIn = await createAccount.signup( credential.username, credential.email, credential.password );
    expect(signedIn).toBe(true)
  });

  it( 'Should be able to logout', async () => {
    let loggedOut = await userAccount.logout();
    expect(loggedOut).toBe(true)
  });

  it( 'Should be able to login', async () => {
    let loggedIn = await loginAccount.login(credential.email, credential.password);
    expect(loggedIn).toBe(true)
  });


  // it( 'Should be able to log in after a successful account creation', async () => {
  //   const firstname = await loginAccount.login( credential.username, credential.password );
  //   page.waitForTimeout( 1000 );
  //   expect( credential.fullname ).toContain( firstname );
  // } );

  // it( 'Should not login on wrong credentials', async () => {
  //   try {
  //     page.on( 'dialog', dialog => {
  //       expect( dialog.message() ).toBe( 'Invalid username or password inputted' );
  //       dialog.accept();
  //     });

  //     await page.goto( 'http://127.0.0.1:50708/login.html' );
  //     await page.type( '#username', 'username' );
  //     await page.type( '#password', 'password' );
  //     await page.click( '#loginBtn' );
  //     await page.waitForTimeout(5000) //Wait for the dialog to accept the prompt before proceeding

  //   } catch(err){
  //     console.log("An error occured while trying to login => ", err)
  //   }
  // })
} );