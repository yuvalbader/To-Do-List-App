import Simplert from "react-simplert";

export default function ErrorAlert(props) {
  return (
    <Simplert
      showSimplert={props.show}
      onClose={() => props.onClose()}
      type={"info"}
      message={props.message}
    />
  );
}
