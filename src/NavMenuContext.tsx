import React from 'react';

import { produce } from 'immer';
import type { Draft } from 'immer';
import { useLocalStorage } from 'usehooks-ts';

type State = {
  isOpen: boolean;
};

type ActionType =
  | { type: `TOGGLE_NAV` };

type DispatchContext = React.Dispatch<ActionType>;

const reducer: React.Reducer<State, ActionType> = produce(
  (draft: Draft<State>, action: ActionType) => {
    switch (action.type) {
      case `TOGGLE_NAV`:
        draft.isOpen = !draft.isOpen;
    }

    /** no default */
  }
);

const NavMenuContext = React.createContext({} as State);
const DispatchContext = React.createContext<DispatchContext>(() => { })

const NavMenuContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useLocalStorage(`isNavOpen`, false);
  const [state, dispatch] = React.useReducer(reducer, { isOpen });

  React.useEffect(() => {
    setIsOpen(state.isOpen);
  }, [state.isOpen, setIsOpen]);

  return (
    <DispatchContext.Provider value={dispatch} >
      <NavMenuContext.Provider value={state}>
        {children}
      </NavMenuContext.Provider>
    </DispatchContext.Provider>
  );
}

const useNavMenu = () => {
  const context = React.useContext(NavMenuContext);

  return context;
}

const useToggleNavMenu = () => {
  const dispatch = React.useContext(DispatchContext);

  const toggleNav = React.useCallback(() => {
    dispatch({ type: `TOGGLE_NAV` });
  }, [dispatch]);

  return toggleNav;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useNavMenu, useToggleNavMenu, NavMenuContextProvider };
