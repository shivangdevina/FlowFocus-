import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, MessageCircle, User } from "lucide-react";

const tabs = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "To-Do", path: "/todo", icon: CheckSquare },
  { label: "Update", path: "/update", icon: MessageCircle },
  { label: "Profile", path: "/profile", icon: User },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl text-xs font-medium transition-all ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
