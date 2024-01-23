import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "sonner";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    //added param updatedSetting here
    onSuccess: (newSetting) => {
      // toast.info(
      //   `${Object.keys(newSetting)} successfully updated to ${Object.values(
      //     newSetting
      //   )}`
      // );

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
