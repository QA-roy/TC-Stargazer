import { expect, type Page } from '@playwright/test'

export const expectURL = async (page: Page, url: string) => {
  await expect(page).toHaveURL(url)
}

export const verifyFullscreen = async (page: Page) => {
  const isFullscreen = await page.evaluate(() => !!document.fullscreenElement)
  expect(isFullscreen).toBe(true)
  expect(await page.getByRole('button', { name: 'Close full screen' }).first().isVisible()).toBe(true)
}
