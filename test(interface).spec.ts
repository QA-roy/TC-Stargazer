import { type Browser, type Page, test } from '@playwright/test'
import { configData, routes } from '../mock/data'
import { chromium } from 'playwright-extra'
import { expectURL, verifyFullscreen } from '../utils/result'
import { navigateStargazer, stargazerLogout, switchSpace } from '../utils/auth'
import { locator, waitForLoading } from '../utils/ui'
import { selectors } from '../utils/global-selectors'

const screenNumber = 2
const cloudSpace = 'Paris'
const workSpace = 'Interactive Room'

test.describe.serial('Stargazer tests interface', () => {
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

  test('STARGAZER - multiple screens', async () => {
    const screenNumber = 2
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    const secondPage = await browser.newPage({ storageState: configData.stargazerStorage })
    await secondPage.goto(configData.stargazerUrl)
    await navigateStargazer(secondPage, screenNumber.toString(), cloudSpace, workSpace)

    await waitForLoading(secondPage)

    await expectURL(secondPage, `${routes.stargazerHome}/${screenNumber}/${configData.name}`)
    await waitForLoading(secondPage)

    await secondPage.close()
  })

  test('TC-ECRA-001_STARGAZER - Reset configuration', async () => {
    page.locator(selectors.universeItem)

    await locator(page, selectors.bigBangMenu)
    await waitForLoading(page)
    await locator(page, selectors.resetButton)
    await expectURL(page, configData.stargazerUrl)
  })
  
  test('TC-ECRA-002_Fullscreen', async () => {
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    await locator(page, selectors.bigBangMenu)
    await locator(page, selectors.fullscreenButton)
    await waitForLoading(page)

    await verifyFullscreen(page)
  })

  test('TC-ECRA-003_Loading elements', async () => {
    await locator(page, selectors.universeCard)
    await waitForLoading(page)

    page.locator(selectors.bigBangMenu)
    page.locator(selectors.background)
    page.locator(selectors.content)
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
  })

  test('TC-CONF-002_Switch between different cloudSpaces', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await waitForLoading(page)
    await locator(page, selectors.bigBangMenu)
    await waitForLoading(page)
    await switchSpace(page, screenNumber.toString(), newCloudSpace, newWorkSpace)

    page.locator(cloudSpaceHeader)

    page.locator(selectors.universeItem)
  })

  test('TC-CONF-003_Switch between different workSpaces', async () => {
    const newScreenNumber = '1'
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Loggia'
    const workspaceHeader = `${selectors.headerName}:has-text("${workSpace}")`

    await locator(page, selectors.bigBangMenu)
    await waitForLoading(page)
    await switchSpace(page, newScreenNumber, newCloudSpace, newWorkSpace)

    page.locator(workspaceHeader)

    page.locator(selectors.universeItem)
  })

  test('TC-AUTH-006_Logout', async () => {
    await stargazerLogout(page, screenNumber, cloudSpace, workSpace)
  })

  test('TC-AUTO-001_Activate Autodraw and check elements', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).first().click()
    await page.locator('[data-test="big-bang-menu"]').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await page.locator('[data-test="big-bang-menu"]').click();
    await page.getByText('drawAuto Draw').click();

    await page.waitForTimeout(1000);
    page.locator('#main-canvas').isVisible();

    await page.locator('button.transparent.icon-size.x-small:has-text("close")').click();
    await page.waitForTimeout(1000);

  })

  test('TC-AUTO-002_Reduce and close the windows AutoDraw', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).last().click()
    await page.locator('[data-test="big-bang-menu"]').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await page.locator('[data-test="big-bang-menu"]').click();
    await page.getByText('drawAuto Draw').click();
    await page.getByRole('button').getByText('minimize').click();
    await page.waitForTimeout(1000);
    await page.locator('button.minimized_frame-title:has-text("Auto Draw")').click();
    await page.locator('button.transparent.icon-size.x-small:has-text("close")').click();
    await page.waitForTimeout(1000);
    await page.locator('[data-test="big-bang-menu"]').click();
})  

  test('TC-AUTO-003_Activate the stars and check their behavior', async () => {
    const newCloudSpace = 'Paris'
    const newWorkSpace = 'Interactive Room'
    const newScreenNumber = '1'
    const cloudSpaceHeader = `${selectors.headerName}:has-text("${newCloudSpace}")`

    await page.locator(selectors.thumbnail).first().click()
    await page.getByRole('button', { name: 'Look' }).click();
    page.locator('button.medium.touch-point.stars-list__touch-point:has-text("Look")').isVisible();
    await page.locator('button.transparent.icon-size.x-small:has(span.material-symbols-outlined:has-text("tab_close"))').click();
    await page.getByRole('button', { name: 'Launch and Iterate' }).click();
    page.locator('button.medium.touch-point.stars-list__touch-point:has-text("Think 10x")').isVisible();
    await page.locator('button.transparent.icon-size.x-small:has(span.material-symbols-outlined:has-text("tab_close"))').click();
  })

  //test('TC-CONF-001_Configure and save different screen layouts', async () => {

  //})

})