import Recommendation from "../components/recommendation";
import SideBarMenu from "../components/sidebarmenu";
import "../css/app.css";
import { PageProps } from "../utils/PageProps";

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
