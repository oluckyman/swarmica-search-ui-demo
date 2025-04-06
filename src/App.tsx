import { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch(categoriesUrl)
      .then((res) => res.json())
      .then((data: CategoriesResponse) => data.results.map((d) => d.name.en))
      .then(setCategories);
  }, []);

  return (
    <>
      <h1>Categories</h1>
      {categories.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </>
  );
}

export default App;
