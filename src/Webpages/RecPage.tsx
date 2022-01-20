import Recommendation from "../components/Recommendation";
import SideBarMenu from "../components/SideBarMenu";
import "../css/app.css";
import { PageProps } from "../utils/Props/PageProps";

function Recommended(props: PageProps): JSX.Element {
  return (
    <div className="body-grid">
      <SideBarMenu
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        selectedTags={props.selectedTags}
        setSelectedTags={props.setSelectedTags}
      />

      <Recommendation
        currentRec={props.currentRec}
        currentUser={props.currentUser}
        setCurrentRec={props.setCurrentRec}
      />
    </div>
  );
}

export default Recommended;
