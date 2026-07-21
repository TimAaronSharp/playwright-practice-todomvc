import { test, expect } from '@playwright/test';
import { TodoMVCDemoPage } from '../pages/TodoMVCDemo';
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
  let todoMVCDemoPage: TodoMVCDemoPage;

  test.beforeEach(async ({ page }) => {
    todoMVCDemoPage = new TodoMVCDemoPage(page);
    await todoMVCDemoPage.goto();
    await todoMVCDemoPage.verifyTodoInputIsEmpty();
    await todoMVCDemoPage.verifyTodosListIsEmpty();
  });

  test.describe('Adding todos to list', async () => {

    test('should append a newly created todo to the bottom of the list', async () => {
      await todoMVCDemoPage.addTodo('Mow the lawn');
      await todoMVCDemoPage.verifyTodoInputIsEmpty();
      await todoMVCDemoPage.verifyTodosHaveBeenCreated(['Mow the lawn']);
    });

    test('should append multiple newly created todos to the bottom of the list', async () => {
      await todoMVCDemoPage.addTodo('Mow the lawn');
      await todoMVCDemoPage.addTodo('Call the plumber');
      await todoMVCDemoPage.addTodo('Do the dishes');

      await todoMVCDemoPage.verifyTodoInputIsEmpty();
      await todoMVCDemoPage.verifyTodosHaveBeenCreated(["Mow the lawn", "Call the plumber", "Do the dishes"]);
    });
  });

  test.describe('Deleting todos from list', async () => {

    test('should remove todo from list', async () => {
      await todoMVCDemoPage.addTodo('Mow the lawn');
      await todoMVCDemoPage.verifyTodoInputIsEmpty();

      await todoMVCDemoPage.deleteTodoByName('Mow the lawn');
      await todoMVCDemoPage.verifyTodosListIsEmpty();
    });

    test('should remove the first todo from list when deleting first todo', async () => {
      await todoMVCDemoPage.addTodo('Mow the lawn');
      await todoMVCDemoPage.addTodo('Call the plumber');
      await todoMVCDemoPage.addTodo('Do the dishes');
      await todoMVCDemoPage.verifyTodoInputIsEmpty();

      await todoMVCDemoPage.deleteTodoByName('Mow the lawn');
      await todoMVCDemoPage.verifyTodosHaveBeenCreated(['Call the plumber', 'Do the dishes']);
    });

    test('should remove the second/middle todo from list when deleting second todo', async () => {
      await todoMVCDemoPage.addTodo('Mow the lawn');
      await todoMVCDemoPage.addTodo('Call the plumber');
      await todoMVCDemoPage.addTodo('Do the dishes');
      await todoMVCDemoPage.verifyTodoInputIsEmpty();

      await todoMVCDemoPage.deleteTodoByName('Call the plumber');
      await todoMVCDemoPage.verifyTodosHaveBeenCreated(['Mow the lawn', 'Do the dishes']);
    })
  });
});