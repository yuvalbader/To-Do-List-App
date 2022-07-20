import "../TodoFilter/TodoFilter.css";
import { connect } from "react-redux";
import { setVisabilityAction } from "../../Redux/actions/tasksActions";

function TodoFilter(props) {
  return (
    <div className="row filter_btns">
      <div className="col filter_btn">
        <button
          type="button"
          className="btn btn-danger btn-block mt-1 "
          onClick={() => props.setVisability("SHOW_ALL")}
        >
          All
        </button>
      </div>
      <div className="col filter_btn">
        <button
          type="button"
          className="btn btn-danger btn-block mt-1  "
          onClick={() => props.setVisability("SHOW_COMPLETED")}
        >
          Completed
        </button>
      </div>
      <div className="col filter_btn ">
        <button
          type="button"
          className="btn btn-danger btn-block mt-1 "
          onClick={() => props.setVisability("SHOW_ACTIVE")}
        >
          Active
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.itemsEntities.tasks,
    visibilityFilter: state.itemsEntities.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setVisability: (visibility) => dispatch(setVisabilityAction(visibility)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
