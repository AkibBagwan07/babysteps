import { useState } from "react";
import axios from "../api/axiosInstance";

export default function AddMilestoneModal({ close, refresh }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/milestones", form);
      refresh();  // refresh list in dashboard
      close();    // close modal after successful save
    } catch (err) {
      console.error("Failed to add milestone:", err);
      alert("Something went wrong while adding the milestone.");
    }
  };

  return (
    <div className="fixed inset-0 bg-pink-100 bg-opacity-90 flex items-center justify-center z-50 transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md border border-pink-300"
      >
        <h2 className="text-xl font-bold text-pink-600 mb-4">Add Milestone</h2>

        {/* Milestone Title */}
        <input
          required
          className="w-full mb-3 p-2 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Milestone Date */}
        <input
          required
          type="date"
          className="w-full mb-3 p-2 border rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* Optional Notes */}
        <textarea
          className="w-full mb-3 p-2 border rounded"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
