# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\endToEndShoppingFlow.spec.ts >> @master End-to-End Shopping Flow >> complete customer shopping journey
- Location: tests\web\endToEndShoppingFlow.spec.ts:4:7

# Error details

```
TypeError: Cannot read properties of undefined (reading 'locator')
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |     readonly page: Page;
  5  | 
  6  |     constructor(page: Page) {
  7  |         this.page = page;
  8  |     }
  9  | 
  10 |     // Locators
> 11 |     readonly myAccountDropdown = this.page.locator('#top-links .dropdown-toggle');
     |                                            ^ TypeError: Cannot read properties of undefined (reading 'locator')
  12 |     readonly registerLink = this.page.locator('text=Register');
  13 |     readonly loginLink = this.page.locator('text=Login');
  14 |     readonly logoutLink = this.page.locator('text=Logout');
  15 |     readonly searchInput = this.page.locator('#search input[name="search"]');
  16 |     readonly searchButton = this.page.locator('#search button');
  17 |     readonly cartButton = this.page.locator('#cart');
  18 |     readonly welcomeMessage = this.page.locator('.text-success');
  19 | 
  20 |     // Actions
  21 |     async navigateToHomePage() {
  22 |         await this.page.goto(process.env.WEB_APP_URL!);
  23 |     }
  24 | 
  25 |     async clickMyAccount() {
  26 |         await this.myAccountDropdown.click();
  27 |     }
  28 | 
  29 |     async clickRegister() {
  30 |         await this.registerLink.click();
  31 |     }
  32 | 
  33 |     async clickLogin() {
  34 |         await this.loginLink.click();
  35 |     }
  36 | 
  37 |     async clickLogout() {
  38 |         await this.logoutLink.click();
  39 |     }
  40 | 
  41 |     async searchProduct(productName: string) {
  42 |         await this.searchInput.fill(productName);
  43 |         await this.searchButton.click();
  44 |     }
  45 | 
  46 |     async goToCart() {
  47 |         await this.cartButton.click();
  48 |     }
  49 | 
  50 |     // Verifications
  51 |     async verifyWelcomeMessage(message: string) {
  52 |         await expect(this.welcomeMessage).toContainText(message);
  53 |     }
  54 | 
  55 |     async verifyPageTitle(title: string) {
  56 |         await expect(this.page).toHaveTitle(title);
  57 |     }
  58 | }
```