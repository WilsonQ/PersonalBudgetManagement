/* eslint-disable no-use-before-define */
/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

export default function CountrySelect({ onInputChange, register }) {
  const filter = createFilterOptions();
  // const { register, errors, handleSubmit, control } = useForm();

  return (
    <Autocomplete
      fullWidth
      margin="normal"
      style={{ margin: 10 }}
      InputLabelProps={{
        shrink: true,
      }}
      multiple
      options={top100Films}
      defaultValue={[top100Films[13]]}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            id: 123,
            category: params.inputValue,
            state: "new",
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.category;
      }}
      renderOption={(option) => option.category}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Category"
          placeholder="Favorites"
          onChange={(e, data) => onInputChange(e, data)}
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { category: "The Shawshank Redemption", id_category: 1994 },
  { category: "The Godfather", id_category: 1972 },
  { category: "The Godfather: Part II", id_category: 1974 },
  { category: "The Dark Knight", id_category: 2008 },
  { category: "12 Angry Men", id_category: 1957 },
  { category: "Schindler's List", id_category: 1993 },
  { category: "Pulp Fiction", id_category: 1994 },
  {
    category: "The Lord of the Rings: The Return of the King",
    id_category: 2003,
  },
  { category: "The Good, the Bad and the Ugly", id_category: 1966 },
  { category: "Fight Club", id_category: 1999 },
  {
    category: "The Lord of the Rings: The Fellowship of the Ring",
    id_category: 2001,
  },
  {
    category: "Star Wars: Episode V - The Empire Strikes Back",
    id_category: 1980,
  },
  { category: "Forrest Gump", id_category: 1994 },
  { category: "Inception", id_category: 2010 },
  { category: "The Lord of the Rings: The Two Towers", id_category: 2002 },
  { category: "One Flew Over the Cuckoo's Nest", id_category: 1975 },
  { category: "Goodfellas", id_category: 1990 },
  { category: "The Matrix", id_category: 1999 },
  { category: "Seven Samurai", id_category: 1954 },
  { category: "Star Wars: Episode IV - A New Hope", id_category: 1977 },
  { category: "City of God", id_category: 2002 },
  { category: "Se7en", id_category: 1995 },
  { category: "The Silence of the Lambs", id_category: 1991 },
  { category: "It's a Wonderful Life", id_category: 1946 },
  { category: "Life Is Beautiful", id_category: 1997 },
  { category: "The Usual Suspects", id_category: 1995 },
  { category: "Léon: The Professional", id_category: 1994 },
  { category: "Spirited Away", id_category: 2001 },
  { category: "Saving Private Ryan", id_category: 1998 },
  { category: "Once Upon a Time in the West", id_category: 1968 },
  { category: "American History X", id_category: 1998 },
  { category: "Interstellar", id_category: 2014 },
  { category: "Casablanca", id_category: 1942 },
  { category: "City Lights", id_category: 1931 },
  { category: "Psycho", id_category: 1960 },
  { category: "The Green Mile", id_category: 1999 },
  { category: "The Intouchables", id_category: 2011 },
  { category: "Modern Times", id_category: 1936 },
  { category: "Raiders of the Lost Ark", id_category: 1981 },
  { category: "Rear Window", id_category: 1954 },
  { category: "The Pianist", id_category: 2002 },
  { category: "The Departed", id_category: 2006 },
  { category: "Terminator 2: Judgment Day", id_category: 1991 },
  { category: "Back to the Future", id_category: 1985 },
  { category: "Whiplash", id_category: 2014 },
  { category: "Gladiator", id_category: 2000 },
  { category: "Memento", id_category: 2000 },
  { category: "The Prestige", id_category: 2006 },
  { category: "The Lion King", id_category: 1994 },
  { category: "Apocalypse Now", id_category: 1979 },
  { category: "Alien", id_category: 1979 },
  { category: "Sunset Boulevard", id_category: 1950 },
  {
    category:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    id_category: 1964,
  },
  { category: "The Great Dictator", id_category: 1940 },
  { category: "Cinema Paradiso", id_category: 1988 },
  { category: "The Lives of Others", id_category: 2006 },
  { category: "Grave of the Fireflies", id_category: 1988 },
  { category: "Paths of Glory", id_category: 1957 },
  { category: "Django Unchained", id_category: 2012 },
  { category: "The Shining", id_category: 1980 },
  { category: "WALL·E", id_category: 2008 },
  { category: "American Beauty", id_category: 1999 },
  { category: "The Dark Knight Rises", id_category: 2012 },
  { category: "Princess Mononoke", id_category: 1997 },
  { category: "Aliens", id_category: 1986 },
  { category: "Oldboy", id_category: 2003 },
  { category: "Once Upon a Time in America", id_category: 1984 },
  { category: "Witness for the Prosecution", id_category: 1957 },
  { category: "Das Boot", id_category: 1981 },
  { category: "Citizen Kane", id_category: 1941 },
  { category: "North by Northwest", id_category: 1959 },
  { category: "Vertigo", id_category: 1958 },
  { category: "Star Wars: Episode VI - Return of the Jedi", id_category: 1983 },
  { category: "Reservoir Dogs", id_category: 1992 },
  { category: "Braveheart", id_category: 1995 },
  { category: "M", id_category: 1931 },
  { category: "Requiem for a Dream", id_category: 2000 },
  { category: "Amélie", id_category: 2001 },
  { category: "A Clockwork Orange", id_category: 1971 },
  { category: "Like Stars on Earth", id_category: 2007 },
  { category: "Taxi Driver", id_category: 1976 },
  { category: "Lawrence of Arabia", id_category: 1962 },
  { category: "Double Indemnity", id_category: 1944 },
  { category: "Eternal Sunshine of the Spotless Mind", id_category: 2004 },
  { category: "Amadeus", id_category: 1984 },
  { category: "To Kill a Mockingbird", id_category: 1962 },
  { category: "Toy Story 3", id_category: 2010 },
  { category: "Logan", id_category: 2017 },
  { category: "Full Metal Jacket", id_category: 1987 },
  { category: "Dangal", id_category: 2016 },
  { category: "The Sting", id_category: 1973 },
  { category: "2001: A Space Odyssey", id_category: 1968 },
  { category: "Singin' in the Rain", id_category: 1952 },
  { category: "Toy Story", id_category: 1995 },
  { category: "Bicycle Thieves", id_category: 1948 },
  { category: "The Kid", id_category: 1921 },
  { category: "Inglourious Basterds", id_category: 2009 },
  { category: "Snatch", id_category: 2000 },
  { category: "3 Idiots", id_category: 2009 },
  { category: "Monty Python and the Holy Grail", id_category: 1975 },
];
