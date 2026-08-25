import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function MaintenanceActivityEditModal({ isOpen, onClose, activity, onSave }) {
  const [formData, setFormData] = useState({
    year: '',
    maintenance_activity: '',
    distress: '',
    cost_rm: '',
    condition_after: 'Good',
    status: 'Scheduled'
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        id: activity.id,
        year: activity.year || '',
        maintenance_activity: activity.maintenance_activity || '',
        distress: activity.distress || '',
        cost_rm: activity.cost_rm !== undefined && activity.cost_rm !== null ? activity.cost_rm : '',
        condition_after: activity.condition_after || 'Good',
        status: activity.status || 'Scheduled'
      });
    } else {
      setFormData({
        year: new Date().getFullYear().toString(),
        maintenance_activity: '',
        distress: 'None / Healthy (Tiada Kerosakan)',
        cost_rm: '',
        condition_after: 'Good',
        status: 'Scheduled'
      });
    }
  }, [activity, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      cost_rm: parseFloat(formData.cost_rm) || 0
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200/80 dark:border-slate-800">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {activity ? 'Edit Maintenance Activity' : 'Add Maintenance Activity'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Year *
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2024 or Year 3"
              required
              className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Maintenance Activity *
            </label>
            <input
              type="text"
              name="maintenance_activity"
              value={formData.maintenance_activity}
              onChange={handleChange}
              placeholder="e.g. Mill & Pave 50mm, Crack Sealing"
              required
              className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Distress
            </label>
            <input
              type="text"
              name="distress"
              value={formData.distress}
              onChange={handleChange}
              placeholder="e.g. Cracks & Potholes, Rutting"
              className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Cost (RM)
            </label>
            <input
              type="number"
              step="0.01"
              name="cost_rm"
              value={formData.cost_rm}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Condition After
              </label>
              <select
                name="condition_after"
                value={formData.condition_after}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <option value="Good">Good (Cemerlang)</option>
                <option value="Fair">Fair (Sederhana)</option>
                <option value="Poor">Poor (Teruk)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <option value="Completed">Completed (Selesai)</option>
                <option value="In Progress">In Progress (Dalam Perlaksanaan)</option>
                <option value="Scheduled">Scheduled (Dalam Perancangan)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl text-sm shadow-md shadow-cyan-500/20"
            >
              Save Activity
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}
