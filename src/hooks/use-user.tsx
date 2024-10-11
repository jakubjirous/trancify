"use client";

import { User } from "@supabase/auth-js";
import { ReactNode, createContext, useContext, useMemo } from "react";

type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
