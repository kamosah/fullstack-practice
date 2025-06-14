// Mock responses for different types of queries
export const mockAgentResponses = [
  {
    keywords: ["dd", "due diligence", "questions", "management"],
    response: `Based on the documents provided, here are some key DD questions you might consider for your meeting with the Project Alpha management team:

**Key Questions for Management Meeting:**

1. **What are the key drivers behind the recent changes in your cost structure?**
   - Based on the FY2024 P&L, there have been increasing costs that warrant deeper investigation.

2. **How do you plan to address the challenge of supplier concentration risk?**
   - This appears to be a recurring theme across your strategic documents.

3. **What are the specific metrics you use to measure customer engagement and satisfaction?**
   - Understanding your customer retention and growth metrics will be crucial.

4. **Can you detail the steps being taken to ensure smooth leadership transitions?**
   - This seems to be an area of focus based on the strategic planning documents.

5. **What is your strategy for leveraging technology to stay ahead of market trends?**
   - Given the competitive landscape, this will be important to understand.

These questions should help you gain insights into the management team's strategic thinking and operational capabilities.`,
  },
  {
    keywords: ["analysis", "risk", "investment", "financial"],
    response: `I've analyzed the uploaded documents and identified several key investment considerations:

**Investment Risks Identified:**
- Supplier concentration creating potential supply chain vulnerabilities
- Rising operational costs impacting margins
- Market competition intensifying in core segments

**Opportunities:**
- Strong customer relationships and retention metrics
- Technology integration potential for efficiency gains
- Market expansion opportunities in adjacent segments

**Recommendation:** Proceed with detailed operational due diligence focusing on supply chain diversification and cost management strategies.`,
  },
  {
    keywords: ["market", "competition", "growth", "trends"],
    response: `Market analysis reveals several interesting dynamics:

**Market Trends:**
- TAM growing at 12-15% annually in target segments
- Increasing customer demand for integrated solutions
- Technology adoption accelerating post-pandemic

**Competitive Landscape:**
- 3 major competitors with similar offerings
- Differentiation primarily through customer service
- Pricing pressure in commodity segments

**Growth Opportunities:**
- Adjacent market expansion
- Technology-enabled service offerings
- Strategic partnerships potential`,
  },
];

export const getAgentResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  for (const response of mockAgentResponses) {
    if (response.keywords.some((keyword) => message.includes(keyword))) {
      return response.response;
    }
  }

  // Default response
  return `Thank you for your question. I've analyzed the available documents and can provide insights on:

- Investment risks and opportunities
- Market dynamics and competitive positioning  
- Financial performance trends
- Strategic recommendations

Could you be more specific about what aspect you'd like me to focus on?`;
};

// Mock document processing results
export const mockDocumentInsights = {
  "FY2024 P&L": {
    risks:
      "There have been increasing costs related to supplier dependencies and operational inefficiencies that need immediate attention.",
    opportunities:
      "Revenue growth of 23% YoY indicates strong market demand and effective sales execution.",
  },
  "Project Alpha CIM": {
    risks:
      "Risk factors that are not detailed in the CIM include regulatory changes and competitive threats from emerging players.",
    opportunities:
      "Strong brand recognition and customer loyalty provide defensive moats.",
  },
  "Product Overview Alpha": {
    risks:
      "Current product lacks detail regarding the monetization strategy and scalability concerns.",
    opportunities:
      "Product differentiation through proprietary technology creates competitive advantages.",
  },
};
