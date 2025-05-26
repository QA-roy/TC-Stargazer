import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData, routes } from '../../../mock/data'
import { expectURL } from '../../../utils/result'
import { waitTimes, SCROLL_ACTIONS, scrollAmounts } from '../../../utils/selectors-file'

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

  test('TC-CONT-001_Add a star and check its display', async () => {
    await page.goto(configData.adminUrl)
    await page.getByRole('button', { name: 'Assets' }).click()
    // Adding a new resource
    await page.locator('.assets-list-table__add-button').click()
    await page.getByLabel('Name *').fill('A')
    await page.getByLabel('Select a layer *').click()
    await page.getByRole('option', { name: 'Star' }).locator('div').first().click()
    await page.getByLabel('Select a type *').click()
    await page.getByRole('option', { name: 'Image' }).locator('div').first().click()
    await page.getByLabel('URL *').click()
    await page.getByLabel('URL *').fill('https://unsplash.com/fr/photos/une-image-floue-de-cubes-sur-fond-rose-et-bleu-mKG3nYgEVIY')
    await page.getByLabel('Description').click()
    await page.getByLabel('Description').fill('A')
    await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listLayerarrow_drop_downNameLayerURLDescr')).toBeVisible()
    await page.getByText('Create', { exact: true }).click()
    await expectURL(page, routes.adminHome)
    await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listLayerarrow_drop_downNameLayerURLDescr')).toBeVisible()

    console.log('✅ TC-CONT-001 successful: Added a new star and displayed in the list')
  })

  test('TC-STAR-001_Add, move and resize a star', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(3000)
    // Scroll the element with the attribute data-testid="virtuoso-scroller"
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)
    await page.getByText('Ayoubmore_vert', { exact: true }).click()
    // Adding a new star
    await page.getByLabel('Activate draw mode to create').click()
    await page.getByRole('option', { name: 'New Star' }).locator('div').first().click()

    await expect(page.getByText('Size & PositionXYWH')).toBeVisible()
    // Target all inputs with the used class
    const inputs = page.locator('input.star-rect-input__control')

    // Function to extract a numeric value from an input (ex: "13%" => 13)
    async function getNumericValue(inputLocator) {
      const valueStr = await inputLocator.inputValue()
      return parseFloat(valueStr.replace('%', '').trim())
    }

    const initialX = await getNumericValue(inputs.nth(0))
    const initialY = await getNumericValue(inputs.nth(1))
    const initialW = await getNumericValue(inputs.nth(2))
    const initialH = await getNumericValue(inputs.nth(3))

    // Click on the resize button
    await inputs.nth(2).fill('20')

    await page.getByRole('button', { name: 'Resize New Star' }).click()
    await page.waitForTimeout(waitTimes.medium)

    const newX = await getNumericValue(inputs.nth(0))
    const newY = await getNumericValue(inputs.nth(1))
    const newW = await getNumericValue(inputs.nth(2))
    const newH = await getNumericValue(inputs.nth(3))

    // Check that at least one value has changed
    expect(
      newX !== initialX || newY !== initialY || newW !== initialW || newH !== initialH
    ).toBeTruthy()

    // Restore the nth(2) value to replay the test
    await page.waitForTimeout(waitTimes.medium)
    await inputs.nth(2).fill('30')

    console.log('✅ TC-STAR-001 successful: A star has been added and resized successfully')
  })

  test('TC-STAR-002_Assoicated differently content has a star', async () => {
    await page.goto(configData.adminUrl)
    await page.waitForTimeout(3000)
    // Scroll the element with the attribute data-testid="virtuoso-scroller"
    await SCROLL_ACTIONS.scrollVirtuoso(page, scrollAmounts.small)
    await page.getByText('Ayoubmore_vert', { exact: true }).click()
    await page.getByText('touch_appNew Star1').click()
    await page.waitForTimeout(waitTimes.medium)
    // Check that links to an image, YouTube video and PDF file are visible
    await expect(page.getByText('1imageStar_0linkremove')).toBeVisible() // link to an image
    await expect(page.getByText('2Ailinkremove')).toBeVisible() // link to a YouTube video
    await expect(page.getByText(': A Breakthrough Year for Deep Learninglinkremove')).toBeVisible() // link to PDF file

    console.log('✅ Test TC-STAR-002 successful: Different content is properly associated with a "star".')
  })
})