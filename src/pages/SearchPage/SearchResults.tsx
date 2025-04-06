import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api";
import { useEffect, useState } from "react";

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

// TODO: consider extracting into @/hooks module
function useLocaleStorage<T>(key: string, defaultValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage: ${error}`);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage: ${error}`);
    }
  }, [key, value]);

  return [value, setValue];
}

function SearchResults({ query, locale, categories }: { query: string; locale: string | null; categories: number[] }) {
  const { status, data, error } = useQuery({
    queryKey: ["search", locale, query, categories],
    queryFn: fetchApi<SearchResponse>(url, { search: query, locale, category: categories }),
    select: (data) => data.results,
    enabled: locale !== null && query.length > 0,
  });

  const [seenArticles, setSeenArticles] = useLocaleStorage<Record<number, number>>("seen", {});

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
    <div className="pb-20">
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
        <article key={article.id} className={`p-2 ${seenArticles[article.id] ? "text-gray-400" : "text-gray-800"}`}>
          <a
            href={article.public_urls[locale!]}
            target="_blank"
            className="hover:underline"
            onClick={() => setSeenArticles((prev) => ({ ...prev, [article.id]: Date.now() }))}
          >
            <h2 className="font-bold break-words mb-1">
              <span dangerouslySetInnerHTML={{ __html: safeHtml(article.highlight.title) }} />
              <span className="text-xs opacity-40"> •&nbsp;{article.status}</span>
            </h2>
          </a>
          <p className="text-sm break-words">
            <span className="opacity-50">{article.created_at.substring(0, 10)} — </span>
            <span dangerouslySetInnerHTML={{ __html: safeHtml(article.highlight.body) }} />
          </p>
        </article>
      ))}
    </div>
  );
}

export default SearchResults;
