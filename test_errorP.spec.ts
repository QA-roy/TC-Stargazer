import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'

test.describe.serial('error message', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({
      storageState: configData.adminStoragePresenter
    })
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('TC-SA-00_Search by universe name, this universe does not exist yet', async () => {
    await page.goto(configData.adminUrl)
    await page.getByRole('button', { name: 'Interactive room' }).click()
    await page.getByRole('menuitem', { name: 'Lobby' }).click()
    await page.getByLabel('Show input').click()
    await page.getByPlaceholder('Search').fill('z')
    await expect(page.getByRole('img', { name: 'Cat hugging a file icon' })).toBeVisible()
    await expect(page.getByText('You don\'t have any Universe')).toBeVisible()

    await page.waitForTimeout(1000)
    await expect(page.getByRole('button', { name: 'Create a Universe' })).not.toBeVisible()

    console.log('✅ TC-SA-00 successful: The Add button is not visible for a presenter user')
  })

  test('TC-SA-00_Search by asset name, this assets does not exist yet', async () => {
    await page.goto(configData.adminUrl)
    await page.getByRole('button', { name: 'Interactive room' }).click()
    await page.getByRole('menuitem', { name: 'Lobby' }).click()
    await page.getByRole('button', { name: 'Assets' }).click()
    await page.getByLabel('Show input').click()
    await page.getByPlaceholder('Search').fill('w456')
    await expect(page.getByRole('img', { name: 'Worker taking care of files' })).toBeVisible()
    await expect(page.getByText('No assets found')).toBeVisible()

    await page.waitForTimeout(1000)
    await expect(page.getByRole('button', { name: 'Add an Asset' })).not.toBeVisible()

    console.log('✅ TC-SA-00 successful: The Add button is not visible for a presenter user')
  })
})
