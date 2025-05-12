import { type Browser, type Page } from '@playwright/test'
import { configData, routes, user } from '../mock/data'
import { clickButton, locator, waitTimeout } from './ui'
import { expectURL } from './result'
import { selectors } from './global-selectors'
import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

chromium.use(stealth())

export const adminConnection = async (page: Page) => {
  await page.goto(configData.adminUrl)

  await page.evaluate(({ idToken, refreshToken }) => {
    localStorage.setItem('idToken', JSON.stringify(idToken))
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
  }, user)

  await page.reload()

  await expectURL(page, routes.adminHome)
  await page.context().storageState({ path: configData.adminStorage })

  await page.close()
}

export const connectAndInitializeStargazer = async (
  browser: Browser,
  screenNumber: number,
  cloudSpace: string,
  space: string,
  headless: boolean
): Promise<Page> => {
  const page = await browser.newPage()
  await page.goto(configData.stargazerUrl)
  await locator(page, selectors.loginButton)

  const code = await page.locator(selectors.loginCode).textContent() || ''

  const connectionPage = await authenticateWithQRCode(browser, configData.qrCodeUrl, code, headless)
  await navigateStargazer(page, screenNumber.toString(), cloudSpace, space)

  await connectionPage.close()
  return page
}

export const authenticateWithQRCode = async (browser: Browser, link: string, code: string, headless: boolean) => {
  const nextLanguage = headless ? 'Next' : 'Suivant'
  const page = await browser.newPage()

  await page.goto(link)
  await page.locator(selectors.inputCode).fill(code)
  await locator(page, selectors.next)

  await page.fill(selectors.emailInput, user.email)
  await locator(page, `button:has-text("${nextLanguage}")`)

  await page.fill(selectors.passwordInput, user.password)
  await locator(page, `button:has-text("${nextLanguage}")`)

  await locator(page, selectors.continueButton)

  return page
}

export const navigateStargazer = async (page: Page, screenNumber: string, cloudSpace: string, space: string) => {
  await clickButton(page, cloudSpace)

  await waitTimeout(page)
  await locator(page, selectors.nextButton)

  await waitTimeout(page)
  await clickButton(page, space.replace('-', ' '))

  await waitTimeout(page)
  await locator(page, selectors.nextButton)

  await waitTimeout(page)
  await clickButton(page, screenNumber)

  await waitTimeout(page)
  await locator(page, selectors.nextButton)
}

export const switchSpace = async (page: Page, screenNumber: string, cloudSpace: string, workSpace: string) => {
  await locator(page, selectors.resetButton)
  await navigateStargazer(page, screenNumber, cloudSpace, workSpace)
}

export const stargazerLogout = async (page: Page, screenNumber: number, cloudSpace: string, workSpace: string) => {
  await page.goto(configData.stargazerUrl)
  await navigateStargazer(page, screenNumber.toString(), cloudSpace, workSpace)
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await locator(page, selectors.loginButton)
  return page
}
