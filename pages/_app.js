import { TaskContextProvider } from "@/hooks/useTasks";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TaskContextProvider>{<Component {...pageProps} />}</TaskContextProvider>
    </>
  );
}
