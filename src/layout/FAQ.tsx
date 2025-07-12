import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionAndAnswers } from "@/data/questions";

const FAQ = () => {
  return (
    <section className="flex h-[38rem] flex-col items-center justify-center gap-8">
      <div className="mx-1.5 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Frequently Asked Questions
        </h1>
        <p className="text-center">
          Answers to common questions about ScholarLink and its features
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-2.5 border md:w-[40rem]"
      >
        {QuestionAndAnswers.map((faq, index) => (
          <AccordionItem
            key={index}
            value={"item-" + index}
            className="mx-4 flex flex-col gap-1.5"
          >
            <AccordionTrigger className="bg-accent border-border rounded-xl border p-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="bg-accent border-border rounded-xl border p-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
