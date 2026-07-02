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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// --- PROJECT METADATA VIEW PAGE ---
function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
      if (!error && data) setProject(data)
      setLoading(false)
    }
    fetchProject()
  }, [id])

  if (loading) return <div className="text-center py-12 font-mono text-xs text-gray-500">COMPILING_DATA_SHEET...</div>
  if (!project) return <div className="text-center py-12 font-mono text-xs text-red-400">ERROR_404: RECORD_NOT_FOUND</div>

  return (
    <div className="bg-[#16181f] border border-gray-800 rounded-lg p-6 max-w-3xl mx-auto space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono text-[#d4af37] uppercase bg-gray-900 px-2 py-1 rounded border border-gray-800">
          {project.category || 'DATA_ANALYSIS'}
        </span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">{project.title}</h1>
        <p className="text-xs font-mono text-gray-500">RECORDED_AT: {new Date(project.created_at).toLocaleString()}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">// Summary Analysis Narrative</h3>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{project.description}</p>
      </div>

      {/* Integration Links for Datasets and Interactive Codebooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-800/60">
        {project.colab_link && (
          <a href={project.colab_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded hover:border-orange-500/40 transition group">
            <span className="text-xs font-mono text-gray-300">Google Colab / Kaggle Notebook</span>
            <ExternalLink size={14} className="text-gray-500 group-hover:text-orange-400" />
          </a>
        )}
        {project.report_link && (
          <a href={project.report_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded hover:border-[#d4af37]/40 transition group">
            <span className="text-xs font-mono text-gray-300">PDF Report / Data Asset</span>
            <FileText size={14} className="text-gray-500 group-hover:text-[#d4af37]" />
          </a>
        )}
      </div>
      
      <div className="pt-2">
        <Link to="/" className="text-xs font-mono text-[#d4af37] hover:underline">← RETURN_TO_WORKSPACE</Link>
      </div>
    </div>
  )
}

// --- SECURE CONTROL ROOM (ADMIN PANEL) ---
function AdminPanel({ user }) {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [colabLink, setColabLink] = useState('')
  const [reportLink, setReportLink] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) fetchAdminProjects()
  }, [user])

  async function fetchAdminProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/admin' }
    })
  }

  async function handleAddProject(e) {
    e.preventDefault()
    if (!title || !description) return alert('Title and Description are required.')
    setSaving(true)

    const { error } = await supabase.from('projects').insert([{
      title,
      description,
      category,
      colab_link: colabLink,
      report_link: reportLink
    }])

    setSaving(false)
    if (!error) {
      setTitle(''); setDescription(''); setCategory(''); setColabLink(''); setReportLink('');
      fetchAdminProjects()
    } else {
      alert(error.message)
    }
  }

  async function handleDelete(id) {
    if (confirm('Are you certain you want to purge this data record?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (!error) fetchAdminProjects()
    }
  }

  // If user isn't authenticated via Google OAuth, present direct secure login trigger
  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-[#16181f] border border-gray-800 rounded-lg p-8 text-center my-12 space-y-6">
        <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
          <LogIn size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Secure Workspace Login</h2>
          <p className="text-xs font-mono text-gray-400 mt-2">// SYSTEM AUTHORIZATION REQUIRED</p>
        </div>
        <button onClick={handleGoogleLogin} className="w-full bg-white text-gray-900 font-bold py-2.5 px-4 rounded hover:bg-gray-200 transition text-sm flex items-center justify-center gap-2">
          <span>Sign In With Google</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">System Control Panel</h2>
          <p className="text-xs font-mono text-emerald-400">// AUTHENTICATED: {user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Insertion Form */}
        <form onSubmit={handleAddProject} className="bg-[#16181f] border border-gray-800 p-5 rounded-lg space-y-4 lg:col-span-1 h-fit">
          <h3 className="text-xs font-mono text-[#d4af37] uppercase tracking-wider flex items-center gap-1">
            <Plus size={14} /> Seed Data Entry
          </h3>
          
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-gray-400 block">Project Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm focus:border-[#d4af37] outline-none" placeholder="e.g., Cigarette Consumer Behavior Study" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-gray-400 block">Category Cluster</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm focus:border-[#d4af37] outline-none" placeholder="e.g., Marketing Analytics" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-gray-400 block">Analysis Narrative *</label>
            <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm focus:border-[#d4af37] outline-none font-mono" placeholder="In-depth explanation of survey parameters, metrics..." />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-gray-400 block">Notebook Link (Google Colab / Kaggle)</label>
            <input type="url" value={colabLink} onChange={e => setColabLink(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm focus:border-[#d4af37] outline-none" placeholder="https://colab.research.google.com/..." />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-gray-400 block">Report Link (PDF / File Storage Asset)</label>
            <input type="url" value={reportLink} onChange={e => setReportLink(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm focus:border-[#d4af37] outline-none" placeholder="https://..." />
          </div>

          <button type="submit" disabled={saving} className="w-full bg-[#d4af37] text-black font-mono text-xs font-bold py-2.5 rounded hover:bg-[#ffb300] transition uppercase tracking-wider">
            {saving ? 'COMMITTING_RECORD...' : 'PUBLISH_TO_WORKSPACE'}
          </button>
        </form>

        {/* Existing Matrix View with Administrative Purging Rights */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">// Managed Record Inventory</h3>
          {projects.length === 0 ? (
            <div className="text-xs font-mono text-gray-500 text-center py-8 border border-dashed border-gray-800 rounded">No live inventory entries found.</div>
          ) : (
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-gray-900/60 border border-gray-800 rounded p-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase">{proj.category || 'UNCLUSTERED'}</span>
                  </div>
                  <button onClick={() => handleDelete(proj.id)} className="text-gray-500 hover:text-red-400 p-2 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- MASTER ROUTER WRAPPER ---
export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Router>
      <Layout user={user} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </Layout>
    </Router>
  )
}
