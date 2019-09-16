import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/entr.png";

class TopNav extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <img src={logo} alt="Logo" />
          Entr Study Groups
        </h1>

        <NavLink to="/users" activeClassName="active">
          Users
        </NavLink>
        <NavLink to="/groups" activeClassName="active">
          Groups
        </NavLink>
      </div>
    );
  }
}

export default TopNav;
