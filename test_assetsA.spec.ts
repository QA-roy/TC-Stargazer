import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'
import { galaxyOptions, layerTypes, pageSelectors, scrollAmounts, universeNames, waitTimes, SCROLL_ACTIONS } from '../../../utils/selectors-file'

test.describe.serial('Admin', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({
      storageState: configData.adminStorage
    })
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('TC-VIEW-002_View assets all items', async () => {
    await page.goto(configData.adminUrl)
    await page.locator(pageSelectors.assetsButton).click()
    // Check that different assets are visible in the list
    await expect(page.locator(pageSelectors.thumbnailTag).first()).toBeVisible()
    await expect(page.locator(pageSelectors.starTag).first()).toBeVisible()
    await expect(page.locator(pageSelectors.contentTag).first()).toBeVisible()
    await expect(page.locator(pageSelectors.backgroundTag).first()).toBeVisible()

    console.log('✅ Test TC-VIEW-002 successful: all types of asset elements are visible.')
  })

  test('TC-UNIV-011.1_Filter assets list (Thumbnail)', async () => {
    await page.goto(configData.adminUrl)
    // Apply filter "Layer" -> "Thumbnail"
    await page.getByRole('button', { name: 'Assets' }).click()
    await page.getByRole('button', { name: 'Layer' }).click()
    await page.getByText('Thumbnail', { exact: true }).click()
    await page.waitForTimeout(3000)

    const assetListItems = await page.$$('.space-page__main')

    // Check that no "star", "content" or "background" tags are present
    for (const item of assetListItems) {
      const starTagElement = await item.$(':text-is("star")')
      await expect(starTagElement).toBeNull()

      const contentTagElement = await item.$(':text-is("content")')
      await expect(contentTagElement).toBeNull()

      const backgroundTagElement = await item.$(':text-is("background")')
      await expect(backgroundTagElement).toBeNull()
    }

    // Check that at least one "Thumbnail" element is visible
    const isThumbnailVisible = await page.locator(':text-is("Thumbnail")').first().isVisible()
    await expect(isThumbnailVisible).toBe(true)

    console.log('✅ Test TC-UNIV-011.1 successful: only "Thumbnail" assets are displayed, no irrelevant tags present.')
  })

  test('TC-UNIV-011.2_Filter assets list (Star)', async () => {
    await page.goto(configData.adminUrl)
    // Apply filter "Layer" -> "Star"
    await page.getByRole('button', { name: 'Assets' }).click()
    await page.getByRole('button', { name: 'Layer' }).click()
    await page.getByText('Star', { exact: true }).click()
    await page.waitForTimeout(3000)
    
    const assetListItems = await page.$$('.space-page__main')
    
    // Check that no "thumbnail", "content" or "background" tags are present
    for (const item of assetListItems) {
      const thumbnailTagElement = await item.$(':text-is("Thumbnail")')
      await expect(thumbnailTagElement).toBeNull()
      
      const contentTagElement = await item.$(':text-is("content")')
      await expect(contentTagElement).toBeNull()
      
      const backgroundTagElement = await item.$(':text-is("background")')
      await expect(backgroundTagElement).toBeNull()
    }
    
    // Check that at least one "Star" element is visible
    const isStarVisible = await page.locator(':text-is("Star")').first().isVisible()
    await expect(isStarVisible).toBe(true)
    
    console.log('✅ Test TC-UNIV-011.2 successful: only "Star" assets are displayed, no irrelevant tags present.')
  })

  test('TC-UNIV-011.3_Filter assets list (Content)', async () => {
    await page.goto(configData.adminUrl)
    // Apply filter "Layer" -> "Content"
    await page.getByRole('button', { name: 'Assets' }).click()
    await page.getByRole('button', { name: 'Layer' }).click()
    await page.getByText('Content', { exact: true }).click()
    await page.waitForTimeout(3000)
    
    const assetListItems = await page.$$('.space-page__main')
    
    // Check that no "thumbnail", "star" or "background" tags are present
    for (const item of assetListItems) {
      const thumbnailTagElement = await item.$(':text-is("Thumbnail")')
      await expect(thumbnailTagElement).toBeNull()
      
      const starTagElement = await item.$(':text-is("Star")')
      await expect(starTagElement).toBeNull()
      
      const backgroundTagElement = await item.$(':text-is("background")')
      await expect(backgroundTagElement).toBeNull()
    }
    
    // Check that at least one "Content" element is visible
    const isContentVisible = await page.locator(':text-is("Content")').first().isVisible()
    await expect(isContentVisible).toBe(true)
    
    console.log('✅ Test TC-UNIV-011.3 successful: only "Content" assets are displayed, no irrelevant tags present.')
  })

  test('TC-UNIV-011.4_Filter assets list (Background)', async () => {
    await page.goto(configData.adminUrl)
    // Apply filter "Layer" -> "Background"
    await page.getByRole('button', { name: 'Assets' }).click()
    await page.getByRole('button', { name: 'Layer' }).click()
    await page.getByText('Background', { exact: true }).click()
    await page.waitForTimeout(3000)
    
    const assetListItems = await page.$$('.space-page__main')
    
    // Check that no "thumbnail", "star" or "content" tags are present
    for (const item of assetListItems) {
      const thumbnailTagElement = await item.$(':text-is("Thumbnail")')
      await expect(thumbnailTagElement).toBeNull()
      
      const starTagElement = await item.$(':text-is("Star")')
      await expect(starTagElement).toBeNull()
      
      const contentTagElement = await item.$(':text-is("content")')
      await expect(contentTagElement).toBeNull()
    }
    
    // Check that at least one "Background" element is visible
    const isBackgroundVisible = await page.locator(':text-is("Background")').first().isVisible()
    await expect(isBackgroundVisible).toBe(true)
    
    console.log('✅ Test TC-UNIV-011.4 successful: only "Background" assets are displayed, no irrelevant tags present.')
  })

  test('TC-PARA-001_Applicate background all project', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)
    // Select universe and background
    await page.getByText(universeNames.melanie).click()
    await page.getByText(`wallpaper${layerTypes.background}`).click()

    await page.locator('button.button.medium.editable-layer-content.portrait.valid:has(img[src*="pexels-photo-1545743"])').waitFor({ state: 'visible' })
    await page.locator('button.button.medium.editable-layer-content.portrait.valid:has(img[src*="pexels-photo-1545743"])').click()
    
    // Apply background to entire project
    await page.click(pageSelectors.applyToAllButton)
    await expect(page.locator(pageSelectors.editAssetPanel)).toBeVisible()
    await page.getByRole('button', { name: 'Galaxies' }).click()
    await page.getByRole('button', { name: 'Galaxies' }).click() // if double click needed
    await page.getByRole('option', { name: galaxyOptions.galaxy3 }).click()

    console.log('✅ Test TC-PARA-001 successful: background has been applied to the entire project.')
  })

  test('TC-PARA-002_Applicate content all project', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)
    await page.getByText(universeNames.melanie).click()
    await page.getByText(`image${layerTypes.content}`).click()
    // Apply content to entire project
    await page.click(pageSelectors.applyToAllButton)
    await expect(page.locator(pageSelectors.editAssetPanel)).toBeVisible()
    await page.getByRole('button', { name: 'Galaxies' }).click()
    await page.getByRole('button', { name: 'Galaxies' }).click()
    await expect(page.locator(pageSelectors.editAssetPanel)).toBeVisible() // if double click needed
    await page.getByRole('option', { name: galaxyOptions.galaxy3 }).click()
    await page.waitForTimeout(waitTimes.long)

    console.log('✅ Test TC-PARA-002 successful: content has been applied to the entire project')
  })
})
