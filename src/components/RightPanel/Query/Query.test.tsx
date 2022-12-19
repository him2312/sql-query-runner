import { render, screen } from "@testing-library/react";
import { Query } from "./Query";
import user from "@testing-library/user-event";

describe("Query", () => {
  test("renders", () => {
    render(<Query/>);
    const queryElement = screen.getByTestId("query-box");
    expect(queryElement).toBeInTheDocument();
  });

  test("user input", async () => {
    render(<Query/>);
    user.setup();
    
    const queryInputElement = screen.getByTestId('query-input');
    await user.type(queryInputElement, 'select * from users');
    expect(queryInputElement).toHaveValue('select * from users');
  });

  test("run query", async () => {
    render(<Query/>);
    user.setup();

    const queryInputElement = screen.getByTestId('query-input');
    await user.type(queryInputElement, 'select * from');

    const runQueryElement = screen.getByTestId('query-runner');
    expect(runQueryElement).toBeDisabled();

    await user.type(queryInputElement, 'select * from users');
    expect(runQueryElement).toBeEnabled();
  });

  test('bookmark', async () => {
    render(<Query/>);
    user.setup();

    const queryInputElement = screen.getByTestId('query-input');
    await user.type(queryInputElement, 'select * from users');

    const notBookmarkedElement = screen.getByTestId('not-bookmarked');
    expect(notBookmarkedElement).toBeInTheDocument();

    const bookmarkCta = screen.getByTestId('bookmark-cta');
    await user.click(bookmarkCta);

    // A bookmark is marked on the next render
    setTimeout(() => {
        const bookmarkedElement = screen.getByTestId('bookmarked');
        expect(bookmarkedElement).toBeInTheDocument();
    }, 0)
  })
});
