import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
}));

const PageTitle = ({ title, endAction: EndAction, headerComponents }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">{title}</Typography>

      {EndAction && <EndAction />}
    </div>
  );
};

export default PageTitle;
