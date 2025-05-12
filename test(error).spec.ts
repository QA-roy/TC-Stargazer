import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData, routes } from '../mock/data'
import { expectURL } from '../utils/result'
import { locator } from '../utils/ui'
import { selectors } from '../utils/global-selectors'


test.describe.serial('error message', () => {
    let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({
      storageState: configData.adminStorage
    })
  })

  test.afterAll(async () => {
    await page.close()
  })

   test('TC-UNIV-015_Create a new universe with name existant', async () => {
    await page.goto(configData.adminUrl);
    await page.getByText('addNew Universe').click();
    await page.getByLabel('Name *').fill('Arab+');
    await page.getByText('Create', { exact: true }).click();
    await expect(page.getByText('This name is already taken')).toBeVisible();  
  })
  
  test('TC-SA-00_Asset existing', async () => {
    await page.goto(configData.adminUrl);
    await page.getByRole('button', { name: 'Assets' }).click();
    await page.locator('.assets-list-table__add-button').click();
    await page.getByLabel('Name *').fill('A');
    await page.getByLabel('Select a layer *').click();
    await page.getByRole('option', { name: 'Star' }).locator('div').first().click();
    await page.getByLabel('Select a type *').click();
    await page.getByRole('option', { name: 'Image' }).locator('div').first().click();
    await page.getByLabel('URL *').click();
    await page.getByLabel('URL *').fill('https://unsplash.com/fr/photos/une-image-floue-de-cubes-sur-fond-rose-et-bleu-mKG3nYgEVIY');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('A');
    await page.getByText('Create', { exact: true }).click();
    await expect(page.getByText('This URL already exists in assets libraryclose')).toBeVisible();
  })
  
  //Not finish scribe this test
  //test('TC-SA-25_Modified role users exist', async () => {
   // await page.goto(configData.adminUrl);
   // await page.getByLabel('Manage coworkers').click();
   // await expect(page.getByText('Manage coworkers')).toBeVisible();
    //await page.waitForTimeout(1000);
 // })
  
  //No visible error message 
  //test('TC-SA-00_Manage coworkers not exist or invalid email', async () => {
    //await page.goto(configData.adminUrl);
    //await page.getByLabel('Manage coworkers').click();
    //await expect(page.getByText('Manage coworkers')).toBeVisible();
    //await page.waitForTimeout(1000);
    //await page.getByPlaceholder('Add new people and groups').fill('fdqq');
    //await page.getByText('Ok', { exact: true }).click();
    //await expect(page.getByText('Invalid email')).toBeVisible();
  //})
  
  test('TC-SA-00_Search by universe name, this universe does not exist yet', async () => {
    await page.goto(configData.adminUrl);
    await page.getByRole('button', { name: 'Interactive room' }).click();
    await page.getByRole('menuitem', { name: 'Lobby' }).click();
    await page.getByLabel('Show input').click();
    await page.getByPlaceholder('Search').fill('z');
    await expect(page.getByRole('img', { name: 'Cat hugging a file icon' })).toBeVisible();
    await expect(page.getByText('You don\'t have any Universe')).toBeVisible();
  })

  test('TC-SA-00_Search by asset name, this assets does not exist yet', async () => {
    await page.goto(configData.adminUrl);
    await page.getByRole('button', { name: 'Interactive room' }).click();
    await page.getByRole('menuitem', { name: 'Lobby' }).click();
    await page.getByRole('button', { name: 'Assets' }).click();
    await page.getByLabel('Show input').click();
    await page.getByPlaceholder('Search').fill('w456');
    await expect(page.getByRole('img', { name: 'Worker taking care of files' })).toBeVisible();
    await expect(page.getByText('No assets found')).toBeVisible();
  })

})