"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery.",
  },
  {
    question: "Are your supplements third-party tested?",
    answer:
      "Yes, all our supplements undergo rigorous third-party testing to ensure quality, purity, and potency. We are committed to transparency and safety.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee on all products. If you're not satisfied, you can return the product for a full refund, no questions asked.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes! We offer tiered discounts on bulk orders. Contact our customer service team for more information about wholesale pricing.",
  },
  {
    question: "Are your products suitable for vegans?",
    answer:
      "Many of our products are vegan-friendly. Each product page clearly indicates dietary suitability. You can also filter by dietary preferences when browsing.",
  },
  {
    question: "How should I store my supplements?",
    answer:
      "Store supplements in a cool, dry place away from direct sunlight. Keep containers tightly sealed and out of reach of children.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We've got answers. Can't find what you're looking
            for? Contact our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
