import React from 'react';

type NavMenuContextProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen?: () => void;
};

const NavMenuContext = React.createContext<NavMenuContextProps>({});

const NavMenuContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen((value) => !value);
  };

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

  return context;
}

export { useNavMenu, NavMenuContextProvider };
