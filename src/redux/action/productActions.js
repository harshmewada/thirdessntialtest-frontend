import productApi from "../api/productApi";
import { productTypes } from "../types";

export const getProducts = (cb, errorCb) => {
  return {
    type: productTypes.GET_PRODUCTS,

    payload: {
      request: {
        url: productApi.GET_PRODUCTS,
        method: "GET",
      },
      successMessage: "",
      errorMessage: "Failed to get products",
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const addProduct = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "productImage") {
      if (data["productImage"].length > 0) {
        data["productImage"].forEach((item, index) => {
          formData.append(`productImage`, data["productImage"][index]);
        });
      } else {
        formData.delete("productImage");
      }
    } else {
      formData.append(key, data[key]);
    }
  });
  return {
    type: productTypes.CREATE_PRODUCT,
    payload: {
      request: {
        url: productApi.CREATE_PRODUCTS,
        method: "POST",
        data: formData,
      },
      successMessage: "Product added successfully",
      errorMessage: "Failed to add product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const updateProduct = (data, cb, errorCb) => {
  console.log("updateProduct", data);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "productImage") {
      if (data["productImage"].length > 0) {
        data["productImage"].forEach((item, index) => {
          formData.append(`productImage`, data["productImage"][index]);
        });
      } else {
        formData.delete("productImage");
      }
    } else {
      formData.append(key, data[key]);
    }
    if (key === "categoryId") {
      formData.delete("categoryId");
      formData.append("categoryId", JSON.stringify(data["categoryId"]));
    }
  });
  return {
    type: productTypes.UPDATE_PRODUCT,
    payload: {
      request: {
        url: productApi.UPDATE_PRODUCTS,
        method: "PUT",
        data: formData,
      },
      successMessage: "Product updated successfully",
      errorMessage: "Failed to update product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteProduct = (data, cb, errorCb) => {
  return {
    type: productTypes.DELETE_PRODUCT,
    payload: {
      request: {
        url: productApi.DELETE_PRODUCTS,
        method: "DELETE",
        data: data,
      },
      successMessage: "Product deleted successfully",
      errorMessage: "Failed to delete product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};
