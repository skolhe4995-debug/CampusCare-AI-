import React, { useState } from 'react';
import { FileDown, FileText, CheckCircle2, Eye, Download, Printer } from 'lucide-react';
import { Language } from '../types';
import { DOWNLOAD_ITEMS } from '../data/mockData';
import { translations } from '../lib/translations';

interface DownloadCenterProps {
  language: Language;
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({ language }) => {
  const t = translations[language];
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const handleDownload = (id: string, title: string) => {
    if (!downloadedIds.includes(id)) {
      setDownloadedIds([...downloadedIds, id]);
    }

    // Trigger simulated download blob
    const element = document.createElement("a");
    const file = new Blob([`CampusCare Official Document: ${title}\nVerified School Hygiene Standard Document.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 px-3 py-1 rounded-full text-teal-200 text-xs font-bold border border-teal-400/30">
            <FileDown className="w-4 h-4 text-teal-300" />
            <span>Printable Resources & Posters</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t.downloadCenter}</h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Download printable handwashing posters, classroom cleanliness checklists, first-aid charts, and awareness brochures for school notice boards.
          </p>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOWNLOAD_ITEMS.map((item) => {
          const isDownloaded = downloadedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.fileSize} • {item.format}</span>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(item.id, item.title)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloaded ? 'Downloaded ✓' : 'Download'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                {previewItem.category} Preview
              </span>
              <h2 className="text-xl font-black text-slate-900">{previewItem.title}</h2>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-3">
              <FileText className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="text-xs text-slate-700 font-medium">{previewItem.desc}</p>
              <div className="text-[11px] font-bold text-slate-500">Document ready for print in high resolution PDF (A3/A4)</div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleDownload(previewItem.id, previewItem.title)}
                className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Save to Device</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
