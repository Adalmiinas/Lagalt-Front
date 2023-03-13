export const fetchProjects = async () => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/List`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:5128/api/Project/${projectId}`
    );

    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);

    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};
