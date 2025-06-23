import axios from "../api/axiosInstance";
import TipsSection from "./TipsSection";

export default function MilestoneCard({ milestone, refresh }) {
  // remove milestone and refresh the list
  const handleDelete = async () => {
    try {
      await axios.delete(`/milestones/${milestone._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete milestone:", err);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-pink-700">{milestone.title}</h3>
        <p className="text-sm text-gray-700 mb-1">
          {new Date(milestone.date).toDateString()}
        </p>

        {milestone.notes && (
          <p className="text-gray-600 text-sm mb-3">{milestone.notes}</p>
        )}
      </div>

      {/* Community tips attached to this milestone */}
      <TipsSection milestoneId={milestone._id} />

      <button
        onClick={handleDelete}
        className="mt-4 text-sm text-red-500 hover:underline self-end"
      >
        Delete Milestone
      </button>
    </div>
  );
}
