import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import WebProvider from "./providers/WebProvider";
import OrderProvider from "./providers/orderProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  // <StrictMode>
  // </StrictMode>
  <WebProvider>
  <OrderProvider>
     <App/>
  </OrderProvider>
  </WebProvider>
);
