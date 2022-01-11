// import CreateNewRec from './createnewrec';
import "../css/sidebar.css";
import UsersFetch from "../utils/UsersFetch";
import TypeFetch from "../utils/TypeFetch";
import NewModal from "./NewModal";
import { useState, useEffect } from "react";
import separateCapitalise from "../utils/separateCapitalise";
import { Link } from "react-router-dom";

interface SidebarProps {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
}

export default function SideBarMenu(props: SidebarProps): JSX.Element {
  const [recTypes, setRecTypes] = useState<string[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    UsersFetch().then((result) => {
      if (result) {
        setUsers(result);
      }
    });
  }, []);

  const usersList = users.map((element, index) => (
    <option value={element.id} key={index}>
      {element.name}
    </option>
  ));

  useEffect(() => {
    TypeFetch().then((result) => {
      if (result) {
        setRecTypes(result);
      }
    });
  }, []);
  const types = recTypes.map((element: string, index: number) => (
    <a className="sidebarbutton" id="inner" href="/" key={index}>
      <span className="span">{separateCapitalise(element)}</span>
    </a>
  ));

  return (
    <div className="menubar">
      <div id="wrapper">
        {/* <a className="logo" id="inner" href="/"> */}
        <Link to="/" className="logo" id="inner">
          <span className="span">The Social Academy</span>
        </Link>
        {/* </a> */}
        <br id="inner" />
        <select
          className="dropdownmenu"
          name="login"
          id="inner"
          value={props.currentUser}
          onChange={(e) => {
            props.setCurrentUser(parseInt(e.target.value));
          }}
        >
          <option value={0} disabled>
            Choose name to log in
          </option>
          {usersList}
        </select>
        <br id="inner" />
        <br id="inner" />
        {/* <a className="sidebarbutton" id="inner" href="/recommended">
          <span className="span">+ Create New Recommendation</span>
        </a> */}
        <NewModal />
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        {/* <a className="sidebarbutton" id="inner" href="/studylist"> */}
        <Link className="sidebarbutton" id="inner" to="/studylist">
          <span className="span">My Study List</span>
        </Link>
        {/* </a> */}
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        {/* <a className="sidebarbutton" id="inner" href="/">
          <span className="span">Podcast</span>
        </a>
        <a className="sidebarbutton" id="inner" href="/">
          <span className="span">Articles</span>
        </a>
        <a className="sidebarbutton" id="inner" href="/">
          <span className="span">Exercises</span>
        </a>
        <a className="sidebarbutton" id="inner" href="/">
          <span className="span">Videos</span>
        </a> */}
        {types}
      </div>
    </div>
  );
}
