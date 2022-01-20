import CommentProps from "../utils/Props/CommentProps";

export default function Comment(props: CommentProps): JSX.Element {
  return (
    <div className="comment">
      <p>{props.name}</p>
      <p>{props.submit_time}</p>
      <p>{props.comment}</p>
    </div>
  );
}
