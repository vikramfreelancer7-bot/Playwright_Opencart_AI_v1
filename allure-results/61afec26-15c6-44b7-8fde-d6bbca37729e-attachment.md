# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\endToEndShoppingFlow.spec.ts >> End-to-End Shopping Flow >> complete customer shopping journey @master @end-to-end
- Location: tests\web\endToEndShoppingFlow.spec.ts:6:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.isVisible: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { Locator, Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |     private readonly emailInput: Locator;
  5  |     private readonly passwordInput: Locator;
  6  |     private readonly loginButton: Locator;
  7  |     private readonly errorMessage: Locator;
  8  | 
  9  |     constructor(page: Page) {
  10 |         this.emailInput = page.getByPlaceholder('E-Mail Address');
  11 |         this.passwordInput = page.getByPlaceholder('Password', { exact: true });
  12 |         this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  13 |         this.errorMessage = page.locator('.alert-danger');
  14 |     }
  15 | 
  16 |     /**
  17 |      * Submits the login form.
  18 |      * @param email - Registered customer email
  19 |      * @param password - Registered customer password
  20 |      */
  21 |     async login(email: string, password: string): Promise<void> {
  22 |         await this.emailInput.fill(email);
  23 |         await this.passwordInput.fill(password);
  24 |         await this.loginButton.click();
  25 |     }
  26 | 
  27 |     /**
  28 |      * Returns a visible login error message, or an empty string when none is shown.
  29 |      */
  30 |     async getLoginErrorMessage(): Promise<string> {
> 31 |         if (!(await this.errorMessage.isVisible())) {
     |                                       ^ Error: locator.isVisible: Target page, context or browser has been closed
  32 |             return '';
  33 |         }
  34 | 
  35 |         return (await this.errorMessage.innerText()).trim();
  36 |     }
  37 | }
```