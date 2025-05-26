import { type Browser, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData, routes } from '../../mock/data'
import { expectURL } from '../../utils/result'
import { locator } from '../../utils/ui'
import { selectors } from '../../utils/global-selectors'

test.describe.serial('Interface authentication', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: true })
    page = await browser.newPage({
      storageState: configData.adminStorage
    })
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('TC-AUTH-003_Logout', async () => {
    await page.goto(configData.adminUrl)
    await locator(page, selectors.userMenuButton)
    await locator(page, selectors.signOutButton)

    await locator(page, selectors.loginButton)

    console.log('Logout test completed successfully')
  })

  test('TC-AUTH-004_Perssistent connection', async () => {
    await page.goto(configData.adminUrl)
    await expectURL(page, routes.adminHome)

    console.log('Persistent connection test completed successfully')
  })
})
