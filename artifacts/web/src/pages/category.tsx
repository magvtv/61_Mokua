import { RootLayout } from "@/components/layout/root-layout";
import { useParams, Link } from "wouter";
import { useListPosts, useListCategories } from "@workspace/api-client-react";
import { PostCard } from "@/components/ui/post-card";
import { Loader2 } from "lucide-react";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { data: postsData, isLoading } = useListPosts({ category: slug, limit: 24 });
  const { data: categories } = useListCategories();

  const categoryInfo = categories?.categories.find(c => c.slug === slug);

  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 capitalize">{categoryInfo?.name || slug}</h1>
          {categoryInfo?.description && (
            <p className="text-xl font-serif text-muted-foreground">{categoryInfo.description}</p>
          )}
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : postsData?.posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-serif text-muted-foreground">No pieces published in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsData?.posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  );
}
