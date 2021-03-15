import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import CustomCard from "./Card1";
import coffeMakerList from "./constants";

import { getOperations, getCategories } from "../service/api/apiBackend";
import { CategoriesContext } from "./ListOperations";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log("-----> children", children);

  const GetOperationsCard = (operation, i) => {
    return (
      <Grid key={i} item xs={12} sm={6} md={4}>
        <CustomCard {...operation} />
      </Grid>
    );
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {children.operations && (
        <Grid container spacing={4}>
          {children.operations.map((operation, i) =>
            GetOperationsCard(operation, i)
          )}
        </Grid>
      )}
    </div>
  );
}
const Content = () => {
  const [operationsData, setOperationsData] = useState({});
  const [value, setValue] = React.useState(1);
  const { state, dispatch } = React.useContext(CategoriesContext);

  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    console.log("Empezando el get");
    async function getData() {
      console.log("hola");
      const dataResponse = await getOperations();
      await setOperationsData(dataResponse.data);
      console.log("tengo la data", dataResponse);
    }
    getData();
  }, []);

  return (
    <>
      <TabPanel value={value} index={1}>
        {operationsData}
      </TabPanel>
    </>
  );
};

export default Content;
