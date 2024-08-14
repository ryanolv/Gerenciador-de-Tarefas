import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";

function Tasks() {
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
      {/* Lista de tarefas */}
      <div className="rounded-xl bg-white p-6">
        {/* MANHÃ */}
        <div className="space-y-3">
          <div className="flex gap-3 border-b border-solid border-[#F4F4F5] pb-1">
            <SunIcon />
            <p className="text-sm text-[#9A9C9F]">Manhã</p>
          </div>
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <div className="flex gap-3 border-b border-solid border-[#F4F4F5] pb-1">
            <CloudSunIcon />
            <p className="text-sm text-[#9A9C9F]">tarde</p>
          </div>
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <div className="flex gap-3 border-b border-solid border-[#F4F4F5] pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
