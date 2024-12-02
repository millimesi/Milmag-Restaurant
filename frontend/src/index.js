import React from 'react';
import { ConfirmProvider } from "material-ui-confirm";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from './context/context.jsx';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfirmProvider
      defaultOptions={{
      dialogProps: {
        sx: { "& .MuiDialog-paper": { backgroundColor: "#f0f0f0" } }, // Example: Set background color
      },
      titleProps: {
        style: { color: "rgb(128, 0, 0)", fontWeight: "bold" }, // Example: Set title text color
      },
      confirmationButtonProps: {
        style: { backgroundColor: "rgb(128, 0, 0)", color: "white", fontWeight: 800 }, // Style for "Delete now"
      },
      cancellationButtonProps: {
        style: { backgroundColor: "rgb(128, 0, 0)", color: "white", fontWeight: 800 }, // Style for "Not now"
      },
    }}
    >
      <Context>
        <App />
      </Context>
    </ConfirmProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
