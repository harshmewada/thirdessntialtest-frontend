import React from "react";
import { makeStyles } from "@mui/styles";
import PageTitle from "../components/PageTtitle";
import AddNewIcon from "@mui/icons-material/Add";
import {
  Button,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import useModal from "../hooks/useModal";
import ModalContainer from "../components/ModalContainer";
import { Controller, useForm } from "react-hook-form";
import { emailRegex, mobileRegex } from "../utils/regex";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  registerUser,
  updateUser,
  getUsers,
} from "../redux/action/userActions";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, Delete, Edit } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Users = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.common);
  const { open, modalData, openModal, closeModal, setModalData } = useModal();
  const methods = useForm({
    defaultValues: {
      role: "user",
    },
  });
  const isLoading = useSelector((state) => state.util.spinner);

  const handleSubmit = (data) => {
    if (modalData) {
      dispatch(
        updateUser({ ...data }, () => {
          closeModal();
          methods.reset();
          dispatch(getUsers());
        })
      );
    } else {
      dispatch(
        registerUser({ ...data }, () => {
          closeModal();
          methods.reset();
          dispatch(getUsers());
        })
      );
    }
  };

  const handleDelete = (data) => {
    dispatch(
      deleteUser(data, () => {
        closeModal();
        methods.reset();
        dispatch(getUsers());
      })
    );
  };

  const AddAction = () => {
    return (
      <Button
        color="primary"
        disableElevation
        variant="contained"
        onClick={() => {
          openModal();
        }}
        startIcon={<AddNewIcon />}
      >
        Add Users
      </Button>
    );
  };

  const tableHeaders = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile", headerName: "Mobile", width: 200 },
    {
      field: "products",
      headerName: "Products",
      renderCell: ({ row }) => {
        return row?.products?.length || 0;
      },

      width: 200,
    },
    {
      width: 200,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => {
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => {
                  openModal(row);
                  methods.reset(row);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="primary"
                onClick={() => {
                  handleDelete(row);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Activity">
              <IconButton
                color="primary"
                onClick={() => {
                  history.push(`/useractivity/${row.id}`);
                }}
              >
                <BarChart />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={classes.root}>
      <UserModal
        open={open}
        data={modalData}
        onClose={closeModal}
        onSubmit={handleSubmit}
        methods={methods}
        isLoading={isLoading}
      />
      <Stack direction="column" spacing={3}>
        <PageTitle title={"Users"} endAction={AddAction} />
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={users || []}
            columns={tableHeaders}
            loading={isLoading}
            getRowId={(row) => row._id}
          />
        </div>
      </Stack>
    </div>
  );
};

const UserModal = ({ open, onClose, data, isLoading, onSubmit, methods }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const onModalClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalContainer
      open={open}
      title="Add user"
      onClose={onModalClose}
      size="sm"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form>
        <CardContent>
          <Stack directon="column" spacing={2}>
            <Controller
              name="name"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Name is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  placeholder="Enter Name"
                  required={true}
                  error={errors?.name}
                  helperText={errors?.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email address is required",
                },
                pattern: {
                  value: emailRegex,
                  message: "Invalid Email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  placeholder="Enter Email Address"
                  required={true}
                  error={errors?.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Controller
              name="mobile"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Mobile Number is required",
                },
                pattern: {
                  value: mobileRegex,
                  message: "Invalid Phone Number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mobile"
                  variant="outlined"
                  placeholder="Enter Mobile"
                  required={true}
                  error={errors?.mobile}
                  helperText={errors?.mobile?.message}
                />
              )}
            />
            <Controller
              name="address"
              fullWidth
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Address"
                  variant="outlined"
                  placeholder="Enter Address"
                  rows={4}
                  multiline
                />
              )}
            />

            {!data && (
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
                    helperText={errors?.password?.message}
                  />
                )}
              />
            )}
          </Stack>
        </CardContent>
      </form>
    </ModalContainer>
  );
};

export default Users;
