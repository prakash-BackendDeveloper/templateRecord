import React from "react";

const AddItem = ({ handleSubmit, open, setOpen }) => {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button type="submit" className="add">
          Add New Template
        </button>
      </form>
    </div>
  );
};

export default AddItem;
