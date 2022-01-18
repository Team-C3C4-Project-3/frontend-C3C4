import { useEffect, useState } from "react";
import { PageProps } from "../utils/PageProps";
import RecentRecs, {
  recSummaryProps,
} from "../components/recommendationPreview";
import SideBarMenu from "../components/sidebarmenu";
// import { isConditionalExpression } from "typescript";
// import separateCapitalise from "../utils/separateCapitalise";

export default function SearchPage(props: {
  props: PageProps;
  routeEndpoints: string;
}): JSX.Element {
  const [searchRecs, setSearchRec] = useState<recSummaryProps[]>([]);

  useEffect(() => {
    const fetchTypeRec = async () => {
      const response = await fetch(
        `https://backend-c3c4.herokuapp.com/search/${props.routeEndpoints}`
        // `https://backend-c3c4.herokuapp.com/type/podcast`
      );
      const jsonBody = await response.json();
      setSearchRec(jsonBody.data);
    };
    fetchTypeRec();
  }, [props.routeEndpoints]);

  const recs =
    searchRecs === undefined
      ? []
      : searchRecs.map((rec, index) => (
        <RecentRecs
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

  console.log(props.routeEndpoints);
  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.props.currentUser}
        setCurrentUser={props.props.setCurrentUser}
        selectedTags={props.props.selectedTags}
        setSelectedTags={props.props.setSelectedTags}
      />
      <div className="content">
        <h1>Search Results for: {props.routeEndpoints} Recs</h1>
        {recs.length !== 0 ? (
          <div>{recs}</div>
        ) : (
          <h2>No recommendations for this category</h2>
        )}
      </div>
    </div>
  );
}
