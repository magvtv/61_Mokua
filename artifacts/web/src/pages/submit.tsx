import { RootLayout } from "@/components/layout/root-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateSubmission } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const submissionSchema = z.object({
  submitterName: z.string().min(2, "Name must be at least 2 characters").max(100),
  submitterEmail: z.string().email("Invalid email address"),
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  contentType: z.enum(["story", "poem", "essay", "review"], { required_error: "Please select a content type" }),
  content: z.string().min(50, "Content must be at least 50 characters"),
  honeypot: z.string().optional(),
});

type SubmissionForm = z.infer<typeof submissionSchema>;

export default function Submit() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useCreateSubmission({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (err) => {
        toast({
          title: "Submission failed",
          description: err.error?.error || "Please try again later.",
          variant: "destructive"
        });
      }
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<SubmissionForm>({
    resolver: zodResolver(submissionSchema),
  });

  const onSubmit = (data: SubmissionForm) => {
    // If honeypot is filled, silently ignore (bot protection)
    if (data.honeypot) return;
    
    // Valid enums based on schema
    mutate({ data });
  };

  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex-1">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Submit Your Work</h1>
          <p className="text-xl font-serif text-muted-foreground leading-relaxed">
            We are always looking for fresh voices. Send us your best short stories, poetry, essays, and reviews.
          </p>
        </header>

        {submitted ? (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold mb-4">Received with thanks</h2>
            <p className="text-lg font-serif text-muted-foreground mb-8">
              Your submission has been safely delivered to our editors. We aim to respond within 2-4 weeks.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another Piece</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-sm space-y-8">
            
            {/* Honeypot field - hidden from users */}
            <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wide">Name</label>
                <Input {...register("submitterName")} placeholder="Jane Doe" className="h-12" />
                {errors.submitterName && <p className="text-destructive text-sm">{errors.submitterName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wide">Email</label>
                <Input type="email" {...register("submitterEmail")} placeholder="jane@example.com" className="h-12" />
                {errors.submitterEmail && <p className="text-destructive text-sm">{errors.submitterEmail.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wide">Piece Title</label>
                <Input {...register("title")} placeholder="The Midnight Library" className="h-12" />
                {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wide">Type</label>
                <select 
                  {...register("contentType")} 
                  className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select type...</option>
                  <option value="story">Short Story</option>
                  <option value="poem">Poetry</option>
                  <option value="essay">Essay</option>
                  <option value="review">Review</option>
                </select>
                {errors.contentType && <p className="text-destructive text-sm">{errors.contentType.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wide">Content / Manuscript</label>
              <Textarea 
                {...register("content")} 
                placeholder="Paste your work here..." 
                className="min-h-[300px] font-serif text-lg leading-relaxed p-4" 
              />
              <p className="text-xs text-muted-foreground mt-2">For formatting like italics/bold, basic markdown is supported.</p>
              {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isPending}>
              {isPending ? "Sending to Editors..." : <><Send className="w-5 h-5 mr-2" /> Submit Manuscript</>}
            </Button>
          </form>
        )}
      </div>
    </RootLayout>
  );
}
