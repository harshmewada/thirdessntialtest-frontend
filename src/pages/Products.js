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
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../redux/action/productActions";
import FileDrop from "../components/FileDrop";
import { BASEIMAGEURL } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Products = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.common);
  const { open, modalData, openModal, closeModal } = useModal();
  const methods = useForm({});
  const isLoading = useSelector((state) => state.util.spinner);

  const handleSubmit = (data) => {
    if (modalData) {
      dispatch(
        updateProduct({ ...data }, () => {
          closeModal();
          methods.reset({});
          dispatch(getProducts());
        })
      );
    } else {
      dispatch(
        addProduct({ ...data }, () => {
          closeModal();
          methods.reset({});
          dispatch(getProducts());
        })
      );
    }
  };

  const handleDelete = (data) => {
    dispatch(
      deleteProduct(data, () => {
        closeModal();
        methods.reset({});
        dispatch(getProducts());
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
          methods.reset({});
        }}
        startIcon={<AddNewIcon />}
      >
        Add Product
      </Button>
    );
  };

  const tableHeaders = [
    { field: "productName", headerName: "Product Name", width: 300 },
    { field: "price", headerName: "Price", width: 250 },
    {
      field: "productImage",
      headerName: "Image",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <img
            src={`${BASEIMAGEURL}${row.productImage}`}
            style={{
              height: 40,
              width: 40,
            }}
            alt={row?.productName}
          />
        );
      },
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
          </Stack>
        );
      },
    },
  ];

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className={classes.root}>
      <ProductModal
        open={open}
        data={modalData}
        onClose={() => {
          closeModal();
          methods.reset({});
        }}
        onSubmit={handleSubmit}
        methods={methods}
        isLoading={isLoading}
      />
      <Stack direction="column" spacing={3}>
        <PageTitle title={"Products"} endAction={AddAction} />
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={products || []}
            columns={tableHeaders}
            loading={isLoading}
            getRowId={(row) => row._id || row.id}
          />
        </div>
      </Stack>
    </div>
  );
};

const ProductModal = ({
  open,
  onClose,
  data,
  isLoading,
  onSubmit,
  methods,
}) => {
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
              name="productName"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Product Name is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  placeholder="Enter Product Name"
                  required={true}
                  error={errors?.productName}
                  helperText={errors?.productName?.message}
                />
              )}
            />

            <Controller
              name="price"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Price is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Price"
                  variant="outlined"
                  placeholder="Enter Price"
                  required={true}
                  error={errors?.price}
                  helperText={errors?.price?.message}
                />
              )}
            />
            <Controller
              name="productImage"
              fullWidth
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Product Image is required",
                },
              }}
              render={({ field }) => (
                <>
                  <FileDrop
                    defaultValue={field.value}
                    label="Product Image"
                    onChange={(value) => field.onChange(value)}
                  />
                </>
              )}
            />
          </Stack>
        </CardContent>
      </form>
    </ModalContainer>
  );
};

export default Products;
