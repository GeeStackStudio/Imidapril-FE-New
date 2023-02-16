import { useNavigate } from "react-router-dom";

export default function useQuickRouter() {
  const history = useNavigate();
  return {
    browserIndex(path: string) {
      return history("/browser?path=" + path);
    },
    profileIndex() {
      return history("/profile");
    },
    taskIndex(status: "Working" | "Done" | "All") {
      return history("/task?status=" + status);
    },
    annotateTaskIndex() {
      return history("/annotateTask");
    },
    login() {
      return history("/login");
    },
  };
}
