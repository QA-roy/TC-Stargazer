import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'
import { pageSelectors, roomNames } from '../../../utils/selectors-file'

test.describe.serial('Admin', () => {
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

  test('TC-SPAC-001.1_Select room Lobby and verify universes', async () => {
    await page.goto(configData.adminUrl)
    await page.click(pageSelectors.interactiveRoomButton)
    await page.getByRole('menuitem', { name: roomNames.lobby }).click()
    await page.waitForTimeout(1000)
    // Verify that the URL corresponds to Lobby
    await expect(page).toHaveURL(/\/paris\/lobby\/?$/)

    console.log('✅ Test TC-SPAC-001.1 successful: the "Lobby" room has been selected and the URL is correct.')
  })

  test('TC-SPAC-001.2_Select room Loggia and verify universes', async () => {
    await page.goto(configData.adminUrl)
    await page.click(pageSelectors.interactiveRoomButton)
    await page.getByRole('menuitem', { name: roomNames.loggia }).click()
    await page.waitForTimeout(1000)
    // Verify that the URL corresponds to Loggia
    await expect(page).toHaveURL(/\/paris\/loggia\/?$/)

    console.log('✅ Test TC-SPAC-001.2 successful: the "Loggia" room has been selected and the URL is correct.')
  })
})
