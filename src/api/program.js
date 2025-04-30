import { makeRequest } from "../axios";

export const addProgram = async (data) => {
  const { data: response } = await makeRequest.post("/add-program", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const fetchAllPrograms = async (data) => {
  const { data: response } = await makeRequest.get("/get-programs", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const fetchSUCPrograms = async (data) => {
  const { data: response } = await makeRequest.put("/get-suc-program", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};
