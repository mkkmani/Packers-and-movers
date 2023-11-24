/* eslint-disable react/react-in-jsx-scope */
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { FaTruckMoving } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => (
  <div className="d-flex flex-column p-3 bg-dark col-4 col-md-2 sidebar-container fw-bold text-warning">
    <div className="d-flex flex-row justify-content-start align-items-center">
      <FaTruckMoving />
      <p className="pt-3 m-3 mt-0">My moves</p>
    </div>
    <div className="d-flex flex-row justify-content-start align-items-center">
      <CgProfile />
      <p className="pt-3 m-3 mt-0">Profile</p>
    </div>
    <div className="d-flex flex-row justify-content-start align-items-center">
      <RiLogoutCircleLine />
      <p className="pt-3 m-3 mt-0">Logout</p>
    </div>
  </div>
);

export default Sidebar;
