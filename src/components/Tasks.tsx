import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import TasksSeparator from "./TasksSeparator";
import { initialTasks, TasksProps } from "../constants/tasks";
import { useState } from "react";
import TaskItem from "./TaskItem";

function Tasks() {
  const [tasks] = useState<TasksProps[]>(initialTasks);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const moonTasks = tasks.filter((task) => task.time === "evening");

  return (
    <div className="w-full px-8 py-16">
      {/* Cabeçalho */}
      <header className="flex justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2>Minhas tarefas</h2>
        </div>

        <div className="item-center flex gap-3">
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
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={CloudSunIcon} title="Tarde" />
          {afternoonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={MoonIcon} title="Noite" />
          {moonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
