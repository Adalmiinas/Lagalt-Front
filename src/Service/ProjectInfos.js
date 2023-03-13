export const fetchProjects = async () => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/Projects`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
     return [error.message, null];
  }
};

export const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/${id}`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
     return [error.message, null];
  }
};
export const onSearchSubmitById = async ({ searchedWord }) => {
  try {
    console.log(searchedWord);
    const response = await fetch(
      `http://localhost:5128/api/Project/${searchedWord}`
    );

    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);

    //const result = jsonObject.map(element => element.title)
    //console.log()
    // const filteredResult = data.filter(project => projectincludes(`${searchedWord}`).map(filteredProject => (
    //   <li>{filteredProject}</li>
    // )))

    //return filteredResult
    //return [null, filteredResult];
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};
