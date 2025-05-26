import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'
import { waitTimes } from '../../../utils/selectors-file'

test.describe.serial('coworkers access', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({
      storageState: configData.adminStorageEditor
    })
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('TC-USER-00_No access to coworker management', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)

    //Check that the employee management button is not visible
    await expect(page.getByText('StargazerParisInteractive')).toBeVisible();
    await expect(page.getByLabel('Manage coworkers')).not.toBeVisible()

    console.log('✅ Test TC-USER-00 successful: Management is not accessible as an editor.')
  })
})