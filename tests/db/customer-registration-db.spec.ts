import { test, expect } from '../../fixtures/pageFixtures';
import mysql from 'mysql2/promise';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Customer registration is consistent across frontend, admin, and MySQL @master @db', async ({ page, homePage, registerPage, successPage, adminLoginPage, adminCustomersPage, adminCustomerEditPage }) => {
    const customer = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: RandomDataUtil.getUniqueEmail(),
        telephone: RandomDataUtil.getPhoneNumber(),
        password: RandomDataUtil.getPassword(12),
    };

    await test.step('1) Register a unique customer through the frontend', async () => {
        await homePage.navigateTo(process.env.WEB_APP_URL || 'http://localhost/opencart/');
        await homePage.clickMyAccount();
        await homePage.clickRegister();

        const isRegisterPageVisible = await registerPage.isRegisterPageExists();
        expect(isRegisterPageVisible, 'Registration page was not displayed').toBeTruthy();

        await registerPage.completeRegistration(
            customer.firstName,
            customer.lastName,
            customer.email,
            customer.telephone,
            customer.password,
        );

        const isSuccessVisible = await successPage.isSuccessPageExists();
        expect(isSuccessVisible, 'Customer registration success page did not appear').toBeTruthy();

        const successHeading = await successPage.getSuccessHeadingText();
        expect(successHeading).toContain('Your Account Has Been Created!');
    });

    await test.step('2) Verify the customer in the admin portal', async () => {
        const adminUrl = process.env.ADMIN_APP_URL || 'http://localhost/opencart/admin/index.php';
        await page.goto(adminUrl);
        await adminLoginPage.login(process.env.ADMIN_USERNAME || 'admin', process.env.ADMIN_PASSWORD || 'admin');

        await adminCustomersPage.dismissSecurityModal();
        await adminCustomersPage.clickCustomersMenu();
        await adminCustomersPage.clickCustomersSubmenu();

        const isCustomersPageVisible = await adminCustomersPage.isCustomersPageExists();
        expect(isCustomersPageVisible, 'Admin Customers page was not displayed').toBeTruthy();

        await adminCustomersPage.searchCustomerByEmail(customer.email);
        const isCustomerVisible = await adminCustomersPage.isCustomerRowExists(customer.email);
        expect(isCustomerVisible, `Customer email ${customer.email} was not found in admin customers list`).toBeTruthy();

        await adminCustomersPage.clickEditCustomer(customer.email);
        const isCustomerEditVisible = await adminCustomerEditPage.isEditCustomerPageExists();
        expect(isCustomerEditVisible, 'Admin customer edit page was not displayed').toBeTruthy();

        expect(await adminCustomerEditPage.getFirstNameValue()).toBe(customer.firstName);
        expect(await adminCustomerEditPage.getLastNameValue()).toBe(customer.lastName);
        expect(await adminCustomerEditPage.getEmailValue()).toBe(customer.email);
        expect(await adminCustomerEditPage.getStatusValue()).toBe('1');
    });

    await test.step('3) Verify the customer record in MySQL', async () => {
        let connection;

        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_PORT || 3306),
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'opencart',
            });

            const [rows] = await connection.execute(
                'SELECT firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ? LIMIT 1',
                [customer.email],
            );

            expect(Array.isArray(rows), 'Database query did not return a result set').toBeTruthy();
            expect((rows as Array<Record<string, unknown>>).length, `Expected exactly one customer for ${customer.email} in MySQL`).toBe(1);

            const dbCustomer = (rows as Array<Record<string, unknown>>)[0];
            expect(dbCustomer.firstname, 'MySQL firstname does not match the registered customer').toBe(customer.firstName);
            expect(dbCustomer.lastname, 'MySQL lastname does not match the registered customer').toBe(customer.lastName);
            expect(dbCustomer.email, 'MySQL email does not match the registered customer').toBe(customer.email);
            expect(Number(dbCustomer.status), 'Customer status in MySQL is not enabled').toBe(1);
            expect(dbCustomer.date_added, 'MySQL date_added is missing').toBeTruthy();
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    });
});
