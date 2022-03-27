import moment from "moment";
import { DATETIMEFORMAT } from "../constants";

const formatDate = (data) => {
  if (data) {
    return moment(data).format(DATETIMEFORMAT);
  }
  return "-";
};

export default formatDate;
