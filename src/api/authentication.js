import { makeRequest } from "../axios";

export const authLogin = async (data) => {
  const { data: authCred } = await makeRequest.post("/login", data);

  return authCred;
};

export const authVerifyToken = async (data) => {
  const { data: authPayload } = await makeRequest.put("/verify", data);

  return authPayload;
};
