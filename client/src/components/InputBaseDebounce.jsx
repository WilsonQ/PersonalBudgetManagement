import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDebounce } from "use-debounce";

import ButtonIconAction from "./iconProcess";
import { updateCategory, removeCategory } from "../service/api/apiBackend";

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(0.2),
    },
    margin: 1,
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
    padding: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Input({ index, refs, data, focus }) {
  const classes = useStyles2();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const [text, setText] = useState(data.category);
  const [countries, setCountries] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [debouncedText] = useDebounce(text, 2500);

  useEffect(() => {
    console.log("RECEPT");
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    async function sentData(update) {
      console.log("data update------>", update);
      const dataResponse = await updateCategory(update);
      if (dataResponse === 200) {
        //await setCategoriesData(index, updateCategoryObject);
        setSuccess(true);
        setLoading(false);
      }
      console.log("tengo la data", dataResponse);
    }
    // {}, true, false
    console.log(
      "%c Oh my heavens! ",
      "background: #222; color: #bada55",
      debouncedText
    );
    if (debouncedText && debouncedText.available !== undefined) {
      setSuccess(false);
      setLoading(true);
      sentData(debouncedText);
    } else {
      setCountries([]);
    }
    return () => {
      clearTimeout(timer.current);
      setSuccess(false);
      setLoading(false);
      console.log(
        "Canceled because of component unmounted or debounce Text changed"
      );
    };
  }, [debouncedText]);

  useEffect(() => {
    console.log("UPDATE");
    if (success) {
      timer.current = window.setTimeout(() => {
        setSuccess(false);
        setLoading(false);
      }, 700);
    }

    return () => {
      console.log("CLEAR");
      clearTimeout(timer.current);
    };
  }, [success]);

  const handleUpdate = (e) => {
    console.log("onChance", e.target.value);
    setText({
      category: e.target.value,
      category_id: data.category_id,
      available: data.available,
    });
  };
  const handleDelete = () => {
    console.log("onClick", data.category_id);
    removeCategory(data.category_id);
  };

  return (
    <div className={classes.root}>
      <ButtonIconAction
        handleFunction={handleDelete}
        icon={<DeleteIcon className={classes.iconButton} fontSize="small" />}
      />
      <InputBase
        ref={refs.current[index]}
        className={classes.input}
        defaultValue={text}
        name="category"
        placeholder="Category"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => handleUpdate(e)}
      />

      <ButtonIconAction
        icon={<EditIcon className={classes.iconButton} fontSize="small" />}
        handleFunction={() => focus(index)}
        loading={loading}
        success={success}
        setSuccess={() => setSuccess(false)}
      />
    </div>
  );
}
