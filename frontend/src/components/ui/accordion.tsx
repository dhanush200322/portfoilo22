"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// ✅ Utility function to merge class names
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Accordion Root
export const Accordion = AccordionPrimitive.Root;

// ✅ Accordion Item
export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-gray-200", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// ✅ Accordion Trigger
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-lg font-medium transition-all hover:underline " +
          "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

// ✅ Accordion Content
export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-gray-400 text-sm transition-all " +
        "data-[state=closed]:animate-accordion-up " +
        "data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

// ✅ Accordion Demo component
function AccordionDemo() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center text-white">
        Accordion Demo
      </h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is React?</AccordionTrigger>
          <AccordionContent>
            React is a JavaScript library for building user interfaces. It lets
            you create reusable components and manage UI efficiently using the
            virtual DOM.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
          <AccordionContent>
            Tailwind CSS is a utility-first CSS framework that allows you to
            rapidly build custom UIs directly in your markup.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is Radix UI?</AccordionTrigger>
          <AccordionContent>
            Radix UI is an open-source component library providing
            accessibility-focused, unstyled primitives for React.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// ✅ Main App component (for testing or direct use)
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <AccordionDemo />
    </div>
  );
}
