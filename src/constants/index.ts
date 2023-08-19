import { IconType } from "react-icons";
import { RiDashboardLine, RiBarChartLine } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { BiNews, BiSolidContact } from "react-icons/bi";
import { GiTheater } from "react-icons/gi";

type linkType = {
  id: number;
  name: string;
  path: string;
  Icon: IconType;
};

const links: linkType[] = [
  {
    id: 1,
    name: "dashboard",
    path: "/dashboard",
    Icon: RiDashboardLine,
  },
  {
    id: 2,
    name: "parties",
    path: "/parties",
    Icon: RiBarChartLine,
  },
  {
    id: 3,
    name: "reservation",
    path: "/reservation",
    Icon: TiDocumentText,
  },
  { id: 4, name: "users", path: "/users", Icon: FiUsers },
  { id: 6, name: "news", path: "/news", Icon: BiNews },
  { id: 7, name: "contact us", path: "/contact", Icon: BiSolidContact },
  { id: 8, name: "Theater", path: "/theater", Icon: GiTheater },
];

export default links;
