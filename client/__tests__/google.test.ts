import "expect-puppeteer";

describe("Google", () => {
  beforeAll(async () => {
  });

  it('should display "google" text on page', async () => {
    await page.goto("https://google.com");
    await expect(page).toMatchTextContent("google");
  });
});
