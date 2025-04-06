import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";

const url = "api/search/articles";

interface ArticleDto {
  id: number;
  status: string;
  highlight: { title: string; body: string };
  public_urls: { [locale: string]: string };
  created_at: string;
}

type SearchResponse = {
  results: ArticleDto[];
};

function SearchResults({ query, locale, categories }: { query: string; locale: string | null; categories: number[] }) {
  const { status, data, error } = useQuery({
    queryKey: ["search", locale, query, categories],
    queryFn: fetchApi<SearchResponse>(url, { search: query, locale, category: categories }),
    select: (data) => data.results,
    enabled: locale !== null && query.length > 0,
  });

  return (
    <div>
      {status === "pending" && "Loading…"}
      {status === "error" && `${error.message}`}
      {status === "success" &&
        (data.length === 0 ? (
          "No results found…"
        ) : (
          <>
            <p>{data.length} articles found</p>
            {data.map((article) => (
              <article key={article.id}>
                <h2>{article.highlight.title}</h2>
                <p>{article.highlight.body}</p>
              </article>
            ))}
          </>
        ))}
    </div>
  );
}

export default SearchResults;
