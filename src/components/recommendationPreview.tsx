import { Link } from "react-router-dom";
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
}

export default function RecentRecs(props: recSummaryProps): JSX.Element {
  const handleAddStudyList = async (user_id: number, rec_id: number) => {
    postData(`/${user_id}/${rec_id}`, {
      user_id,
      rec_id
    })
  }

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
      <button onClick={() => handleAddStudyList(props.user_id, props.id)}>+ Add to my study list</button>
    </div>
  );
}
