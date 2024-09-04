import "./AddTaskDialog.css";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

import { TasksProps } from "../constants/tasks";

interface AddTaskDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (task: TasksProps) => void;
}

function AddTaskDialog({
  isOpen,
  handleClose,
  handleSubmit,
}: AddTaskDialogProps) {
  const [title, setTitle] = useState<any>();
  const [time, setTime] = useState<any>("morning");
  const [description, setDescription] = useState<any>();

  const nodeRef = useRef<null | HTMLParagraphElement>(null);
  if (!isOpen) return null;

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    });
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={5000}
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
              <h2 className="txt-[#35383E] text-xl font-semibold">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e: any) => setTime(e.target.value)}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    variant="secundary"
                    size="large"
                    className="w-full"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
}

export default AddTaskDialog;
