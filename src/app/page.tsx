import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Work } from '@/components/sections/Work';
import { Rule } from '@/components/ui/Section';

/**
 * Section order is the argument the page makes:
 *   Hero + proof  -> can this person do the job? (answered in 10 seconds)
 *   Work          -> show me
 *   About         -> why is this person different from the other 200 applicants
 *   Skills        -> can I match them to my req
 *   Experience    -> is the level right
 *   Education     -> box-ticking for HR
 *   Contact       -> act on it
 *
 * Work sits above About deliberately. Evidence before biography.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Rule className="mt-8" />
      <Work />
      <Rule />
      <About />
      <Rule />
      <Skills />
      <Rule />
      <Experience />
      <Rule />
      <Education />
      <Rule />
      <Contact />
    </>
  );
}
