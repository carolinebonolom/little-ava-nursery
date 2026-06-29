import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What ages do you cater for?", a: "We welcome children from 3 months to 5 years of age, across four age-appropriate rooms." },
  { q: "What are your opening hours?", a: "We are open Monday to Friday, 7:30am to 6:00pm, 51 weeks per year (closed between Christmas and New Year and on Bank Holidays)." },
  { q: "Do you accept government-funded places?", a: "Yes, we accept all government-funded entitlements including 15 hours universal, 30 hours extended, and 2-year-old funding." },
  { q: "What qualifications do your staff hold?", a: "All our staff hold a minimum Level 3 qualification in Early Years Education and Care. Many hold higher qualifications including degrees and specialist certifications." },
  { q: "How do I register my child?", a: "You can start by booking a visit to see our nursery, then complete our registration form. If we're full, you can join our waiting list." },
  { q: "What is your safeguarding policy?", a: "Safeguarding is our highest priority. All staff are DBS checked, trained in child protection, and we have a designated safeguarding lead. Full policies are available on our Policies page." },
  { q: "Do you cater for dietary requirements?", a: "Absolutely. We accommodate all allergies, intolerances, and dietary preferences including vegetarian, vegan, halal, and kosher diets." },
  { q: "How will I know what my child has been doing?", a: "We provide regular updates on activities, meals, nappy changes, and nap times. You can also contact us directly for the latest information." },
  { q: "What is your settling-in process?", a: "We offer flexible settling-in sessions before your child's official start date. This typically involves 2-3 short visits building up to a full session, tailored to your child's needs." },
  { q: "Do you have outdoor space?", a: "Yes, we have secure outdoor learning areas that children access daily, whatever the weather. We believe outdoor play is essential for development." },
  { q: "What happens if my child is unwell?", a: "If your child becomes unwell during the day, we will contact you immediately. Children with infectious illnesses must stay home for the recommended exclusion period." },
  { q: "Can I visit the nursery before registering?", a: "Absolutely! We encourage all prospective parents to book a visit. You can do this through our Book a Visit page or by contacting us directly." },
];

export default function FAQ() {
  return (
    <PublicLayout>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about Little Ava Nursery."
        breadcrumb="Home / Information / FAQ"
      />

      <section className="section-padding">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4 shadow-sm">
                <AccordionTrigger className="text-left font-medium text-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PublicLayout>
  );
}
