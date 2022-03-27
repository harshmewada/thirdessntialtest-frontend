import React from "react";
import { makeStyles } from "@mui/styles";
import PageTitle from "../components/PageTtitle";
import { useParams } from "react-router-dom";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getActivity } from "../redux/action/userActions";
import { DataGrid } from "@mui/x-data-grid";
import InfoCard from "../components/InfoCard";
import formatDate from "../helpers/formatDate";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const UserActivity = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLoading = useSelector((state) => state.util.spinner);
  const [data, setData] = React.useState({ activity: [] });
  const [error, setError] = React.useState();

  const tableHeaders = [
    { field: "title", headerName: "Activity", width: 500 },
    { field: "productId", headerName: "ProductId", width: 300 },
    {
      field: "createAt",
      width: 200,
      headerName: "Time",
      renderCell: ({ row }) => {
        return formatDate(row?.createdAt);
      },
    },
  ];

  React.useEffect(() => {
    if (id) {
      dispatch(
        getActivity(
          id,
          (res) => {
            setData({ ...data, ...res.data.data });
          },
          () => {
            setError(true);
          }
        )
      );
    }
  }, [id]);

  return (
    <div className={classes.root}>
      {error ? (
        <Alert severity="error">An error occured</Alert>
      ) : data ? (
        <Stack direction="column" spacing={3}>
          <PageTitle title={`Activity of user ===> ${data?.name}`} />

          <Stack direction="row" spacing={3}>
            <InfoCard
              title={"Last Login Date & Time"}
              value={formatDate(data?.lastLoginDate)}
            />
            <InfoCard
              title={"Last Login Date & Time"}
              value={formatDate(data?.lastLogoutDate)}
            />
          </Stack>
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={data?.activity || []}
              columns={tableHeaders}
              loading={isLoading}
              getRowId={(row) => row._id || row.id}
            />
          </div>
        </Stack>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
    </div>
  );
};

export default UserActivity;
