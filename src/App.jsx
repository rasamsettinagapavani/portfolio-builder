import React, { useState, useRef } from 'react';
import { User, Briefcase, Star, Mail, Plus, Download, Folder, Trash2, Camera, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PortfolioApp = () => {
  const [formData, setFormData] = useState({
    name: 'NAGA PAVANI',
    role: 'AI & Full Stack Developer',
    skills: 'HTML, CSS, JavaScript, React, Node.js',
    email: 'pavani@gmail.com',
    profilePic: 'https://via.placeholder.com/120',
    projects: [
      { title: 'Fake News Checker', tech: 'HTML, CSS, JavaScript', desc: 'A real-time detector using ML.' },
      { title: 'Portfolio Generator', tech: 'React, Vite', desc: 'Dynamic CV builder for devs.' }
    ]
  });

  const portfolioRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', tech: '', desc: '' }]
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const downloadPDF = () => {
    const input = portfolioRef.current;
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.name}_Portfolio.pdf`);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* LEFT SIDE: INPUT FORM */}
      <div style={{ flex: '1', backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', border: '1px solid #e1e4e8', maxHeight: '95vh', overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#1a1a1a', marginBottom: '24px', fontSize: '1.5rem' }}>Portfolio Details</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div className="input-field">
            <label><Camera size={16} /> Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
          </div>

          <div className="input-field">
            <label><User size={16} /> Full Name</label>
            <input name="name" onChange={handleChange} value={formData.name} placeholder="Sudha Rani" />
          </div>

          <div className="input-field">
            <label><Briefcase size={16} /> Professional Role</label>
            <input name="role" onChange={handleChange} value={formData.role} placeholder="AI Developer" />
          </div>

          <div className="input-field">
            <label><Star size={16} /> Skills (Comma separated)</label>
            <input name="skills" onChange={handleChange} value={formData.skills} placeholder="React, Node, Python..." />
          </div>

          <hr style={{ border: 'none', height: '1px', backgroundColor: '#eee', margin: '10px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Folder size={18} /> Projects</h4>
            <button onClick={addProject} className="add-btn"><Plus size={14} /> Add</button>
          </div>

          {formData.projects.map((project, index) => (
            <div key={index} className="project-editor-card">
              <div style={{ display: 'flex', gap: '10px' }}>
                <input placeholder="Title" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} style={{ flex: 2 }} />
                <button onClick={() => removeProject(index)} className="del-btn"><Trash2 size={16} /></button>
              </div>
              <input placeholder="Tech Stack (e.g. React, Firebase)" value={project.tech} onChange={(e) => handleProjectChange(index, 'tech', e.target.value)} style={{ marginTop: '8px' }} />
            </div>
          ))}

          <div className="input-field" style={{ marginTop: '10px' }}>
            <label><Mail size={16} /> Contact Email</label>
            <input name="email" onChange={handleChange} value={formData.email} />
          </div>

          <button onClick={downloadPDF} className="generate-btn">
            <Download size={18} /> Generate & Download Portfolio
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW (CARD DESIGN) */}
      <div ref={portfolioRef} style={{ flex: '1.4', backgroundColor: '#0d1b2a', color: '#e0e1dd', padding: '50px', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', minHeight: '842px' }}>
        
        <header style={{ display: 'flex', alignItems: 'center', gap: '30px', borderBottom: '1px solid #1b263b', paddingBottom: '30px' }}>
          <div style={{ width: '140px', height: '140px', borderRadius: '24px', overflow: 'hidden', border: '3px solid #00d4ff', transform: 'rotate(-3deg)', boxShadow: '10px 10px 0px #1b263b' }}>
             <img src={formData.profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '3rem', color: '#fff' }}>{formData.name}</h1>
            <h2 style={{ fontWeight: '400', color: '#00d4ff', margin: '5px 0', fontSize: '1.4rem' }}>{formData.role}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', color: '#778da9' }}>
               <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={14} /> {formData.email}</span>
            </div>
          </div>
        </header>

        <section style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#778da9', textTransform: 'uppercase', marginBottom: '15px' }}>Core Expertise</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {formData.skills.split(',').map((skill, i) => (
              <span key={i} style={{ background: '#1b263b', color: '#00d4ff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #415a77' }}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#778da9', textTransform: 'uppercase', marginBottom: '20px' }}>Selected Projects</h3>
          
          {/* PROJECT GRID CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {formData.projects.map((p, i) => (
              <div key={i} className="portfolio-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Folder color="#00d4ff" size={24} />
                  <ExternalLink size={16} color="#415a77" />
                </div>
                <h4 style={{ margin: '15px 0 8px 0', fontSize: '1.2rem', color: '#fff' }}>{p.title || 'Untitled Project'}</h4>
                <p style={{ fontSize: '0.85rem', color: '#778da9', lineHeight: '1.5', margin: '0 0 15px 0' }}>
                   Built using cutting edge technologies to solve real world problems.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                   {p.tech.split(',').map((t, idx) => (
                     <span key={idx} style={{ fontSize: '0.7rem', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{t.trim()}</span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .input-field { display: flex; flex-direction: column; gap: 8px; }
        .input-field label { font-size: 0.9rem; font-weight: 600; color: #4a5568; display: flex; align-items: center; gap: 8px; }
        input { padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.95rem; outline: none; transition: 0.2s; }
        input:focus { border-color: #007bff; box-shadow: 0 0 0 3px rgba(0,123,255,0.1); }
        
        .add-btn { background: #f0f7ff; color: #007bff; border: 1px solid #007bff; padding: 5px 12px; borderRadius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; }
        .del-btn { background: #fff5f5; color: #e53e3e; border: 1px solid #feb2b2; padding: 8px; borderRadius: 8px; cursor: pointer; }
        .project-editor-card { background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
        
        .generate-btn { background: #007bff; color: white; border: none; padding: 16px; border-radius: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 20px; font-size: 1rem; }
        
        .portfolio-card { 
          background: #1b263b; 
          padding: 25px; 
          border-radius: 16px; 
          border: 1px solid #415a77; 
          transition: transform 0.3s ease;
        }
        .portfolio-card:hover { transform: translateY(-5px); border-color: #00d4ff; }
      `}</style>
    </div>
  );
};

export default PortfolioApp;