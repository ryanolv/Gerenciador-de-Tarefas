import { TasksProps } from "../constants/tasks";
import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import { useState } from "react";
import { toast } from "sonner";

interface TaskItemProps {
  task: TasksProps;
  handleCheckboxClick: (taskId: string) => void;
  onDeleteSuccess: (taskId: string) => void;
}

function TaskItem({
  task,
  handleCheckboxClick,
  onDeleteSuccess,
}: TaskItemProps) {
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      );
    }
    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary  text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue";
    }
  };

  return (
    <div
      className={`flex justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-3">
        <label
          htmlFor={task.title}
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            id={task.title}
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <a href="" className="hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
}

export default TaskItem;
