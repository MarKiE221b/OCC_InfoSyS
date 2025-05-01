import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addMember,
  deleteMember,
  fetchMembers,
  updateMember,
} from "../api/member";

export const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return addMember(data);
    },

    onSuccess: (responseData) => {
      //   queryClient.invalidateQueries({ queryKey: ["fetchAllAccounts"] });
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return updateMember(data);
    },

    onSuccess: (responseData) => {
      localStorage.setItem("USER_DETAILS", JSON.stringify(responseData.item));
    },
  });
};

export const useFetchMember = (params) => {
  return useQuery({
    queryKey: ["fetchMembers", params],
    queryFn: () => fetchMembers(params),
    select: (data) => data.data,
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return deleteMember(data);
    },

    onSuccess: (responseData) => {
      //   queryClient.invalidateQueries({ queryKey: ["fetchAllAccounts"] });
    },
  });
};
