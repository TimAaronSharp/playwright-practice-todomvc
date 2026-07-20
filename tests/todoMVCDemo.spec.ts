import { test, expect } from '@playwright/test';

/* Playwright automatically prefixes any relative paths in page.goto()
with the baseURL defined in playwright.config.ts.
So since in playwright.config.ts baseURL: 'https://demo.playwright.dev'
the line will be "await page.goto('https://demo.playwright.dev/todomvc/').
*/
/*NOTE The way the native JavaScript URL() constructor works (which Playwright uses),
if passed a single '/' it will read the url from left to right (breaking the url into
different segments: protocol ("https://"), authority or host/domain (demo.playwright.dev),
and then anything after that are sub-folders/file paths (/todomvc)).
The constructor will read up until that first '/' and delete anything after, only keeping
the root domain "https://demo.playwright.dev/" (appending a '/' at the end).
*/
test('has title', async ({ page }) => {
  await page.goto('/todomvc');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("React • TodoMVC");
});
