import React, { useState, useEffect } from "react";
import Search from "./Search";
import Content from "./Content";
import { Grid } from "@material-ui/core";
import { getOperations, getCategories } from "../service/api/apiBackend";

import TabCategories from "./TabCategories";
import Select from "./SelectCategory";

export const CategoriesContext = React.createContext();
const initialState = {
  categories: [],
  categorySearch: {},
  value: 0,
  isFetching: false,
  hasError: false,
  isCategoriesSubmitting: false,
  categoriesHasError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_REQUEST": //si inicia la solicitud de las canciones
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_CATEGORIES_SUCCESS": // Solicitud exitosa
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case "FETCH_CATEGORIES_FAILURE": //Error de solicitud
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case "SEARCH_CATEGORY": //Inici de solicitud de agregar nueva cancion
      return {
        ...state,
        categorySearch: action.payload,
      };
    case "CHANCE_VALUE_TABS": //solicitud exitosa
      return {
        ...state,
        value: action.payload,
      };
    case "ADD_SONG_FAILURE": //Error de solicitud
      return {
        ...state,
        isSongSubmitting: false,
        songHasError: true,
      };
    default:
      return state;
  }
};

export default function App() {
  const [operationsData, setOperationsData] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // useEffect(() => {
  //   console.log("Empezando el get");
  //   async function getData() {
  //     console.log("hola");
  //     const dataResponse = await getOperations();
  //     await setOperationsData(dataResponse.data);
  //     console.log("tengo la data", dataResponse);
  //   }
  //   getData();
  // }, []);
  useEffect(() => {
    dispatch({
      type: "FETCH_CATEGORIES_REQUEST",
    });
    console.log("Empezando el get");
    async function getData() {
      console.log("Buscando Categorias");
      try {
        const dataResponse = await getCategories();
        //setCategoriesData(dataResponse.data);
        console.log("tengo las categorias ", dataResponse.data);
        dispatch({
          type: "FETCH_CATEGORIES_SUCCESS",
          payload: dataResponse.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_CATEGORIES_FAILURE",
        });
      }
    }
    getData();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item container>
          <Grid item xs={false} sm={2} />
          {/* //?Esta parte se dedica a buscar todo */}
          <Search />
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Select />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <TabCategories categories={state.categories} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Content />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </CategoriesContext.Provider>
  );
}
