// Simple localStorage-based state management
export interface UserProfile {
  name: string;
  email: string;
  education: string;
  workExperience: string;
  occupation: string;
  goals: string[];
  sleepHours: number;
  nonNegotiableClasses: string;
  domainPriorities: string[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

const KEYS = {
  isLoggedIn: 'app_logged_in',
  isOnboarded: 'app_onboarded',
  profile: 'app_profile',
  todos: 'app_todos',
  chatMessages: 'app_chat_messages',
};

export const store = {
  getIsLoggedIn: () => localStorage.getItem(KEYS.isLoggedIn) === 'true',
  setIsLoggedIn: (v: boolean) => localStorage.setItem(KEYS.isLoggedIn, String(v)),

  getIsOnboarded: () => localStorage.getItem(KEYS.isOnboarded) === 'true',
  setIsOnboarded: (v: boolean) => localStorage.setItem(KEYS.isOnboarded, String(v)),

  getProfile: (): UserProfile => {
    const raw = localStorage.getItem(KEYS.profile);
    return raw ? JSON.parse(raw) : {
      name: '', email: '', education: '', workExperience: '', occupation: '',
      goals: ['', '', ''], sleepHours: 8, nonNegotiableClasses: '', domainPriorities: [],
    };
  },
  setProfile: (p: UserProfile) => localStorage.setItem(KEYS.profile, JSON.stringify(p)),

  getTodos: (): TodoItem[] => {
    const raw = localStorage.getItem(KEYS.todos);
    return raw ? JSON.parse(raw) : [
      { id: '1', text: 'Review ML lecture notes', completed: false, category: 'Study' },
      { id: '2', text: 'Complete assignment draft', completed: false, category: 'Work' },
      { id: '3', text: '30 min exercise', completed: true, category: 'Health' },
      { id: '4', text: 'Read 20 pages', completed: false, category: 'Growth' },
    ];
  },
  setTodos: (t: TodoItem[]) => localStorage.setItem(KEYS.todos, JSON.stringify(t)),

  getChatMessages: (): ChatMessage[] => {
    const raw = localStorage.getItem(KEYS.chatMessages);
    return raw ? JSON.parse(raw) : [];
  },
  setChatMessages: (m: ChatMessage[]) => localStorage.setItem(KEYS.chatMessages, JSON.stringify(m)),

  logout: () => {
    localStorage.removeItem(KEYS.isLoggedIn);
    localStorage.removeItem(KEYS.isOnboarded);
  },
};
