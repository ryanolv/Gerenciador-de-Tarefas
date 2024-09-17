import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";

import SideBar from "../components/SideBar";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import useUpdateTask from "../hooks/data/use-update-task";
import useDeleteTask from "../hooks/data/use-delete-task";
import useGetTask from "../hooks/data/use-get-task";

function TaskDetailsPage() {
  const { taskId } = useParams<string>();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task } = useGetTask(taskId as string, reset);

  const { mutate: mutateDelete, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId as string);

  const { mutate: mutateUpdate, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId as string);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data: any) => {
    mutateUpdate(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso.");
        navigate(-1);
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa. Por favor, tente novamente.");
      },
    });
  };

  const handleDeleteClick = async () => {
    mutateDelete(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso.");
        navigate(-1);
      },
      onError: () =>
        toast.error("Erro ao deletar a tarefa. Por favor, tente novamente."),
    });
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between text-xs">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
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
            disabled={updateTaskIsLoading || deleteTaskIsLoading}
          >
            {deleteTaskIsLoading ? <LoaderIcon /> : <TrashIcon />}
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
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
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
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
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
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
              />
            </div>
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {updateTaskIsLoading && <LoaderIcon />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
