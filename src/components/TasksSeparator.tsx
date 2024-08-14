import React from "react";

interface TasksSeparatorProps {
  icon: React.ReactElement;
  title: string;
}

function TasksSeparator({ icon, title }: TasksSeparatorProps) {
  return (
    <div className="flex gap-3 border-b border-solid border-[#F4F4F5] pb-1">
      {icon}
      <p className="text-sm text-[#9A9C9F]">{title}</p>
    </div>
  );
}

export default TasksSeparator;
