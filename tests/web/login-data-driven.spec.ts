/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @regression
 *
 * Steps:
 * 1) Load test data from external file
 * 2) For each row, create an independent test
 * 3) Open the application
 * 4) Enter email and password from data row
 * 5) Submit the login form
 * 6) Validate result based on expected value
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';
import path from 'path';

interface LoginDataRow {
    testName: string;
    email: string;
    password: string;
    expected: string;
}

const loginData: LoginDataRow[] = DataProvider.readJson(path.resolve(__dirname, '../../testdata/opencart_logindata.json'));

loginData.forEach((data, index) => {
    test(`Login Data Driven - ${data.testName} [row ${index + 1}] @datadriven @master @web`, async ({ homePage, registerPage, successPage, logoutPage, loginPage, myAccountPage }) => {
        const isSuccessCase = data.expected === 'success';
        const email = isSuccessCase ? RandomDataUtil.getUniqueEmail() : data.email.trim();
        const password = isSuccessCase ? RandomDataUtil.getPassword(12) : data.password.trim();

        await test.step('1) Open the application and navigate to login', async () => {
            await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
            if (isSuccessCase) {
                await homePage.clickMyAccount();
                await homePage.clickRegister();
                await registerPage.completeRegistration(
                    RandomDataUtil.getFirstName(),
                    RandomDataUtil.getLastName(),
                    email,
                    RandomDataUtil.getPhoneNumber(),
                    password,
                );
                await successPage.clickContinue();
                await myAccountPage.clickLogout();
                await logoutPage.clickContinue();
            }
            await homePage.clickMyAccount();
            await homePage.clickLogin();
        });

        await test.step('2) Enter credentials from test data', async () => {
            const entryEmail = email.trim();
            const entryPassword = password.trim();

            if (entryEmail) {
                await loginPage.setEmail(entryEmail);
            }
            if (entryPassword) {
                await loginPage.setPassword(entryPassword);
            }
        });

        await test.step('3) Submit the login form', async () => {
            await loginPage.clickLogin();
        });

        await test.step('4) Validate the result', async () => {
            if (isSuccessCase) {
                const isMyAccount = await myAccountPage.isMyAccountPageExists();
                expect(isMyAccount).toBeTruthy();
            } else {
                const isWarning = await loginPage.isWarningMessageVisible();
                expect(isWarning).toBeTruthy();

                const warningText = await loginPage.getWarningMessage();
                expect(warningText).toContain('Warning');
            }
        });

        console.log(`✅ Login Data Driven - ${data.testName} completed!`);
    });
});