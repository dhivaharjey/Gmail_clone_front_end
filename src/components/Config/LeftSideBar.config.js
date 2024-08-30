import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AccessTimeOutlined,
  DeleteOutlined,
  Inbox,
  InsertDriveFileOutlined,
  MailOutlined,
  SendOutlined,
  StarOutline,
} from "@mui/icons-material";

const SIDEBAR_DATA = [
  {
    name: "inbox",
    title: "Inbox",
    icon: Inbox,
  },
  {
    name: "starred",
    title: "Starred",
    icon: StarOutline,
  },
  {
    name: "snooze",
    title: "Snoozed",
    icon: AccessTimeOutlined,
  },

  {
    name: "sent",
    title: "Sent",
    icon: SendOutlined,
  },
  {
    name: "drafts",
    title: "Drafts",
    icon: InsertDriveFileOutlined,
  },
  {
    name: "allmail",
    title: "All Mail",
    icon: MailOutlined,
  },
  {
    name: "trash",
    title: "Trash",
    icon: DeleteOutlined,
  },
];

export default SIDEBAR_DATA;
