import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FAQProps {
    question: string;
    answer: string;
    value: string;
  }
  
  const FAQList: FAQProps[] = [
    {
      question: "Is this template free?",
      answer: "Yes. It is a free Remix template.",
      value: "item-1",
    },
    {
      question: "Do I have to credit you to use it?",
      answer:
        "That would be nice, but it is not needed, enjoy the template!",
      value: "item-2",
    },
    {
      question:
        "Can I support you in any way?",
      answer:
        "You can star the respository on GitHub if you like the template. :)",
      value: "item-3",
    },
  ];
  
  export const Faq = () => {
    return (
      <section
        id="faq"
        className="container py-24 sm:py-32"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-blue-500 to-blue-700 text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
  
        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem
              key={value}
              value={value}
            >
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
  
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  };