import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { readingMode } = useTheme();
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const { mutate, isPending } = useSubscribeNewsletter({
    mutation: {
      onSuccess: () => {
        toast({ title: "Subscribed", description: "Thank you for joining our newsletter." });
        setEmail("");
      },
      onError: (err) => {
        toast({ title: "Error", description: err.error?.error || "Failed to subscribe", variant: "destructive" });
      }
    }
  });

  if (readingMode) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate({ data: { email } });
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="md:col-span-2">
            <span className="font-display font-bold text-3xl tracking-tight text-foreground block mb-4">
              Mokua<span className="text-primary">.</span>
            </span>
            <p className="text-muted-foreground font-serif max-w-sm mb-6 leading-relaxed">
              A digital literary platform curating exceptional short stories, timeless poetry, and thought-provoking essays.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <Input 
                type="email" 
                placeholder="Join the newsletter..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Joining..." : "Subscribe"}
              </Button>
            </form>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-foreground uppercase tracking-wider text-sm mb-5">Explore</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/category/stories" className="text-muted-foreground hover:text-foreground transition-colors">Stories</Link></li>
              <li><Link href="/category/poetry" className="text-muted-foreground hover:text-foreground transition-colors">Poetry</Link></li>
              <li><Link href="/category/essays" className="text-muted-foreground hover:text-foreground transition-colors">Essays</Link></li>
              <li><Link href="/category/reviews" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-foreground uppercase tracking-wider text-sm mb-5">Platform</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">Submit Work</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mokua Literary Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
