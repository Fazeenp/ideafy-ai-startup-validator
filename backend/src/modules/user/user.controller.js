const User = require("./user.model");
const Idea = require("../idea/idea.model");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    const ideas = await Idea.find({ userId }).sort({ createdAt: -1 });

    const scores = ideas.map((i) => i.score || 0).filter((s) => s > 0);
    const avgScore = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    const bestScore = scores.length ? Math.max(...scores) : 0;
    const successRate = ideas.length
      ? Math.round((ideas.filter((i) => (i.score || 0) >= 70).length / ideas.length) * 100)
      : 0;

    res.json({
      user,
      totalIdeas: ideas.length,
      avgScore,
      bestScore,
      successRate,
      ideas,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboard };