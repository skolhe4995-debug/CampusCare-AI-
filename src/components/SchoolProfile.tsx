import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  UserCheck, 
  Users, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  BellRing, 
  Image as ImageIcon, 
  Edit3, 
  Check, 
  X, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Megaphone,
  Award,
  ExternalLink
} from 'lucide-react';
import { Language, SchoolInfo, SchoolPhoto, SchoolNotification } from '../types';
import { translations } from '../lib/translations';

interface SchoolProfileProps {
  language: Language;
  schoolInfo: SchoolInfo;
  setSchoolInfo: React.Dispatch<React.SetStateAction<SchoolInfo>>;
}

const PRESET_PHOTOS = [
  { title: "Main School Entrance & Green Courtyard", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80", category: "Campus" },
  { title: "Indoor Sports Gymnasium & Basketball Court", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", category: "Sports" },
  { title: "Digital Library & Learning Resource Center", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80", category: "Library" },
  { title: "School Health Clinic & First-Aid Room", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", category: "Health Clinic" }
];

export const SchoolProfile: React.FC<SchoolProfileProps> = ({
  language,
  schoolInfo,
  setSchoolInfo,
}) => {
  const t = translations[language];

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'photos' | 'notifications'>('overview');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  
  // Info Edit Form state
  const [editName, setEditName] = useState(schoolInfo.name);
  const [editAddress, setEditAddress] = useState(schoolInfo.address);
  const [editPrincipal, setEditPrincipal] = useState(schoolInfo.principalName);
  const [editStudents, setEditStudents] = useState(schoolInfo.studentCount);
  const [editPhone, setEditPhone] = useState(schoolInfo.phone);
  const [editEmail, setEditEmail] = useState(schoolInfo.email);

  // New Photo Form
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Campus');

  // New Notification Form
  const [showAddNotif, setShowAddNotif] = useState(false);
  const [newNotifTitle, setNewNotifTitle] = useState('');
  const [newNotifContent, setNewNotifContent] = useState('');
  const [newNotifCategory, setNewNotifCategory] = useState<'general' | 'health' | 'event' | 'urgent'>('general');
  const [newNotifImportant, setNewNotifImportant] = useState(false);

  // Modal image preview
  const [selectedImage, setSelectedImage] = useState<SchoolPhoto | null>(null);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolInfo(prev => ({
      ...prev,
      name: editName,
      address: editAddress,
      principalName: editPrincipal,
      studentCount: Number(editStudents) || 0,
      phone: editPhone,
      email: editEmail,
    }));
    setIsEditingInfo(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;

    const newPhoto: SchoolPhoto = {
      id: 'p-' + Date.now(),
      title: newPhotoTitle,
      url: newPhotoUrl,
      category: newPhotoCategory,
    };

    setSchoolInfo(prev => ({
      ...prev,
      photos: [newPhoto, ...prev.photos]
    }));

    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setShowAddPhoto(false);
  };

  const handleDeletePhoto = (id: string) => {
    setSchoolInfo(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id)
    }));
  };

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifTitle.trim() || !newNotifContent.trim()) return;

    const newNotif: SchoolNotification = {
      id: 'sn-' + Date.now(),
      title: newNotifTitle,
      content: newNotifContent,
      date: new Date().toISOString().split('T')[0],
      category: newNotifCategory,
      important: newNotifImportant,
    };

    setSchoolInfo(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications]
    }));

    setNewNotifTitle('');
    setNewNotifContent('');
    setNewNotifImportant(false);
    setShowAddNotif(false);
  };

  const handleDeleteNotification = (id: string) => {
    setSchoolInfo(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  };

  const handleAddPresetPhoto = (preset: typeof PRESET_PHOTOS[0]) => {
    const newPhoto: SchoolPhoto = {
      id: 'p-' + Date.now(),
      title: preset.title,
      url: preset.url,
      category: preset.category,
    };

    setSchoolInfo(prev => ({
      ...prev,
      photos: [newPhoto, ...prev.photos]
    }));
  };

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-0.5 rounded-md text-indigo-300 text-[11px] font-semibold">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official School Information & Administration</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">{schoolInfo.name}</h1>
            <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
              {schoolInfo.address}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                setEditName(schoolInfo.name);
                setEditAddress(schoolInfo.address);
                setEditPrincipal(schoolInfo.principalName);
                setEditStudents(schoolInfo.studentCount);
                setEditPhone(schoolInfo.phone);
                setEditEmail(schoolInfo.email);
                setIsEditingInfo(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit School Details</span>
            </button>
          </div>
        </div>

        {/* Quick Info Grid Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{t.principalName}</div>
            <div className="text-xs font-bold text-white mt-0.5 truncate">{schoolInfo.principalName}</div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{t.noOfStudents}</div>
            <div className="text-sm font-extrabold text-amber-400 mt-0.5 flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.studentCount.toLocaleString()} Students</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Campus Gallery</div>
            <div className="text-sm font-extrabold text-teal-300 mt-0.5 flex items-center space-x-1">
              <ImageIcon className="w-3.5 h-3.5 text-teal-300" />
              <span>{schoolInfo.photos.length} Photos</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Announcements</div>
            <div className="text-sm font-extrabold text-indigo-300 mt-0.5 flex items-center space-x-1">
              <Megaphone className="w-3.5 h-3.5 text-indigo-300" />
              <span>{schoolInfo.notifications.length} Posted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-lg p-1 space-x-1 border shadow-2xs">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'overview' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>School Overview & Principal</span>
        </button>

        <button
          onClick={() => setActiveSubTab('photos')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'photos' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>School Photos ({schoolInfo.photos.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notifications')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'notifications' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>School Notifications ({schoolInfo.notifications.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: OVERVIEW & PRINCIPAL */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Info Box */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  School Profile Details
                </h2>
                <p className="text-[11px] text-slate-500">Official institutional record and contact directory</p>
              </div>
              <span className="text-[10px] bg-slate-100 border border-slate-200 font-bold px-2 py-0.5 rounded-md text-slate-700">
                Estd. {schoolInfo.establishedYear}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-emerald-700" />
                  <span>{t.schoolName}</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">{schoolInfo.name}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <UserCheck className="w-3 h-3 text-emerald-700" />
                  <span>{t.principalName}</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">{schoolInfo.principalName}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <Users className="w-3 h-3 text-emerald-700" />
                  <span>{t.noOfStudents}</span>
                </div>
                <div className="font-extrabold text-amber-700 text-sm">{schoolInfo.studentCount.toLocaleString()} Enrolled Students</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  <span>{t.schoolAddress}</span>
                </div>
                <div className="font-medium text-slate-800 text-xs leading-relaxed">{schoolInfo.address}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span>Phone Number</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">{schoolInfo.phone}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200/70 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-emerald-700" />
                  <span>Email Address</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">{schoolInfo.email}</div>
              </div>

            </div>

            {/* Campus Facilities Checklist */}
            <div className="pt-2">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                Certified Campus Facilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="flex items-center space-x-1.5 p-2 bg-emerald-50/70 border border-emerald-200 rounded-md text-emerald-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>UV Purified Water Units</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-teal-50/70 border border-teal-200 rounded-md text-teal-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>24x7 CCTV & Security</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-indigo-50/70 border border-indigo-200 rounded-md text-indigo-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>On-site Medical Clinic</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-amber-50/70 border border-amber-200 rounded-md text-amber-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Certified Clean Kitchen</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-purple-50/70 border border-purple-200 rounded-md text-purple-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span>Sanitized Washrooms</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-cyan-50/70 border border-cyan-200 rounded-md text-cyan-950 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                  <span>Fire & Safety Equipment</span>
                </div>
              </div>
            </div>

          </div>

          {/* Principal's Card & Message */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>Principal's Desk</span>
              </h2>
              <p className="text-[11px] text-slate-500">Message from the head of institution</p>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-slate-900 text-white rounded-md">
              <div className="w-11 h-11 rounded-full bg-emerald-700 flex items-center justify-center font-black text-lg text-white border-2 border-emerald-400 shrink-0">
                SD
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-xs text-white truncate">{schoolInfo.principalName}</div>
                <div className="text-[10px] text-emerald-300 font-semibold">Principal & Educational Director</div>
                <div className="text-[9px] text-slate-400">Serving since 2018</div>
              </div>
            </div>

            <blockquote className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
              "At {schoolInfo.name}, student health, hygiene, and mental well-being are as vital as academic excellence. We empower every child to build healthy habits and maintain a safe, spotless school environment together."
            </blockquote>

            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between p-2 bg-slate-100/70 rounded-md font-semibold text-slate-800">
                <span>Total Enrolled Students</span>
                <span className="text-emerald-800 font-bold">{schoolInfo.studentCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-100/70 rounded-md font-semibold text-slate-800">
                <span>Teaching & Non-Teaching Staff</span>
                <span className="text-slate-900 font-bold">84 Members</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-100/70 rounded-md font-semibold text-slate-800">
                <span>Campus Hygiene Index</span>
                <span className="text-emerald-700 font-extrabold">92 / 100</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: SCHOOL PHOTOS GALLERY */}
      {activeSubTab === 'photos' && (
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>School Campus & Facilities Gallery</span>
              </h2>
              <p className="text-[11px] text-slate-500">Explore photos of classrooms, labs, canteen, playground & hygiene facilities</p>
            </div>

            <button
              onClick={() => setShowAddPhoto(!showAddPhoto)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add School Photo</span>
            </button>
          </div>

          {/* Preset Quick Add Section */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-slate-700 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Add High-Quality Facility Presets:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddPresetPhoto(preset)}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 rounded-md text-[11px] font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-emerald-600" />
                  <span>+ Add {preset.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add Photo Form */}
          {showAddPhoto && (
            <form onSubmit={handleAddPhoto} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-emerald-950 uppercase">Add New School Photo</h3>
                <button type="button" onClick={() => setShowAddPhoto(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Photo Title</label>
                  <input
                    type="text"
                    required
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="e.g. Clean Assembly Quadrangle"
                    className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value)}
                    className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                  >
                    <option value="Campus">Campus Grounds</option>
                    <option value="Classrooms">Classrooms</option>
                    <option value="Laboratories">Laboratories</option>
                    <option value="Canteen">Canteen & Dining</option>
                    <option value="Sports">Sports Facilities</option>
                    <option value="Health Clinic">Health Clinic</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddPhoto(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  Save Photo
                </button>
              </div>
            </form>
          )}

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {schoolInfo.photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                    {photo.category || 'School'}
                  </div>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600/90 text-white rounded-md hover:bg-red-700 transition-colors shadow-2xs cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 truncate pr-2">{photo.title}</span>
                  <button
                    onClick={() => setSelectedImage(photo)}
                    className="text-[10px] text-emerald-700 font-bold hover:underline shrink-0 flex items-center"
                  >
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SCHOOL NOTIFICATIONS & ANNOUNCEMENTS */}
      {activeSubTab === 'notifications' && (
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <BellRing className="w-4 h-4 text-emerald-700" />
                <span>School Announcements & Circulars</span>
              </h2>
              <p className="text-[11px] text-slate-500">Official notifications issued by school authority to students & parents</p>
            </div>

            <button
              onClick={() => setShowAddNotif(!showAddNotif)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Announcement</span>
            </button>
          </div>

          {/* Add Notification Form */}
          {showAddNotif && (
            <form onSubmit={handleAddNotification} className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-indigo-950 uppercase">Post School Notification</h3>
                <button type="button" onClick={() => setShowAddNotif(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Notification Title</label>
                  <input
                    type="text"
                    required
                    value={newNotifTitle}
                    onChange={(e) => setNewNotifTitle(e.target.value)}
                    placeholder="e.g. Free Dental Screening Drive Scheduled"
                    className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newNotifCategory}
                    onChange={(e) => setNewNotifCategory(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                  >
                    <option value="general">General Circular</option>
                    <option value="health">Health & Sanitation</option>
                    <option value="event">School Event</option>
                    <option value="urgent">Urgent Notice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Notification Details / Content</label>
                <textarea
                  required
                  rows={3}
                  value={newNotifContent}
                  onChange={(e) => setNewNotifContent(e.target.value)}
                  placeholder="Enter complete circular text for students and parents..."
                  className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNotifImportant}
                    onChange={(e) => setNewNotifImportant(e.target.checked)}
                    className="accent-emerald-700 w-4 h-4"
                  />
                  <span>Mark as High Priority / Important Notice</span>
                </label>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNotif(false)}
                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md text-xs font-bold bg-indigo-700 text-white hover:bg-indigo-800"
                  >
                    Publish Circular
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Notifications List */}
          <div className="space-y-2.5">
            {schoolInfo.notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-md">
                No school notifications posted yet.
              </div>
            ) : (
              schoolInfo.notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-md border transition-all ${
                    item.important 
                      ? 'bg-amber-50/70 border-amber-300/80 shadow-2xs' 
                      : 'bg-slate-50/80 border-slate-200/90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase border ${
                          item.category === 'urgent' ? 'bg-red-100 text-red-800 border-red-300' :
                          item.category === 'health' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          item.category === 'event' ? 'bg-indigo-100 text-indigo-800 border-indigo-300' :
                          'bg-slate-200 text-slate-800 border-slate-300'
                        }`}>
                          {item.category}
                        </span>

                        {item.important && (
                          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-sm uppercase">
                            Important
                          </span>
                        )}

                        <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                      </div>

                      <h3 className="font-extrabold text-xs text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">{item.content}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteNotification(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors shrink-0"
                      title="Remove Announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* EDIT SCHOOL INFO MODAL */}
      {isEditingInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-lg w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <Edit3 className="w-4 h-4 text-emerald-700" />
                <span>Update School Information</span>
              </h3>
              <button onClick={() => setIsEditingInfo(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInfo} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.schoolName}</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 rounded-md border border-slate-300 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.schoolAddress}</label>
                <textarea
                  required
                  rows={2}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full p-2 rounded-md border border-slate-300 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.principalName}</label>
                  <input
                    type="text"
                    required
                    value={editPrincipal}
                    onChange={(e) => setEditPrincipal(e.target.value)}
                    className="w-full p-2 rounded-md border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.noOfStudents}</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editStudents}
                    onChange={(e) => setEditStudents(Number(e.target.value))}
                    className="w-full p-2 rounded-md border border-slate-300 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full p-2 rounded-md border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2 rounded-md border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-3.5 py-1.5 rounded-md font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md font-bold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL PHOTO VIEW MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-3xl w-full p-4 space-y-3 text-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-extrabold text-sm">{selectedImage.title}</span>
              <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-hidden rounded-md">
              <img src={selectedImage.url} alt={selectedImage.title} referrerPolicy="no-referrer" className="w-full h-full object-contain max-h-[70vh] mx-auto" />
            </div>
            <div className="text-xs text-slate-400 text-right">
              Category: <span className="text-emerald-400 font-bold">{selectedImage.category || 'General'}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
