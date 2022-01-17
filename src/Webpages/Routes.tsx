import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import StudyList from "./studylist";
import Recommended from "./recommended";
import "../css/app.css";
import { useState } from "react";
import { PageProps } from "../utils/PageProps";
import TypePage from "./TypePage";

function WebsiteRoutes(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [currentRec, setCurrentRec] = useState<number>(0);

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
      }}
      routeEndpoints={type ? type : ""}
    />
  )
}