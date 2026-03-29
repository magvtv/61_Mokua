import { RootLayout } from "@/components/layout/root-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <RootLayout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Curating the <br/><span className="text-muted-foreground italic">Quiet Moments</span>
            </h1>
            <div className="prose prose-lg dark:prose-invert font-serif">
              <p>
                Founded by Nicolas Mokua, the Mokua Literary Platform is a digital harbor for thoughtful prose and evocative poetry. In an era defined by noise and fleeting attention, we are dedicated to curating works that demand to be savored.
              </p>
              <p>
                We believe that literature should not just entertain, but resonate. Our publication seeks to bridge the gap between traditional editorial elegance and modern digital accessibility, ensuring that every piece—whether a gripping short story, a reflective essay, or a delicate poem—is presented with the respect it deserves.
              </p>
              <p>
                This platform was built to amplify emerging voices alongside established writers, fostering a community that cherishes the written word.
              </p>
            </div>
            <div className="mt-10 flex gap-4">
              <Button size="lg" asChild><Link href="/submit">Submit Your Work</Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/contact">Contact the Editor</Link></Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {/* unsplash: moody black and white author looking */}
              <img 
                src={`${import.meta.env.BASE_URL}images/author-mokua.png`} 
                alt="Nicolas Mokua" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-3xl p-10 md:p-16 border border-border text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-6">Our Masthead</h2>
          <p className="text-xl font-serif text-muted-foreground italic max-w-2xl mx-auto">
            "To write is to carve a quiet space in a loud world. To read is to inhabit it."
          </p>
        </div>
      </div>
    </RootLayout>
  );
}
