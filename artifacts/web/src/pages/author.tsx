import { RootLayout } from "@/components/layout/root-layout";
import { useParams } from "wouter";
import { useGetAuthor, useGetAuthorPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/ui/post-card";
import { Loader2, Link as LinkIcon, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Author() {
  const { id } = useParams<{ id: string }>();
  const authorId = parseInt(id || "0", 10);
  
  const { data: author, isLoading: authorLoading } = useGetAuthor(authorId, { query: { enabled: !!authorId } });
  const { data: postsData, isLoading: postsLoading } = useGetAuthorPosts(authorId, { limit: 24 }, { query: { enabled: !!authorId } });

  if (authorLoading) {
    return (
      <RootLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </RootLayout>
    );
  }

  if (!author) {
    return (
      <RootLayout>
        <div className="min-h-[60vh] flex items-center justify-center text-center">
          <h1 className="text-3xl font-display font-bold">Author Not Found</h1>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <header className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-20 bg-card p-10 rounded-3xl border border-border shadow-sm">
          {author.avatarUrl ? (
            <img src={author.avatarUrl} alt={author.name} className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg border-4 border-background" />
          ) : (
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-secondary flex items-center justify-center shadow-lg border-4 border-background">
              <span className="text-6xl text-muted-foreground font-display">{author.name.charAt(0)}</span>
            </div>
          )}
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{author.name}</h1>
            <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              {author.bio}
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              {author.twitterHandle && (
                <Button variant="outline" size="sm" asChild className="rounded-full">
                  <a href={`https://twitter.com/${author.twitterHandle}`} target="_blank" rel="noreferrer">
                    <Twitter className="w-4 h-4 mr-2" /> @{author.twitterHandle}
                  </a>
                </Button>
              )}
              {author.instagramHandle && (
                <Button variant="outline" size="sm" asChild className="rounded-full">
                  <a href={`https://instagram.com/${author.instagramHandle}`} target="_blank" rel="noreferrer">
                    <Instagram className="w-4 h-4 mr-2" /> @{author.instagramHandle}
                  </a>
                </Button>
              )}
              {author.website && (
                <Button variant="outline" size="sm" asChild className="rounded-full">
                  <a href={author.website} target="_blank" rel="noreferrer">
                    <LinkIcon className="w-4 h-4 mr-2" /> Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </header>

        <div>
          <h2 className="text-3xl font-display font-bold mb-8 border-b border-border pb-4">
            Works by {author.name} <span className="text-muted-foreground text-xl font-normal">({author.postCount})</span>
          </h2>
          
          {postsLoading ? (
             <div className="flex justify-center py-20">
               <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
             </div>
          ) : postsData?.posts.length === 0 ? (
            <p className="text-muted-foreground font-serif">No pieces published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsData?.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
