import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import user from "@testing-library/user-event";

describe("Navigation", () => {
  test("renders CTA", () => {
    const testFn = jest.fn();
    render(<Navigation changeTheme={testFn} />);
    const buttonElement = screen.getByText(/New query/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("minimize Navbar", async () => {
    const testFn = jest.fn();
    render(<Navigation changeTheme={testFn} />);
    user.setup();
    const minimizeElement = screen.getByTestId("minimize");
    await user.click(minimizeElement);

    const hamburgerElement = screen.getByTestId("hamburger");
    expect(hamburgerElement).toBeInTheDocument();
  });
});
