import { Link, useLocation } from "react-router-dom";
import "../css/recPreview.css";
import postData from "../utils/postData";

export interface recSummaryProps {
  id: number;
  title: string;
  author: string;
  type: string;
  summary: string;
  link: string;
  user_id: number;
  name: string;
  submit_time: string;
  setCurrentRec: React.Dispatch<React.SetStateAction<number>>;
  currentUser: number;
}

export default function RecentRecs(props: recSummaryProps): JSX.Element {
  const handleAddStudyList = async (user_id: number, rec_id: number) => {
    postData(`/study-list/${user_id}/${rec_id}`, {
      user_id,
      rec_id,
    });
  };

  const handleRemoveStudyList = async (user_id: number, rec_id: number) => {
    const response = await fetch(
      `https://backend-c3c4.herokuapp.com/study-list/${user_id}/${rec_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    props.setCurrentRec(-3)
    return response;

  };

  const location = useLocation();

  return (
    <div className="rec-preview">
      <Link
        to="/recommended"
        onClick={() => {
          props.setCurrentRec(props.id);
        }}
      >
        {props.title}
      </Link>
      <br />
      <a href={props.link}>Click Here</a>
      <p>{props.summary}</p>
      <p>Author of resource: {props.author}</p>
      {location.pathname === "/" ?
        <button onClick={() => handleAddStudyList(props.currentUser, props.id)}>
          + Add to my study list
        </button> :
        <button onClick={() => handleRemoveStudyList(props.currentUser, props.id)}>
          - Remove from study list
        </button>
      }
    </div>
  );
}
