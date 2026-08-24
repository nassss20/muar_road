import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { createProject, updateProject } from '../lib/api';

export default function ProjectModal({ isOpen, onClose, project, onSave }) {
  const [formData, setFormData] = useState({
    road_name: 'Muar By Pass',
    route_no: '',
    start_km: '',
    end_km: '',
    mix_category: 'Standard Road',
    pavement_alternative: '',
    cost_rm: '',
    lane_type: '',
    distress_1_type: '',
    is_recurring: 'Tidak',
    work_description: '',
    latitude: '',
    longitude: '',
    remarks: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        road_name: project.road_name || 'Muar By Pass',
        route_no: project.route_no || '',
        start_km: project.start_km || '',
        end_km: project.end_km || '',
        mix_category: project.mix_category || 'Standard Road',
        pavement_alternative: project.pavement_alternative || '',
        cost_rm: project.cost_rm || '',
        lane_type: project.lane_type || '',
        distress_1_type: project.distress_1_type || '',
        is_recurring: project.is_recurring || 'Tidak',
        work_description: project.work_description || '',
        latitude: project.latitude || '',
        longitude: project.longitude || '',
        remarks: project.remarks || ''
      });
    } else {
      setFormData({
        road_name: 'Muar By Pass',
        route_no: '',
        start_km: '',
        end_km: '',
        mix_category: 'Standard Road',
        pavement_alternative: '',
        cost_rm: '',
        lane_type: '',
        distress_1_type: '',
        is_recurring: 'Tidak',
        work_description: '',
        latitude: '',
        longitude: '',
        remarks: ''
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format data
    const payload = {
      ...formData,
      start_km: parseFloat(formData.start_km) || 0,
      end_km: parseFloat(formData.end_km) || 0,
      cost_rm: parseFloat(formData.cost_rm) || 0,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null
    };

    try {
      if (project) {
        await updateProject(payload);
        alert("Record successfully updated!");
      } else {
        await createProject(payload);
        alert("New record successfully added!");
      }
      onSave();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200/80 dark:border-slate-800">
        
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {project ? 'Edit Road Record' : 'Add New Road Record'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Nama Laluan (Road Name) *</label>
              <select name="road_name" value={formData.road_name} onChange={handleChange} required className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none">
                <option value="Muar By Pass">Muar Bypass (FT0224)</option>
                <option value="Yong Peng - Muar">Yong Peng - Muar (FT0024)</option>
                <option value="Johor Bahru - Melaka">Johor Bahru - Melaka (FT0005)</option>
                <option value="Jalan Parit Yusof">Jalan Parit Yusof</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">No. Laluan (Route Number)</label>
              <input type="text" name="route_no" value={formData.route_no} onChange={handleChange} placeholder="e.g. FT 0224" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Dari KM (Start KM) *</label>
              <input type="number" step="0.001" name="start_km" value={formData.start_km} onChange={handleChange} required placeholder="0.0" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Ke KM (End KM) *</label>
              <input type="number" step="0.001" name="end_km" value={formData.end_km} onChange={handleChange} required placeholder="1.0" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Mix Category</label>
              <select name="mix_category" value={formData.mix_category} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none">
                <option value="Standard Road">Standard Road</option>
                <option value="SFM">SFM</option>
                <option value="CMA">CMA</option>
                <option value="CRMA">CRMA</option>
                <option value="LATEX">LATEX</option>
                <option value="AC">AC</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Pavement Alternative / Treatment</label>
              <input type="text" name="pavement_alternative" value={formData.pavement_alternative} onChange={handleChange} placeholder="e.g. Mill & Pave, Regulate" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Initial Cost (RM)</label>
              <input type="number" step="0.01" name="cost_rm" value={formData.cost_rm} onChange={handleChange} placeholder="0.00" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Lane / Direction</label>
              <input type="text" name="lane_type" value={formData.lane_type} onChange={handleChange} placeholder="e.g. LHS, RHS, L&R" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Distress Type</label>
              <select name="distress_1_type" value={formData.distress_1_type} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none">
                <option value="">None / Healthy (Tiada Kerosakan)</option>
                <option value="Tiada kerosakan">None / Healthy (Tiada Kerosakan)</option>
                <option value="Pothole">Pothole (Lubang)</option>
                <option value="Crack">Crack (Retak)</option>
                <option value="Pothole & Crack">Pothole & Crack (Lubang & Retak)</option>
                <option value="Shoving">Shoving (Anjakan / Engsutan Premix)</option>
                <option value="Corrugation">Corrugation (Gelombang Premix)</option>
                <option value="Rutting">Rutting (Aluran Roda)</option>
                <option value="Bleeding">Bleeding (Penyerapan Tar)</option>
                <option value="Ravelling">Ravelling (Pelepasan Agregat)</option>
                <option value="Depression">Depression (Mendakan)</option>
                <option value="Edge Failure">Edge Failure (Kerosakan Tepi Jalan)</option>
                <option value="Kekerapan">High Distress Frequency (Kekerapan Kerosakan)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Distress Recurring?</label>
              <select name="is_recurring" value={formData.is_recurring} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none">
                <option value="Tidak">No (Tidak)</option>
                <option value="Ya">Yes (Ya)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Work Description / Years Program</label>
              <input type="text" name="work_description" value={formData.work_description} onChange={handleChange} placeholder="e.g. 2022 - FASA 2" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Latitude (Optional overrides)</label>
              <input type="number" step="0.00000001" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g. 2.0305" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Longitude (Optional overrides)</label>
              <input type="number" step="0.00000001" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="e.g. 102.5888" className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Remarks
              </label>
              <textarea
                name="remarks"
                rows={3}
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
                className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm outline-none resize-y min-h-[80px]"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-all shadow-md shadow-cyan-500/20 disabled:opacity-70 text-sm">
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}
