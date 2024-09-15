import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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

interface ErrorProps {
  inputName: string;
  message: string;
}

function TaskDetailsPage() {
  const { taskId } = useParams<string>();
  const [task, setTask] = useState<TasksProps>();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorProps[]>([]);
  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (task: TasksProps) => {
    setSubmitIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      setSubmitIsLoading(false);
      return toast.error(
        "Erro ao atualizar a tarefa. Por favor, tente novamente."
      );
    }

    const updatedTask = await response.json();
    console.log(updatedTask);
    setTask(updatedTask);
    setSubmitIsLoading(false);

    toast.success("Tarefa atualizada com sucesso.");
    navigate(-1);
  };

  const handleSaveClick = () => {
    const newErrors: ErrorProps[] = [];

    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;
    const time = timeRef.current!.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório",
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatório",
      });
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      return;
    }

    const newTask = {
      id: task!.id,
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      time: timeRef.current!.value,
      status: task!.status,
    };
    handleSubmit(newTask);
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
    };

    fetchTask();
  }, [taskId]);

  const titleError = errors.find(
    (error: ErrorProps) => error.inputName === "title"
  );
  const timeError = errors.find(
    (error: ErrorProps) => error.inputName === "time"
  );
  const descriptionError = errors.find(
    (error: ErrorProps) => error.inputName === "description"
  );

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between text-xs">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
              disabled={submitIsLoading || deleteIsLoading}
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
            disabled={submitIsLoading || deleteIsLoading}
          >
            {deleteIsLoading ? <LoaderIcon /> : <TrashIcon />}
            Deletar Tarefa
          </Button>
        </div>
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              ref={titleRef}
              errorMessage={titleError?.message}
              disabled={submitIsLoading || deleteIsLoading}
            />
          </div>
          <div>
            <TimeSelect
              defaultValue={task?.time}
              ref={timeRef}
              errorMessage={timeError?.message}
              disabled={submitIsLoading || deleteIsLoading}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
              disabled={submitIsLoading || deleteIsLoading}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={submitIsLoading || deleteIsLoading}
          >
            {submitIsLoading && <LoaderIcon />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
