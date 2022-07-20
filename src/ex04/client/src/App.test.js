import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import App from "./App";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Todo List/i);
  expect(linkElement).toBeInTheDocument();
});
