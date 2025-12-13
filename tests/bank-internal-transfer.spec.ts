import { test, expect } from '@playwright/test';

test('Bank Internal Transfer', async ({ page }) => { 
  await page.goto('https://keycloak-dev.logistical.one/realms/lq/protocol/openid-connect/auth?client_id=loglines-fe&redirect_uri=https%3A%2F%2Fstg-limajari.loglines.ai%2F%23%2Flogin%3F&state=6b2b6c5b-145e-47d8-b48c-6e7ce3eeb0ef&response_mode=fragment&response_type=code&scope=openid&nonce=824980c6-217a-4551-934d-0a778645722f&code_challenge=Q_mRuyQBU7DvJdx0qaLKvE4rL21m4a-IECDMGc5TRRs&code_challenge_method=S256');
  await page.locator('input[name="username"]').fill('devonebyone');
  await page.locator('input[name="password"]').fill('Qq121212');
  await page.getByRole('button', { name: 'LOGIN TO PORTAL' }).click();
  // await page.goto('https://stg-limajari.loglines.ai/#/quotes?&state=undefined');
  await page.locator('.ri-bank-line').click();
  await page.locator('button:text("CREATE TRANSACTION")').click({ force: true });

  // await page.locator('button span:text("CREATE TRANSACTION")').click();

  // await page.locator('button[button-id="dropdownTopButton"]').click();

  // await page.locator('button:has-text("CREATE TRANSACTION")').click();
  // await page.getByRole('button', { name: 'CREATE TRANSACTION' }).click();
  // await page.getByRole('button', { name: 'CREATE TRANSACTION ' }).click();
  await page.getByText('Bank Internal Transfer').click();
  await page.locator('.css-ruu8uh-indicatorContainer').first().click();
  await page.getByRole('option', { name: 'IDR' }).click();
  await page.locator('div').filter({ hasText: "Select Payment Account" }).nth(1).click();
  await expect(page.getByText('(1-10-01) - Cash IDR')).toBeVisible();
  await page.getByRole('option', { name: '(1-10-01) - Cash IDR' }).click();
  await page.locator('div').filter({ hasText: "Select Payment Account" }).nth(2).click();
  await page.getByRole('option', { name: '(1-10-02) - Current - BCA -' }).click();
  await page.getByRole('textbox', { name: '0,00' }).fill('10000');
  await page.getByRole('textbox', { name: 'Add Internal Notes' }).fill('please check');
  await expect(page.locator('form')).toMatchAriaSnapshot(`- text: /Rp\\. \\d+\\.\\d+,\\d+/`);
  await page.getByRole('button', { name: 'CREATE TRANSACTION' }).click();
  await expect(page.getByTestId('SUCCESS_TOAST').getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: "/New Transaction \\"Internal Transfer #\\\\d+-\\\\d+\\" has been created\\\\./"`);
  await expect(page.locator('#root')).toMatchAriaSnapshot(`- text: CLOSED`);
  await expect(page.locator('#root')).toMatchAriaSnapshot(`- text: /Total Amount \\(IDR\\) Rp\\. \\d+\\.\\d+,\\d+/`);
  
});