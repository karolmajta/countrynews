import { createContext } from "react";

export const WindowContext = createContext<Partial<Window> | null>(null);
