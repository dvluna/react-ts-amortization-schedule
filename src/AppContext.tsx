import React from 'react';

import { produce } from 'immer';
import type { Draft } from 'immer';
import { useLocalStorage } from 'usehooks-ts';

type NavMenuItem = {
  /** Menu Item Label */
  label: string;
  /** Menu Item navigation destination */
  to: string;
};

type State = {
  /** Calculation rounded to the nearest cent */
  isCalculationRounded: boolean;

  /** Navigation Menu Open */
  isNavMenuOpen: boolean;

  /** Navigation Menu Items */
  navMenuItems: NavMenuItem[];
};

type ActionType =
  | { type: `TOGGLE_CALCULATION_ROUNDING` }
  | { type: `TOGGLE_NAV_MENU` }
  | { type: `SET_NAV_MENU_ITEMS`, navMenuItems: NavMenuItem[] };

const reducer: React.Reducer<State, ActionType> = produce(
  (draft: Draft<State>, action: ActionType) => {
    switch (action.type) {
      case `TOGGLE_CALCULATION_ROUNDING`:
        draft.isCalculationRounded = !draft.isCalculationRounded;
        break;

      case `TOGGLE_NAV_MENU`:
        draft.isNavMenuOpen = !draft.isNavMenuOpen;
        break;

      case `SET_NAV_MENU_ITEMS`:
        draft.navMenuItems = action.navMenuItems;
        break;
    }

    /** no default */
  }
);

const AppContext = React.createContext({} as State);
const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => { })

const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isCalculationRounded, setIsCalculationRounded] = useLocalStorage(
    `isCalculationRounded`,
    true
  );

  const [state, dispatch] = React.useReducer(reducer, {
    isCalculationRounded,
    isNavMenuOpen: false,
    navMenuItems: []
  });

  React.useEffect(() => {
    setIsCalculationRounded(state.isCalculationRounded);
  }, [state.isCalculationRounded, setIsCalculationRounded]);

  return (
    <DispatchContext.Provider value={dispatch} >
      <AppContext.Provider value={state}>
        {children}
      </AppContext.Provider>
    </DispatchContext.Provider>
  );
}

const useAppContext = () => React.useContext(AppContext);

const useNavMenu = () => {
  const dispatch = React.useContext(DispatchContext);

  const toggleNavMenu = React.useCallback(() => {
    dispatch({ type: `TOGGLE_NAV_MENU` });
  }, [dispatch]);

  const setNavMenuItems = React.useCallback((navMenuItems: NavMenuItem[]) => {
    dispatch({ type: `SET_NAV_MENU_ITEMS`, navMenuItems });
  }, [dispatch]);

  return { toggleNavMenu, setNavMenuItems };
};

const useCalculation = () => {
  const dispatch = React.useContext(DispatchContext);

  const toggleCalculationRounding = React.useCallback(() => {
    dispatch({ type: `TOGGLE_CALCULATION_ROUNDING` });
  }, [dispatch]);

  return { toggleCalculationRounding };
};

export {
  useAppContext,
  useNavMenu,
  useCalculation,
  AppContextProvider
};
