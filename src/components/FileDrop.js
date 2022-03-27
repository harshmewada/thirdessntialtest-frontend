import { makeStyles } from "@mui/styles";
import React from "react";
import { DropzoneArea } from "react-mui-dropzone";
import { showSnackBar } from "../redux/action/snackActions";
import { useDispatch } from "react-redux";
import { BASEIMAGEURL } from "../constants";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
    minHeight: 20,
    padding: theme.spacing(0, 5, 2),
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  title: {
    fontSize: theme.palette.fontSizes.semibase,
  },
}));
const FileDrop = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [file, selectedFile] = React.useState([]);
  const {
    label,
    name,
    mode,

    placeholder,
    multiple,

    defaultValue,
    onChange,
  } = props;
  const handleChange = (files) => {
    selectedFile(files);
    onChange(name, files);
  };
  const dispatch = useDispatch();

  const initialFiles = () => {
    if (defaultValue[0]?.name) {
      return defaultValue;
    }
    if (typeof defaultValue === "object") {
      let initialFiles = [];
      defaultValue?.map((value) => {
        initialFiles.push(BASEIMAGEURL + value);
      });
      return initialFiles;
    } else {
      return [BASEIMAGEURL + defaultValue];
    }
  };
  const limit = 20;
  return (
    <DropzoneArea
      acceptedFiles={["image/png", "image/jpg", "image/jpeg"]}
      showFileNames
      dropzoneText={`Drag and drop a ${label} here or click`}
      placeholder={placeholder}
      showAlerts={false}
      dropzoneClass={classes.textField}
      dropzoneParagraphClass={classes.title}
      maxFileSize={2000000}
      filesLimit={!multiple ? 1 : limit}
      initialFiles={defaultValue ? initialFiles() : []}
      getFileLimitExceedMessage={() => {
        console.log("reached");
        dispatch(
          showSnackBar(
            `Maximum allowed number of files exceeded. Only ${limit} allowed`,
            "error"
          )
        );
      }}
      onChange={handleChange}
      {...props}
    />
  );
});
export default FileDrop;
