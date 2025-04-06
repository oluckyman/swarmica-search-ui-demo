import { useQuery } from "@tanstack/react-query";
import "./App.css";

interface CategoryDto {
  id: number;
  name: {
    [key: string]: string;
  };
}

type CategoriesResponse = {
  results: CategoryDto[];
};

const categoriesUrl = "/api/categories/";

function App() {
  const {
    status,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(categoriesUrl);
      if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
      return (await res.json()) as CategoriesResponse;
    },
    select: (data) => data.results,
  });

  return (
    <>
      <h1>Categories</h1>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && categories.map((c, i) => <div key={i}>{c.name.en}</div>)}
    </>
  );
}

export default App;
