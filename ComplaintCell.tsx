import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Sparkles, 
  Camera, 
  Clock, 
  Building2, 
  ShieldAlert, 
  Send, 
  Filter, 
  CheckCircle2, 
  RefreshCw,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Complaint, ComplaintCategory, Language } from '../types';
import { translations } from '../lib/translations';

interface ComplaintCellProps {
  language: Language;
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
  onAddPoints: (pts: number) => void;
}

export const ComplaintCell: React.FC<ComplaintCellProps> = ({
  language,
  complaints,
  setComplaints,
  onAddPoints,
}) => {
  const t = translations[language];

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Dirty Classrooms');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submittedBy, setSubmittedBy] = useState('Student (Class 8)');

  // AI analysis modal / state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const categoriesList: ComplaintCategory[] = [
    'Dirty Classrooms',
    'Dirty Toilets',
    'Unsafe Drinking Water',
    'Broken Furniture',
    'Bullying & Conduct',
    'Medical Emergency',
    'Playground Hazards',
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !description) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/ai/analyze-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          location,
          description,
        }),
      });

      const aiData = await res.json();
      setAnalysisResult(aiData);

      const newComplaint: Complaint = {
        id: `CC-${Math.floor(100 + Math.random() * 900)}`,
        title,
        category,
        location,
        description,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60',
        status: 'pending',
        priority: aiData.priority || 'medium',
        assignedDept: aiData.responsibleDept || 'Facilities & Maintenance',
        estimatedHours: aiData.estimatedHours || 6,
        submittedBy: submittedBy || 'Campus Student',
        submittedAt: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        aiAdvice: aiData.safetyAdvice,
      };

      setComplaints((prev) => [newComplaint, ...prev]);
      onAddPoints(20); // Award 20 health points for reporting a genuine issue

      // Reset Form
      setTitle('');
      setLocation('');
      setDescription('');
      setPhotoUrl('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);

    } catch (err) {
      console.error("Error analyzing complaint", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="space-y-5 pb-8">
      
      {/* Header Banner - High Density */}
      <div className="bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 rounded-lg shadow-sm">
        <div className="max-w-4xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Automated Category & Priority Assessment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">{t.complaintCell}</h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Report hazards, dirty washrooms, unsafe drinking water, or broken desks. The AI instantly categorizes priority, offers immediate safety advice, and notifies school staff.
          </p>
        </div>
      </div>

      {showSuccessToast && (
        <div className="bg-emerald-700 text-white p-3 rounded-lg shadow-2xs flex items-center justify-between text-xs font-bold">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Complaint successfully submitted & AI analyzed! +20 Health Points earned.</span>
          </div>
          <span className="bg-emerald-800 border border-emerald-600 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider">Track Below</span>
        </div>
      )}

      {/* Grid: Submit Complaint Form & Live Analysis Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left Column: Complaint Form */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t.submitComplaint}</span>
            </h2>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-bold border border-emerald-200 uppercase tracking-wider">
              Anonymous Option Available
            </span>
          </div>

          <form onSubmit={handleAnalyzeAndSubmit} className="space-y-3 text-xs font-medium">
            
            <div>
              <label className="block text-slate-800 font-bold mb-1">Issue Title *</label>
              <input
                type="text"
                placeholder="e.g. Dirty Washroom Floor or Leaking Filter #3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-medium outline-hidden focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-semibold outline-hidden cursor-pointer"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Exact Campus Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Class 7B, 2nd Floor West Wing"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-medium outline-hidden focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-800 font-bold mb-1">Detailed Description *</label>
              <textarea
                rows={3}
                placeholder="Describe the condition, safety hazard, or maintenance needed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-medium outline-hidden focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Photo Upload & Preview */}
            <div>
              <label className="block text-slate-800 font-bold mb-1">Upload Photo (Optional)</label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-md border border-slate-300 cursor-pointer font-bold transition-colors">
                  <Camera className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Choose Image File</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>

                {photoUrl && (
                  <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-300 text-[11px] font-bold">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Photo Attached</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reporter Name */}
            <div>
              <label className="block text-slate-800 font-bold mb-1">Submitted By</label>
              <input
                type="text"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-medium outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-md shadow-2xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>AI Analyzing Category & Priority...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit & Trigger AI Analysis</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Column: AI Complaint Analysis Output Box */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-lg border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-300">AI Complaint Analysis Panel</h3>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                Real-Time AI
              </span>
            </div>

            {analysisResult ? (
              <div className="mt-4 space-y-3 text-xs">
                
                {/* Priority Badge */}
                <div className="flex items-center justify-between bg-slate-800/90 p-2.5 rounded-md border border-slate-700">
                  <span className="text-slate-300 font-medium">Assigned Priority:</span>
                  <span className={`px-2.5 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider ${
                    analysisResult.priority === 'urgent' ? 'bg-red-600 text-white' :
                    analysisResult.priority === 'high' ? 'bg-amber-600 text-white' :
                    analysisResult.priority === 'medium' ? 'bg-blue-600 text-white' :
                    'bg-slate-700 text-slate-200'
                  }`}>
                    {analysisResult.priority}
                  </span>
                </div>

                {/* Immediate Safety Advice */}
                <div className="bg-slate-800/90 border border-emerald-500/30 p-3 rounded-md space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center space-x-1.5 text-xs">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Immediate Safety Advice:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-normal text-[11px]">{analysisResult.safetyAdvice}</p>
                </div>

                {/* Department & Hours */}
                <div className="grid grid-cols-2 gap-2 text-slate-200">
                  <div className="bg-slate-800/90 p-2.5 rounded-md border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-teal-400" />
                      <span>Dept</span>
                    </div>
                    <div className="font-bold mt-0.5 text-white text-xs">{analysisResult.responsibleDept}</div>
                  </div>

                  <div className="bg-slate-800/90 p-2.5 rounded-md border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Est. Time</span>
                    </div>
                    <div className="font-bold mt-0.5 text-amber-300 text-xs">{analysisResult.estimatedHours} Hours</div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="my-8 text-center text-slate-400 space-y-2">
                <div className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs max-w-xs mx-auto leading-relaxed">
                  Fill out the complaint form and click submit. AI will instantly analyze priority and assign maintenance staff.
                </p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2.5">
            Note: Emergency complaints trigger instant alerts to school medical staff and security officers.
          </div>
        </div>

      </div>

      {/* Complaint Status Tracker & List */}
      <section className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Active Complaint Tracking Cell</h2>
            <p className="text-[11px] text-slate-500">Track resolution progress, maintenance notes, and feedback</p>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 rounded-md px-2.5 py-1 outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredComplaints.length === 0 ? (
            <p className="text-center py-6 text-slate-400 text-xs">No complaints matching filter criteria.</p>
          ) : (
            filteredComplaints.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-md border border-slate-200/80 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{item.id}</span>
                      <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">{item.location} • Submitted by {item.submittedBy}</div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider border ${
                      item.priority === 'urgent' ? 'bg-red-100 text-red-800 border-red-200' :
                      item.priority === 'high' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-slate-200 text-slate-700 border-slate-300'
                    }`}>
                      {item.priority}
                    </span>

                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider ${
                      item.status === 'resolved' ? 'bg-emerald-700 text-white' :
                      item.status === 'in_progress' ? 'bg-blue-700 text-white' :
                      'bg-amber-600 text-white'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-normal bg-white p-2.5 rounded-md border border-slate-200/80">
                  {item.description}
                </p>

                {item.aiAdvice && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-md text-xs text-emerald-900 flex items-start space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-[11px]">
                      <strong className="font-bold">AI Immediate Safety Advice: </strong>
                      <span>{item.aiAdvice}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200 font-medium">
                  <div>Assigned Dept: <strong className="text-slate-800">{item.assignedDept}</strong> (Est: {item.estimatedHours}h)</div>
                  <div>Submitted: {item.submittedAt}</div>
                </div>

              </div>
            ))
          )}
        </div>

      </section>

    </div>
  );
};
