import { TasksProps } from "../constants/tasks";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import useDeleteTask from "../hooks/data/use-delete-task";

interface TaskItemProps {
  task: TasksProps;
  handleCheckboxClick: (taskId: string) => void;
}

function TaskItem({ task, handleCheckboxClick }: TaskItemProps) {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);
  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa. Por favor, tente novamente.");
      },
    });
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
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/tasks/${task.id}`} className="hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
}

export default TaskItem;
