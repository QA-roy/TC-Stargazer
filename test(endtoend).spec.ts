import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData, routes } from '../mock/data'
import { expectURL } from '../utils/result'
import { locator } from '../utils/ui'
import { selectors } from '../utils/global-selectors'
import { defineConfig } from '@playwright/test';

test.describe.serial('End to End', () => {
    let browser: Browser, page: Page
  
    test.beforeEach(async () => {
      browser = await chromium.launch({ headless: false })
      page = await browser.newPage({
        storageState: configData.adminStorage
      })
    })
  
    test.afterAll(async () => {
      await page.close();
    })

      test('TC-VIEW-001_View universe list or module', async () => {
        await page.goto(configData.adminUrl);
        await page.locator('button').filter({ hasText: 'view_module' }).click();
        await page.waitForTimeout(1500);
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listStatusarrow_drop_downNameStatusModifi')).toBeVisible();
        await page.locator('button').filter({ hasText: 'view_list' }).click();
        await page.waitForTimeout(1500);
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_moduleStatusarrow_drop_downaddNew')).toBeVisible();
      })

    })