import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CategoryIcon from "@material-ui/icons/Category";
import { CategoriesContext } from "./ListOperations";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ChipTabs = withStyles({
  root: {
    alignItems: "center",
    minHeight: "0px",
    padding: 5,
  },
})(Tabs);

const ChipTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    backgroundColor: "#e0e0e0",
    borderRadius: "16px",
    minWidth: 0,
    minHeight: 0,
    height: "25px",
    fontSize: "0.7000rem",
    whiteSpace: "nowrap",
    marginRight: "3px",
  },
}))((props) => <Tab {...props} />);
export default function ScrollableTabsButtonAuto({ categories }) {
  console.log("-----> categories", categories);
  const { state, dispatch } = React.useContext(CategoriesContext);
  console.log("-----> state", state.categorySearch);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [categorySearch, setCategorySearch] = React.useState("NEXGENE");

  const handleChange = (event, newValue) => {
    console.log("Que valor se guarda", newValue);
    dispatch({
      type: "CHANCE_VALUE_TABS",
      payload: newValue,
    });
  };

  useEffect(() => {
    console.log(categorySearch);
  }, [categorySearch]);

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default"> */}
      <ChipTabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        textColor="primary"
        scrollButtons="on"
        aria-label="scrollable auto tabs example"
        indicatorColor="white"
      >
        {categories &&
          categories.map((categoryObject, i) => {
            return (
              <ChipTab
                key={i}
                onClick={() => {
                  dispatch({
                    type: "SEARCH_CATEGORY",
                    payload: categoryObject,
                  });
                }}
                label={categoryObject.category}
                {...a11yProps(i)}
              />
            );
          })}
      </ChipTabs>
      {/* </AppBar> */}
      {/* {categories.map((categoryObject, i) => {
        return (
          <TabPanel value={value} index={i}>
            {categoryObject.category}
          </TabPanel>
        );
      })} */}
    </div>
  );
}
