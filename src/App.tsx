import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SearchPage from "./pages/SearchPage";
import "./App.css";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
