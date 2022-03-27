import React from "react";
import makeStyles from "@mui/styles/makeStyles";

import { Box, Grid, Paper, Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.palette.radius.medium,
    backgroundColor: theme.palette.white,
    transition: "all 0.5s ease",
    cursor: "pinter",
    border: `1px solid ${theme.palette.gray[700]}`,
    cursor: "pointer",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "&:hover": {
      boxShadow:
        "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
      borderColor: "transparent",
    },
  },

  title: {
    fontSize: theme.palette.fontSizes.base,
    color: theme.palette.text.primary,
    fontWeight: theme.palette.fontWeights.semiBold,
  },
  value: {
    fontSize: theme.palette.fontSizes.xxl,
    color: theme.palette.text.primary,
    fontWeight: theme.palette.fontWeights.bold,
    marginTop: theme.spacing(1),
  },
}));

const InfoCard = ({ title, value, currency }) => {
  const classes = useStyles();

  return (
    <Grid item lg={3}>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="h6" color="darkgrey">
          {title}
        </Typography>

        <Typography variant="h6" color="primary">
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
};
export default InfoCard;
