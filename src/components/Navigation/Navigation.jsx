import { NavLink } from "react-router-dom";
import st from "../Navigation/Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={st.navigation}>
      <NavLink
        exact
        to="/"
        className={st.navlink}
        activeClassName={st.activelink}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/users"
        className={st.navlink}
        activeClassName={st.activelink}
      >
        Users
      </NavLink>
      <NavLink
        to="/chart"
        className={st.navlink}
        activeClassName={st.activelink}
      >
        Charts
      </NavLink>
    </nav>
  );
};

export default Navigation;
