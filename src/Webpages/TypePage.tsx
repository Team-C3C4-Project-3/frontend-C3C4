import { useEffect, useState } from "react";
import RecentRecs, { recSummaryProps } from "../components/recommendationPreview";
import SideBarMenu from "../components/sidebarmenu";
import { PageProps } from "../utils/PageProps";

export default function TypePage(props: { props: PageProps, routeEndpoints: string }): JSX.Element {

    const [recTypes, setRecTypes] = useState<recSummaryProps[]>([])

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

    const recs = recTypes.map((rec, index) => (
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

    return (
        <div className="body-grid">
            <SideBarMenu
                currentUser={props.props.currentUser}
                setCurrentUser={props.props.setCurrentUser}
            />
            <div className="content">
                <h1>{props.routeEndpoints} Recs</h1>
                {recs}
            </div>
        </div>
    )
}