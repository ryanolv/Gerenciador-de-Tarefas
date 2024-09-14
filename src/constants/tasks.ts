export interface TasksProps {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "not_started" | "in_progress" | "done";
}
