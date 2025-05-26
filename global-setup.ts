import { adminConnection, connectAndInitializeStargazer } from './utils/auth'
import { configData } from './mock/data'
import { waitTimeout } from './utils/ui'
import { chromium } from 'playwright-extra'

const headless = false

const browser = await chromium.launch({ headless: headless })
const adminContext = await browser.newContext()
const adminPage = await adminContext.newPage()

const screenNumber = 2
const cloudSpace = 'Paris'
const workSpace = 'Interactive Room'

export default async function globalSetup() {
  console.log('Je passe dans mon gs')
  await adminConnection(adminPage)

  const stargazerPage = await connectAndInitializeStargazer(browser, screenNumber, cloudSpace, workSpace, headless)

  await waitTimeout(stargazerPage)

  await stargazerPage.context().storageState({ path: configData.stargazerStorage })

  await waitTimeout(stargazerPage)

  await stargazerPage.reload()
  await stargazerPage.close()

}
