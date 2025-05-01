import { makeRequest } from "../axios";

export const addMember = async (data) => {
  const { data: response } = await makeRequest.post("/add-member", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const fetchMembers = async (data) => {
  const { data: response } = await makeRequest.put("/get-suc-member", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const updateMember = async (data) => {
  const { data: response } = await makeRequest.post("/member-update", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
    },
  });

  return response;
};

export const deleteMember = async (id) => {
  const { data: response } = await makeRequest.post(
    `/delete-member`,
    { _id: id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
      },
    }
  );

  return response;
};
