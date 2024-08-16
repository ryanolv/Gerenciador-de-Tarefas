import { createPortal } from "react-dom";

interface AddTaskDialogProps {
  isOpen: boolean;
}

function AddTaskDialog({ isOpen }: AddTaskDialogProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="txt-[#35383E] text-xl font-semibold">Nova tarefa</h2>
        <p className="mt-1 text-[#9A9C9F]">Insira as informações abaixo</p>
      </div>
    </div>,
    document.body
  );
}

export default AddTaskDialog;
