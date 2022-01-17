import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentRecs, {
  recSummaryProps,
} from "../components/recommendationPreview";
import SideBarMenu from "../components/sidebarmenu";
import "../css/app.css";
import { PageProps } from "../utils/PageProps";

function StudyList(props: PageProps): JSX.Element {
  const [studyList, setStudyList] = useState<recSummaryProps[]>([]);

  useEffect(() => {
    const fetchStudyList = async (user_id: number) => {
      if (props.currentUser !== 0) {
        const response = await fetch(
          `https://backend-c3c4.herokuapp.com/studylist/${user_id}`
        );
        const jsonBody = await response.json();
        setStudyList(jsonBody.data);
      }
    };
    fetchStudyList(props.currentUser);
  }, [props.currentUser, props.currentRec]);

  const studyListPreview =
    studyList === undefined
      ? []
      : studyList.map((item, index) => (
          <RecentRecs
            key={index}
            title={item.title}
            author={item.author}
            type={item.type}
            summary={item.summary}
            link={item.link}
            submit_time={item.submit_time}
            id={item.id}
            user_id={item.user_id}
            name={item.name}
            setCurrentRec={props.setCurrentRec}
            currentUser={props.currentUser}
          />
        ));

  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
      <div className="study-list">
        <h1>StudyList</h1>
        {props.currentUser === 0 ? (
          <Link to="/">Sign in to see your study list</Link>
        ) : studyListPreview.length === 0 ? (
          <Link to="/">Add resources to your study list</Link>
        ) : (
          studyListPreview.length !== 0 && <div>{studyListPreview}</div>
        )}
      </div>
    </div>
  );
}

export default StudyList;
