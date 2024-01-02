import { Provider } from 'react-redux';
import './App.css';
import AppRouter from "./router/AppRouter"
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
import store, { persistor } from './app/store';

function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
    <ToastContainer />
    </>
  );
}

export default App;
