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

export const addProject = async (id, title, description, gitRepositoryUrl, industryName, tagNames, skillNames) => {
  try {
    console.log(id, title, description, gitRepositoryUrl, industryName, tagNames, skillNames)
    const response = await fetch(`http://localhost:5128/api/Project/create`, {
      method: "POST",
      headers: {
        "X-API-Key": "http://localhost:5128/api/Project",
        "Content-Type": "application/json",
        "id": id,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        gitRepositoryUrl: gitRepositoryUrl,
        industryName: { industryName: industryName },
        tagNames,
        skillNames
        //tagNames: [{tagName: "Test"}, {tagName: "TestMoreTest"}, {tagName: "TestAlsoQA"}],
        //skillNames: [{ skillName: skillNames }],
      }),
      // body: JSON.stringify({
      //   title,
      //   description,
      //   gitRepositoryUrl,
      //   industryName,
      //   tagNames,
      //   skillNames,
      // }),
    });
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
