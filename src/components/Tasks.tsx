import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { TasksProps } from "../constants/tasks";
import {
  TrashIcon,
  AddIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from "../assets/icons";

import TasksSeparator from "./TasksSeparator";
import Button from "./Button";
import TaskItem from "./TaskItem";
import AddTaskDialog from "./AddTaskDialog";
import useGetTasks from "../hooks/data/use-get-tasks";

function Tasks() {
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] =
    useState<boolean>(false);

  const morningTasks: TasksProps[] = tasks?.filter(
    (task: TasksProps) => task.time === "morning"
  );
  const afternoonTasks: TasksProps[] = tasks?.filter(
    (task: TasksProps) => task.time === "afternoon"
  );
  const eveningTasks: TasksProps[] = tasks?.filter(
    (task: TasksProps) => task.time === "evening"
  );

  const handleTaskCheckboxClick = (taskId: string) => {
    const newTasks: TasksProps[] = tasks.map((task: TasksProps) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!");
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!");
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        toast.success("Tarefa reiniciada com sucesso!");
        return { ...task, status: "not_started" };
      }

      return task;
    });

    queryClient.setQueryData(["tasks"], newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <header className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2>Minhas tarefas</h2>
        </div>

        <div className="item-center mb-4 flex gap-3">
          <Button color="ghost">
            <TrashIcon /> Limpar Tarefas
          </Button>

          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon /> Adicionar Tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </header>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Manhã" />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa registrada para a manhã.
            </p>
          )}
          {morningTasks?.map((task: TasksProps) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Tarde" />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa registrada para a tarde.
            </p>
          )}
          {afternoonTasks?.map((task: TasksProps) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Noite" />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa registrada para a noite
            </p>
          )}
          {eveningTasks?.map((task: TasksProps) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
