import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Divider, makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

import Chip from "./ChipCategory";
import { AppContext } from "../application/provider";

import Box from "@material-ui/core/Box";

import { Avatar, IconButton, CardMedia } from "@material-ui/core";
import ActionOperations from "./ActionOperations";
import MoreIcon from "@material-ui/icons/MoreVert";
import TabCategories from "./TabCategories";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  },
  header: {
    textAlign: "start",
    spacing: 10,
  },
  list: {
    padding: "20px",
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: "flex",
    justifyContent: "space-around",
  },
  subtitle: {
    color: "#f44336",
  },
}));

export const PricingCardDemo = React.memo(function PricingCard(props) {
  const {
    operation_id,
    operation_date,
    concept,
    amount,
    type,
    category,
  } = props;

  const classes = useStyles();
  return (
    <Card boxShadow={3} key={operation_id} className={classes.root}>
      <CardHeader
        title={concept}
        className={classes.header}
        subheader={operation_date}
        action={<ActionOperations operationUpdate={props} />}
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography className={classes.subtitle} variant="h3" align="center">
          ${amount}
        </Typography>
        <div className={classes.list}>
          <Typography variant="h4" component="h4">
            {type}
          </Typography>
        </div>
      </CardContent>
      {category && (
        <>
          <Divider variant="middle" />
          <Box pt={1} pb={1}>
            {/*  {category.map((cat) => (
              <Chip key={cat.category_id} categories={cat} />
            ))} */}
            <TabCategories categories={category} />
          </Box>
        </>
      )}
    </Card>
  );
});

export default PricingCardDemo;
