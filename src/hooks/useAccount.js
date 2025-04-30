import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addAccount, deleteAccount, fetchAllAccounts } from "../api/account";

export const useAddAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return addAccount(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllAccounts"] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return deleteAccount(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllAccounts"] });
    },
  });
};

export const useFetchAllAccounts = () => {
  return useQuery({
    queryKey: ["fetchAllAccounts"],
    queryFn: fetchAllAccounts,
  });
};
