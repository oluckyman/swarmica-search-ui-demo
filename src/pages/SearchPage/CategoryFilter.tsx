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

function CategoryFilter({
  locale,
  categories,
  onChange,
}: {
  locale: string | null;
  categories: number[];
  onChange: (categories: number[]) => void;
}) {
  const { status, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchApi<CategoriesResponse>(url),
    select: (data) => data.results,
  });

  const handleToggle = (categoryId: number) =>
    categories.includes(categoryId)
      ? onChange(categories.filter((id) => id !== categoryId))
      : onChange([...categories, categoryId]);

  return (
    <div>
      <h3>Categories</h3>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" &&
        data.map((c) => (
          <div key={c.id}>
            <label>
              <input
                type="checkbox"
                name={`category-${c.id}`}
                checked={categories.includes(c.id)}
                onChange={() => handleToggle(c.id)}
              />
              {c.name[locale || "en"]}
            </label>
          </div>
        ))}
    </div>
  );
}

export default CategoryFilter;
