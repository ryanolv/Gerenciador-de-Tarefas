import React from "react";

interface TasksSeparatorProps {
  icon: React.ReactNode;
  title: string;
}

function TasksSeparator({ icon, title }: TasksSeparatorProps) {
  return (
    <div className="border-brand-border flex gap-3 border-b border-solid pb-1">
      {icon}
      <p className="text-brand-text-gray text-sm">{title}</p>
    </div>
  );
}

export default TasksSeparator;
