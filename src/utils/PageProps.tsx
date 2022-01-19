export interface PageProps {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
  currentRec: number;
  setCurrentRec: React.Dispatch<React.SetStateAction<number>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}
