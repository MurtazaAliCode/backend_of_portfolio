const { contactSubmissions } = require("@shared/schema");
const { db } = require("./db");
const { eq } = require("drizzle-orm");

class DatabaseStorage {
  async createContactSubmission(insertSubmission) {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions() {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }
}

const storage = new DatabaseStorage();

module.exports = { storage };