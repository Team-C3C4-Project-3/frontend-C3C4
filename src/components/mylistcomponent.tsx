import { recSummaryProps } from "./recommendationPreview";

export default function StudyList(props: recSummaryProps): JSX.Element {
    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.author}</p>
            <p>{props.type}</p>
            <p>{props.summary}</p>
            <p>{props.link}</p>
            <p>{props.submit_time}</p>
        </>
    )
}