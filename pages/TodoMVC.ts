import { expect, type Locator, type Page } from '@playwright/test';

export class TodoMVCPage {
    readonly page: Page;
    readonly todo: string;
    readonly todoInput: Locator;
    readonly createdTodo: Locator;

    constructor(page: Page, todo: string) {
        this.page = page;
        this.todo = todo;
        this.todoInput = this.page.getByRole('textbox', { name: "What needs to be done?" });
        this.createdTodo = this.page.getByTestId('todo-title');
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

    }
}