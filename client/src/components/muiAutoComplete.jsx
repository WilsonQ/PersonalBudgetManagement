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
  // eslint-disable-next-line no-unused-vars
  const [optionsDate, setOptionsDate] = React.useState(top100Films);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    console.log("Empezando el get");
    async function getData() {
      console.log("hola");
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
            category: params.inputValue,
            category_id: 2021,
            state: "new",
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
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
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
          label="Checkboxes"
          placeholder="Favorites"
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { category: "The Shawshank Redemption", category_id: 1994 },
  { category: "The Godfather", category_id: 1972 },
  { category: "The Godfather: Part II", category_id: 1974 },
  { category: "The Dark Knight", category_id: 2008 },
  { category: "12 Angry Men", category_id: 1957 },
  { category: "Schindler's List", category_id: 1993 },
  { category: "Pulp Fiction", category_id: 1994 },
  {
    category: "The Lord of the Rings: The Return of the King",
    category_id: 2003,
  },
  { category: "The Good, the Bad and the Ugly", category_id: 1966 },
  { category: "Fight Club", category_id: 1999 },
  {
    category: "The Lord of the Rings: The Fellowship of the Ring",
    category_id: 2001,
  },
  {
    category: "Star Wars: Episode V - The Empire Strikes Back",
    category_id: 1980,
  },
  { category: "Forrest Gump", category_id: 1994 },
  { category: "Inception", category_id: 2010 },
  { category: "The Lord of the Rings: The Two Towers", category_id: 2002 },
  { category: "One Flew Over the Cuckoo's Nest", category_id: 1975 },
  { category: "Goodfellas", category_id: 1990 },
  { category: "The Matrix", category_id: 1999 },
  { category: "Seven Samurai", category_id: 1954 },
  { category: "Star Wars: Episode IV - A New Hope", category_id: 1977 },
  { category: "City of God", category_id: 2002 },
  { category: "Se7en", category_id: 1995 },
  { category: "The Silence of the Lambs", category_id: 1991 },
  { category: "It's a Wonderful Life", category_id: 1946 },
  { category: "Life Is Beautiful", category_id: 1997 },
  { category: "The Usual Suspects", category_id: 1995 },
  { category: "Léon: The Professional", category_id: 1994 },
  { category: "Spirited Away", category_id: 2001 },
  { category: "Saving Private Ryan", category_id: 1998 },
  { category: "Once Upon a Time in the West", category_id: 1968 },
  { category: "American History X", category_id: 1998 },
  { category: "Interstellar", category_id: 2014 },
];
