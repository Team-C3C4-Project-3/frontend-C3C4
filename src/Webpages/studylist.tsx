import { useEffect, useState } from "react";
import RecentRecs, { recSummaryProps } from "../components/recommendationPreview";
import SideBarMenu from "../components/sidebarmenu";
import "../css/app.css";

interface StudyListProps {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
  currentRec: number;
  setCurrentRec: React.Dispatch<React.SetStateAction<number>>;
}

function StudyList(props: StudyListProps): JSX.Element {
  const [studyList, setStudyList] = useState<recSummaryProps[]>(
    [
      {
        id: 0,
        title: "",
        author: "",
        type: "",
        summary: "",
        link: "",
        submit_time: "",
        user_id: 0,
        name: "",
        setCurrentRec: props.setCurrentUser
      }
    ]
  )
  useEffect(() => {
    const fetchStudyList = async (user_id: number) => {
      const response = await fetch(`https://backend-c3c4.herokuapp.com/studylist/${user_id}`);
      const jsonBody = await response.json();
      setStudyList(jsonBody.data);
    };
    fetchStudyList(props.currentUser)
  }, [props.currentUser])

  const studyListPreview = studyList.map((item, index) => (
    <RecentRecs
      key={index}
      title={item.title}
      author={item.author}
      type={item.type}
      summary={item.summary}
      link={item.link}
      submit_time={item.submit_time}
      id={0}
      user_id={0}
      name={""}
      setCurrentRec={props.setCurrentRec}
    />
  ))

  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
      <div>
        <h1>StudyList</h1>
        {studyListPreview}
      </div>
    </div>
  );
}

export default StudyList;
