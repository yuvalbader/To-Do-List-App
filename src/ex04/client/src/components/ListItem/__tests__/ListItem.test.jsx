import renderer from "react-test-renderer";
import ListItem from "../ListItem";
import { store } from "../../../Redux/store";

const task = {
  id: "1",
  taskContent: "catch picatch",
  isDone: false,
  imgUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

test("Render correctly listItem of this task", () => {
  const tree = renderer.create(<ListItem store={store} item={task} />).toJSON();
  expect(tree).toMatchSnapshot();
});
