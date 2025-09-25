import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";


// Master glossary of terms from all 5 pages
const terms = [
  // Product & Solution
  {
    term: "MVP (Minimum Viable Product)",
    category: "Product",
    definition: "The simplest version of a product that solves a core problem for early users.",
    example: "Example: A basic app with only key features launched to test market demand.",
    link: "https://www.productplan.com/glossary/minimum-viable-product-mvp/"
  },
  {
    term: "Pivot",
    category: "Strategy",
    definition: "A significant change in business strategy based on feedback or results.",
    example: "Changing from a B2C to a B2B model.",
    link: "https://www.investopedia.com/terms/p/pivot.asp"
  },
  {
    term: "Prototype",
    category: "Product",
    definition: "An early sample or model of a product used to test concepts and functionality.",
    example: "A clickable app demo before full development.",
    link: "https://www.interaction-design.org/literature/topics/prototyping"
  },

  // Market & Competition
  {
    term: "TAM / SAM / SOM",
    category: "Market",
    definition: "Market sizing metrics: Total Available Market, Serviceable Available Market, Serviceable Obtainable Market.",
    example: "Helps investors understand market potential.",
    link: "https://www.forentrepreneurs.com/market-size-tam-sam-som/"
  },
  {
    term: "CAGR (Compound Annual Growth Rate)",
    category: "Market",
    definition: "The rate of return needed for an investment to grow from its beginning balance to its ending balance, assuming profits are reinvested.",
    example: "Used to estimate growth in market size or revenue.",
    link: "https://www.investopedia.com/terms/c/cagr.asp"
  },

  // Metrics & Finance
  {
    term: "Burn Rate",
    category: "Finance",
    definition: "The rate at which a startup spends cash before generating revenue.",
    example: "Monthly burn rate = $10,000 if the startup spends that much per month.",
    link: "https://www.investopedia.com/terms/b/burnrate.asp"
  },
  {
    term: "CAC (Customer Acquisition Cost)",
    category: "Metrics",
    definition: "Cost to acquire a single customer.",
    example: "If you spend $1000 on ads and get 10 customers, CAC = $100.",
    link: "https://www.shopify.com/encyclopedia/customer-acquisition-cost"
  },
  {
    term: "LTV (Customer Lifetime Value)",
    category: "Metrics",
    definition: "The predicted net profit from the entire future relationship with a customer.",
    example: "If each customer generates $500 profit over time, LTV = $500.",
    link: "https://www.shopify.com/encyclopedia/lifetime-value-ltv"
  },
  {
    term: "Runway",
    category: "Finance",
    definition: "The amount of time a startup can operate before running out of cash.",
    example: "If you have $50,000 and burn $10,000/month, runway = 5 months.",
    link: "https://www.investopedia.com/terms/r/runway.asp"
  },
  {
    term: "EBITDA",
    category: "Finance",
    definition: "Earnings Before Interest, Taxes, Depreciation, and Amortization.",
    example: "Used to measure a company's overall financial performance.",
    link: "https://www.investopedia.com/terms/e/ebitda.asp"
  },

  // Tech & Infrastructure
  {
    term: "API (Application Programming Interface)",
    category: "Tech",
    definition: "A set of rules that allows different software applications to communicate with each other.",
    example: "Facebook API allows apps to access user profile data.",
    link: "https://www.redhat.com/en/topics/api/what-are-apis"
  },
  {
    term: "SaaS (Software as a Service)",
    category: "Tech",
    definition: "Software licensing and delivery model in which software is hosted centrally and accessed via the internet.",
    example: "Examples: Slack, Zoom, Google Workspace.",
    link: "https://www.salesforce.com/saas/"
  },
  {
    term: "Cloud Infrastructure",
    category: "Tech",
    definition: "Computing services (servers, storage, databases, networking) delivered over the internet.",
    example: "AWS, Azure, GCP provide cloud infrastructure.",
    link: "https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/"
  },
  {
    term: "AI / ML",
    category: "Tech",
    definition: "Artificial Intelligence / Machine Learning: technology that enables machines to simulate human intelligence or learn from data.",
    example: "Recommendation engines on e-commerce platforms.",
    link: "https://www.ibm.com/topics/machine-learning"
  },

  // Strategy & Business
  {
    term: "Value Proposition",
    category: "Strategy",
    definition: "A statement that explains how a product solves a problem, delivers benefits, and why it’s better than alternatives.",
    example: "Uber: Fast, convenient rides at competitive prices.",
    link: "https://www.strategyzer.com/canvas/value-proposition-canvas"
  },
  {
    term: "Growth Hacking",
    category: "Strategy",
    definition: "A marketing technique developed by tech startups which uses creativity, analytics, and social metrics to sell products and gain exposure.",
    example: "Referral programs, viral loops, A/B testing campaigns.",
    link: "https://www.growthhackers.com/growth-hacking"
  }
];


// External link icon
const ExternalLinkSVG = () => (
  <svg
    className="w-4 h-4 inline-block"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3" />
  </svg>
);

// Categories
const categories = ["All", "Product", "Finance", "Market", "Metrics", "Tech", "Strategy"];

const BusinessTermsSaaS = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredTerms = terms.filter(t => {
    const matchSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded border border-neutral-700 bg-neutral-900 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded border border-neutral-700 bg-neutral-900 text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Terms List */}
      <div className="divide-y divide-neutral-700">
        {filteredTerms.length === 0 && (
          <p className="text-gray-500 py-2">No terms found.</p>
        )}

        {filteredTerms.map((t, index) => (
          <div
            key={index}
            className="py-2 cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            {/* Term Name */}
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-300">{t.term}</h3>
              <span className="text-gray-500">{expandedIndex === index ? "−" : "+"}</span>
            </div>

            {/* Definition */}
            {expandedIndex === index && (
              <div className="mt-1 text-gray-400 text-sm space-y-1">
                <p>{t.definition}</p>
                {t.example && <p className="italic text-gray-500">{t.example}</p>}

                {/* Link & Category */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-200 hover:underline flex items-center gap-1 text-sm"
                    >
                      Learn more <ExternalLinkSVG />
                    </a>
                  )}
                  <span className="text-gray-500 text-xs">{t.category}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessTermsSaaS;
