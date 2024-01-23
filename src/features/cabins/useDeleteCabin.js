import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isDeleting,
    mutate: deleteCabin,
  } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      console.log(data);
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
