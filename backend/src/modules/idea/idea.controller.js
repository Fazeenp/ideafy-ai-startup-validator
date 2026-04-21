const User = require("../user/user.model");
const ideaService = require("./idea.service");

const createIdea = async (req, res) => {
  try {
    console.log("🔥 Incoming request body:", req.body);
    const user = await User.findById(userId);
     if (!user) return res.status(404).json({ message: "User not found" });
    if (user.credits <= 0) {
      return res.status(403).json({ message: "No credits left. Please buy more credits." });
    }
    const idea = await ideaService.createIdea(req.user.id, req.body);
    await User.findByIdAndUpdate(userId, { $inc: { credits: -1 } });

    res.status(201).json({
      success: true,
      idea,
    });

  } catch (err) {
    console.error("❌ CREATE IDEA ERROR FULL:", err); // IMPORTANT

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getIdeas = async (req, res) => {
  try {
    const ideas = await ideaService.getUserIdeas(req.user.id);

    res.json({ success: true, ideas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getIdea = async (req, res) => {
  try {
    const idea = await ideaService.getIdeaById(
      req.params.id,
      req.user.id
    );

    res.json({ success: true, idea });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ✅ NEW: regenerate endpoint */
const regenerateIdea = async (req, res) => {
  try {
    const idea = await ideaService.regenerateIdea(
      req.params.id,
      req.user.id
    );

    res.json({ success: true, idea });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createIdea,
  getIdeas,
  getIdea,
  regenerateIdea,
};