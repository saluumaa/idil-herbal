import { ChevronDown, ChevronUp } from 'lucide-react';
import {motion} from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long until I see results?',
    answer: 'Most customers notice initial improvements within 4-6 weeks of consistent use. For optimal results, we recommend using the treatment for at least 3 months.'
  },
  {
    question: 'Is it suitable for all hair types?',
    answer: 'Yes! Our formula is specially designed to work effectively on all hair types and textures, from straight to coily hair.'
  },
  {
    question: 'Are there any side effects?',
    answer: 'Our product is made with 100% natural ingredients and is generally well-tolerated. However, we recommend doing a patch test before first use.'
  },
  {
    question: 'Whats your return policy?',
    answer: 'We offer a 90-day money-back guarantee. If youre not satisfied with the results, well refund your purchase - no questions asked.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.section className="py-20 bg-white"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}