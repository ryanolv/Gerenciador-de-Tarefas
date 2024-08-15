import { TasksProps } from "../constants/tasks";

interface TaskItemProps {
  task: TasksProps;
}

function TaskItem({ task }: TaskItemProps) {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5] bg-opacity-10 text-[#00ADB5]";
    }

    if (task.status === "doing") {
      return "bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]";
    }

    if (task.status === "to_do") {
      return "bg-[#2B2D42] bg-opacity-10 text-[#2B2D42]";
    }
  };

  return (
    <div
      className={`item-center flex gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  );
}

export default TaskItem;
