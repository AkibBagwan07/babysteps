import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import AddMilestoneModal from "../components/AddMilestoneModal";
import MilestoneCard from "../components/MilestoneCard";

export default function Dashboard() {
  const [milestones, setMilestones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // fetch user milestones from backend
  const loadMilestones = async () => {
    try {
      const res = await axios.get("/milestones");
      setMilestones(res.data);
    } catch (err) {
      console.error("Couldn’t load milestones", err);
      // possibly toast here later
    }
  };

  // handle logout: clear localStorage + kick to login
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    loadMilestones();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-12">
      {/* Top section: title + buttons */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-pink-600">Your Milestone Tracker</h1>
          <p className="text-sm text-gray-500">Logging the little wins of your pregnancy journey</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600"
          >
            Add Milestone
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Milestones grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {milestones.map((m) => (
          <MilestoneCard key={m._id} milestone={m} refresh={loadMilestones} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddMilestoneModal close={() => setShowModal(false)} refresh={loadMilestones} />
      )}
    </div>
  );
}
