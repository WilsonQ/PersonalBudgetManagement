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

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
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
  const { avatarUrl, title, price, description, imageUrl } = props;
  //const [state, setState] = useContext(AppContext);

  let type = false;

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        className={classes.header}
        subheader="26/02/2021"
        action={<ActionOperations />}
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography className={classes.subtitle} variant="h3" align="center">
          {price}
        </Typography>
        <div className={classes.list}>
          <Typography
            style={{
              color: type ? "#FF9800" : "#4CAF50",
            }}
            variant="h4"
            component="h4"
          >
            {description}
          </Typography>
        </div>
      </CardContent>
      <Divider variant="middle" />
      <Box pt={1} pb={1}>
        <Chip />
      </Box>
    </Card>
  );
});

export default PricingCardDemo;
