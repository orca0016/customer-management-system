import { Provider as ReduxProvider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { reduxPersistor, reduxStore } from "./redux/store";
import { DialogProvider } from "./providers/dialog";
import { QueryProvider } from "./providers/query";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={reduxStore}>
        <DialogProvider>
          <PersistGate persistor={reduxPersistor}>
            <QueryProvider>
               <ToastContainer  className={'bg-slate-100'}/>
              <AppRoutes />
            </QueryProvider>
          </PersistGate>
        </DialogProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}
