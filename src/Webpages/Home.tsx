import { useState, useEffect } from "react";
import SideBarMenu from "../components/sidebarmenu";
import RecentRecs from "../components/recommendationPreview";
import { recSummaryProps } from "../components/recommendationPreview";
import "../css/app.css";
import { PageProps } from "../utils/PageProps";

function Home(props: PageProps): JSX.Element {
  const [displayRecs, setDisplayRecs] = useState<recSummaryProps[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        "https://backend-c3c4.herokuapp.com/recentrecs"
      );
      const jsonBody = await response.json();
      setDisplayRecs(jsonBody.data);
    };

    fetchEpisodes();
  }, []);

  const recentrecs = displayRecs.map((rec, index) => (
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
      setCurrentRec={props.setCurrentRec}
      currentUser={props.currentUser}
    />
  ));

  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        selectedTags={props.selectedTags}
        setSelectedTags={props.setSelectedTags}
      />
      <div className="content">
        <h1>C3C4 Recommendations</h1>
        {recentrecs}
      </div>
    </div>
  );
}

export default Home;
