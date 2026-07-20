import { test, expect } from '@playwright/test';
import { TodoMVCPage } from '../pages/todoMVC';
import { todo } from 'node:test';

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
test.describe('Home page metadata', () => {
  test('should have the correct title', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveTitle("React • TodoMVC");
  });
});

test.describe('Feature: Todo functionality', () => {
  let todoMVCPage: TodoMVCPage;

  test.beforeEach(async ({ page }) => {
    todoMVCPage = new TodoMVCPage(page);
    await todoMVCPage.goto();
  });
  test.describe('Adding todos to list', async () => {

    test('should append a newly created todo to the bottom of the list', async () => {
      await todoMVCPage.addTodo('Mow the lawn');
      await todoMVCPage.verifyTodoInputIsEmpty();
      await todoMVCPage.verifyTodosHaveBeenCreated(['Mow the lawn']);
    });

    test('should append multiple newly created todos to the bottom of the list', async () => {
      await todoMVCPage.addTodo('Mow the lawn');
      await todoMVCPage.addTodo('Call the plumber');
      await todoMVCPage.addTodo('Do the dishes');

      await todoMVCPage.verifyTodoInputIsEmpty();
      await todoMVCPage.verifyTodosHaveBeenCreated(["Mow the lawn", "Call the plumber", "Do the dishes"]);
    })
  });
});