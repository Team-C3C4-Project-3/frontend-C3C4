import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import StudyList from "./studylist";
import Recommended from "./recommended";
import "../css/app.css";
import { useEffect, useState } from "react";
import { PageProps } from "../utils/PageProps";
import TypePage from "./TypePage";
import SearchPage from "./SearchPage";
import TagsPage from "./TagsPage";

function WebsiteRoutes(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [currentRec, setCurrentRec] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const tagNav = () => {
      const history = useNavigate();
      history(`/tags/${selectedTags.join("+")}`);
    };
    tagNav();
  }, [selectedTags]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/studylist"
          element={
            <StudyList
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/recommended"
          element={
            <Recommended
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/type/:type"
          element={
            <TypeChild
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/search/:query"
          element={
            <SearchChild
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/tags/:tags"
          element={
            <TagsChild
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentRec={currentRec}
              setCurrentRec={setCurrentRec}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default WebsiteRoutes;

function TypeChild(props: PageProps): JSX.Element {
  const { type } = useParams();

  return (
    <TypePage
      props={{
        currentUser: props.currentUser,
        setCurrentUser: props.setCurrentUser,
        currentRec: props.currentRec,
        setCurrentRec: props.setCurrentRec,
        selectedTags: props.selectedTags,
        setSelectedTags: props.setSelectedTags,
      }}
      routeEndpoints={type ? type : ""}
    />
  );
}

function SearchChild(props: PageProps): JSX.Element {
  const { query } = useParams();

  return (
    <SearchPage
      props={{
        currentUser: props.currentUser,
        setCurrentUser: props.setCurrentUser,
        currentRec: props.currentRec,
        setCurrentRec: props.setCurrentRec,
        selectedTags: props.selectedTags,
        setSelectedTags: props.setSelectedTags,
      }}
      routeEndpoints={query ? query : ""}
    />
  );
}

function TagsChild(props: PageProps): JSX.Element {
  const { tags } = useParams();

  return (
    <TagsPage
      props={{
        currentUser: props.currentUser,
        setCurrentUser: props.setCurrentUser,
        currentRec: props.currentRec,
        setCurrentRec: props.setCurrentRec,
        selectedTags: props.selectedTags,
        setSelectedTags: props.setSelectedTags,
      }}
      routeEndpoints={tags ? tags : ""}
    />
  );
}
