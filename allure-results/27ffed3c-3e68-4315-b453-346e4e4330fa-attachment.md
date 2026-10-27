# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\login-data-driven.spec.ts >> Login Data Driven - Valid login [row 1] @datadriven @master @web
- Location: tests\web\login-data-driven.spec.ts:29:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - navigation [ref=f3e2]:
    - generic [ref=f3e3]:
      - button "$ Currency " [ref=f3e7] [cursor=pointer]:
        - strong [ref=f3e8]: $
        - text: Currency
        - generic [ref=f3e9]: 
      - list [ref=f3e11]:
        - listitem [ref=f3e12]:
          - link "" [ref=f3e13] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f3e15]:
          - link " My Account" [ref=f3e16] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/account
            - generic [ref=f3e17]: 
            - text: My Account
        - listitem [ref=f3e19]:
          - link " Wish List (0)" [ref=f3e20] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/wishlist
            - generic [ref=f3e21]: 
            - text: Wish List (0)
        - listitem [ref=f3e22]:
          - link " Shopping Cart" [ref=f3e23] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=checkout/cart
            - generic [ref=f3e24]: 
            - text: Shopping Cart
        - listitem [ref=f3e25]:
          - link " Checkout" [ref=f3e26] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=checkout/checkout
            - generic [ref=f3e27]: 
            - text: Checkout
  - banner [ref=f3e28]:
    - generic [ref=f3e30]:
      - link [ref=f3e33] [cursor=pointer]:
        - /url: http://localhost/opencart/index.php?route=common/home
        - img "Your Store" [ref=f3e34]
      - generic [ref=f3e36]:
        - textbox "Search" [ref=f3e37]
        - button "" [ref=f3e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f3e43] [cursor=pointer]:
        - generic [ref=f3e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f3e46]:
    - generic: 
    - list [ref=f3e48]:
      - listitem [ref=f3e49]:
        - link "Desktops" [ref=f3e50] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=20
      - listitem [ref=f3e51]:
        - link "Laptops & Notebooks" [ref=f3e52] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=18
      - listitem [ref=f3e53]:
        - link "Components" [ref=f3e54] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=25
      - listitem [ref=f3e55]:
        - link "Tablets" [ref=f3e56] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=57
      - listitem [ref=f3e57]:
        - link "Software" [ref=f3e58] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=17
      - listitem [ref=f3e59]:
        - link "Phones & PDAs" [ref=f3e60] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=24
      - listitem [ref=f3e61]:
        - link "Cameras" [ref=f3e62] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=33
      - listitem [ref=f3e63]:
        - link "MP3 Players" [ref=f3e64] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=product/category&path=34
  - generic [ref=f3e65]:
    - list [ref=f3e66]:
      - listitem [ref=f3e67]:
        - link "" [ref=f3e68] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=common/home
      - listitem [ref=f3e70]:
        - link "Account" [ref=f3e71] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=account/account
      - listitem [ref=f3e72]:
        - link "Login" [ref=f3e73] [cursor=pointer]:
          - /url: http://localhost/opencart/index.php?route=account/login
    - generic [ref=f3e74]:
      - generic [ref=f3e75]: 
      - text: "Warning: No match for E-Mail Address and/or Password."
    - generic [ref=f3e76]:
      - generic [ref=f3e78]:
        - generic [ref=f3e80]:
          - heading "New Customer" [level=2] [ref=f3e81]
          - paragraph [ref=f3e82]:
            - strong [ref=f3e83]: Register Account
          - paragraph [ref=f3e84]: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
          - link "Continue" [ref=f3e85] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/register
        - generic [ref=f3e87]:
          - heading "Returning Customer" [level=2] [ref=f3e88]
          - paragraph [ref=f3e89]:
            - strong [ref=f3e90]: I am a returning customer
          - generic [ref=f3e91]:
            - generic [ref=f3e92]:
              - generic [ref=f3e93]: E-Mail Address
              - textbox "E-Mail Address" [ref=f3e94]: pavanol@xyz.com
            - generic [ref=f3e95]:
              - generic [ref=f3e96]: Password
              - textbox "Password" [ref=f3e97]: test@123
              - link "Forgotten Password" [ref=f3e98] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/forgotten
            - button "Login" [ref=f3e99] [cursor=pointer]
      - complementary [ref=f3e100]:
        - generic [ref=f3e101]:
          - link "Login" [ref=f3e102] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/login
          - link "Register" [ref=f3e103] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/register
          - link "Forgotten Password" [ref=f3e104] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/forgotten
          - link "My Account" [ref=f3e105] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/account
          - link "Address Book" [ref=f3e106] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/address
          - link "Wish List" [ref=f3e107] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/wishlist
          - link "Order History" [ref=f3e108] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/order
          - link "Downloads" [ref=f3e109] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/download
          - link "Recurring payments" [ref=f3e110] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/recurring
          - link "Reward Points" [ref=f3e111] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/reward
          - link "Returns" [ref=f3e112] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/return
          - link "Transactions" [ref=f3e113] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/transaction
          - link "Newsletter" [ref=f3e114] [cursor=pointer]:
            - /url: http://localhost/opencart/index.php?route=account/newsletter
  - contentinfo [ref=f3e115]:
    - generic [ref=f3e116]:
      - generic [ref=f3e117]:
        - generic [ref=f3e118]:
          - heading "Information" [level=5] [ref=f3e119]
          - list [ref=f3e120]:
            - listitem [ref=f3e121]:
              - link "About Us" [ref=f3e122] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=f3e123]:
              - link "Delivery Information" [ref=f3e124] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=f3e125]:
              - link "Privacy Policy" [ref=f3e126] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=f3e127]:
              - link "Terms & Conditions" [ref=f3e128] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/information&information_id=5
        - generic [ref=f3e129]:
          - heading "Customer Service" [level=5] [ref=f3e130]
          - list [ref=f3e131]:
            - listitem [ref=f3e132]:
              - link "Contact Us" [ref=f3e133] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/contact
            - listitem [ref=f3e134]:
              - link "Returns" [ref=f3e135] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/return/add
            - listitem [ref=f3e136]:
              - link "Site Map" [ref=f3e137] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=information/sitemap
        - generic [ref=f3e138]:
          - heading "Extras" [level=5] [ref=f3e139]
          - list [ref=f3e140]:
            - listitem [ref=f3e141]:
              - link "Brands" [ref=f3e142] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=product/manufacturer
            - listitem [ref=f3e143]:
              - link "Gift Certificates" [ref=f3e144] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/voucher
            - listitem [ref=f3e145]:
              - link "Affiliate" [ref=f3e146] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=affiliate/login
            - listitem [ref=f3e147]:
              - link "Specials" [ref=f3e148] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=product/special
        - generic [ref=f3e149]:
          - heading "My Account" [level=5] [ref=f3e150]
          - list [ref=f3e151]:
            - listitem [ref=f3e152]:
              - link "My Account" [ref=f3e153] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/account
            - listitem [ref=f3e154]:
              - link "Order History" [ref=f3e155] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/order
            - listitem [ref=f3e156]:
              - link "Wish List" [ref=f3e157] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/wishlist
            - listitem [ref=f3e158]:
              - link "Newsletter" [ref=f3e159] [cursor=pointer]:
                - /url: http://localhost/opencart/index.php?route=account/newsletter
      - separator [ref=f3e160]
      - paragraph [ref=f3e161]:
        - text: Powered By
        - link "OpenCart" [ref=f3e162] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: Your Store © 2026
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Login Flow (Data Driven using External File)
  3  |  *
  4  |  * Tags: @master @datadriven @regression
  5  |  *
  6  |  * Steps:
  7  |  * 1) Load test data from external file
  8  |  * 2) For each row, create an independent test
  9  |  * 3) Open the application
  10 |  * 4) Enter email and password from data row
  11 |  * 5) Submit the login form
  12 |  * 6) Validate result based on expected value
  13 |  */
  14 | 
  15 | import { test, expect } from '../../fixtures/pageFixtures';
  16 | import { DataProvider } from '../../utils/DataReader';
  17 | import path from 'path';
  18 | 
  19 | interface LoginDataRow {
  20 |     testName: string;
  21 |     email: string;
  22 |     password: string;
  23 |     expected: string;
  24 | }
  25 | 
  26 | const loginData: LoginDataRow[] = DataProvider.readJson(path.resolve(__dirname, '../../testdata/opencart_logindata.json'));
  27 | 
  28 | loginData.forEach((data, index) => {
  29 |     test(`Login Data Driven - ${data.testName} [row ${index + 1}] @datadriven @master @web`, async ({ homePage, loginPage, myAccountPage }) => {
  30 | 
  31 |         await test.step('1) Open the application and navigate to login', async () => {
  32 |             await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
  33 |             await homePage.clickMyAccount();
  34 |             await homePage.clickLogin();
  35 |         });
  36 | 
  37 |         await test.step('2) Enter credentials from test data', async () => {
  38 |             const email = data.email.trim();
  39 |             const password = data.password.trim();
  40 | 
  41 |             if (email) {
  42 |                 await loginPage.setEmail(email);
  43 |             }
  44 |             if (password) {
  45 |                 await loginPage.setPassword(password);
  46 |             }
  47 |         });
  48 | 
  49 |         await test.step('3) Submit the login form', async () => {
  50 |             await loginPage.clickLogin();
  51 |         });
  52 | 
  53 |         await test.step('4) Validate the result', async () => {
  54 |             if (data.expected === 'success') {
  55 |                 const isMyAccount = await myAccountPage.isMyAccountPageExists();
> 56 |                 expect(isMyAccount).toBeTruthy();
     |                                     ^ Error: expect(received).toBeTruthy()
  57 |             } else {
  58 |                 const isWarning = await loginPage.isWarningMessageVisible();
  59 |                 expect(isWarning).toBeTruthy();
  60 | 
  61 |                 const warningText = await loginPage.getWarningMessage();
  62 |                 expect(warningText).toContain('Warning');
  63 |             }
  64 |         });
  65 | 
  66 |         console.log(`✅ Login Data Driven - ${data.testName} completed!`);
  67 |     });
  68 | });
```