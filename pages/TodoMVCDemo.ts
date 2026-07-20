import { expect, type Locator, type Page } from '@playwright/test';

export class TodoMVCDemoPage {
    readonly page: Page;
    readonly todoInput: Locator;
    readonly createdTodo: Locator;
    readonly todoListContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = this.page.getByRole('textbox', { name: "What needs to be done?" });
        this.createdTodo = this.page.getByTestId('todo-title');
        this.todoListContainer = this.page.locator('.main');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc');
    }

    async addTodo(todo: string) {
        await this.todoInput.click();
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }

    async verifyTodoInputIsEmpty() {
        await expect(this.todoInput).toBeEmpty();
    }

    async verifyTodosHaveBeenCreated(expectedTodos: string[]) {
        /* NOTE toBeVisible() check is a "fast fail" check to verify that if the app has broken so badly
        that it fails immediately and doesn't waste time checking for todo items that aren't there. */
        await expect(this.todoListContainer).toBeVisible();
        await expect(this.createdTodo).toHaveCount(expectedTodos.length);
        await expect(this.createdTodo).toHaveText(expectedTodos);
    }

    async verifyTodosListIsEmpty() {
        await expect(this.todoListContainer).toBeHidden();
    }

    async deleteTodoByName(todoName: string, todoIndex: number = 0) {
        // const matchingTodos = this.page.locator()
    }
}