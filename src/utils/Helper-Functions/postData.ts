import httpResponsesProps from "../Props/httpResponsesProps";
import { NewRecProps } from "../Props/NewRecProps";
import { PostStudyListProps } from "../Props/StudyListProps";
import NewCommentProps from "../Props/NewCommentProps";

export default async function postData(
  postEndpoint: string,
  info: NewRecProps | PostStudyListProps | NewCommentProps
): Promise<httpResponsesProps | void> {
  try {
    const response = await fetch(
      `https://backend-c3c4.herokuapp.com${postEndpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }
    );
    const jsonBody: httpResponsesProps = await response.json();
    return jsonBody;
  } catch (error) {
    console.log(error);
  }
}
