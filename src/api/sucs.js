import { makeRequest } from "../axios";

export const fetchSUC = async () => {
  const { data } = await makeRequest.get("/get-sucs", {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return data;
};

export const updateSUC = async (data) => {
  const { data: updateSUCData } = await makeRequest.post("/update-suc", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return updateSUCData;
};

export const addSUC = async (data) => {
  const { data: addSUCData } = await makeRequest.post("/add-suc", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return addSUCData;
};
