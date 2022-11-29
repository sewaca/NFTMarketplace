import { createContext, ReactNode, useState } from "react";

interface LoginContextProps {
  children?: ReactNode;
}

type ILoginContext = [string | undefined, Function, Function];
export const LoginContext = createContext<ILoginContext>([
  "",
  () => {},
  () => {},
]);

export function LoginProvider({ children = <></> }: LoginContextProps) {
  const [login, setLogin] = useState<string | undefined>(
    localStorage.getItem("login") || ""
  );
  const changeLogin = (s: string) => {
    localStorage.setItem("login", s);
    setLogin(s);
  };
  const unsetLogin = () => {
    localStorage.removeItem("login");
    setLogin(undefined);
  };

  return (
    <LoginContext.Provider value={[login, changeLogin, unsetLogin]}>
      {children}
    </LoginContext.Provider>
  );
}
