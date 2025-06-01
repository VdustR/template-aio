import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { App } from "./App";
import { Theme } from "./theme";

describe("app", () => {
  it("should render the App component and increment count on button click", async () => {
    const screen = render(
      <Theme>
        <App />
      </Theme>,
    );

    // Check initial count
    const initialCountDisplay = screen.getByText(/Count: 0/i);
    await expect.element(initialCountDisplay).toBeVisible();
    await expect.element(initialCountDisplay).toHaveTextContent("Count: 0");

    // Find and click the button
    const button = screen.getByRole("button", { name: /increase/i });
    await button.click();

    // Check if count incremented
    const firstIncrementDisplay = screen.getByText(/Count: 1/i);
    await expect.element(firstIncrementDisplay).toBeVisible();
    await expect.element(firstIncrementDisplay).toHaveTextContent("Count: 1");

    // Click again
    await button.click();

    // Check if count incremented again
    const secondIncrementDisplay = screen.getByText(/Count: 2/i);
    await expect.element(secondIncrementDisplay).toBeVisible();
    await expect.element(secondIncrementDisplay).toHaveTextContent("Count: 2");
  });
});
