import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TasksProps } from "../../constants/tasks";

function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (newTask: TasksProps) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error();
      const createdTask = await response.json();
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<TasksProps[]>(["tasks"], (currentTasks) => {
        return [...(currentTasks || []), createdTask];
      });
    },
  });
}

export default useAddTask;
