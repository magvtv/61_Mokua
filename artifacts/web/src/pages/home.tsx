import { RootLayout } from "@/components/layout/root-layout";
import { useListPosts, useGetFeaturedPost, useListCategories } from "@workspace/api-client-react";
import { PostCard } from "@/components/ui/post-card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const { data: featuredPost, isLoading: isFeaturedLoading } = useGetFeaturedPost();
  const { data: postsData, isLoading: isPostsLoading } = useListPosts({ limit: 6 });
  const { data: categoriesData } = useListCategories();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <RootLayout>
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Hero Section */}
        <section className="mb-16">
          {isFeaturedLoading ? (
            <div className="w-full h-[500px] rounded-2xl bg-muted animate-pulse flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : featuredPost ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <PostCard post={featuredPost} featured />
            </motion.div>
          ) : (
             /* Fallback if no featured post is explicitly marked */
            postsData?.posts[0] && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <PostCard post={postsData.posts[0]} featured />
              </motion.div>
            )
          )}
        </section>

        {/* Categories Nav Strip */}
        <section className="mb-16 border-b border-t border-border/50 py-4 overflow-x-auto hide-scrollbar">
          <ul className="flex items-center gap-8 min-w-max justify-center lg:justify-start">
            <li>
              <Link href="/" className="font-sans font-semibold tracking-wide uppercase text-sm text-primary">
                All Latest
              </Link>
            </li>
            {categoriesData?.categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.slug}`} className="font-sans font-medium tracking-wide uppercase text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Latest Posts Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground">Recent Publications</h2>
            <Button variant="ghost" className="hidden sm:flex" asChild>
              <Link href="/search">
                View all <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {isPostsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : postsData?.posts.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              {/* empty state minimalist open book elegant */}
              <img src={`${import.meta.env.BASE_URL}images/empty-state.png`} alt="No posts" className="w-32 h-32 mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl font-display font-bold mb-2">The Library is Quiet</h3>
              <p className="text-muted-foreground font-serif">We haven't published anything yet. Check back soon.</p>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {postsData?.posts.map((post, i) => {
                // skip the first one if we used it as fallback featured
                if (!featuredPost && i === 0) return null;
                return (
                  <motion.div key={post.id} variants={item} className="h-full">
                    <PostCard post={post} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          
          <div className="mt-12 text-center sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/search">View all publications</Link>
            </Button>
          </div>
        </section>

      </div>
    </RootLayout>
  );
}
