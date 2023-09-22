import React from 'react';

type NavMenuContextProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen: () => void;
} | null;

const NavMenuContext = React.createContext<NavMenuContextProps>(null);

const NavMenuContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = React.useCallback(() => {
    setIsOpen((value) => !value);
  }, [setIsOpen]);

  const value = React.useMemo(() => (
    { isOpen, setIsOpen, toggleIsOpen }),
    [isOpen, setIsOpen, toggleIsOpen]
  );

  return (
    <NavMenuContext.Provider value={value}>
      {children}
    </NavMenuContext.Provider>
  );
}

const useNavMenu = () => {
  const context = React.useContext(NavMenuContext);
  if (!context) {
    throw new Error(`Missing NavMenuContext.Provider`);
  }

  return context;
}

export { useNavMenu, NavMenuContextProvider };
