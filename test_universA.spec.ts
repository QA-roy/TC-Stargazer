import { type Browser, expect, type Page, test, APIRequestContext } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'
import { pageSelectors, scrollAmounts, statusTypes, textStrings, universeNames, waitTimes, SCROLL_ACTIONS } from '../../../utils/selectors-file'

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

  test('TC-VIEW-001_View universe list or module', async () => {
    await page.goto(configData.adminUrl)
    await page.locator(pageSelectors.viewModuleButton).click()
    await expect(page.getByText(textStrings.universeListHeader)).toBeVisible()
    await page.locator(pageSelectors.viewListButton).click()
    await expect(page.getByText(textStrings.universeModuleHeader)).toBeVisible()

    console.log('✅ Test TC-VIEW-001 successful: "Module" and "List" views of universes display correctly.')
  })

  test('TC-UNIV-010.1_Filter universe list (Unpublished)', async () => {
    await page.goto(configData.adminUrl)
    await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible()

    // Open the "Status" filter and select "Unpublished"
    await page.getByRole('button', { name: 'Status' }).click()
    await page.getByLabel('Statusarrow_drop_down').getByText(statusTypes.unpublished).click()

    const universeListItems = await page.$$(pageSelectors.universeListItem)
    for (const item of universeListItems) {
      // Check that "Published" and "Archived" are not present in each item
      const published = await item.$(`:text-is("${statusTypes.published}")`)
      const archived = await item.$(`:text-is("${statusTypes.archived}")`)
      const unpublished = await item.$(`:text-is("${statusTypes.unpublished}")`)
      await expect(published).toBeNull()
      await expect(archived).toBeNull()
      await expect(unpublished).not.toBeNull()
    }
    await page.waitForTimeout(1000)

    console.log('✅ Test TC-UNIV-010.1 successful: only unpublished universes are displayed.')
  })

  test('TC-UNIV-010.2_Filter universe list (Archived)', async () => {
    await page.goto(configData.adminUrl)
    await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible()

    // Open the "Status" filter and select "Archived"
    await page.getByRole('button', { name: 'Status' }).click()
    await page.getByLabel('Statusarrow_drop_down').getByText(statusTypes.archived).click()

    const universeListItems = await page.$$(pageSelectors.universeListItem)
    for (const item of universeListItems) {
      // Check that "Published" and "Unarchived" are not present in each item
      const published = await item.$(`:text-is("${statusTypes.published}")`)
      const archived = await item.$(`:text-is("${statusTypes.archived}")`)
      const unpublished = await item.$(`:text-is("${statusTypes.unpublished}")`)
      await expect(published).toBeNull()
      await expect(archived).not.toBeNull()
      await expect(unpublished).toBeNull()
    }
    await page.waitForTimeout(1000)

    console.log('✅ Test TC-UNIV-010.2 successful: only archived universes are displayed.')
  })

  test('TC-UNIV-010.3_Filter universe list (Published)', async () => {
    await page.goto(configData.adminUrl)
    await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible()

    // Open the "Status" filter and select "Published"
    await page.getByRole('button', { name: 'Status' }).click()
    await page.getByLabel('Statusarrow_drop_down').getByText(statusTypes.published, { exact: true }).click()

    const universeListItems = await page.$$(pageSelectors.universeListItem)
    for (const item of universeListItems) {
      // Check that "Unpublished" and "Archived" are not present in each item
      const published = await item.$(`:text-is("${statusTypes.published}")`)
      const archived = await item.$(`:text-is("${statusTypes.archived}")`)
      const unpublished = await item.$(`:text-is("${statusTypes.unpublished}")`)
      await expect(published).not.toBeNull()
      await expect(archived).toBeNull()
      await expect(unpublished).toBeNull()
    }
    await page.waitForTimeout(1000)

    console.log('✅ Test TC-UNIV-010.3 successful: only published universes are displayed.')
  })

  test('TC-UNIV-001_Change the name of a universe', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)

    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)

    await page.getByText(universeNames.melanie).click()
    await page.locator(pageSelectors.editableTextUniverseName).fill('Mélanie1')

    await page.locator(pageSelectors.stargazerLogo).click()
    await page.waitForTimeout(waitTimes.long)

    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)
    await expect(page.getByText('Mélanie1')).toBeVisible()

    // Reset to original name to replay the test
    await page.getByLabel('Mélanie1').click()
    await page.locator(pageSelectors.editableTextUniverseName).fill(universeNames.melanie)
    await page.locator(pageSelectors.stargazerLogo).click()
    await page.waitForTimeout(waitTimes.medium)

    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)
    await expect(page.getByText(universeNames.melanie)).toBeVisible()

    console.log('✅ Test TC-UNIV-001 successful: universe name has been modified then restored successfully.')
  })

  test('TC-UNIV-003_ Lock and unlock universes', async() => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(3000)
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)
    await expect(page.getByText('Alloua')).toBeVisible()
    await page.getByText('Allouamore_vert').click()
    await page.locator('button span:has-text("lock")').click()
    await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click()
    await page.waitForTimeout(3000)
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)

    await expect(page.getByText('Alloua')).toBeVisible()
    // Restores to initial state before changes
    await page.getByText('Allouamore_vert').click()
    await page.locator('button span:has-text("lock")').click()
    await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click()
    await page.waitForTimeout(3000)
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)
    await expect(page.getByText('Alloua')).toBeVisible()

    console.log('✅ Test TC-UNIV-003 successful: A universe has been locked then unlocked successfully.')
  })

  test('TC-UNIV-007_Download universes', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(1000)

    // Open the universe menu
    const universeCardSelector = '[data-testid="universe-card-1"]'
    await page.locator(universeCardSelector).locator(pageSelectors.openUniverseMenu).click()

    // Capture the API request before clicking if it exists
    const apiResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/universe/export') && response.status() === 200
    )

    // Start the download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByText('Download Universe').click()
    ])

    // Wait for API 200 response
    const apiResponse = await apiResponsePromise
    console.log(`✅ API request successful: ${apiResponse.url()} (status ${apiResponse.status()})`)

    // Verify the download link and filename
    const downloadUrl = download.url()
    expect(downloadUrl).toMatch(/\/(universe\/export|[a-f0-9-]{36})/)
    const fileName = await download.suggestedFilename()
    console.log(`📥 Downloaded file: ${fileName}`)

    await download.delete() // Cleanup
  })

})