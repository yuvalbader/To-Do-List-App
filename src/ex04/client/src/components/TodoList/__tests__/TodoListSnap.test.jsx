import renderer from "react-test-renderer";
import TodoList from "../TodoList";
import { store } from "../../../Redux/store";


test("Render correctly empty tasks", () => {
  const tree = renderer
    .create(<TodoList store={store}  />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
