import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function TipsSection({ milestoneId }) {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState("");
  const [author, setAuthor] = useState("");

  // grab tips for the given milestone
  const fetchTips = async () => {
    try {
      const res = await axios.get(`/tips/${milestoneId}`);
      setTips(res.data);
    } catch (err) {
      console.error("Error fetching tips:", err);
    }
  };

  const handleAddTip = async (e) => {
    e.preventDefault();
    if (!newTip.trim()) return;

    try {
      await axios.post(`/tips/${milestoneId}`, {
        content: newTip,
        createdBy: author || "Anonymous",
      });

      setNewTip("");
      setAuthor("");
      fetchTips();
    } catch (err) {
      console.error("Error posting tip:", err);
    }
  };

  const handleLike = async (tipId) => {
    const likedTips = JSON.parse(localStorage.getItem("likedTips") || "[]");

    if (likedTips.includes(tipId)) {
      alert("You've already liked this tip!");
      return;
    }

    try {
      await axios.put(`/tips/${tipId}/like`);
      localStorage.setItem("likedTips", JSON.stringify([...likedTips, tipId]));
      fetchTips();
    } catch (err) {
      console.error("Error liking tip:", err);
    }
  };

  useEffect(() => {
    fetchTips();
  }, [milestoneId]);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg border border-pink-200">
      <h3 className="text-lg font-semibold mb-2 text-pink-600">Community Tips</h3>

      {tips.length === 0 ? (
        <p className="text-sm text-gray-500">No tips yet. Be the first to share!</p>
      ) : (
        <ul className="space-y-3">
          {tips.map((tip) => {
            const likedTips = JSON.parse(localStorage.getItem("likedTips") || "[]");
            const alreadyLiked = likedTips.includes(tip._id);

            return (
              <li
                key={tip._id}
                className="relative bg-pink-50 p-3 rounded-md text-sm text-gray-800"
              >
                “{tip.content}”
                <div className="text-xs text-gray-500 mt-1">— {tip.createdBy}</div>

                <div className="absolute top-3 right-3 flex items-center space-x-1">
                  <button
                    onClick={() => handleLike(tip._id)}
                    disabled={alreadyLiked}
                    title={alreadyLiked ? "Already liked" : "Like this tip"}
                    className={`text-pink-600 ${
                      alreadyLiked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 transition"
                    }`}
                  >
                    ❤️
                  </button>
                  <span className="text-xs text-gray-700">{tip.likes}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Tip submission form */}
      <form onSubmit={handleAddTip} className="mt-4 space-y-2">
        <textarea
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
          placeholder="Share your tip..."
          className="w-full p-2 border rounded resize-none"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
        >
          Post Tip
        </button>
      </form>
    </div>
  );
}
