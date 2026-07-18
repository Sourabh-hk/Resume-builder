import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import { defaultData } from '../utils/defaultData';
import { toast } from '../utils/toast';
import axios from 'axios';

export const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [activeResumeId, setActiveResumeId] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reference to hold latest data for auto-save
  const dataRef = useRef(data);
  useEffect(() => { dataRef.current = data; }, [data]);

  useEffect(() => {
    if (user) {
      fetchResumes();
    } else {
      setData(JSON.parse(JSON.stringify(defaultData)));
      setLoading(false);
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('/api/resumes');
      if (res.data.length > 0) {
        setResumes(res.data);
        const active = res.data[0];
        setActiveResumeId(active._id);
        setData(formatFromDB(active));
      } else {
        // Create initial resume
        const newRes = await axios.post('/api/resumes', formatToDB(defaultData));
        setResumes([newRes.data]);
        setActiveResumeId(newRes.data._id);
        setData(formatFromDB(newRes.data));
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const formatFromDB = (dbResume) => {
    return {
      personal: dbResume.personalInfo || defaultData.personal,
      summary: dbResume.summary || '',
      experience: dbResume.experience || [],
      education: dbResume.education || [],
      skills: dbResume.skills || { technical: [], tools: [], soft: [] },
      projects: dbResume.projects || [],
      certifications: dbResume.certifications || [],
      optional: dbResume.optional || { languages: [], hobbies: [], awards: [], custom: [] },
      settings: dbResume.settings || { font: 'Inter' }
    };
  };

  const formatToDB = (localData) => {
    return {
      personalInfo: localData.personal,
      summary: localData.summary,
      experience: localData.experience,
      education: localData.education,
      skills: localData.skills,
      projects: localData.projects,
      certifications: localData.certifications,
      settings: localData.settings
    };
  };

  // Auto-save debounced 30s
  useEffect(() => {
    if (!user || !activeResumeId) return;
    const t = setTimeout(async () => {
      try {
        if (dataRef.current) {
          await axios.put(`/api/resumes/${activeResumeId}`, formatToDB(dataRef.current));
          toast.success("Saved ✓", 2000);
        }
      } catch (err) {
        console.error('Auto-save failed', err);
      }
    }, 30000);
    return () => clearTimeout(t);
  }, [data, user, activeResumeId]);

  const update = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  const updatePersonal = (field, value) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ResumeContext.Provider value={{ data, update, updatePersonal, setData, resumes, activeResumeId }}>
      {children}
    </ResumeContext.Provider>
  );
}
