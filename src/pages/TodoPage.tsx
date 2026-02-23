import { useState } from "react";
import { store, TodoItem } from "@/lib/store";
import { Check, Plus } from "lucide-react";

const categoryColors: Record<string, string> = {
  Study: "bg-accent/50",
  Work: "bg-secondary",
  Health: "bg-muted",
  Growth: "bg-card",
};

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>(store.getTodos());
  const [newTask, setNewTask] = useState("");

  const toggle = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    store.setTodos(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const item: TodoItem = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      category: "Growth",
    };
    const updated = [...todos, item];
    setTodos(updated);
    store.setTodos(updated);
    setNewTask("");
  };

  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;

  // Category compromise
  const categories = ["Study", "Work", "Health", "Growth"];
  const catCompromise = categories.map((c) => ({
    name: c,
    sacrificed: todos.filter((t) => t.category === c && !t.completed).length,
  }));

  return (
    <div className="w-full px-6 md:px-10 pt-10">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-1">To-Do</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {completed}/{total} tasks complete today
      </p>

      {/* Task list */}
      <div className="bg-surface rounded-2xl p-6 mb-6">
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggle(todo.id)}
              className={`flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all ${
                todo.completed ? "opacity-50" : ""
              } hover:bg-muted/40`}
            >
              <div
                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              >
                {todo.completed && <Check className="w-4 h-4 text-primary-foreground" />}
              </div>
              <span
                className={`flex-1 text-sm font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : "text-surface-foreground"
                }`}
              >
                {todo.text}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                  categoryColors[todo.category] || "bg-muted"
                } text-foreground/70`}
              >
                {todo.category}
              </span>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <button
            onClick={addTask}
            className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Compromise */}
      <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Category Compromise</h2>
      <div className="grid grid-cols-2 gap-3">
        {catCompromise.map((c) => (
          <div
            key={c.name}
            className={`rounded-2xl p-5 py-6 ${categoryColors[c.name] || "bg-card"}`}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{c.name}</p>
            <p className="text-2xl font-heading font-bold text-foreground mt-1">{c.sacrificed}</p>
            <p className="text-xs text-muted-foreground">tasks remaining</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
