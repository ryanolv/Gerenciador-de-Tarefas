import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TasksProps } from "../../constants/tasks";

function useDeleteTask(taskId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      const deletedTask = await response.json();
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData<TasksProps[]>(["tasks"], (currentTasks) => {
        return currentTasks?.filter(
          (oldTask: TasksProps) => oldTask.id !== deletedTask.id
        );
      });
    },
  });
}

export default useDeleteTask;
