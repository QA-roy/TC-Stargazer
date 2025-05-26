import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData } from '../../../mock/data'
import { layerTypes, pageSelectors, scrollAmounts, universeNames, waitTimes, SCROLL_ACTIONS } from '../../../utils/selectors-file'

test.describe.serial('Admin', () => {
  let browser: Browser, page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage({
      storageState: configData.adminStoragePresenter
    })
  })

  test('TC-SA-00_Button asset is not visible', async () => {
    await page.goto(configData.adminUrl)

    if (await page.getByRole('button', { name: 'Assets' }).isVisible()) {
      await page.getByRole('button', { name: 'Assets' }).click()
      await expect(page.locator('.assets-list-table_add-button')).not.toBeVisible()

      console.log('✅ TC-SA-01 successful: a user with the "presenter" role cannot add new assets')
    } else {
      // If even the Assets button is not visible, it's also a successful test
      console.log('✅ TC-SA-01 successful: a user with the "presenter" role doesn\'t even have access to the Assets section')
    }
  })

  test('TC-PARA-002_Verify presenter cannot edit backgrounds', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)
    
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)
    
    // Select a universe and background       
    await page.getByText(universeNames.melanie).click()
    await page.getByText(`wallpaper${layerTypes.background}`).click()
    
    await page.locator('button.button.medium.editable-layer-content.portrait.valid:has(img[src*="pexels-photo-1545743"])').click()
    
    // Verify that edit options are not available
    let canModifyBackground = true
    
    try {
      // Attempt to access an editing interface
      await page.waitForSelector('.edit-panel, .context-menu, [aria-label="Edit options"]', { timeout: 3000 })
      canModifyBackground = true
    } catch (error) {
      // The editing interface did not appear as expected
      canModifyBackground = false
    }
    
    // Verify that the user cannot modify the background
    expect(canModifyBackground).toBe(false)
    
    // Verify the absence of administration controls in the interface
    const userStatus = await page.evaluate(() => {
      const presenterIndicator = document.querySelector('.presenter-mode, .role-presenter')
      const adminControls = document.querySelector('.admin-controls, .edit-mode-active')
      
      return {
        isPresenterMode: presenterIndicator !== null,
        hasAdminControls: adminControls !== null
      }
    })
    
    expect(userStatus.hasAdminControls).toBe(false)
    
    console.log('✅ Test TC-PARA-002 successful: presenter role cannot edit backgrounds.')
  })

  test('TC-PARA-002_Verify presenter cannot apply content to all projects', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(waitTimes.long)
    
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.medium)
    
    // Select a universe
    await page.getByText(universeNames.melanie).click()
    
    // Check if the "image content" element is accessible
    let canAccessContentImage = true
    let canEditContent = true
    
    try {
      // Try to access the image content element
      await page.getByText(`image${layerTypes.content}`).click({ timeout: 3000 })
      canAccessContentImage = true
      
      // If we could click, verify that edit options are not available
      try {
        await page.waitForSelector(pageSelectors.editAssetPanel, { timeout: 3000 })
        await page.waitForSelector(pageSelectors.applyToAllButton, { timeout: 3000 })
        canEditContent = true
      } catch (error) {
        // The editing interface or "Apply to all" button did not appear as expected
        canEditContent = false
      }
    } catch (error) {
      // The image content element is not accessible or visible
      canAccessContentImage = false
      canEditContent = false
    }
    
    // Verify that the user cannot access content or cannot modify it
    if (canAccessContentImage) {
      expect(canEditContent).toBe(false)
    } else {
      // If the element is not accessible, the test is also successful
      expect(canAccessContentImage).toBe(false)
    }
    
    // Verify the absence of administration controls in the interface
    const userStatus = await page.evaluate(() => {
      const presenterIndicator = document.querySelector('.presenter-mode, .role-presenter')
      const adminControls = document.querySelector('.admin-controls, .edit-mode-active')
      
      return {
        isPresenterMode: presenterIndicator !== null,
        hasAdminControls: adminControls !== null
      }
    })
    
    expect(userStatus.hasAdminControls).toBe(false)
    
    console.log('✅ Test TC-PARA-002 successful: presenter role cannot apply content to all projects.')
  })
})
