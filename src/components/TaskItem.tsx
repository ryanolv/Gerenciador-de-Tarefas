import { TasksProps } from "../constants/tasks";
import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader-circle.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";

interface TaskItemProps {
  task: TasksProps;
}

function TaskItem({ task }: TaskItemProps) {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]  text-[#00ADB5]";
    }

    if (task.status === "doing") {
      return "bg-[#FFAA04] text-[#FFAA04]";
    }

    if (task.status === "to_do") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]";
    }
  };

  return (
    <div
      className={`flex justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`reative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full cursor-pointer opacity-0"
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "doing" && <LoaderIcon className="animate-spin" />}
        </label>
        {task.title}
      </div>
      <a href="" className="hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  );
}

export default TaskItem;
