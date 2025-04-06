import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";

const url = "api/search/articles";

interface ArticleDto {
  id: number;
  status: "DRAFT" | "UNAPPROVED" | "APPROVED" | "PUBLISHED" | "ARCHIVED";
  highlight: { title: string; body: string };
  public_urls: { [locale: string]: string };
  created_at: string;
}

type SearchResponse = {
  results: ArticleDto[];
};

function safeHtml(rawHtml: string) {
  return DOMPurify.sanitize(rawHtml.replace(/<hl>(.*?)<\/hl>/g, "<span class='hl'>$1</span>"));
}

function SearchResults({ query, locale, categories }: { query: string; locale: string | null; categories: number[] }) {
  const { status, data, error } = useQuery({
    queryKey: ["search", locale, query, categories],
    queryFn: fetchApi<SearchResponse>(url, { search: query, locale, category: categories }),
    select: (data) => data.results,
    enabled: locale !== null && query.length > 0,
  });

  if (query === "") {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="mx-auto text-4xl mb-2">🔎</div>
          <p className="text-lg">Type something in the search box to find articles</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Status and results count block */}
      <div className="text-xs py-4 px-2 text-gray-500">
        {status === "pending" && <p className="text-gray-500">Loading…</p>}
        {status === "error" && <p className="text-red-500">{error.message}</p>}
        {status === "success" && (
          <p className="font-medium">
            {data.length === 0
              ? "No results found…"
              : `${data.length} ${data.length === 1 ? "article" : "articles"} found`}
          </p>
        )}
      </div>
      {data?.map((article) => (
        <article key={article.id} className="p-2 text-gray-800">
          <h2 className="font-bold break-words mb-1">
            <span dangerouslySetInnerHTML={{ __html: safeHtml(article.highlight.title) }} />
            <span className="text-xs opacity-40"> • {article.status}</span>
          </h2>
          <p className="text-sm break-words">
            <span className="opacity-50">{article.created_at.substring(0, 10)} — </span>
            <span
              className="text-sm break-words"
              dangerouslySetInnerHTML={{ __html: safeHtml(article.highlight.body) }}
            />
          </p>
        </article>
      ))}
    </div>
  );
}

export default SearchResults;
