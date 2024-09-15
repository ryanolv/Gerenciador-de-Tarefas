import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import { TasksProps } from "../constants/tasks";

import SideBar from "../components/SideBar";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

function TaskDetailsPage() {
  const { taskId } = useParams<string>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TasksProps>();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data: any) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      );
    }

    const updatedTask = await response.json();
    setTask(updatedTask);

    toast.success("Tarefa atualizada com sucesso.");
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente."
      );
    }
    toast.success("Tarefa deletada com sucesso.");
    setDeleteIsLoading(false);
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);

      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between text-xs">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
              disabled={isSubmitting || deleteIsLoading}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={isSubmitting || deleteIsLoading}
          >
            {deleteIsLoading ? <LoaderIcon /> : <TrashIcon />}
            Deletar Tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode estar vazio.";
                    }
                    return true;
                  },
                })}
                errorMessage={
                  typeof errors?.title?.message === "string"
                    ? errors.title.message
                    : undefined
                }
                disabled={isSubmitting || deleteIsLoading}
              />
            </div>
            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horário é obrigatório.",
                })}
                errorMessage={
                  typeof errors?.time?.message === "string"
                    ? errors.time.message
                    : undefined
                }
                disabled={isSubmitting || deleteIsLoading}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode estar vazia.";
                    }
                    return true;
                  },
                })}
                errorMessage={
                  typeof errors?.description?.message === "string"
                    ? errors.description.message
                    : undefined
                }
                disabled={isSubmitting || deleteIsLoading}
              />
            </div>
          </div>

          {/* Botão de salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isSubmitting || deleteIsLoading}
            >
              {isSubmitting && <LoaderIcon />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
