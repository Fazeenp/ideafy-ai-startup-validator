import React, { useState } from "react";
import { Search, Filter, ExternalLink, ChevronDown } from "lucide-react";

const terms = [
  { term: "MVP (Minimum Viable Product)", category: "Product",  definition: "The simplest version of a product that solves a core problem for early users.", example: "A basic app with only key features launched to test market demand.", link: "https://www.productplan.com/glossary/minimum-viable-product-mvp/" },
  { term: "Pivot",            category: "Strategy", definition: "A significant change in business strategy based on feedback or results.", example: "Changing from a B2C to a B2B model.", link: "https://www.investopedia.com/terms/p/pivot.asp" },
  { term: "Prototype",        category: "Product",  definition: "An early sample or model of a product used to test concepts and functionality.", example: "A clickable app demo before full development.", link: "https://www.interaction-design.org/literature/topics/prototyping" },
  { term: "TAM / SAM / SOM",  category: "Market",   definition: "Market sizing metrics: Total Available Market, Serviceable Available Market, Serviceable Obtainable Market.", example: "Helps investors understand market potential.", link: "https://www.forentrepreneurs.com/market-size-tam-sam-som/" },
  { term: "CAGR",             category: "Market",   definition: "Compound Annual Growth Rate — the rate needed for an investment to grow from start to end value.", example: "Used to estimate growth in market size or revenue.", link: "https://www.investopedia.com/terms/c/cagr.asp" },
  { term: "Burn Rate",        category: "Finance",  definition: "The rate at which a startup spends cash before generating revenue.", example: "Monthly burn rate = $10,000 if the startup spends that per month.", link: "https://www.investopedia.com/terms/b/burnrate.asp" },
  { term: "CAC",              category: "Metrics",  definition: "Customer Acquisition Cost — the cost to acquire a single customer.", example: "Spend $1,000 on ads, get 10 customers: CAC = $100.", link: "https://www.shopify.com/encyclopedia/customer-acquisition-cost" },
  { term: "LTV",              category: "Metrics",  definition: "Customer Lifetime Value — predicted net profit from the entire future relationship with a customer.", example: "If each customer generates $500 profit over time, LTV = $500.", link: "https://www.shopify.com/encyclopedia/lifetime-value-ltv" },
  { term: "Runway",           category: "Finance",  definition: "The amount of time a startup can operate before running out of cash.", example: "$50K cash, $10K/month burn = 5 months runway.", link: "https://www.investopedia.com/terms/r/runway.asp" },
  { term: "EBITDA",           category: "Finance",  definition: "Earnings Before Interest, Taxes, Depreciation, and Amortization.", example: "Used to measure a company's overall financial performance.", link: "https://www.investopedia.com/terms/e/ebitda.asp" },
  { term: "API",              category: "Tech",     definition: "Application Programming Interface — rules that allow different software applications to communicate.", example: "Facebook API allows apps to access user profile data.", link: "https://www.redhat.com/en/topics/api/what-are-apis" },
  { term: "SaaS",             category: "Tech",     definition: "Software as a Service — software hosted centrally and accessed via the internet on a subscription.", example: "Slack, Zoom, Google Workspace.", link: "https://www.salesforce.com/saas/" },
  { term: "Cloud Infrastructure", category: "Tech", definition: "Computing services (servers, storage, databases) delivered over the internet.", example: "AWS, Azure, GCP.", link: "https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/" },
  { term: "AI / ML",          category: "Tech",     definition: "Artificial Intelligence / Machine Learning — technology that enables machines to simulate intelligence or learn from data.", example: "Recommendation engines on e-commerce platforms.", link: "https://www.ibm.com/topics/machine-learning" },
  { term: "Value Proposition", category: "Strategy", definition: "A statement explaining how a product solves a problem and why it's better than alternatives.", example: "Uber: Fast, convenient rides at competitive prices.", link: "https://www.strategyzer.com/canvas/value-proposition-canvas" },
  { term: "Growth Hacking",   category: "Strategy", definition: "Marketing technique using creativity, analytics, and social metrics to rapidly grow a product.", example: "Referral programs, viral loops, A/B testing campaigns.", link: "https://www.growthhackers.com/growth-hacking" },
];

const categories = ["All", "Product", "Finance", "Market", "Metrics", "Tech", "Strategy"];

const categoryColors = {
  Product:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Finance:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Market:   "bg-green-500/10 text-green-400 border-green-500/20",
  Metrics:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Tech:     "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Strategy: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function BusinessTermsSaaS() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredTerms = terms.filter((t) => {
    const matchSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Reference</p>
        <h2 className="text-2xl font-bold text-white">Business Terms Glossary</h2>
        <p className="text-sm text-white/40 mt-1">Definitions, examples, and resources for startup and SaaS terminology</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm placeholder-white/25
              focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
              hover:border-white/15 transition-all duration-200"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl bg-neutral-800 border border-white/8 text-white text-sm appearance-none cursor-pointer
              focus:outline-none focus:ring-1 focus:ring-purple-500/60 transition-all duration-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-white/10 text-white border-white/20"
                : "bg-transparent text-white/35 border-white/8 hover:border-white/15 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-white/30">
        {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""} found
      </p>

      {/* Terms */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-8 h-8 text-white/15 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No terms match your search.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTerms.map((t, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                expandedIndex === index
                  ? "bg-white/4 border-white/10"
                  : "bg-white/2 border-white/6 hover:border-white/10 hover:bg-white/3"
              }`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Term row */}
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[t.category] || "bg-white/10 text-white/50 border-white/15"}`}>
                    {t.category}
                  </span>
                  <h3 className="text-sm font-medium text-white truncate">{t.term}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 ${expandedIndex === index ? "rotate-180" : ""}`} />
              </div>

              {/* Expanded */}
              {expandedIndex === index && (
                <div className="px-5 pb-5 space-y-3 border-t border-white/6 pt-4">
                  <p className="text-sm text-white/60 leading-relaxed">{t.definition}</p>
                  {t.example && (
                    <div className="px-4 py-3 rounded-xl bg-white/3 border border-white/6">
                      <p className="text-xs text-white/35 uppercase tracking-wider mb-1 font-medium">Example</p>
                      <p className="text-xs text-white/55 leading-relaxed italic">{t.example}</p>
                    </div>
                  )}
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                    >
                      Learn more <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}