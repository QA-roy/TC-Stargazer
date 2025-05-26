import { type Browser, type Page, test } from '@playwright/test'
import { configData, routes } from '../../mock/data'
import { chromium } from 'playwright-extra'
import { expectURL } from '../../utils/result'
import { navigateStargazer, switchSpace } from '../../utils/auth'
import { locator, waitForLoading } from '../../utils/ui'
import { selectors } from '../../utils/global-selectors'

const screenNumber = 2
const cloudSpace = 'Paris'
const workSpace = 'Interactive Room'

test.describe.serial('Interface config management', () => {
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

    console.log('STARGAZER multiple screens test completed successfully')
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

      console.log('CloudSpace switch test completed successfully')
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

      console.log('WorkSpace switch test completed successfully')
    })
})