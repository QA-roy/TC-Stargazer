## Stargazer Playwright Tests

# Description

This test suite uses Playwright to automate and verify the proper functioning of the Stargazer application. It includes tests for authentication, navigation between workspaces, QR Code management, and switching between universes and cloud spaces.

# Requirements

Node.js
pnpm
Playwright

# Install dependencies

pnpm install

## Define .env in mock folder

**URL**

ADMIN_URL="http://localhost:5174"
STARGAZER_URL="http://localhost:5173"
QRCODE_URL="https://www.google.com/device"

**AUTHENTICATION**

-- Replace by your ID --
USER="user@ucaya.com"
PASSWORD="password"

**TOKENS & REFRESH TOKENS**

-- Add yours --
Format :
TOKEN="eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjOGEyMGFmN2ZjOThmOTdmNDRiMTQyYjRkNWQwODg0ZWIwOTM3YzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MTQwNTQ3Njc3Ny0yaGg5YnJqNmJua2g1bW1xZ2xoaGJnZzNyOHNsMGk5ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQxNDA1NDc2Nzc3LTJoaDlicmo2Ym5raDVtbXFnbGhoYmdnM3I4c2wwaTllLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzMjg1NDkyMjQ2NDY5Nzg3Mjg4IiwiaGQiOiJ1Y2F5YS5jb20iLCJlbWFpbCI6ImxiZUB1Y2F5YS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlA2dlU0XzZnTzhDVFVFbzMxV0ZydlEiLCJuYW1lIjoiTGF1cmEgQmVuc2ltb24iLCJnaXZlbl9uYW1lIjoiTGF1cmEiLCJmYW1pbHlfbmFtZSI6IkJlbnNpbW9uIiwiaWF0IjoxNzMzNDExNDMzLCJleHAiOjE3MzM0MTUwMzN9.WI4h1Tt4KJCPsxYMKqq3RPnF5GRePlx3AwECaStVAo6I5PsMbxXVDASIGm_0wts1-ouBVIsqZmgnKQoh7sgBS8CWUMXVAgaccyvwUhkVbwPln3OoiRtjSnvVCFQ-nrvNbHNEpV8SPVaBCIO_kUGYluqhH6bQXR0mIo2A47WPmQpDtsgbQUKPV1HjnOjKtg9jOivNEcWpGh9BevYj9QNJ3iH4c6Zcz4oezNsLIfh_NHP5rA1702CUQBalGHbvTKx_s7XakX7zsB-lXDBmpuv9KWbZHJreS7zFGM3kxh7YIOIxElXS0WcQeowhECM5eZ5nbagchsEls3oQW8VeblK6Mw"
REFRESH_TOKEN="1//03X83c1PScoCNCgYIARAAGAMSNwF-L9Ir_4FXEPHe6gpAoSIdX00BCEMzL8txFxC2jKL8Xd5nalXH_LUUAzTh_XzqqLLb2ZC8aEc"

**STORAGE**

ADMIN_STORAGE="tests/storage/admin-storage-state.json"
STARGAZER_STORAGE="tests/storage/stargazer-storage-state.json"

## Run the tests

To run the entire test suite:

Fill in the required IDs in the data.ts file under the user object.

Run the following command:

    pnpm dev:test

To run a specific test file:

    pnpm dev:test tests/admin.spec.ts
    pnpm dev:test tests/stargazer.spec.ts

To run tests with the browser visible (for debugging purposes):

    pnpm playwright test --headed

To generate a detailed test report:

    pnpm exec playwright show-report

## Project structure

📁 tests
├── 📁 mock
│ └── data.ts # Mocked data (user, URLs, etc.)
├── 📁 storage
│ └── stargazer-storage-state.json # LocalStorage Stargazer
│ └── storage-state.json # LocalStorage Admin
├── 📁 tests
│ └── storage-state.json # Local storage
├── 📁 tests
│ └── admin.spec.ts # Admin tests
│ └── stargazer.spec.ts # Stargazer tests
├── 📄 global-setup.ts # Utility functions (login Admin & stargazer.)
├── 📄 README.md # Project documentation

## Test Files

utils.ts: Contains reusable utility functions for the tests.

## Main Tests

- Multiple Screens: Tests connecting to multiple Stargazer screens.
- Switch between Cloud Spaces: Switches between cloud spaces (e.g., Paris, Singapore, etc.).
- Switch between Work Spaces: Switches between different workspaces.
- Fullscreen Mode: Activates fullscreen mode and verifies its display.
- Loading Elements: Verifies the loading of key elements in the user interface.
- Reset Configuration: Tests the reset of the configuration.
- Change Universe with Big Bang: Switches universes using the "Big Bang" feature.

## Utility Functions

- adminConnection: Logs into the admin interface.
- connectAndInitializeStargazer: Connects to and initializes Stargazer.
- stargazerLogout: Logs the user out of Stargazer.
- scanQRCode: Scans the QR Code displayed on the screen.
- authenticateWithQRCode: Authenticates a user via a QR Code.
- navigateStargazer: Navigates within Stargazer (cloud, screens, etc.).
- waitForLoading: Waits for the page to finish loading.
- clickButton: Clicks on a specific button on the screen.
- switchSpace: Switches the workspace.
- expectURL: Verifies that the current URL is correct.
- locator: Locates and clicks on a specific element.
- verifyFullscreen: Checks if fullscreen mode is active.

## Configuration

The configuration is defined in the mock/data.ts file.
