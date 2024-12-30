import { test as base, BrowserContext } from '@playwright/test';

export class BaseTest {
  protected context: BrowserContext;

  async setupContext({ browser }) {
    this.context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
      locale: 'en-GB',
      extraHTTPHeaders: {
        "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
      }
    });
  }

  async getNewPage() {
    return await this.context.newPage();
  }
}

// Create a custom test fixture that includes the BaseTest
export const test = base.extend<{ baseTest: BaseTest }>({
  baseTest: async ({ browser }, use) => {
    const baseTest = new BaseTest();
    await baseTest.setupContext({ browser });
    await use(baseTest);
  },
});

export { expect } from '@playwright/test';