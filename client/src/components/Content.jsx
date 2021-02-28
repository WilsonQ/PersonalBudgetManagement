import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import CustomCard from "./Card1";
import coffeMakerList from "./constants";

import { getOperations } from "../service/api/apiBackend";

const Content = () => {
  const GetCoffeMakerCard = (coffeMaker) => {
    // const [categoriesData, setCategoriesData] = useState([]);

    // useEffect(() => {
    //   console.log("Empezando el get");
    //   async function getData() {
    //     console.log("hola");
    //     const dataResponse = await getCategories();
    //     setCategoriesData(dataResponse.data);
    //     console.log("tengo la data", dataResponse);
    //   }
    //   getData();
    // }, [setCategoriesData]);

    return (
      <Grid item xs={12} sm={6} md={4}>
        <CustomCard {...coffeMaker} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={4}>
      {coffeMakerList.map((coffeMakerObj) => GetCoffeMakerCard(coffeMakerObj))}
    </Grid>
  );
};

export default Content;
