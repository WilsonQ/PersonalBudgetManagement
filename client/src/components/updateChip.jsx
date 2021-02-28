import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function updateCategory({ category, handleUpdate, margin }) {
  const setCategory = () => {
    console.log("Dentro de Dialog", category);
    handleUpdate(category);
  };
  return (
    <IconButton aria-label="delete" onClick={setCategory} className={margin}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
