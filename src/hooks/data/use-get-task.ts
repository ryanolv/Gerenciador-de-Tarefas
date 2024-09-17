import { FieldValues, UseFormReset } from "react-hook-form";
import { TasksProps } from "../../constants/tasks";
import { useQuery } from "@tanstack/react-query";

function useGetTask(taskId: string, reset: UseFormReset<FieldValues>) {
  return useQuery<TasksProps>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      reset(data);
      return data;
    },
  });
}

export default useGetTask;
