import { type Browser, type Page, test } from '@playwright/test'
import { configData } from '../../mock/data'
import { chromium } from 'playwright-extra'
import { expectURL, verifyFullscreen } from '../../utils/result'
import { navigateStargazer } from '../../utils/auth'
import { locator, waitForLoading } from '../../utils/ui'
import { selectors } from '../../utils/global-selectors'

const screenNumber = 2
const cloudSpace = 'Paris'
const workSpace = 'Interactive Room'

test.describe.serial('Interface screen management ', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({ storageState: configData.stargazerStorage })
    await page.goto(configData.stargazerUrl)
    await navigateStargazer(page, screenNumber.toString(), cloudSpace, workSpace)
  })

  test.afterEach(async () => {
    page.close()
  })

  test('TC-ECRA-001_STARGAZER - Reset configuration', async () => {
    page.locator(selectors.universeItem)

    await locator(page, selectors.bigBangMenu)
    await waitForLoading(page)
    await locator(page, selectors.resetButton)
    await expectURL(page, configData.stargazerUrl)

    console.log('STARGAZER reset configuration test completed successfully')
  })

  test('TC-ECRA-002_Fullscreen', async () => {
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    await locator(page, selectors.bigBangMenu)
    await locator(page, selectors.fullscreenButton)
    await waitForLoading(page)

    await verifyFullscreen(page)

    console.log('Fullscreen test completed successfully')
  })

  test('TC-ECRA-003_Loading elements', async () => {
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    page.locator(selectors.bigBangMenu)
    page.locator(selectors.background)
    page.locator(selectors.content)

    console.log('Loading elements test completed successfully')
  })
})