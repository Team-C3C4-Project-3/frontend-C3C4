import { Link, useLocation } from "react-router-dom";
import "../css/RecPreview.css";
import postData from "../utils/Helper-Functions/postData";

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

export async function handleAddStudyList(
  user_id: number,
  rec_id: number
): Promise<void> {
  postData(`/study-list/${user_id}/${rec_id}`, {
    user_id,
    rec_id,
  });
}

export default function RecPreview(props: recSummaryProps): JSX.Element {
  const handleRemoveStudyList = async (user_id: number, rec_id: number) => {
    const response = await fetch(
      `https://backend-c3c4.herokuapp.com/study-list/${user_id}/${rec_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    props.setCurrentRec(rec_id);
    return response;
  };

  const location = useLocation();

  return (
    <div className="rec-preview">
      <Link
        className="rec-preview-title"
        to="/recommended"
        onClick={() => {
          props.setCurrentRec(props.id);
        }}
      >
        {props.title}
      </Link>
      <br />
      <a className="rec-preview-link" href={props.link}>
        Go to resource
      </a>
      <p className="rec-preview-summary">{props.summary}</p>
      <p className="rec-preview-author">Author of resource: {props.author}</p>
      {location.pathname === "/studylist" ? (
        <button
          className="rec-preview-remove-button"
          onClick={() => handleRemoveStudyList(props.currentUser, props.id)}
        >
          - Remove from study list
        </button>
      ) : (
        props.currentUser !== 0 && (
          <button
            className="rec-preview-add-button"
            onClick={() => handleAddStudyList(props.currentUser, props.id)}
          >
            + Add to my study list
          </button>
        )
      )}
    </div>
  );
}
