import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { addProgram, fetchAllPrograms, fetchSUCPrograms } from "../api/program";

export const useAddProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return addProgram(data);
    },

    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchSUCPrograms"] });
    },
  });
};

export const useFetchAllPrograms = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["fetchAllPrograms"],
    queryFn: () => {
      return fetchAllPrograms();
    },
    onSuccess: (responseData) => {
      //   console.log("Success:", responseData.data);
    },
  });
};

export const useFetchSUCPrograms = (sucId) => {
  return useQuery({
    queryKey: ["fetchSUCPrograms", sucId],
    queryFn: () => fetchSUCPrograms(sucId),
    enabled: !!sucId, // Only run query if sucId exists
  });
};
