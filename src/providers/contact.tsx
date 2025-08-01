import { createContext, useEffect, useReducer, useState } from "react";

const storageKeyName = "contacts";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = createContext<{
  dispatch: React.ActionDispatch<[action: Action]>;
  contacts: IContact[];
  editingContact?: IContact;
}>({ contacts: [], dispatch: () => undefined });

const reducer: (state: IState, action: Action) => IState = (
  state: IState,
  action: Action
) => {
  if (!state.id) state.id = 0;
  switch (action.type) {
    case "ADD": {
      const id = state.id + 1;
      return {
        ...state,
        id,
        contacts: [...state.contacts, { ...action.payload, id }],
      };
    }
    case "DELETE": {
      return {
        ...state,
        contacts: state.contacts.filter((el) => el.id !== action.payload),
      };
    }
    case "SET_EDIT": {
      return { ...state, editingContact: action.payload };
    }
    case "UPDATE": {
      return {
        ...state,
        editingContact: undefined,
        contacts: state.contacts.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
      };
    }
    case "SET": {
      if (!Array.isArray(action.payload)) return state;
      const lastId = Math.max(...action.payload.map((el) => el.id), 0);
      return {
        ...state,
        id: lastId,
        contacts: action.payload,
      };
    }
    default: {
      throw new Error("Unknown action.");
    }
  }
};

export const ContactProvider: React.FC<IChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, { contacts: [] });

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(storageKeyName, JSON.stringify(state.contacts));
  }, [state.contacts, loaded]);

  useEffect(() => {
    if (loaded) return;
    const json = localStorage.getItem(storageKeyName);
    if (!json) return;
    try {
      const contacts = JSON.parse(json);
      dispatch({ type: "SET", payload: contacts });
    } catch {
      console.log("Empty");
    }
    setLoaded(true);
  }, [loaded]);

  return (
    <ContactContext
      value={{
        dispatch,
        contacts: state.contacts,
        editingContact: state.editingContact,
      }}
    >
      {children}
    </ContactContext>
  );
};
