import { Link } from "wouter";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "./badge";
import type { PostSummary } from "@workspace/api-client-react.schemas";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const contentBadgeVariant = 
    post.contentType === "story" ? "story" :
    post.contentType === "poem" ? "poem" :
    post.contentType === "essay" ? "essay" : "review";

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 z-0">
          {post.featuredImageUrl ? (
            <img 
              src={post.featuredImageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
          <div className="flex gap-3 items-center mb-4">
            <Badge variant={contentBadgeVariant}>{post.contentType}</Badge>
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              {post.category.name}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight group-hover:text-primary-100 transition-colors">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-white/90 text-lg md:text-xl font-serif max-w-2xl mb-6 line-clamp-2 md:line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              {post.author.avatarUrl && (
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full object-cover border border-white/20" />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</time>
            {post.readingTime > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min read
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {post.featuredImageUrl && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <img 
            src={post.featuredImageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 border-[0.5px] border-black/5 dark:border-white/5 inset-shadow-sm rounded-t-xl" />
        </div>
      )}
      
      <div className={cn("flex flex-col flex-1 p-6", !post.featuredImageUrl && "pt-8")}>
        <div className="flex justify-between items-start mb-4 gap-2">
          <Badge variant={contentBadgeVariant}>{post.contentType}</Badge>
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            {post.category.name}
          </span>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-foreground mb-3 leading-snug group-hover:text-muted-foreground transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-muted-foreground font-serif leading-relaxed mb-6 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/40">
          <span className="font-medium text-foreground">{post.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
          {post.readingTime > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
