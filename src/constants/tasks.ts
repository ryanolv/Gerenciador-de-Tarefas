export interface TasksProps {
  id: number | string;
  title: string;
  description: string;
  time: string;
  status: "not_started" | "in_progress" | "done";
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
    status: "in_progress",
  },
  {
    id: 3,
    title: "meditar",
    description: "meditar para descansar do dia",
    time: "evening",
    status: "not_started",
  },
];
