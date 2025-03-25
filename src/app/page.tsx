import Image from "next/image";
import TodoList from "./components/todo-list";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <TodoList />
      </div>
    </div>
  );
}
