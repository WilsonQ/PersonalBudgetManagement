import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { removeOperation } from "../service/api/apiBackend";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ removeId }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    deleteCategory: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeOperationC = () => {
    console.log(state, removeId);
    removeOperation(removeId, state.deleteCategory);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete the operation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Selection if you want to delete the categories. To remove the
            categories, you only have to be related to this operation.
          </DialogContentText>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.deleteCategory}
                  onChange={handleChange}
                  name="deleteCategory"
                />
              }
              label="Delete All Categories"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={removeOperationC} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
