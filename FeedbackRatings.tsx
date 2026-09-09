import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ThumbsUp } from 'lucide-react';
import { Complaint, Language } from '../types';
import { translations } from '../lib/translations';

interface FeedbackRatingsProps {
  language: Language;
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

export const FeedbackRatings: React.FC<FeedbackRatingsProps> = ({
  language,
  complaints,
  setComplaints,
}) => {
  const t = translations[language];

  // Filter resolved complaints
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved');

  const [selectedComplaintId, setSelectedComplaintId] = useState<string>(
    resolvedComplaints[0]?.id || ''
  );

  const [rating, setRating] = useState(5);
  const [speedRating, setSpeedRating] = useState(5);
  const [staffRating, setStaffRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaintId) return;

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === selectedComplaintId) {
          return {
            ...c,
            feedback: {
              rating,
              speedRating,
              staffRating,
              comment,
              submittedAt: new Date().toLocaleDateString(),
            },
          };
        }
        return c;
      })
    );

    setSubmittedSuccess(true);
    setComment('');
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Resolution Quality & Staff Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Feedback & Ratings</h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Rate maintenance resolution speed, staff behavior, and overall cleanliness satisfaction for resolved campus complaints.
          </p>
        </div>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center space-x-2 shadow-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>Feedback successfully recorded! Thank you for helping keep CampusCare standards high.</span>
        </div>
      )}

      {/* Main Feedback Form Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {resolvedComplaints.length === 0 ? (
          <p className="text-center py-8 text-slate-400 text-xs">No resolved complaints available for rating yet.</p>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Resolved Complaint *</label>
              <select
                value={selectedComplaintId}
                onChange={(e) => setSelectedComplaintId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-hidden cursor-pointer"
              >
                {resolvedComplaints.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} - {c.title} ({c.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs font-bold">
              
              <div>
                <label className="block text-slate-700 mb-1">Overall Satisfaction ({rating}★)</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="cursor-pointer text-amber-400 p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Resolution Speed ({speedRating}★)</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSpeedRating(star)}
                      className="cursor-pointer text-amber-400 p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= speedRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Staff Behavior ({staffRating}★)</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStaffRating(star)}
                      className="cursor-pointer text-amber-400 p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= staffRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Comments or Appreciation Notes</label>
              <textarea
                rows={3}
                placeholder="Share your thoughts on how quickly or cleanly the issue was resolved..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Submit Rating & Feedback</span>
            </button>

          </form>
        )}
      </div>

    </div>
  );
};
