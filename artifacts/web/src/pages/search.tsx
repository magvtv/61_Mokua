import { RootLayout } from "@/components/layout/root-layout";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchPosts } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { PostCard } from "@/components/ui/post-card";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  
  const { data, isLoading } = useSearchPosts(
    { q: debouncedQuery || "a", limit: 24 }, // API requires 'q', send default if empty to show some or handle properly
    { query: { enabled: debouncedQuery.length > 1 } }
  );

  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Search the Library</h1>
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search by title, author, or keyword..." 
              className="h-16 pl-14 text-lg rounded-2xl border-2 shadow-sm focus-visible:ring-offset-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </header>

        <div className="min-h-[400px]">
          {debouncedQuery.length <= 1 ? (
            <div className="text-center py-20">
              <p className="text-xl font-serif text-muted-foreground">Type to begin searching the archives...</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : data?.posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-display font-bold mb-4">No results found</p>
              <p className="text-lg font-serif text-muted-foreground">We couldn't find anything matching "{debouncedQuery}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
