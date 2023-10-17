import React from 'react';

import { produce } from 'immer';
import type { Draft } from 'immer';
import { useLocalStorage } from 'usehooks-ts';

type NavMenuItem = {
  label: string;
  to: string;
};

type State = {
  isOpen: boolean;
  navMenuItems: NavMenuItem[];
};

type ActionType =
  | { type: `TOGGLE_NAV` }
  | { type: `SET_NAV_MENU_ITEMS`, navMenuItems: NavMenuItem[] };

type DispatchContext = React.Dispatch<ActionType>;

const reducer: React.Reducer<State, ActionType> = produce(
  (draft: Draft<State>, action: ActionType) => {
    switch (action.type) {
      case `TOGGLE_NAV`:
        draft.isOpen = !draft.isOpen;
        break;

      case `SET_NAV_MENU_ITEMS`:
        draft.navMenuItems = action.navMenuItems;
        break;
    }

    /** no default */
  }
);

const NavMenuContext = React.createContext({} as State);
const DispatchContext = React.createContext<DispatchContext>(() => { })

const NavMenuContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useLocalStorage(`isNavOpen`, false);
  const [state, dispatch] = React.useReducer(reducer, { isOpen, navMenuItems: [] });

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

const useNavMenu = () => React.useContext(NavMenuContext);

const useToggleNavMenu = () => {
  const dispatch = React.useContext(DispatchContext);

  const toggleNav = React.useCallback(() => {
    dispatch({ type: `TOGGLE_NAV` });
  }, [dispatch]);

  return toggleNav;
};

const useSetNavMenuItems = (navMenuItems: NavMenuItem[]) => {
  const dispatch = React.useContext(DispatchContext);

  dispatch({ type: `SET_NAV_MENU_ITEMS`, navMenuItems });
}

// eslint-disable-next-line react-refresh/only-export-components
export { useNavMenu, useSetNavMenuItems, useToggleNavMenu, NavMenuContextProvider };
