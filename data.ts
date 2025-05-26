import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

const ID_TOKEN = process.env.TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const ADMIN_URL = process.env.ADMIN_URL
const STARGAZER_URL = process.env.STARGAZER_URL
const QRCODE_URL = process.env.QRCODE_URL
const ADMIN_STORAGE = process.env.ADMIN_STORAGE
const ADMIN_STORAGE_PRESENTER = process.env.ADMIN_STORAGE_PRESENTER
const ADMIN_STORAGE_EDITOR = process.env.ADMIN_STORAGE_EDITOR
const STARGAZER_STORAGE = process.env.STARGAZER_STORAGE

export const user = {
  idToken: ID_TOKEN ?? '',
  refreshToken: REFRESH_TOKEN ?? '',
  email: USER ?? '',
  password: PASSWORD ?? ''
}

export const configData = {
  adminUrl: ADMIN_URL ?? '',
  stargazerUrl: STARGAZER_URL ?? '',
  qrCodeUrl: QRCODE_URL ?? '',
  universeID: '65856eee67066c26507ffa4c',
  cityLink: 'paris',
  name: 'google-cloud',
  spaceLink: 'interactive-room',

  adminStorage: ADMIN_STORAGE ?? '',
  adminStoragePresenter: ADMIN_STORAGE_PRESENTER ?? '',
  adminStorageEditor: ADMIN_STORAGE_EDITOR ?? '',
  stargazerStorage: STARGAZER_STORAGE ?? ''
}

export const routes = {
  adminHome: `${configData.adminUrl}/${configData.cityLink}/${configData.spaceLink}`,
  adminSpace: `${configData.adminUrl}/${configData.cityLink}/${configData.spaceLink}/${configData.universeID}`,
  stargazerHome: `${configData.stargazerUrl}/${configData.cityLink}/${configData.spaceLink}`
}
