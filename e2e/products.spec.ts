import { test, expect } from "@playwright/test";

test.describe("Products Page", () => {
  test("should display IP Design AC EV Charger in EV Charging category", async ({
    page,
  }) => {
    await page.goto("/products");
    await page.getByRole("button", { name: /EV Charging/i }).click();
    await expect(
      page.getByRole("heading", { name: /IP Design AC EV Charger/i })
    ).toBeVisible();
  });

  test("should display Wall Charger Box in EV Charging category", async ({
    page,
  }) => {
    await page.goto("/products");
    await page.getByRole("button", { name: /EV Charging/i }).click();
    await expect(
      page.getByRole("heading", { name: /Wall Charger Box/i })
    ).toBeVisible();
  });
});

test.describe("IP Design AC EV Charger Detail Page", () => {
  test("should load with correct title and specs", async ({ page }) => {
    await page.goto("/products/ev-charging-32");
    await expect(
      page.getByRole("heading", { name: /IP Design AC EV Charger/i })
    ).toBeVisible();
    await expect(page.getByText("ZD01-32A").first()).toBeVisible();
    await expect(page.getByText("7kW").first()).toBeVisible();
    await expect(page.getByText("IP65").first()).toBeVisible();
  });

  test("should display product images", async ({ page }) => {
    await page.goto("/products/ev-charging-32");
    const images = page.locator("img[src*='ip-design']");
    await expect(images.first()).toBeVisible();
  });
});

test.describe("Wall Charger Box Detail Page", () => {
  test("should load with correct title and specs", async ({ page }) => {
    await page.goto("/products/ev-charging-box");
    await expect(
      page.getByRole("heading", { name: /Wall Charger Box/i })
    ).toBeVisible();
    await expect(page.getByText("Cold Rolled Steel").first()).toBeVisible();
    await expect(page.getByText("IP65").first()).toBeVisible();
  });

  test("should display product images", async ({ page }) => {
    await page.goto("/products/ev-charging-box");
    const images = page.locator("img[src*='wall-charger-box']");
    await expect(images.first()).toBeVisible();
  });
});

test.describe("Product 404", () => {
  test("should handle non-existent product gracefully", async ({ page }) => {
    const response = await page.goto("/products/non-existent-product-xyz");
    expect(response?.status()).toBe(404);
  });
});
