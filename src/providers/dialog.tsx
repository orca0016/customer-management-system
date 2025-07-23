import { createContext, useState } from "react";
interface IDialogs{
  deleteLedger?:boolean,
  addLedger?:boolean,

}
// eslint-disable-next-line react-refresh/only-export-components
export const DialogContext = createContext<{
  open: IDialogs;
  setOpen: React.Dispatch<React.SetStateAction<IDialogs>>;
}>({ open: {}, setOpen: () => undefined });

export const DialogProvider: React.FC<IChildren> = ({ children }) => {
  const [open, setOpen] = useState<IDialogs>({});

  return <DialogContext value={{ open, setOpen }}>{children}</DialogContext>;
};
