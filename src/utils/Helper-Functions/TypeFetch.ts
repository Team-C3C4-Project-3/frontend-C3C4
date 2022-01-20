export default async function TypeFetch(): Promise<string[] | void> {
  try {
    const APIres = await fetch("https://backend-c3c4.herokuapp.com/types");
    const types = await APIres.json();
    return types.data;
  } catch (error) {
    console.error(error);
  }
}
