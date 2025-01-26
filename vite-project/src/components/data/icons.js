import {
  IoFastFoodOutline,
  IoTicketOutline,
  IoWalletOutline,
  IoSettingsOutline,
  IoNotifications,
  IoCash,
} from "react-icons/io5";
import {
  MdEmojiTransportation,
  MdOutlineLocalGroceryStore,
  MdDashboard,
  MdOutlineAccountCircle,
  MdOutlinePlaylistAddCheckCircle,
} from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import {
  FaHome,
  FaCoins,
  FaBars,
  FaSignOutAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { IoMdHelpCircleOutline } from "react-icons/io";

const icons = {
  Food: IoFastFoodOutline,
  Transport: MdEmojiTransportation,
  Medicine: GiMedicines,
  Groceries: MdOutlineLocalGroceryStore,
  Rent: FaHome,
  Salary: IoCash ,
  Savings: FaCoins,
  Entertainment: IoTicketOutline,
  Other: HiDotsHorizontal,
  More: FiPlus,
  Dashboard: MdDashboard,
  Transactions: GrTransaction,
  Categories: MdOutlinePlaylistAddCheckCircle,
  Budget: IoWalletOutline,
  Settings: IoSettingsOutline,
  Help: IoMdHelpCircleOutline,
  Info: MdOutlineAccountCircle,
  Menu: FaBars,
  Signout: FaSignOutAlt,
  Notification: IoNotifications,
  Facebook:FaFacebook,
  Instagram:FaInstagram,
  Twitter:FaTwitter,
};

export default icons;
