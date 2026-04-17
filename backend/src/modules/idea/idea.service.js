const Idea = require("./idea.model");
const { validateStartup } = require("./idea.ai.service");

const createIdea = async (userId, data) => {

   // 🔍 Check if already exists
  const existing = await Idea.findOne({
    userId: userId, // ✅ FIXED
    businessName: data.businessName,
    description: data.description,
  });

  if (existing) {
    return existing; // ✅ RETURN OLD DATA (no Gemini call)
  }
const normalizeStatus = (status, score) => {
  if (score >= 75) return "Validated";
  if (score >= 40) return "In Progress";
  return "Rejected";
};

  let aiResult;

try {
  aiResult = await validateStartup(data);
} catch (err) {
  throw new Error("AI failed. Please try again.");
}

  const idea = await Idea.create({
    userId: userId,
    ...data,
    score: aiResult.score,
    status: normalizeStatus(aiResult.status, aiResult.score),
    result: aiResult,
  });

  return idea;
};

const getUserIdeas = async (userId) => {
  return await Idea.find({ userId: userId }).sort({ createdAt: -1 });
};

const getIdeaById = async (id, userId) => {
  return await Idea.findOne({
    _id: id,
    userId: userId
  });
};

const User = require("../user/user.model");

const regenerateIdea = async (id, userId) => {
  const idea = await Idea.findOne({ _id: id, userId });

  if (!idea) throw new Error("Idea not found");

  const user = await User.findById(userId);
  if (user.credits <= 0) throw new Error("No credits left");

  const newResult = await validateStartup(idea);

  idea.result = newResult;
  idea.score = newResult.score;
  idea.status = normalizeStatus(newResult.status, newResult.score); 

  await idea.save();

  await User.findByIdAndUpdate(userId, {
    $inc: { credits: -1 },
  });

  return idea;
};

module.exports = {
  createIdea,
  getUserIdeas,
  getIdeaById,
  regenerateIdea,
};