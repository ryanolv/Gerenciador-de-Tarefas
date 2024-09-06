import Button from "./Button";
import {
  TrashIcon,
  AddIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from "../assets/icons";
import TasksSeparator from "./TasksSeparator";
import { TasksProps } from "../constants/tasks";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";

function Tasks() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      // pegar os dados da API
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });

      const tasks = await response.json();
      // atualizar o state "tasks"
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId: number | string) => {
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

  const handleTaskDeleteClick = async (taskId: number | string) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      );
    }
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    toast.success("Tarefa deletada com sucesso!");
  };

  const handleAddTask = async (task: TasksProps) => {
    // chamar a API para adicionar esta tarefa
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar a tarfa. Por favor, tente novamente."
      );
    }

    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso!");
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
            handleSubmit={handleAddTask}
          />
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
