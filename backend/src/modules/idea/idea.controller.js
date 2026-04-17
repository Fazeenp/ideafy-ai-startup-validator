const ideaService = require("./idea.service");

const createIdea = async (req, res) => {
  try {
    console.log("🔥 Incoming request body:", req.body);

    const idea = await ideaService.createIdea(req.user.id, req.body);

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