import { RootLayout } from "@/components/layout/root-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <RootLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-display font-bold text-muted/50 mb-6">404</h1>
        <h2 className="text-4xl font-display font-bold mb-4">Page Not Found</h2>
        <p className="text-xl font-serif text-muted-foreground max-w-md mb-8">
          The page you are looking for has been moved, deleted, or never existed in our archives.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Library</Link>
        </Button>
      </div>
    </RootLayout>
  );
}
