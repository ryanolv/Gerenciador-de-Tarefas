import Button from "./Button";
import {
  TrashIcon,
  AddIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from "../assets/icons";
import TasksSeparator from "./TasksSeparator";
import { initialTasks, TasksProps } from "../constants/tasks";
import { useState } from "react";
import TaskItem from "./TaskItem";
import { toast } from "sonner";

function Tasks() {
  const [tasks, setTasks] = useState<TasksProps[]>(initialTasks);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  // TODO: fix the input click problem
  const handleTaskCheckboxClick = (taskId: number) => {
    const newTasks: TasksProps[] = tasks.map((task) => {
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

    setTasks(newTasks);
  };

  const handleTaskDeleteClick = (taskId: number) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    toast.success("Tarefa deletada com sucesso!");
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <header className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2>Minhas tarefas</h2>
        </div>

        <div className="item-center mb-4 flex gap-3">
          <Button variant="ghost">
            <TrashIcon /> Limpar Tarefas
          </Button>
          <Button variant="primary">
            <AddIcon /> Adicionar Tarefa
          </Button>
        </div>
      </header>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={SunIcon} title="Manhã" />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={CloudSunIcon} title="Tarde" />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={MoonIcon} title="Noite" />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
