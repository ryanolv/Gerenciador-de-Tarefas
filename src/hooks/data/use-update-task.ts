import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TasksProps } from "../../constants/tasks";

function useUpdateTask(taskId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data: any) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      });

      if (!response.ok) throw new Error();

      const updatedTask = await response.json();
      queryClient.setQueryData<TasksProps[]>(["tasks"], (oldTasks) => {
        return oldTasks?.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask;
          }
          return oldTask;
        });
      });
    },
  });
}

export default useUpdateTask;
