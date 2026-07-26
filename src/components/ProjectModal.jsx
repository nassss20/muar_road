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
    mix_category: 'Specialty Mix',
    pavement_alternative: '',
    cost_rm: '',
    lane_type: '',
    distress_1_type: '',
    is_recurring: 'Tidak',
    work_description: '',
    latitude: '',
    longitude: ''
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
        mix_category: project.mix_category || 'Specialty Mix',
        pavement_alternative: project.pavement_alternative || '',
        cost_rm: project.cost_rm || '',
        lane_type: project.lane_type || '',
        distress_1_type: project.distress_1_type || '',
        is_recurring: project.is_recurring || 'Tidak',
        work_description: project.work_description || '',
        latitude: project.latitude || '',
        longitude: project.longitude || ''
      });
    } else {
      setFormData({
        road_name: 'Muar By Pass',
        route_no: '',
        start_km: '',
        end_km: '',
        mix_category: 'Specialty Mix',
        pavement_alternative: '',
        cost_rm: '',
        lane_type: '',
        distress_1_type: '',
        is_recurring: 'Tidak',
        work_description: '',
        latitude: '',
        longitude: ''
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-zinc-800">
        
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {project ? 'Edit Road Record' : 'Add New Road Record'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Laluan (Road Name) *</label>
              <select name="road_name" value={formData.road_name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent">
                <option value="Muar By Pass">Muar Bypass (FT0224)</option>
                <option value="Yong Peng - Muar">Yong Peng - Muar (FT0024)</option>
                <option value="Johor Bahru - Melaka">Johor Bahru - Melaka (FT0005)</option>
                <option value="Jalan Parit Yusof">Jalan Parit Yusof</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">No. Laluan (Route Number)</label>
              <input type="text" name="route_no" value={formData.route_no} onChange={handleChange} placeholder="e.g. FT 0224" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dari KM (Start KM) *</label>
              <input type="number" step="0.001" name="start_km" value={formData.start_km} onChange={handleChange} required placeholder="0.0" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Ke KM (End KM) *</label>
              <input type="number" step="0.001" name="end_km" value={formData.end_km} onChange={handleChange} required placeholder="1.0" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mix Category</label>
              <select name="mix_category" value={formData.mix_category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent">
                <option value="Specialty Mix">Specialty Mix</option>
                <option value="Tinggi">Tinggi</option>
                <option value="CMA">CMA</option>
                <option value="CRMA">CRMA</option>
                <option value="LATEX">LATEX</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pavement Alternative / Treatment</label>
              <input type="text" name="pavement_alternative" value={formData.pavement_alternative} onChange={handleChange} placeholder="e.g. Mill & Pave, Regulate" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cost (RM)</label>
              <input type="number" step="0.01" name="cost_rm" value={formData.cost_rm} onChange={handleChange} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Lane / Direction</label>
              <input type="text" name="lane_type" value={formData.lane_type} onChange={handleChange} placeholder="e.g. LHS, RHS, L&R" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Distress Type</label>
              <select name="distress_1_type" value={formData.distress_1_type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent">
                <option value="">None / Healthy</option>
                <option value="Pothole">Pothole</option>
                <option value="Crack">Crack</option>
                <option value="Pothole & Crack">Pothole & Crack</option>
                <option value="Shoving">Shoving</option>
                <option value="Corrugation">Corrugation</option>
                <option value="Kekerapan">Kekerapan (High Distress Freq)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Distress Recurring?</label>
              <select name="is_recurring" value={formData.is_recurring} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent">
                <option value="Tidak">Tidak (No)</option>
                <option value="Ya">Ya (Yes)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Work Description / Years Program</label>
              <input type="text" name="work_description" value={formData.work_description} onChange={handleChange} placeholder="e.g. 2022 - FASA 2" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Latitude (Optional overrides)</label>
              <input type="number" step="0.00000001" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g. 2.0305" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Longitude (Optional overrides)</label>
              <input type="number" step="0.00000001" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="e.g. 102.5888" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2 font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md shadow-emerald-500/20 disabled:opacity-70">
              {isSubmitting ? 'Saving...' : 'Save to Database'}
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}
