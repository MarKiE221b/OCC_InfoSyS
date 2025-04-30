import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { addSUC, fetchSUC, updateSUC } from "../api/sucs";

export const useFetchSUC = () => {
  return useQuery({
    queryKey: ["fetchSUCKey"],
    queryFn: fetchSUC,
    refetchOnWindowFocus: false,
  });
};

export const useMutateSUC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return addSUC(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchSUCKey"] });
    },
  });
};

export const useMutateUpdateSuc = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return updateSUC(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchSUCKey"] });
    },
  });
};
