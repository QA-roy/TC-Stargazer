import type { Page } from '@playwright/test'

export const waitTimeout = async (page: Page) => {
  await page.waitForTimeout(2000)
}

export const waitForLoading = async (page: Page) => {
  await waitTimeout(page)
}

export const clickButton = async (page: Page, buttonName: string) => {
  await page.getByRole('button', { name: buttonName }).click()
}

export const locator = async (page: Page, selector: string) => {
  await page.locator(selector).click()
  await page.waitForTimeout(1000)
}
