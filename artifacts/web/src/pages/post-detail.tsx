import { RootLayout } from "@/components/layout/root-layout";
import { useParams } from "wouter";
import { useGetPost, useGetRelatedPosts } from "@workspace/api-client-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/ui/post-card";
import { format } from "date-fns";
import { BookOpen, Share2, Loader2, Link as LinkIcon, User } from "lucide-react";
import DOMPurify from "dompurify";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useGetPost(slug);
  const { data: relatedData } = useGetRelatedPosts(slug);
  const { readingMode, setReadingMode } = useTheme();
  const { toast } = useToast();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Clean up reading mode on unmount
  useEffect(() => {
    return () => setReadingMode(false);
  }, [setReadingMode]);

  if (isLoading) {
    return (
      <RootLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </RootLayout>
    );
  }

  if (error || !post) {
    return (
      <RootLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-display font-bold mb-4">Piece Not Found</h1>
          <p className="text-muted-foreground font-serif max-w-md mb-8">
            The literary work you are looking for has been moved or no longer exists.
          </p>
          <Button asChild><Link href="/">Return to Library</Link></Button>
        </div>
      </RootLayout>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || "",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied", description: "Copied to clipboard." });
    }
  };

  const isPoem = post.contentType === "poem";
  const cleanContent = DOMPurify.sanitize(post.content);

  return (
    <RootLayout>
      {/* Reading Progress Bar (hidden for poems) */}
      {!isPoem && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-100 origin-left"
          style={{ scaleX }}
        />
      )}

      {/* Floating Reading Mode Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon" 
          variant={readingMode ? "default" : "secondary"}
          className="rounded-full w-12 h-12 shadow-lg"
          onClick={() => setReadingMode(!readingMode)}
          title="Toggle Reading Mode"
        >
          <BookOpen className="w-5 h-5" />
        </Button>
      </div>

      <article className="pt-24 pb-20 w-full">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center items-center gap-3 mb-6">
              <Badge variant="outline">{post.contentType}</Badge>
              <Link href={`/category/${post.category.slug}`} className="text-sm font-sans font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                {post.category.name}
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl md:text-2xl font-serif text-muted-foreground max-w-3xl mx-auto mb-8 italic">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-4 text-sm font-sans text-muted-foreground">
              <Link href={`/authors/${post.author.id}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                {post.author.avatarUrl ? (
                  <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="font-medium text-foreground">{post.author.name}</span>
              </Link>
              <span className="w-1 h-1 rounded-full bg-border" />
              <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</time>
              {!isPoem && post.readingTime > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        {post.featuredImageUrl && !readingMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="w-full aspect-21/9 rounded-2xl overflow-hidden shadow-xl bg-muted">
              <img 
                src={post.featuredImageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className={cn(
              "mx-auto",
              isPoem ? "prose-poetry text-center md:text-left md:max-w-2xl" : "prose prose-lg dark:prose-invert"
            )}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* Tags & Share */}
          <div className="max-w-[68ch] mx-auto mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link key={tag.id} href={`/search?tag=${tag.slug}`}>
                  <Badge variant="secondary" className="font-sans font-normal hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={handleShare} className="shrink-0 font-sans">
              <Share2 className="w-4 h-4 mr-2" /> Share Piece
            </Button>
          </div>

          {/* Author Bio Card */}
          {!readingMode && (
            <div className="max-w-[68ch] mx-auto mt-16 bg-card rounded-2xl p-8 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
              {post.author.avatarUrl ? (
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-24 h-24 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
              <div className="text-center sm:text-left">
                <h4 className="font-display text-xl font-bold mb-2">Written by {post.author.name}</h4>
                <p className="font-serif text-muted-foreground mb-4 leading-relaxed">{post.author.bio}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href={`/authors/${post.author.id}`}>View all from {post.author.name}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {!readingMode && relatedData && relatedData.posts.length > 0 && (
        <div className="bg-secondary/30 border-t border-border py-20 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-10">Read More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedData.posts.map(related => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </div>
      )}
    </RootLayout>
  );
}
