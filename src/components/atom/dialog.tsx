import { useContext, useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";

import { DialogContext } from "../../providers/dialog";

const DialogWrapper: React.FC<IChildren> = ({ children }) => {
  const dialogBox = useRef<HTMLElement>(undefined);
  const wrapper = useRef<HTMLElement>(undefined);
  const { open, setOpen } = useContext(DialogContext);

  useEffect(() => {
    const wrapperDom = wrapper.current;
    const dialogBoxDom = dialogBox.current;
    if (!wrapperDom || !open || !dialogBoxDom) return;
    wrapperDom.addEventListener("click", (event) => {
      if (!dialogBoxDom.contains(event.target as Node)) {
        setOpen(()=>({}))
      }
    });
    return () => {
      wrapperDom.removeEventListener("click", () => undefined);
      dialogBoxDom.removeEventListener("click", () => undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogBox, wrapper, open]);

  return (
    <section
      ref={wrapper as React.Ref<HTMLDivElement>}
      className="fixed left-0 top-0 w-full h-screen overflow-y-auto flex justify-center items-end sm:items-center z-40 bg-slate-900/60 px-5"
    >
      <div
        ref={dialogBox as React.Ref<HTMLDivElement>}
        className="bg-white border border-slate-300 rounded-lg max-w-[600px] w-full p-5 mb-5 sm:mb-0"
      >
        {children}
      </div>
    </section>
  );
};

interface IDialogProps extends IChildren {
  title: string;
  purpose:'deleteLedger'|"addLedger"
}

export const Dialog: React.FC<IDialogProps> = ({ title, children , purpose }) => {
  const { open, setOpen } = useContext(DialogContext);

  if (!open[purpose]) return <></>;
  return (
    <DialogWrapper>
      <div className="flex items-center justify-between">
        <p className="text-lg text-slate-800 font-semibold">{title}</p>
        <button className="cursor-pointer" onClick={() => setOpen(()=>({}))}>
          <IoClose className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </DialogWrapper>
  );
};
