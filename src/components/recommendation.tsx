import "../css/recPreview.css";
import { useEffect, useState } from "react";
import { RecProps } from "../utils/RecProps";
import { Link } from "react-router-dom";
import Comment from "./comment";
import postData from "../utils/postData";

interface CurrentRecProps {
  currentRec: number;
  currentUser: number;
  setCurrentRec: React.Dispatch<React.SetStateAction<number>>;
}

export default function Recommendation({
  currentRec,
  currentUser,
  setCurrentRec,
}: CurrentRecProps): JSX.Element {
  const [rec, setRec] = useState<RecProps>({
    recInfo: [],
    comments: [],
    tags: [],
  });
  const [inputComment, setInputComment] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);

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

  async function PutData(putEndpoint: string) {
    const response = await fetch(
      `https://backend-c3c4.herokuapp.com${putEndpoint}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  function handleLikeClicked() {
    PutData(`/like/${currentRec}`);
    if (isLike === false) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }

  function handleDislikeClicked() {
    PutData(`/dislike/${currentRec}`);
    if (isDislike === false) {
      setIsDislike(true);
    } else {
      setIsDislike(false);
    }
  }

  const comments = rec.comments.map((comment, idx) => (
    <Comment
      key={idx}
      id={comment.id}
      user_id={comment.user_id}
      rec_id={comment.rec_id}
      submit_time={comment.submit_time}
      comment={comment.comment}
      name={comment.name}
    />
  ));

  async function handleSubmitComment() {
    postData("/comment", {
      user_id: currentUser,
      rec_id: currentRec,
      comment: inputComment,
    });
    setCurrentRec(currentRec);
  }
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
          <p>Tags: {rec.tags.map((obj) => obj.tag).join(", ")}</p>
          <div>
            <button onClick={handleLikeClicked}>👍</button>
            <button onClick={handleDislikeClicked}>👎</button>
          </div>
          {currentUser !== 0 && (
            <form className="form">
              <textarea
                id="commentInput"
                rows={5}
                placeholder="Comment on this recommendation"
                onChange={(e) => setInputComment(e.target.value)}
              />

              <button type="submit" onClick={handleSubmitComment}>
                {" "}
                Submit
              </button>
            </form>
          )}
          <div>
            {rec.comments.length !== 0 && (
              <div>
                <h5>Comments:</h5>
                {comments}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
