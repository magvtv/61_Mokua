import { RootLayout } from "@/components/layout/root-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendContactMessage } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSendContactMessage({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: () => {
        toast({ title: "Message failed", description: "Could not send message. Please try again later.", variant: "destructive" });
      }
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    if (data.honeypot) return;
    mutate({ data });
  };

  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Get in Touch</h1>
            <p className="text-xl font-serif text-muted-foreground leading-relaxed mb-10">
              Whether you have an inquiry regarding publication, partnerships, or just want to discuss literature, we'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">editor@mokualiterary.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Post</h3>
                  <p className="text-muted-foreground">Mokua Press<br/>124 Literary Avenue<br/>London, UK</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-card border border-border p-10 rounded-2xl text-center shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-4">Message Sent</h2>
                <p className="text-muted-foreground font-serif">Thank you for writing. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-6">
                <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wide">Name</label>
                    <Input {...register("name")} placeholder="Your name" />
                    {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wide">Email</label>
                    <Input type="email" {...register("email")} placeholder="your@email.com" />
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wide">Subject</label>
                  <Input {...register("subject")} placeholder="What is this regarding?" />
                  {errors.subject && <p className="text-destructive text-xs">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wide">Message</label>
                  <Textarea {...register("message")} placeholder="Type your message..." className="min-h-[200px]" />
                  {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </RootLayout>
  );
}
