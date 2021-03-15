/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getCategories } from "../service/api/apiBackend";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions();

export default function CheckboxesTags({ categories, setCategories, autoC }) {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataResponse = await getCategories();
      setCategoriesData(dataResponse.data);
      console.log("tengo la data", dataResponse);
    }
    getData();
  }, [setCategoriesData]);

  const handleOnChange = (event, newValue) => {
    console.log(newValue);
    if (typeof newValue === "string") {
      setCategories({
        category: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setCategories({
        category: newValue.inputValue,
      });
    } else {
      setCategories(newValue);
    }
  };

  return (
    <Autocomplete
      margin="normal"
      fullWidth
      ref={autoC}
      multiple
      value={categories || ""}
      onChange={handleOnChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            category: `Add "${params.inputValue}"`,
            inputValue: params.inputValue,
            available: true,
            newCategory: true,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="checkboxes-tags-demo"
      options={categoriesData || []}
      disableCloseOnSelect
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        console.log(option);
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          option.category = option.inputValue;
          return option.inputValue;
        }
        // Regular option
        return option.category;
      }}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.category}
        </React.Fragment>
      )}
      style={{ margin: 8 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Categories"
          placeholder="Categories"
        />
      )}
    />
  );
}
