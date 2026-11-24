import { expect, test, type Page } from "@playwright/test";

/** Set the test-only flag that skips the intro, so tests start on the page itself. */
async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("skip-intro", "1"));
}

/** The progress bar only moves once React has hydrated, so clicks after this are handled. */
async function waitForIntroToRun(page: Page) {
  await expect(page.getByRole("progressbar", { name: "Loading portfolio" })).not.toHaveAttribute("aria-valuenow", "0");
}

test.describe("intro", () => {
  test("plays on first visit and can be skipped", async ({ page }) => {
    await page.goto("/");
    const intro = page.getByRole("dialog", { name: "Intro" });
    await expect(intro).toBeVisible();
    await waitForIntroToRun(page);

    await page.getByRole("button", { name: /Skip intro/ }).click();
    await expect(intro).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Every feature");
  });

  test("finishes on its own", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: "Intro" })).toHaveCount(0, { timeout: 15_000 });
  });

  test("plays again on every page load", async ({ page }) => {
    await page.goto("/");
    await waitForIntroToRun(page);
    await page.getByRole("button", { name: /Skip intro/ }).click();
    await expect(page.getByRole("dialog", { name: "Intro" })).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Intro" })).toBeVisible();
  });

  test("is skipped for visitors who prefer reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Intro" })).toHaveCount(0);
    await context.close();
  });
});

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
  });

  test("lists shipped products first and links to each case study", async ({ page }) => {
    const rows = page.locator("#work a.prow");
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText("Pawfolio");
    await expect(rows.nth(1)).toContainText("ICPEP.SE Website");
    await expect(rows.nth(2)).toContainText("Live-stats scoring");

    await rows.nth(1).click();
    await expect(page).toHaveURL(/#icpep$/);
  });

  test("ICPEP.SE case study shows the real site and links to it", async ({ page }) => {
    const icpep = page.locator("#icpep");
    await expect(icpep.getByRole("img", { name: /ICPEP\.SE BulSU Meneses Campus website/ })).toBeVisible();
    await expect(icpep.getByRole("link", { name: /Visit live site/ })).toHaveAttribute("href", "https://icpep-mc.vercel.app/");
    await expect(icpep.getByRole("link", { name: /Source code/ })).toHaveCount(0);
  });

  test("Pawfolio case study shows the real site and links to it", async ({ page }) => {
    const pawfolio = page.locator("#pawfolio");
    await expect(pawfolio.getByRole("img", { name: /Pawfolio homepage/ })).toBeVisible();
    await expect(pawfolio.getByRole("link", { name: /Visit live site/ })).toHaveAttribute(
      "href",
      "https://pawfolio-service.vercel.app/",
    );
    await expect(pawfolio.getByRole("link", { name: /Source code/ })).toHaveCount(0);
  });

  test("internship case study shows a labelled illustration and no public links", async ({ page }) => {
    const livestats = page.locator("#livestats");
    await expect(livestats.getByRole("heading", { name: "Courtside scoring, in real time." })).toBeVisible();
    await expect(livestats.getByRole("img", { name: /Illustration of the game clock and period controller UI/ })).toBeVisible();
    await expect(livestats).not.toContainText(/volleyball serve|serve receive/i);
    await expect(livestats).toContainText("the visual is an illustration, not a screenshot");
    await expect(livestats.getByRole("link")).toHaveCount(0);
    await expect(livestats.getByRole("button")).toHaveCount(0);
    await expect(page.getByText(/mini version/i)).toHaveCount(0);
  });

  test("résumé links serve the PDF", async ({ page, request }) => {
    const href = await page.getByRole("link", { name: /Full résumé/ }).getAttribute("href");
    expect(href).toBe("/Piedad_Czerina_CV.pdf");
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });

  test("stack comes before the projects and lists every layer", async ({ page }) => {
    const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids.indexOf("stack")).toBeGreaterThan(-1);
    expect(ids.indexOf("stack")).toBeLessThan(ids.indexOf("work"));

    const stack = page.locator("#stack");
    for (const layer of ["Frontend", "Backend", "Data", "Deploy", "Quality"]) {
      await expect(stack.getByRole("heading", { name: layer })).toBeVisible();
    }
    await expect(stack.getByRole("list", { name: "Backend tools" })).toContainText("Laravel");
  });

  test("process tabs switch panels", async ({ page }) => {
    const testTab = page.getByRole("tab", { name: /Test it/ });
    await testTab.click();
    await expect(testTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("✓ 38 passed")).toBeVisible({ timeout: 10_000 });
  });

  test("navigation points at sections that exist", async ({ page, isMobile }) => {
    test.skip(isMobile, "The section links are hidden on phones; only “Let's talk” shows.");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Stack", "Work", "Process", "Experience", "Contact"]) {
      const href = await nav.getByRole("link", { name }).getAttribute("href");
      await expect(page.locator(href!)).toHaveCount(1);
    }
  });
});

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/#contact");
  });

  test("shows server-side validation errors", async ({ page }) => {
    await page.getByRole("button", { name: /Send message/ }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("aria-invalid", "true");
  });

  test("keeps what was typed when another field is invalid", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).fill("Ada Lovelace");
    await page.getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByRole("button", { name: /Send message/ }).click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Ada Lovelace");
  });

  test("sends a valid message and clears the form", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).fill("Ada Lovelace");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByLabel("Message", { exact: true }).fill("Hi Czerina, we'd love to talk about a full stack role.");
    await page.getByRole("button", { name: /Send message/ }).click();

    await expect(page.locator("form").getByRole("status")).toContainText("Thanks");
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");
  });
});
