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

  function getUserName(id: number) {
    let name = "";
    for (const user of users) {
      if (user.id === id) {
        name = user.name;
      }
    }
    return name;
  }

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
        <Link to="/" className="logo" id="inner">
          <span className="span">The Social Academy</span>
        </Link>
        <br id="inner" />
        {props.currentUser === 0 && (
          <select
            className="login-dropdown"
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
        )}
        {props.currentUser !== 0 && (
          <div className="logged-in">
            <p>You are logged in as {getUserName(props.currentUser)}</p>
            {/* <p>{}</p> */}
            <Link className="sidebarbutton" id="inner" to="#">
              <span
                className="span"
                onClick={() => {
                  props.setCurrentUser(0);
                }}
              >
                Log out
              </span>
            </Link>
          </div>
        )}

        {/* <br id="inner" /> */}

        <br id="inner" />
        <br id="inner" />
        <NewModal currentUser={props.currentUser} />
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        <Link className="sidebarbutton" id="inner" to="/studylist">
          <span className="span">My Study List</span>
        </Link>
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        {types}
      </div>
    </div>
  );
}
