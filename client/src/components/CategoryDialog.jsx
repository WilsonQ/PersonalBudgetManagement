import React, { useRef, useState, useEffect } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CategoryIcon from "@material-ui/icons/Category";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import IconButton from "@material-ui/core/IconButton";

import InputBaseDebounce from "./InputBaseDebounce";
import { getCategories, createCategory } from "../service/api/apiBackend";

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  category: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
function ConfirmationDialogRaw(props) {
  const classes = useStyles2();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [create, setCreate] = React.useState(false);
  const [reRender, setReRender] = React.useState(false);
  const radioGroupRef = React.useRef(null);
  const [categoriesData, setCategoriesData] = useState([]);
  let refs = useRef([React.createRef(), React.createRef()]);
  let categoryRef = useRef(null);
  let btnRef = useRef(React.createRef());

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
  useEffect(() => {
    if (create) {
      console.log("focus", categoryRef.current.children[0], create);
      categoryRef.current.children[0].focus();
    } else {
      if (categoryRef.current != null) {
        categoryRef.current.children[0].value = "";
      }
    }
  }, [create]);

  const handleCancel = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table("new category", categoryRef.current.children[0].value);
    let category = { category: categoryRef.current.children[0].value };
    let resp = await createCategory(category);
    console.log("que retorna", resp);
    if (resp === 200) {
      categoryRef.current.children[0].value = "";
      setReRender(true);
    }
  };

  const handleOk = () => {
    onClose(value);
  };
  const handleBlur = (e) => {
    console.log(e);
    console.log("ref", btnRef.current);
    console.log("ref", window.event);
    setCreate(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleUpdate = (i) => {
    console.table("on focus", refs.current);
    console.log("que viene en", refs.current);
    refs.current[i].current.children[0].focus();
  };

  useEffect(() => {
    console.log("Empezando el get");
    async function getData() {
      console.log("Buscando Categorias");
      const dataResponse = await getCategories();
      setCategoriesData(dataResponse.data);
      console.log("tengo las categorias ", dataResponse);
      await updateLength(dataResponse.data);
    }
    const updateLength = (categoriesData) => {
      for (let index = 0; index < categoriesData.length; index++) {
        refs.current[index] = refs.current[index] || React.createRef();
      }
    };
    getData();
  }, [reRender]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        <div className={classes.root}>
          {create && (
            <IconButton
              ref={btnRef}
              onClick={handleSubmit}
              className={classes.iconButton}
              aria-label="save"
            >
              <CheckIcon />
            </IconButton>
          )}

          <InputBase
            ref={categoryRef}
            onBlur={handleBlur}
            onClick={() => setCreate(true)}
            className={classes.input}
            placeholder="Add new category"
            inputProps={{ "aria-label": "add new category" }}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="create"
            onClick={() => setCreate(!create)}
          >
            {!create ? <AddIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {categoriesData.map((data, i) => {
          return (
            <div className={classes.root} key={data.category_id}>
              <InputBaseDebounce
                index={i}
                focus={handleUpdate}
                refs={refs}
                data={data}
              />
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}));

export default function SimpleDialogDemo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div>
      {/* <ListItem onClick={handleClickListItem}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="New Operations" />
      </ListItem>
      <ListItem */}
      <ListItem button onClick={handleClickListItem} role="listitem">
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="New Operations" />
      </ListItem>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
