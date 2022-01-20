import { useState } from "react";

export default function CreateNewRec(): JSX.Element {
  const [recommend, setRecommend] = useState<string>();

  console.log(recommend);
  return (
    <>
      <h1>Create New Recommendation</h1>
      <input placeholder="Title"></input>
      <input placeholder="Link"></input>
      <input placeholder="Author"></input>
      <button onClick={() => setRecommend("Recommended")}>Recommended</button>
      <button onClick={() => setRecommend("Not Recommended")}>
        Not Recommended
      </button>
      <button onClick={() => setRecommend("Looks Interesting")}>
        Looks Interesting
      </button>
      <textarea placeholder="Explain why you would/wouldn't recommend or why it looks interesting"></textarea>
      <textarea placeholder="Description/Summary"></textarea>
      <button>Submit</button>
    </>
  );
}
