const { test, expect } = require("@playwright/test");

test("homepage has Playwright in title", async ({ page }) => {
  await page.goto("https://playwright.dev"); // Arahkan ke URL
  const title = await page.title(); // Ambil judul halaman
  expect(title).toBe("Playwright");
});

test("homepage has main heading", async ({ page }) => {
  await page.goto("https://playwright.dev");
  const heading = await page.textContent("h1"); // Ambil konten teks dari elemen h1
  expect(heading).toBe(
    "Fast and reliable end-to-end testing for modern web apps"
  );
});

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
