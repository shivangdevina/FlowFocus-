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
  const [newTime, setNewTime] = useState("");

  const toggle = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    store.setTodos(updated);
  };

  const addTask = () => {
    if (!newTask.trim() || !newTime.trim()) return;
    const item: TodoItem = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      category: "Growth",
      time: newTime,
    };
    const updated = [...todos, item];
    setTodos(updated);
    store.setTodos(updated);
    setNewTask("");
    setNewTime("");
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
    <div className="w-full px-6 md:px-12 pt-12 pb-16">
      <h1 className="font-heading text-6xl font-bold text-foreground mb-4">Daily Timetable</h1>
      <p className="text-base text-muted-foreground mb-10">
        {completed}/{total} tasks complete today
      </p>

      {/* Task list */}
      <div className="bg-surface rounded-3xl p-8 mb-8 shadow-sm">
        <div className="space-y-5">
          {[...todos].sort((a, b) => (a.time || "23:59").localeCompare(b.time || "23:59")).map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggle(todo.id)}
              className={`flex items-center gap-5 p-5 rounded-2xl cursor-pointer transition-all ${todo.completed ? "opacity-50" : ""
                } hover:bg-muted/40 border border-transparent hover:border-border shadow-sm`}
            >
              {/* Time Column */}
              <div className="w-20 flex-shrink-0 text-right">
                <span className={`text-base font-semibold tracking-wide ${todo.completed ? "text-muted-foreground line-through" : "text-primary"}`}>
                  {todo.time || "Any"}
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="w-[3px] h-12 bg-border/50 rounded-full flex-shrink-0" />

              <div
                className={`w-9 h-9 rounded-xl border-2 flex-shrink-0 flex items-center justify-center transition-all ${todo.completed
                  ? "bg-primary border-primary"
                  : "border-border"
                  }`}
              >
                {todo.completed && <Check className="w-5 h-5 text-primary-foreground" />}
              </div>
              <span
                className={`flex-1 text-base font-medium ${todo.completed ? "line-through text-muted-foreground" : "text-surface-foreground"
                  }`}
              >
                {todo.text}
              </span>
              <span
                className={`text-sm px-3.5 py-1.5 flex-shrink-0 rounded-xl font-medium ${categoryColors[todo.category] || "bg-muted"
                  } text-foreground/70`}
              >
                {todo.category}
              </span>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="flex gap-3 mt-8 pt-8 border-t border-border">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-36 rounded-2xl border border-border bg-card px-4 py-4 text-base font-medium text-surface-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 rounded-2xl border border-border bg-card px-5 py-4 text-base text-surface-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <button
            onClick={addTask}
            className="w-14 h-14 flex-shrink-0 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Category Compromise */}
      <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Category Compromise</h2>
      <div className="grid grid-cols-2 gap-5">
        {catCompromise.map((c) => (
          <div
            key={c.name}
            className={`rounded-3xl p-6 py-8 ${categoryColors[c.name] || "bg-card"}`}
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{c.name}</p>
            <p className="text-4xl font-heading font-bold text-foreground mt-2">{c.sacrificed}</p>
            <p className="text-sm text-muted-foreground mt-1">tasks remaining</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
