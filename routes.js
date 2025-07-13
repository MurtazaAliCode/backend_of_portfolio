const { createServer } = require("http");
const { storage } = require("./storage");
const { insertContactSubmissionSchema } = require("@shared/schema");

async function registerRoutes(app) {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      res.status(201).json({
        message: "Message sent successfully! I'll get back to you soon.",
        id: submission.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        message: "Failed to send message. Please check your input and try again."
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

module.exports = { registerRoutes };