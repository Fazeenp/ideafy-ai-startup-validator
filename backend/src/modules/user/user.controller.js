const User = require("./user.model");
const Idea = require("../idea/idea.model");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    const ideas = await Idea.find({ userId }).sort({ createdAt: -1 });

    res.json({
      user,
      totalIdeas: ideas.length,
      ideas,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboard };