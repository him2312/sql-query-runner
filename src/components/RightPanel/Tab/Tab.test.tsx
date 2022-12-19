import { render, screen } from "@testing-library/react";
import { Tab } from "./Tab";

describe("Tab", () => {
  test("renders", () => {
    render(<Tab/>);
    const tabGroupElement = screen.getByTestId("tab-group");
    expect(tabGroupElement).toBeInTheDocument();
  });

  test('add new tab', () => {
    render(<Tab/>);

    const addNewTabElement = screen.getByTestId('add-new-tab');
    expect(addNewTabElement).toBeInTheDocument();
  })
});
