import { configData } from '../mock/data'

type selectors = {
  bigBangMenu: string,
  universesList: string,
  universeCard: string,
  content: string,
  background: string,
  thumbnail: string,
  canvas: string,
  loginCode: string,
  inputCode: string,
  next: string,
  emailInput: string,
  passwordInput: string,
  indentifierNext: string,
  passwordNext: string,
  userMenuButton: string,
}

export const selectors = {
  universeItem: 'div[data-test="universe-item"]',
  universeCard: `div[data-key="${configData.universeID}"]`,
  content: 'img[src="https://firebasestorage.googleapis.com/v0/b/badge-695d3.appspot.com/o/cloudSpace%2FCT_H_Why_769d02a0-dbd4-4016-85bc-a2d92e22dd5e.png?alt=media&token=d25b6205-7d25-48f4-929c-1c4e9acf7f24"]',
  background: 'source[src="https://firebasestorage.googleapis.com/v0/b/badge-695d3.appspot.com/o/cloudSpace%2FBG_WhyGlobal_H_f02ca5c3-33db-46c9-8c48-793ce770b3c0.mp4?alt=media&token=79f36579-c746-4535-bb52-be6ecc16ec25"]',
  thumbnail: 'div[data-test="universe-thumbnail"]',
  canvas: 'canvas[role=img]',
  loginCode: 'div[data-test="login-code"]',
  inputCode: 'input[id="code"]',
  next: 'div#next',
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  continueButton: 'button:has-text("Continue")',
  userMenuButton: 'button[aria-label="User menu"]',
  headerName: 'span[data-test="universes-header"]',
  bigBangMenu: 'button[data-test="big-bang-menu"]',
  resetButton: 'button[data-test="reset-configuration"]',
  fullscreenButton: 'button[data-test="full-screen"]',
  signOutButton: 'button[data-test="sign-out"]',
  loginButton: 'button[data-test="login-button"]',
  nextButton: 'button[data-test="next"]',
  bigBangButton: 'button[data-test="big-bang"]'
}
