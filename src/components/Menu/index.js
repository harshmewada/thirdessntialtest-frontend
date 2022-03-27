import * as React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ListItemIcon,
  Box,
  AppBar,
  Avatar,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../redux/action/userActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    borderBottom: `1px solid ${theme.palette.gray[700]}`,
    padding: "10px 0",
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    width: `calc(100% - 280px)`,
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiButtonBase-root": {
      margin: "0 5px",
    },
  },
  title: {
    fontSize: theme.palette.fontSizes.semibase,
    fontWeight: theme.palette.fontWeights.semiBold,
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: theme.palette.fontSizes.base - 1,
    color: theme.palette.text.inverted,
  },
  menuPaper: {
    overflow: "visible",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    borderRadius: theme.palette.radius.medium,
    minWidth: 220,
    width: "auto",
  },
  menuContainer: {
    padding: "4px 20px 12px 20px",
  },
  btnContainer: {
    padding: "12px 20px 12px 20px",
  },
  menuTitle: {
    padding: "5px 0",
    fontSize: theme.palette.fontSizes.base,
    color: theme.palette.text.main,
    fontWeight: theme.palette.fontWeights.semiBold,
  },

  avatar: {
    background: theme.palette.primary.main,
    textTransform: "capitalize",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logOutUser(() => history.push("/")));
  };

  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      classes={{ paper: classes.menuPaper }}
      PaperProps={{
        elevation: 0,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      getContentAnchorEl={null}
    >
      <Box className={classes.menuContainer}>
        <Typography className={classes.title}>{name}</Typography>
        <Typography className={classes.subTitle}>{email}</Typography>
      </Box>
      <Divider />

      <Box className={classes.btnContainer}>
        <Button
          variant="outlined"
          onClick={() => handleLogout()}
          fullWidth
          disabled={isLoading}
        >
          {isLoading && <CircularProgress size={"sm"} />}
          Logout
        </Button>
      </Box>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        elevation="0"
        className={classes.AppBar}
      >
        <Toolbar className={classes.toolBar}>
          <Box
            style={{
              boxShadow: "1px 2px 10px rgba(0,0,0,0.1)",
              borderRadius: 100,
              width: 50,
              height: 50,
              padding: 5,
            }}
          >
            <img src="logo192.png" style={{ width: "100%", height: "100%" }} />
          </Box>

          <Box>
            <IconButton onClick={handleClick} size="small">
              <Avatar fontSize="inherit" className={classes.avatar}>
                {name?.charAt(0)}
              </Avatar>
            </IconButton>
            {accountMenu}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
