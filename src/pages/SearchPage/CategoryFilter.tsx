import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";

interface CategoryDto {
  id: number;
  name: {
    [key: string]: string;
  };
}

type CategoriesResponse = {
  results: CategoryDto[];
};

const url = "/api/categories/";

function CategoryFilter() {
  const { status, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchApi<CategoriesResponse>(url),
    select: (data) => data.results,
  });

  return (
    <div>
      <h3>Categories</h3>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && data.map((c, i) => <div key={i}>{c.name.en}</div>)}
    </div>
  );
}

export default CategoryFilter;
