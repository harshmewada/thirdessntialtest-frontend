import CategoryIcon from "@mui/icons-material/CategoryTwoTone";
import UserIcon from "@mui/icons-material/AccountCircleTwoTone";

const LeftSideBarRoutes = [
  {
    type: "heading",
    title: "Content",
    roles: ["user", "superadmin"],
  },

  {
    title: "Users",
    icon: <UserIcon />,
    path: "/users",
    roles: ["superadmin"],
  },

  {
    title: "Products",
    icon: <CategoryIcon />,
    path: "/products",
    roles: ["user"],
  },
];

export default LeftSideBarRoutes;
