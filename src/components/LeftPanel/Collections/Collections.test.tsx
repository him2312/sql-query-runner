import { render, screen } from "@testing-library/react";
import { Collection } from "./Collections";
import user from '@testing-library/user-event';

describe("Collection", () => {
  test("renders", async () => {
    user.setup();
    render(<Collection/>);
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement).toBeInTheDocument();

    await user.click(toggleElement);

    const titleElement = screen.getByText(/SAVED/g);
    expect(titleElement).toBeInTheDocument();
  });
});
