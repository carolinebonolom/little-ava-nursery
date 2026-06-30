import { Router } from "express";
import { invokeLLM } from "./_core/llm";

function generateFallbackReply(rawMessage: string): string {
  const message = rawMessage.toLowerCase();

  if (message.includes("fee") || message.includes("cost") || message.includes("price")) {
    return "Our fees are competitive and depend on the sessions and age group. Please contact us at info@littleavanursery.co.uk for a personalised quote.";
  }

  if (message.includes("hour") || message.includes("open") || message.includes("time")) {
    return "We are open Monday to Friday, 6:30 AM to 6:00 PM. We are closed on weekends and bank holidays.";
  }

  if (message.includes("age") || message.includes("month") || message.includes("year")) {
    return "We care for children aged 3 months to 5 years across our Baby, Toddler, Pre-School, and School Readiness rooms.";
  }

  if (message.includes("room")) {
    return "We have 4 rooms: Baby Room (3-12 months), Toddler Room (1-2 years), Pre-School Room (2-3 years), and School Readiness Room (3-5 years).";
  }

  if (message.includes("wait") || message.includes("availability") || message.includes("place") || message.includes("admission")) {
    return "You can register interest by joining our waiting list on the website. If you would like, I can also guide you to the admissions and waiting list pages.";
  }

  if (message.includes("visit") || message.includes("tour")) {
    return "You can book a nursery visit through the Book a Visit page. We would love to show you around and answer your questions.";
  }

  if (message.includes("contact") || message.includes("email") || message.includes("phone")) {
    return "You can contact us at info@littleavanursery.co.uk or call +44 7386 096634. You can also send a message using the Contact page.";
  }

  if (message.includes("meal") || message.includes("food") || message.includes("nutrition")) {
    return "We provide freshly prepared nutritious meals and support dietary requirements. You can ask us directly if your child has specific needs.";
  }

  if (message.includes("safe") || message.includes("safeguard") || message.includes("dbs")) {
    return "Safeguarding is a priority at Little Ava Nursery. Our staff are DBS-checked and we follow comprehensive safeguarding policies.";
  }

  return "I can help with admissions, waiting list, visits, rooms, opening hours, and general nursery information. You can also contact us directly at info@littleavanursery.co.uk.";
}

const SYSTEM_PROMPT = `You are the friendly AI assistant for Little Ava Nursery, a childcare nursery located in the West Midlands, England. You help parents and prospective families with information about the nursery.

Key Information:
- Name: Little Ava Nursery
- Location: West Midlands, England (exact address coming soon)
- Age Range: 3 months to 5 years
- Opening Hours: Monday to Friday, 6:30 AM - 6:00 PM (closed weekends and bank holidays)
- Capacity: 15-20 children initially, with plans to expand

Rooms:
- Baby Room (3-12 months) - Staff ratio 1:3
- Toddler Room (1-2 years) - Staff ratio 1:3
- Pre-School Room (2-3 years) - Staff ratio 1:4
- School Readiness Room (3-5 years) - Staff ratio 1:8

Sessions Available:
- Full Day: 6:30 AM - 6:00 PM
- Morning Session: 6:30 AM - 1:00 PM
- Afternoon Session: 1:00 PM - 6:00 PM

Key Features:
- EYFS (Early Years Foundation Stage) curriculum
- Real-time parent updates via Parent Portal
- Freshly prepared nutritious meals
- Outdoor learning areas
- DBS-checked, qualified staff
- Ofsted registered
- Government-funded places available (for eligible 2, 3, and 4-year-olds)

Policies:
- Comprehensive safeguarding policy
- SEND support available
- GDPR compliant
- All staff DBS checked

Guidelines for responses:
- Be warm, friendly, and professional
- Keep answers concise but helpful
- If asked about specific fees, say they are competitive and suggest contacting the nursery for a personalised quote
- If asked about availability, suggest joining the waiting list
- Direct parents to the relevant page on the website when appropriate
- If you don't know something specific, suggest contacting the nursery directly at info@littleavanursery.co.uk
- Never make up information that isn't provided above
- Use British English spelling`;

export function registerChatRoutes(app: Router) {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: SYSTEM_PROMPT },
      ];

      // Add recent history (last 6 messages for context)
      if (Array.isArray(history)) {
        const recentHistory = history.slice(-6);
        for (const msg of recentHistory) {
          if (msg.role === "user" || msg.role === "assistant") {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
      }

      messages.push({ role: "user", content: message });

      let reply = "";
      try {
        const response = await invokeLLM({ messages });
        reply = response.choices?.[0]?.message?.content || "";
      } catch (error) {
        console.warn("[Chat API] LLM unavailable, using fallback reply:", error);
      }

      if (!reply || typeof reply !== "string") {
        reply = generateFallbackReply(message);
      }

      res.json({ reply });
    } catch (error) {
      console.error("[Chat API] Error:", error);
      const fallbackMessage = typeof req.body?.message === "string" ? req.body.message : "";
      res.json({ reply: generateFallbackReply(fallbackMessage) });
    }
  });
}
