// const { test, describe, expect, beforeEach } = require("@playwright/test");

// describe("Note app", () => {
//   test("has title", async ({ page }) => {
//     await page.goto("http://localhost:5173/");

//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Bloglist/);
//   });

//   test("login form is shown", async ({ page }) => {
//     await page.goto("http://localhost:5173/");

//     const loginForm = await page.locator(".login-form");
//     await expect(loginForm).toBeVisible();

//     const usernameInput = page.getByPlaceholder("username");
//     await expect(usernameInput).toBeVisible();

//     const passwordInput = page.getByPlaceholder("password");
//     await expect(passwordInput).toBeVisible();

//     const loginButton = page.getByRole("button", { name: "login" });
//     await expect(loginButton).toBeVisible();
//   });

//   test("login succeeds with correct credentials", async ({ page }) => {
//     await page.goto("http://localhost:5173/");

//     const loginForm = await page.locator(".login-form");
//     await expect(loginForm).toBeVisible();

//     const usernameInput = page.getByRole("textbox", { name: "username" });
//     await usernameInput.fill("adiyohanes");

//     const passwordInput = page.getByRole("textbox", { name: "password" });
//     await passwordInput.fill("adiyohanes");

//     const loginButton = page.locator("button", { name: "login" });
//     await loginButton.click();

//     const logoutButton = await page.locator("button", { name: "logout" });
//     await expect(logoutButton).toBeVisible();

//     const loggedInUsername = page.locator("p", {
//       hasText: "Adi Yohanes logged in",
//     });
//     await expect(loggedInUsername).toBeVisible();
//   });

//   test("should show and hide notification after 5 seconds", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:5173/");

//     await page.evaluate(() => {
//       const notify = (message, type) => {
//         const notification = document.createElement("div");
//         notification.className = "notification";
//         notification.innerText = message;
//         document.body.appendChild(notification);

//         // Simulasikan pemberitahuan yang hilang setelah 5 detik
//         setTimeout(() => {
//           notification.remove();
//         }, 5000);
//       };

//       notify("Error loading blogs", "error");
//     });

//     // Verifikasi pemberitahuan muncul
//     const notificationMessage = page.locator(".notification");
//     await expect(notificationMessage).toHaveText("Error loading blogs");
//     await expect(notificationMessage).toBeVisible();

//     await page.waitForTimeout(5000);

//     await expect(notificationMessage).toBeHidden();
//   });

//   test("should show success notification after login and hide after 5 seconds", async ({
//     page,
//   }) => {
//     await page.goto("http://localhost:5173/");

//     await page.fill("input#username", "adiyohanes");
//     await page.fill("input#password", "adiyohanes");
//     await page.click('button[type="submit"]');

//     const successNotification = page.locator('div[style*="green"]');
//     await expect(successNotification).toHaveText("Login successful");
//     await expect(successNotification).toBeVisible();

//     await page.waitForTimeout(5000); // Tunggu 5 detik...

//     await expect(successNotification).not.toBeVisible();
//   });
//   test("Login successful", async ({ page }) => {
//     await page.goto("http://localhost:5173/");

//     await page.getByRole("textbox", { name: "username" }).fill("adiyohanes");
//     await page.getByRole("textbox", { name: "password" }).fill("adiyohanes");
//     await page.getByRole("button", { name: "login" }).click();
//     await expect(page.getByText("Adi Yohanes logged in")).toBeVisible();
//   });

//   describe("When logged in", () => {
//     beforeEach(async ({ page }) => {
//       await page.goto("http://localhost:5173/");

//       await page.getByRole("textbox", { name: "username" }).fill("adiyohanes");
//       await page.getByRole("textbox", { name: "password" }).fill("adiyohanes");
//       await page.getByRole("button", { name: "login" }).click();
//       await expect(page.getByText("Adi Yohanes logged in")).toBeVisible();
//     });

//     test("Can create new blog", async ({ page }) => {
//       await page.getByRole("button", { name: "+ New Blog" }).click();
//       // Isi form untuk membuat blog
//       await page
//         .getByPlaceholder("Enter blog title")
//         .fill("Testing Blog Title");
//       await page.getByPlaceholder("Enter blog URL").fill("https://example.com");
//       await page.getByPlaceholder("Enter likes (default 0)").fill("5");

//       // Klik tombol "Create"
//       await page.getByRole("button", { name: "Create" }).click();
//     });
//   });
// });
