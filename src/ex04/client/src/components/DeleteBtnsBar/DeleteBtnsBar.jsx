import React from "react";
import "../DeleteBtnsBar/DeleteBtnsBar.css";
import PropTypes from "prop-types";

export default function DeleteBtnsBar({ handleDeleteAll }) {
  return (
    <div className="btns-container">
      <div className="col-md-6 delete-all-btn">
        <button
          type="button"
          className="btn btn-danger btn-block mt-1"
          onClick={handleDeleteAll}
        >
          Delete all tasks
        </button>
      </div>
    </div>
  );
}

DeleteBtnsBar.prototype = {
  handleDeleteAll: PropTypes.func.isRequired,
};
