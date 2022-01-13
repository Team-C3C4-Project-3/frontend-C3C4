import httpResponsesProps from "../utils/httpResponsesProps";
import { NewRecProps } from "./NewRecProps";
import { PostStudyListProps } from "./StudyListProps";

export default async function postData(
  postEndpoint: string,
  info: NewRecProps | PostStudyListProps
): Promise<httpResponsesProps | void> {
  //postType: newRec, comment, studyList
  try {
    // if (postEndpoint )
    const response = await fetch(
      `https://backend-c3c4.herokuapp.com${postEndpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }
    );
    // console.log(response);
    const jsonBody: httpResponsesProps = await response.json();
    return jsonBody;
  } catch (error) {
    console.log(error);
  }
}
