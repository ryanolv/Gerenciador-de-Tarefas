import "./AddTaskDialog.css";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

import { TasksProps } from "../constants/tasks";
import { LoaderIcon } from "../assets/icons";
import { useForm } from "react-hook-form";

interface AddTaskDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  onSubmitSuccess: (task: TasksProps) => void;
  onSubmitError: () => void;
}

interface IFormInput {
  title: string;
  time: string;
  description: string;
}

function AddTaskDialog({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}: AddTaskDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: { title: "", time: "morning", description: "" },
  });

  const nodeRef = useRef<HTMLInputElement>(null);

  const handleSaveClick = async (data: IFormInput) => {
    const title = data.title;
    const description = data.description;
    const time = data.time;

    const newTask: TasksProps = {
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      onSubmitError();
    }
    onSubmitSuccess(newTask);
    reset();
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      className="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="txt-brand-dark-blue text-xl font-semibold">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                className="flex w-[336px] flex-col space-y-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  {...register("title", {
                    required: "O título é obrigatório.",
                  })}
                  errorMessage={
                    typeof errors?.title?.message === "string"
                      ? errors.title.message
                      : ""
                  }
                  disabled={isSubmitting}
                />

                <TimeSelect
                  {...register("time", { required: "O horário é obrigatório" })}
                  errorMessage={
                    typeof errors?.time?.message === "string"
                      ? errors.time.message
                      : ""
                  }
                  disabled={isSubmitting}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  {...register("description", {
                    required: "A descrição é obrigatória.",
                  })}
                  errorMessage={
                    typeof errors?.description?.message === "string"
                      ? errors.description.message
                      : ""
                  }
                  disabled={isSubmitting}
                />

                <div className="flex gap-3">
                  <Button
                    color="secundary"
                    size="large"
                    className="w-full"
                    type="button"
                    onClick={() => {
                      reset();
                      handleClose();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
}

export default AddTaskDialog;
