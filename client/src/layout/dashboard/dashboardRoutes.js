import { BsTagsFill, BsFillSignpost2Fill } from "react-icons/bs";
import { HiClipboardList } from "react-icons/hi";
import { RiFileListFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const iconStyle = "lg:h-4 md:h-10 h-8 lg:w-4 md:w-10 w-8 lg:mx-0 md:mx-auto";
const dashboardRoutes = [
  {
    icon: <BsTagsFill className={iconStyle} />,
    name: "Add Tag",
    anchor: "add-tag",
  },
  {
    icon: <HiClipboardList className={iconStyle} />,
    name: "Tag List",
    anchor: "tag-list",
  },
  {
    icon: <BsFillSignpost2Fill className={iconStyle} />,
    name: "Add Post",
    anchor: "add-post",
  },
  {
    icon: <RiFileListFill className={iconStyle} />,
    name: "Post List",
    anchor: "post-list",
  },
  {
    icon: <FaUsers className={iconStyle} />,
    name: "User List",
    anchor: "user-list",
  },
];

export default dashboardRoutes;
