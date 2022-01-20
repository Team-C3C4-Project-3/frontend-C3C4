import { useEffect, useState } from "react";
import RecPreview, { recSummaryProps } from "../components/RecPreview";
import SideBarMenu from "../components/SideBarMenu";
import { PageProps } from "../utils/Props/PageProps";
import separateCapitalise from "../utils/Helper-Functions/separateCapitalise";

export default function TypePage(props: {
  props: PageProps;
  routeEndpoints: string;
}): JSX.Element {
  const [recTypes, setRecTypes] = useState<recSummaryProps[]>([]);

  useEffect(() => {
    const fetchTypeRec = async () => {
      const response = await fetch(
        `https://backend-c3c4.herokuapp.com/recs/${props.routeEndpoints}`
      );
      const jsonBody = await response.json();
      setRecTypes(jsonBody.data);
    };
    fetchTypeRec();
  }, [props.routeEndpoints]);

  const recs =
    recTypes === undefined
      ? []
      : recTypes.map((rec, index) => (
          <RecPreview
            key={index}
            id={rec.id}
            title={rec.title}
            author={rec.author}
            type={rec.type}
            summary={rec.summary}
            link={rec.link}
            user_id={rec.user_id}
            name={rec.name}
            submit_time={rec.submit_time}
            setCurrentRec={props.props.setCurrentRec}
            currentUser={props.props.currentUser}
          />
        ));

  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.props.currentUser}
        setCurrentUser={props.props.setCurrentUser}
        selectedTags={props.props.selectedTags}
        setSelectedTags={props.props.setSelectedTags}
      />
      <div className="content">
        <h1>{separateCapitalise(props.routeEndpoints)} Recs</h1>
        {recs.length !== 0 ? (
          <div>{recs}</div>
        ) : (
          <h2>No recommendations for this category</h2>
        )}
      </div>
    </div>
  );
}
