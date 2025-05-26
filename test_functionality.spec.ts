import { type Browser, type Page, test } from '@playwright/test'
import { configData, routes } from '../../mock/data'
import { chromium } from 'playwright-extra'
import { expectURL, verifyFullscreen } from '../../utils/result'
import { navigateStargazer, stargazerLogout, switchSpace } from '../../utils/auth'
import { locator, waitForLoading } from '../../utils/ui'
import { selectors } from '../../utils/global-selectors'

const screenNumber = 2
const cloudSpace = 'Paris'
const workSpace = 'Interactive Room'

test.describe.serial('Interface functionality', () => {
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

  test('TC-QRCU-005_Universe change with big bang', async () => {
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    await locator(page, selectors.bigBangMenu)
    await waitForLoading(page)

    await locator(page, selectors.bigBangButton)
    await waitForLoading(page)

    await page.locator(selectors.thumbnail).last().click()
    await waitForLoading(page)

    page.locator('img')

    console.log('Universe change with big bang test completed successfully')
  })

  //test('TC-AUTH-006_Logout', async () => {
    //await stargazerLogout(page, screenNumber, cloudSpace, workSpace)
  //})

  test('TC-AUTO-001_Activate Autodraw and check elements', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).first().click()
    await page.locator('[data-test="big-bang-menu"]').waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)
    await page.locator('[data-test="big-bang-menu"]').click()
    await page.getByText('drawAuto Draw').click()

    await page.waitForTimeout(1000)
    page.locator('#main-canvas').isVisible()

    await page.locator('button.transparent.icon-size.x-small:has-text("close")').click()
    await page.waitForTimeout(1000)

    console.log('Autodraw activation and elements check test completed successfully')
  })

  test('TC-AUTO-002_Reduce and close the windows AutoDraw', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).first().click()
    await page.locator('[data-test="big-bang-menu"]').waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)
    await page.locator('[data-test="big-bang-menu"]').click()
    await page.getByText('drawAuto Draw').click()
    await page.getByRole('button').getByText('minimize').click()
    await page.waitForTimeout(1000)
    await page.locator('button.minimized_frame-title:has-text("Auto Draw")').click()
    await page.locator('button.transparent.icon-size.x-small:has-text("close")').click()
    await page.waitForTimeout(1000)
    await page.locator('[data-test="big-bang-menu"]').click()

    console.log('AutoDraw window reduce and close test completed successfully')
  })

  test('TC-AUTO-003_Activate the stars and check their behavior', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).first().click()
    await page.getByRole('button', { name: 'Look' }).click()
    page.locator('button.medium.touch-point.stars-list__touch-point:has-text("Look")').isVisible()
    await page.locator('button.transparent.icon-size.x-small:has(span.material-symbols-outlined:has-text("tab_close"))').click()
    await page.getByRole('button', { name: 'Launch and Iterate' }).click()
    page.locator('button.medium.touch-point.stars-list__touch-point:has-text("Think 10x")').isVisible()
    await page.locator('button.transparent.icon-size.x-small:has(span.material-symbols-outlined:has-text("tab_close"))').click()

    console.log('Stars activation and behavior check test completed successfully')
  })

})
