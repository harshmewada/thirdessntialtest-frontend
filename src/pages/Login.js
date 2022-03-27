import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { emailRegex } from "../utils/regex";
import { loginUser, registerUser } from "../redux/action/userActions";
import { RemoveRedEye } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const Login = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.util.spinner);
  const isLogged = useSelector((state) => state.user.isLogged);
  const history = useHistory();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "abc@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  React.useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [isLogged]);

  const onRegister = (data) => {
    dispatch(
      registerUser({
        email: "abc@gmail.com",
        password: "12345678",
        role: "superadmin",
        name: "Harsh",
      })
    );
  };
  return (
    <>
      {loading && <LinearProgress />}
      <div className={classes.root}>
        <Container>
          <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item lg={6} className={classes.imageContainer}>
              <Card elevation={0} className={classes.card}>
                <CardContent>
                  <Typography variant="h5" className={classes.title}>
                    Sign in to Admin Panel
                  </Typography>
                  <Typography variant="h6" className={classes.subTitle}>
                    Enter your details below.
                  </Typography>
                </CardContent>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                    <Controller
                      name="email"
                      fullWidth
                      label="Email"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Email address is required",
                        },
                        pattern: {
                          value: emailRegex,
                          message: "Invalid Email address",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          placeholder="Enter Email Address"
                          className={classes.textField}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.textField,
                            },
                          }}
                          required={true}
                          error={errors?.email}
                          helperText={errors?.email?.message}
                        />
                      )}
                    />
                  </CardContent>
                  <CardContent>
                    <Controller
                      name="password"
                      fullWidth
                      label="Password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Password"
                          placeholder="Enter Password"
                          required={true}
                          variant="outlined"
                          type="password"
                          className={classes.textField}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.textField,
                            },
                            endAdornment: () => (
                              <IconButton>
                                <RemoveRedEye />
                              </IconButton>
                            ),
                          }}
                          helperText={errors?.password?.message}
                          FormHelperTextProps={{
                            className: classes.helperText,
                          }}
                        />
                      )}
                    />
                  </CardContent>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item sm={12} md={12} lg={12} xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          fullWidth
                          disabled={user?.isLoading}
                          className={classes.btn}
                        >
                          {user?.isLoading ? (
                            <CircularProgress color="inherit" size={30} />
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            </Grid>
            <Grid item lg={6} className={classes.imageContainer}>
              <Stack direction="column" alignItems={"center"} spacing={3}>
                <Alert severity="info">This is for testing purpose only</Alert>
                <Card>
                  <CardContent>
                    <Button variant="outlined" onClick={onRegister}>
                      Click here to register superadmin
                    </Button>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <Stack direction="column" alignItems={"center"} spacing={3}>
                      <Typography>
                        Default credential are already set into inputs
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};
export default Login;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.white,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      backgroundColor: "white",
    },
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "70vh",
  },
  authImg: {
    height: "40vh",
    transform: "rotateY(3.142rad)",
  },
  title: {
    marginBottom: 20,
  },
  lineTitle: {
    fontWeight: "1000",
    color: theme.palette.secondary.main,
  },
  lineDescription: {
    fontWeight: "500",
  },
}));
