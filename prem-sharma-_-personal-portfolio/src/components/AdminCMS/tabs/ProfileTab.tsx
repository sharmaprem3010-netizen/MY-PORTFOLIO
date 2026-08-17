import React, { useState } from 'react';
import { User, Mail, Github, Linkedin, MapPin, Building2, Save, FileText, Check, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const ProfileTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolio();

  const [formData, setFormData] = useState({
    name: personalInfo.name || '',
    title: personalInfo.title || '',
    tagline: personalInfo.tagline || '',
    bio: personalInfo.bio || '',
    education: personalInfo.education || '',
    degree: personalInfo.degree || '',
    semester: personalInfo.semester || '',
    location: personalInfo.location || '',
    email: personalInfo.email || '',
    github: personalInfo.github || '',
    linkedin: personalInfo.linkedin || '',
    resumePath: personalInfo.resumePath || '/resume.pdf',
    about1: personalInfo.aboutDetailed?.[0] || '',
    about2: personalInfo.aboutDetailed?.[1] || '',
    about3: personalInfo.aboutDetailed?.[2] || '',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      name: formData.name,
      title: formData.title,
      tagline: formData.tagline,
      bio: formData.bio,
      education: formData.education,
      degree: formData.degree,
      semester: formData.semester,
      location: formData.location,
      email: formData.email,
      github: formData.github,
      linkedin: formData.linkedin,
      resumePath: formData.resumePath,
      aboutDetailed: [formData.about1, formData.about2, formData.about3].filter(Boolean),
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Profile & Personal Information</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your headline, university details, bio, and social links instantly.
          </p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title / Subtitle</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / University</label>
          <input
            type="text"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Program</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Current Academic Status</label>
          <input
            type="text"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            placeholder="e.g. 1st Semester Student"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Bio (Home / About Summary)</label>
        <textarea
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
        />
      </div>

      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-slate-200">Detailed About Me Paragraphs</label>
        <textarea
          rows={2}
          value={formData.about1}
          onChange={(e) => setFormData({ ...formData, about1: e.target.value })}
          placeholder="Paragraph 1 (Background and passion)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
        <textarea
          rows={2}
          value={formData.about2}
          onChange={(e) => setFormData({ ...formData, about2: e.target.value })}
          placeholder="Paragraph 2 (Current technical focus)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
        <textarea
          rows={2}
          value={formData.about3}
          onChange={(e) => setFormData({ ...formData, about3: e.target.value })}
          placeholder="Paragraph 3 (Goals and practical projects)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contact Email</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Location</span>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span>GitHub Profile URL</span>
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn Profile URL</span>
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Resume PDF URL or File Path</span>
        </label>
        <input
          type="text"
          value={formData.resumePath}
          onChange={(e) => setFormData({ ...formData, resumePath: e.target.value })}
          placeholder="/resume.pdf or https://drive.google.com/..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
        />
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Changes!' : 'Update Profile'}</span>
        </button>
      </div>
    </form>
  );
};
