export interface TasksProps {
  id: number;
  title: string;
  description: string;
  time: "morning" | "afternoon" | "evening";
  status: "to_do" | "doing" | "done";
}

export const initialTasks: TasksProps[] = [
  {
    id: 1,
    title: "estudar",
    description: "estudar react",
    time: "morning",
    status: "done",
  },
  {
    id: 2,
    title: "arrumar casa",
    description: "lavar banheiro e passar pano",
    time: "afternoon",
    status: "doing",
  },
  {
    id: 3,
    title: "meditar",
    description: "meditar para descansar do dia",
    time: "evening",
    status: "to_do",
  },
];
