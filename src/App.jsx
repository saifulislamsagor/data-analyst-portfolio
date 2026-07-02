import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { 
  Database, FileText, LineChart, LogIn, LogOut, Plus, 
  Trash2, User, Mail, GraduationCap, ChevronRight, ExternalLink 
} from 'lucide-react'

// --- GLOBAL LAYOUT COMPONENT ---
function Layout({ children, user, handleLogout }) {
  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col justify-between">
      <header className="border-b border-gray-800 bg-[#16181f]/80 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-[#d4af37]">
            <Database size={22} />
            <span>SAGOR.DATA//</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-mono">
            <Link to="/" className="hover:text-[#d4af37] transition">WORKSPACE</Link>
            <Link to="/admin" className="flex items-center gap-1 border border-gray-700 px-3 py-1 bg-gray-900 rounded hover:border-[#d4af37] transition">
              <User size={14} />
              {user ? 'CTRL_PANEL' : 'LOGIN'}
            </Link>
            {user && (
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition flex items-center gap-1">
                <LogOut size={14} />
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6">{children}</main>
      <footer className="border-t border-gray-800 py-4 text-center text-xs font-mono text-gray-500">
        SYSTEM_STATUS: ACTIVE // DESIGNED FOR DATA ARCHITECTURE & PORTFOLIO © 2026
      </footer>
    </div>
  )
}

// --- HOME & PUBLIC WORKSPACE PAGE ---
function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Profile Card & Academic/Resume Metadata */}
      <div className="space-y-6 lg:col-span-1">
        <div className="bg-[#16181f] border border-gray-800 p-6 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 text-xs font-mono bg-amber-500/10 text-[#d4af37] px-2 py-1 uppercase tracking-widest border-b border-l border-gray-800">
            Lead Analyst
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Sagor</h1>
          <p className="text-[#d4af37] font-mono text-xs mb-4">// Management & Full-Stack Architecture</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Bridging the gap between empirical data systems and web technology frameworks. Specializing in primary data collection, analytics dashboards, and custom interface builds.
          </p>
          <div className="space-y-3 font-mono text-xs text-gray-400 border-t border-gray-800/60 pt-4">
            <div className="flex items-center gap-2"><GraduationCap size={14} className="text-[#d4af37]" /> Dept. of Management, DU</div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-[#d4af37]" /> Contact via Control Panel</div>
          </div>
          <button className="w-full mt-6 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition py-2 font-mono text-xs rounded tracking-widest uppercase">
            DOWNLOAD_CV.PDF
          </button>
        </div>

        {/* Research Papers / Documents Section */}
        <div className="bg-[#16181f] border border-gray-800 p-6 rounded-lg">
          <h3 className="text-sm font-mono text-[#d4af37] uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText size={16} /> Publications & Research
          </h3>
          <div className="border-l-2 border-gray-800 pl-4 space-y-4">
            <div>
              <span className="text-[10px] font-mono text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">MARKETING_REPORT</span>
              <h4 className="text-sm font-semibold text-white mt-1">Consumer Buying Behavior Regarding Cigarettes</h4>
              <p className="text-xs text-gray-400 mt-1">A comprehensive 5-6 page analytical report leveraging primary data survey tracking consumer choice dynamics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Columns: Interactive Projects Stream */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <LineChart size={16} className="text-[#d4af37]" /> Data Project Ledger
        </h2>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-gray-500">RUNNING_QUERIES... Fetching Dataset Records</div>
        ) : projects.length === 0 ? (
          <div className="border border-dashed border-gray-800 rounded-lg p-12 text-center text-gray-500 font-mono text-xs bg-[#16181f]/40">
            NO_RECORDS_FOUND. Open CTRL_PANEL to seed new project entities.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project, idx) => (
              <Link to={`/project/${project.id}`} key={project.id} className="bg-[#16181f] border border-gray-800 hover:border-[#d4af37]/40 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#d4af37]">0{idx + 1}.</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-900 text-gray-400 border border-gray-800 uppercase text-[10px]">
                      {project.category || 'General Data'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition">{project.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                </div>
                <ChevronRight size={18} className="text-gray-600 group-hover:text-[#d4af37] transition self-end md:self-center" />
              </Link
