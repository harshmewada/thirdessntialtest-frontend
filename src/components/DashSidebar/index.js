import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  ListSubheader,
} from "@mui/material";

import MuiListItem from "@mui/material/ListItem";

import LeftSideBarRoutes from "./LeftSideBarRoutes";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";

const DashSidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const navigate = (index, path) => {
    history.push(path);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const { name, email, role } = useSelector((state) => state.user);
  return (
    <Drawer
      container={container}
      variant="permanent"
      open={true}
      ModalProps={{
        keepMounted: true,
      }}
      classes={{ paper: classes.drawer }}
    >
      <Box className={classes.boxContainer}>
        <ListItem style={{ padding: 0 }}>
          <ListItemIcon>
            <Avatar
              className={classes.avatar}
              sx={{ bgcolor: deepOrange[500] }}
            >
              {name.charAt(0)}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.Maintitle}> {name}</Typography>
            }
            secondary={
              <Typography className={classes.MainSubTitle}>{email}</Typography>
            }
          />
        </ListItem>
      </Box>
      <List style={{ overflow: "auto" }}>
        {LeftSideBarRoutes.filter((d) => d.roles.includes(role)).map(
          (item, index) => {
            if (item.type === "heading") {
              return <div className={classes.ListSubHeader}>{item.title}</div>;
            }
            return (
              <>
                <ListItem
                  button
                  onClick={() => navigate(index, item.path)}
                  key={index}
                  selected={item.path === pathname}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography>{item.title}</Typography>
                  </ListItemText>
                </ListItem>
              </>
            );
          }
        )}
      </List>
    </Drawer>
  );
};
export default DashSidebar;
const ListItem = withStyles((theme) => ({
  root: {
    WebkitTapHighlightColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none",
    padding: "8px 20px 8px 40px",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    color: theme.palette.text.inverted,
    "&$selected": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      "&:before": {
        display: "block",
        top: "0px",
        right: "0px",
        width: "0.2rem",
        bottom: "0px",
        content: '""',
        position: "absolute",
        borderTopLeftRadius: "4px",
        borderBottomLeftRadius: "4px",
        backgroundColor: theme.palette.primary.main,
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
      "& .MuiTypography-root": {
        fontWeight: theme.palette.fontWeights.semiBold,
      },
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.inverted,
    },
    "& .MuiTypography-root": {
      fontSize: theme.palette.fontSizes.base,
    },
  },
  selected: {},
}))(MuiListItem);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: `1px solid ${theme.palette.gray[700]}`,
  },

  whiteDivider: {
    background: "white",
    height: "0.5px",
  },
  AdminIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
  },
  listSubHeader: {
    color: theme.palette.text.inverted,
  },
  drawer: {
    width: 280,
    overflow: "hidden",
  },
  boxContainer: {
    background: theme.palette.gray[500],
    borderRadius: theme.palette.radius.medium,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    margin: theme.spacing(2),
  },
  avatar: {
    background: theme.palette.primary.main,
    textTransform: "capitalize",
  },
  Maintitle: {
    fontSize: theme.palette.fontSizes.semibase,
    fontWeight: theme.palette.fontWeights.semiBold,
    color: theme.palette.text.primary,
    textTransform: "capitalize",
  },
  MainSubTitle: {
    fontSize: theme.palette.fontSizes.base,
    color: theme.palette.text.inverted,
  },
  ListSubHeader: {
    padding: theme.spacing(2.5, 2.5, 2.5, 5),
    fontSize: theme.palette.fontSizes.sm,
    color: theme.palette.text.primary,
    textTransform: "uppercase",
    letterSpacing: "1.1px",
    fontWeight: theme.palette.fontWeights.bold,
  },
}));
