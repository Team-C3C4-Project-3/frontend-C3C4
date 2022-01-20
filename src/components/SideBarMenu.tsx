import "../css/SideBarMenu.css";
import UsersFetch from "../utils/Helper-Functions/UsersFetch";
import TypeFetch from "../utils/Helper-Functions/TypeFetch";
import CreateNewRec from "./CreateNewRec";
import { useState, useEffect } from "react";
import separateCapitalise from "../utils/Helper-Functions/separateCapitalise";
import { Link } from "react-router-dom";
import fetchTags from "../utils/Helper-Functions/TagsFetch";

interface SidebarProps {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SideBarMenu(props: SidebarProps): JSX.Element {
  const [recTypes, setRecTypes] = useState<string[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    UsersFetch().then((result) => {
      if (result) {
        setUsers(result);
      }
    });
    fetchTags().then((result) => {
      if (result) {
        setTags(result);
      }
    });
    TypeFetch().then((result) => {
      if (result) {
        setRecTypes(result);
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

  function handleTag(element: string) {
    if (props.selectedTags.includes(element)) {
      props.setSelectedTags(
        props.selectedTags.filter((item) => item !== element)
      );
    } else {
      props.setSelectedTags([...props.selectedTags, element]);
    }
  }

  const usersList = users.map((element, index) => (
    <option value={element.id} key={index}>
      {element.name}
    </option>
  ));

  const types = recTypes.map((element: string, index: number) => (
    <Link
      to={`/type/${element}`}
      className="sidebarbutton"
      id="inner"
      key={index}
    >
      <span className="span">{separateCapitalise(element)}</span>
    </Link>
  ));

  const tagCloud = tags.map((element: string, index: number) => (
    <button onClick={() => handleTag(element)} key={index}>
      {separateCapitalise(element)}
    </button>
  ));

  return (
    <div className="menubar">
      <div id="wrapper">
        <Link to="/" className="logo" id="inner">
          <span className="span">The Social Academy</span>
        </Link>
        <br id="inner" />
        <form>
          <input
            className="search-bar"
            placeholder="Search for a recommendation"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <Link
            to={`/search/${searchInput.split(" ").join("+")}`}
            id="inner"
            onClick={() => console.log(searchInput.split(" ").join("+"))}
          >
            <button type="submit">Search</button>
          </Link>
        </form>
        <br id="inner" />
        <br id="inner" />
        <h3>Tags</h3>
        {tagCloud}
        {props.selectedTags.length !== 0 && (
          <p>
            Tags selected:{" "}
            {props.selectedTags.map((el) => separateCapitalise(el)).join(", ")}
          </p>
        )}
        {props.selectedTags.length !== 0 && (
          <Link to={`/tags/${props.selectedTags.join("+")}`}>
            <button>OK</button>
          </Link>
        )}
        <br id="inner" />
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
        <br id="inner" />
        <br id="inner" />
        <CreateNewRec currentUser={props.currentUser} />
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        <div id="study-list-button">
          <Link className="sidebarbutton" id="inner" to="/studylist">
            <span className="span">My Study List</span>
          </Link>
        </div>
        <br id="inner" />
        <br id="inner" />
        <br id="inner" />
        {types}
      </div>
    </div>
  );
}
