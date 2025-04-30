import { makeRequest } from "../axios";

export const addAccount = async (data) => {
  const { data: addAccountData } = await makeRequest.post("/add-user", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return addAccountData;
};

export const deleteAccount = async (data) => {
  const { data: deleteAccountData } = await makeRequest.post(
    "/delete-user",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}`,
      },
    }
  );

  return deleteAccountData;
};

export const fetchAllAccounts = async () => {
  const { data } = await makeRequest.get("/fetch-user", {
    headers: { Authorization: `Bearer ${localStorage.getItem("ACCESSTOKEN")}` },
  });

  return data;
};
