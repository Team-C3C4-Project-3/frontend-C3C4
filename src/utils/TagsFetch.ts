export default async function fetchTags(): Promise<string[]> {
  const response = await fetch("https://backend-c3c4.herokuapp.com/tags");
  const tags = await response.json();
  return tags.data;
}
