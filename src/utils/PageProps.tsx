export interface PageProps {
    currentUser: number;
    setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
    currentRec: number;
    setCurrentRec: React.Dispatch<React.SetStateAction<number>>;
}