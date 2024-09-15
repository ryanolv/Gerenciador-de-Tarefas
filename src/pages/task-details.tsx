import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksProps } from "../constants/tasks";

function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState<TasksProps>();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div>
      <h1>{task?.title}</h1>
      <h3>{task?.description}</h3>
    </div>
  );
}

export default TaskDetailsPage;
