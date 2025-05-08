import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authLogin, authVerifyToken } from "../api/authentication";

import { Navigate, useNavigate } from "react-router";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return authLogin(data);
    },

    onSuccess: (responseData) => {
      localStorage.setItem("ACCESSTOKEN", responseData.ACCESSTOKEN);
      localStorage.setItem("ROLE", responseData.role);
      localStorage.setItem(
        "USER_DETAILS",
        JSON.stringify(responseData.user_details)
      );
    },
  });
};

export const useVerifyToken = () => {
  return useMutation({
    mutationFn: (data) => {
      return authVerifyToken(data);
    },

    onSuccess: (responseData) => {
      localStorage.setItem("_id", responseData.payload.userId);
    },

    onError: () => {
      const navigate = useNavigate();
      navigate("/login");
    },
  });
};
