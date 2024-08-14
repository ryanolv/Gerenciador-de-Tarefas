import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

function Tasks() {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex justify-between">
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
      </div>
    </div>
  );
}

export default Tasks;
