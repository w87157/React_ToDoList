import { TaskContextProvider } from "@/hooks/useTasks";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TaskContextProvider>
        {<Component {...pageProps} />}
        <ToastContainer />
      </TaskContextProvider>
    </>
  );
}
