import "../css/recPreview.css";
import { useEffect, useState } from "react";
import { RecProps } from "../utils/RecProps";
import { Link } from "react-router-dom";

interface CurrentRecProps {
  currentRec: number;
}

export default function Recommendation({
  currentRec,
}: CurrentRecProps): JSX.Element {
  const [rec, setRec] = useState<RecProps>({
    recInfo: [],
    comments: [],
    tags: [],
  });

  useEffect(() => {
    const fetchRec = async () => {
      if (currentRec !== 0) {
        const response = await fetch(
          `https://backend-c3c4.herokuapp.com/rec/${currentRec}`
        );
        const jsonBody = await response.json();
        setRec(jsonBody.data);
      }
    };
    fetchRec();
  }, [currentRec]);
  return (
    <div>
      {rec.recInfo.length === 0 ? (
        <div>
          <Link to="/">Return to Home page</Link>
        </div>
      ) : (
        <div>
          <h1>{rec.recInfo[0].title}</h1>
          <a href={rec.recInfo[0].link}>Go to resource</a>
          <h3>By: {rec.recInfo[0].author}</h3>
          <h4>
            Submitted by: {rec.recInfo[0].name} on {rec.recInfo[0].submit_time}
          </h4>
          <p>Type: {rec.recInfo[0].type}</p>
          <p>
            {rec.recInfo[0].status}: {rec.recInfo[0].reason}
          </p>
          <p>Summary: {rec.recInfo[0].summary}</p>
          <div>
            {rec.comments.length !== 0 && (
              <div>
                <h5>Comments:</h5>
                <p>{rec.comments[0].comment}</p>
                <p>{rec.comments[0].submit_time}</p>
              </div>
            )}
          </div>
          <p>{rec.tags[0].tag}</p>
        </div>
      )}
    </div>
  );
}
