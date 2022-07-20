import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";
import { Provider } from "react-redux";
import { store } from "../../../Redux/store";

const items = [
  {
    id: 56,
    taskContent: "Take dog out for a walk",
    isDone: false,
    imgUrl: "",
  },
  {
    id: 32,
    taskContent: "Do the dishes",
    isDone: true,
    imgUrl: "",
  },
];

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <TodoList
          tasks={items}
          getTasks={jest.fn(() => items)}
          visibilityFilter={"SHOW_ALL"}
        />
      </Provider>
    );

    const dogTodo = screen.getByTestId(`item-${items[0].itemId}`);
    expect(dogTodo).toBeInTheDocument();
    expect(dogTodo).toHaveClass("fa-square");

    const dishesTodo = screen.getByTestId(`item-${items[1].itemId}`);
    expect(dishesTodo).toBeInTheDocument();
    expect(dishesTodo).toHaveClass("fa-check-square");
  });
});
