import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Map as MapIcon, Edit2, Trash2 } from 'lucide-react';
import { fetchProjects, fetchLccaResults, deleteProject } from '../lib/api';
import ProjectModal from '../components/ProjectModal';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [lccaResults, setLccaResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registry');

  const [showFab, setShowFab] = useState(false);
  const headerBtnRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (headerBtnRef.current) observer.observe(headerBtnRef.current);
    return () => observer.disconnect();
  }, []);

  // Filters
  const [search, setSearch] = useState('');
  const [filterRoad, setFilterRoad] = useState('');
  const [filterMix, setFilterMix] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const projData = await fetchProjects();
      setProjects(projData);

      const lccaData = await fetchLccaResults();
      setLccaResults(lccaData);
    } catch (err) {
      console.error("Failed to load data:", err);
      alert("Failed to load data from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this road project record?")) return;
    try {
      await deleteProject(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const filteredProjects = projects.filter(p => {
    const matchSearch = !search ||
      (p.road_name?.toLowerCase().includes(search.toLowerCase())) ||
      (p.mix_category?.toLowerCase().includes(search.toLowerCase())) ||
      (p.pavement_alternative?.toLowerCase().includes(search.toLowerCase())) ||
      (p.route_no?.toLowerCase().includes(search.toLowerCase()));

    const matchRoad = !filterRoad || p.road_name === filterRoad;
    const matchMix = !filterMix || p.mix_category === filterMix;

    return matchSearch && matchRoad && matchMix;
  });

  const getMixColorClasses = (mix) => {
    switch (mix?.toUpperCase()) {
      case 'CMA':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'CRMA':
        return 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800';
      case 'LATEX':
        return 'bg-white text-gray-700 dark:bg-gray-200 dark:text-gray-900 border-gray-300 dark:border-gray-400';
      case 'SFM':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and monitor Muar road assets.</p>
        </div>
        <button
          ref={headerBtnRef}
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-md shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add New Road Record
        </button>
      </div>

      {/* ArcGIS Map Embedded */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-zinc-800/50 overflow-hidden">
        <div className="p-4 border-b border-gray-200/50 dark:border-zinc-800/50 flex items-center gap-2 bg-gray-50/50 dark:bg-zinc-950/50">
          <MapIcon size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">GIS Visualization</h2>
        </div>
        <div className="h-[600px] w-full">
          <iframe
            src="https://www.arcgis.com/apps/dashboards/a39283d010a0452ca27094d5cd3caffa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            title="ArcGIS Dashboard"
          />
        </div>
      </div>

      {/* Data Section */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-zinc-800/50 overflow-hidden">

        {/* Tabs and Filters */}
        <div className="p-4 border-b border-gray-200/50 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-950/50 flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-2 p-1 bg-gray-200/50 dark:bg-zinc-800/50 rounded-lg self-start">
            <button
              onClick={() => setActiveTab('registry')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'registry' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Road Project Registry
            </button>
            <button
              onClick={() => setActiveTab('lcca')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'lcca' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Pavement Alternatives Evaluation (NPV Result)
            </button>
          </div>

          {activeTab === 'registry' && (
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none w-full sm:w-64"
                />
              </div>
              <select
                value={filterRoad}
                onChange={e => setFilterRoad(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
              >
                <option value="">All Roads</option>
                <option value="Muar By Pass">Muar Bypass (FT0224)</option>
                <option value="Yong Peng - Muar">Yong Peng - Muar (FT0024)</option>
                <option value="Johor Bahru - Melaka">JB - Melaka (FT0005)</option>
                <option value="Jalan Parit Yusof">Jalan Parit Yusof</option>
              </select>
              <select
                value={filterMix}
                onChange={e => setFilterMix(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
              >
                <option value="">All Mixes</option>
                <option value="Specialty Mix">Specialty Mix</option>
                <option value="Tinggi">Tinggi</option>
                <option value="CMA">CMA</option>
                <option value="CRMA">CRMA</option>
                <option value="LATEX">LATEX</option>
              </select>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="overflow-auto max-h-[600px] relative">
          {activeTab === 'registry' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider sticky top-0 z-10 shadow-sm">
                  <th className="px-4 py-3">Bil</th>
                  <th className="px-4 py-3">Nama Laluan</th>
                  <th className="px-4 py-3">Route No</th>
                  <th className="px-4 py-3">Dari (KM)</th>
                  <th className="px-4 py-3">Ke (KM)</th>
                  <th className="px-4 py-3 text-center">Pavement Mix</th>
                  <th className="px-4 py-3">Alternative</th>
                  <th className="px-4 py-3">Cost (RM)</th>
                  <th className="px-4 py-3">Distress Type</th>
                  <th className="px-4 py-3">Is Recurring</th>
                  <th className="px-4 py-3 text-right sticky right-0 bg-gray-50 dark:bg-zinc-900/50">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 text-sm">
                {loading ? (
                  <tr><td colSpan="11" className="px-4 py-8 text-center text-gray-500">Loading projects...</td></tr>
                ) : filteredProjects.length === 0 ? (
                  <tr><td colSpan="11" className="px-4 py-8 text-center text-gray-500">No projects found.</td></tr>
                ) : (
                  filteredProjects.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{p.road_name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-xs font-medium">{p.route_no || '-'}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.start_km}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.end_km}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMixColorClasses(p.mix_category)}`}>
                          {p.mix_category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.pavement_alternative}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">RM {p.cost_rm?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.distress_1_type}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {p.is_recurring === 'Ya' ? (
                          <span className="text-red-500 font-medium">Ya</span>
                        ) : (
                          <span className="text-gray-500">{p.is_recurring || '-'}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right sticky right-0 bg-white dark:bg-zinc-900 border-l border-gray-100 dark:border-zinc-800">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(p)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider sticky top-0 z-10 shadow-sm">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Pavement Alternative</th>
                  <th className="px-4 py-3">Avg Initial Cost (RM)</th>
                  <th className="px-4 py-3">Total Maintenance (RM)</th>
                  <th className="px-4 py-3">Maint-to-Initial Ratio</th>
                  <th className="px-4 py-3">NPV (RM) (4% rate)</th>
                  <th className="px-4 py-3">Latest Distress Level</th>
                  <th className="px-4 py-3">Remark & Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 text-sm">
                {loading ? (
                  <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-500">Loading calculations...</td></tr>
                ) : lccaResults.length === 0 ? (
                  <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-500">No results found.</td></tr>
                ) : (
                  lccaResults.map((r, i) => (
                    <tr key={i} className={`transition-colors ${r.alternative === 'SFM' ? 'bg-blue-50/60 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/40 border-l-4 border-blue-500' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50 border-l-4 border-transparent'}`}>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">#{r.ranking}</td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">{r.alternative}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">RM {r.initial_cost?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">RM {r.maintenance_cost?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{r.cost_ratio}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">RM {r.npv?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 min-w-[150px]">{r.distress_level}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 min-w-[250px]">{r.remark}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSave={() => {
          setIsModalOpen(false);
          loadData();
        }}
      />

      {showFab && (
        <button
          onClick={handleAdd}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl shadow-emerald-500/30 transition-transform animate-fade-in hover:scale-105"
          title="Add New Record"
        >
          <Plus size={28} />
        </button>
      )}
    </div>
  );
}
