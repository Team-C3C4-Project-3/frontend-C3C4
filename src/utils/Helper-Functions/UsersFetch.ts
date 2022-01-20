export default async function UsersFetch(): Promise<
  { id: number; name: string }[] | void
> {
  try {
    const APIres = await fetch("https://backend-c3c4.herokuapp.com/users");
    const users = await APIres.json();
    return users.data;
  } catch (error) {
    console.error(error);
  }
}
