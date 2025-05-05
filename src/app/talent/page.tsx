'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, JSX } from 'react';
import { FaLinkedin, FaGithub, FaTelegram, FaEnvelope, FaPhone, FaGlobe, FaUserTie, FaGraduationCap, FaCode, FaMapMarkerAlt, FaChevronLeft } from "react-icons/fa";
import { SiGmail, SiTypescript, SiJavascript, SiPython, SiSolidity, SiReact, SiNextdotjs, SiNodedotjs } from "react-icons/si";

interface Talent {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  bio: string;
  telegram: string;
  linkedin: string;
  github: string;
  email: string;
  phone: string;
  portfolio: string;
  available: boolean;
}

const talents: Talent[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Full-Stack Developer',
    skills: ['TypeScript', 'React', 'Node.js', 'Next.js', 'Solidity'],
    experience: '5 years',
    education: 'MSc Computer Science, MIT',
    location: 'San Francisco, USA',
    bio: 'Passionate full-stack developer with blockchain experience. Built several DeFi applications and contributed to open-source projects.',
    telegram: '@alexdev',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexdev',
    email: 'alex.johnson@example.com',
    phone: '+1 415 555 1234',
    portfolio: 'alexjohnson.dev',
    available: true
  },
  {
    id: '2',
    name: 'Maria Chen',
    role: 'Blockchain Engineer',
    skills: ['Solidity', 'Rust', 'Go', 'Ethereum', 'Cosmos'],
    experience: '3 years',
    education: 'BSc Computer Engineering, ETH Zurich',
    location: 'Berlin, Germany',
    bio: 'Blockchain specialist focused on smart contract security and protocol development. Previously worked at a top DeFi project.',
    telegram: '@mariacrypto',
    linkedin: 'linkedin.com/in/mariachen',
    github: 'github.com/mariacrypto',
    email: 'maria.chen@example.com',
    phone: '+49 30 555 6789',
    portfolio: 'mariachen.xyz',
    available: true
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'UI/UX', 'CSS', 'Figma'],
    experience: '4 years',
    education: 'BFA Design, Parsons',
    location: 'Seoul, South Korea',
    bio: 'Creative frontend developer with strong design skills. Specializes in building beautiful, responsive user interfaces.',
    telegram: '@davidui',
    linkedin: 'linkedin.com/in/davidkim',
    github: 'github.com/davidui',
    email: 'david.kim@example.com',
    phone: '+82 2 555 9876',
    portfolio: 'davidkim.design',
    available: false
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    experience: '6 years',
    education: 'BSc Systems Engineering, Georgia Tech',
    location: 'Remote',
    bio: 'DevOps expert with extensive cloud infrastructure experience. Helps teams build scalable and reliable systems.',
    telegram: '@sarahops',
    linkedin: 'linkedin.com/in/sarahwilliams',
    github: 'github.com/sarahops',
    email: 'sarah.williams@example.com',
    phone: '+1 404 555 4321',
    portfolio: 'sarahwilliams.tech',
    available: true
  },
  {
    id: '5',
    name: 'James Rodriguez',
    role: 'Smart Contract Auditor',
    skills: ['Solidity', 'Security', 'EVM', 'DeFi', 'Cryptography'],
    experience: '4 years',
    education: 'PhD Computer Security, Stanford',
    location: 'Singapore',
    bio: 'Security-focused developer with deep expertise in smart contract auditing and formal verification methods.',
    telegram: '@jamesaudit',
    linkedin: 'linkedin.com/in/jamesrodriguez',
    github: 'github.com/jamesaudit',
    email: 'james.r@example.com',
    phone: '+65 6 555 1234',
    portfolio: 'jamesaudit.com',
    available: true
  }
];

const skillIcons: Record<string, JSX.Element> = {
  'TypeScript': <SiTypescript className="text-blue-500" />,
  'JavaScript': <SiJavascript className="text-yellow-400" />,
  'Python': <SiPython className="text-blue-400" />,
  'Solidity': <SiSolidity className="text-gray-400" />,
  'React': <SiReact className="text-blue-400" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" />,
  'Node.js': <SiNodedotjs className="text-green-500" />,
  'Rust': <span className="text-orange-500 font-bold">Rust</span>,
  'Go': <span className="text-blue-500 font-bold">Go</span>,
  'Ethereum': <span className="text-purple-400 font-bold">ETH</span>,
  'Cosmos': <span className="text-blue-300 font-bold">ATOM</span>,
  'UI/UX': <span className="text-pink-500 font-bold">UI/UX</span>,
  'CSS': <span className="text-blue-300 font-bold">CSS</span>,
  'Figma': <span className="text-purple-500 font-bold">Figma</span>,
  'AWS': <span className="text-orange-400 font-bold">AWS</span>,
  'Docker': <span className="text-blue-400 font-bold">Docker</span>,
  'Kubernetes': <span className="text-blue-500 font-bold">K8s</span>,
  'CI/CD': <span className="text-green-400 font-bold">CI/CD</span>,
  'Terraform': <span className="text-purple-500 font-bold">TF</span>,
  'Security': <span className="text-red-500 font-bold">Sec</span>,
  'EVM': <span className="text-gray-400 font-bold">EVM</span>,
  'DeFi': <span className="text-yellow-500 font-bold">DeFi</span>,
  'Cryptography': <span className="text-indigo-500 font-bold">Crypto</span>
};

export default function TalentPool() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(talents[0]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [filters, setFilters] = useState({
    role: 'All',
    skills: 'All',
    availability: 'All'
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const roles = ['All', ...Array.from(new Set(talents.map(talent => talent.role)))];
  const allSkills = Array.from(new Set(talents.flatMap(talent => talent.skills)));
  const skillOptions = ['All', ...allSkills];

  const filteredTalents = talents.filter(talent => {
    if (filters.role !== 'All' && talent.role !== filters.role) return false;
    
    if (filters.skills !== 'All' && !talent.skills.includes(filters.skills)) return false;
    
    if (filters.availability !== 'All') {
      if (filters.availability === 'Available' && !talent.available) return false;
      if (filters.availability === 'Unavailable' && talent.available) return false;
    }
    
    return true;
  });

  const handleTalentSelect = (talent: Talent) => {
    setSelectedTalent(talent);
    if (isMobileView) {
      setShowDetailView(true);
    }
  };

  const handleBackToList = () => {
    setShowDetailView(false);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <>
      <Head>
        <title>Talent Pool | Find Skilled Professionals</title>
        <meta name="description" content="Connect with talented professionals in the blockchain and tech space" />
      </Head>

      <div className="min-h-screen bg-black text-white font-mono">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/wallpaper7.png"
              alt="Background texture"
              layout="fill"
              objectFit="cover"
              className="mix-blend-overlay"
            />
          </div>
        </div>

        <section className="flex items-center justify-center py-7 text-center relative overflow-hidden">
          <div className="px-6 max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-white">
              TALENT POOL
            </h1>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </section>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`lg:w-1/3 space-y-4 ${isMobileView && showDetailView ? 'hidden' : 'block'}`}>
              <div className="bg-black p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-300">
                  <FaUserTie />
                  <span className="font-medium">Filter Talent</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Role</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.role}
                      onChange={(e) => handleFilterChange('role', e.target.value)}
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Skills</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.skills}
                      onChange={(e) => handleFilterChange('skills', e.target.value)}
                    >
                      {skillOptions.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Availability</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.availability}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[900px] overflow-y-auto pr-2">
                {filteredTalents.length > 0 ? (
                  filteredTalents.map((talent) => (
                    <motion.div
                      key={talent.id}
                      whileHover={{ scale: isMobileView ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl cursor-pointer transition-all backdrop-blur-sm bg-black border ${selectedTalent?.id === talent.id ? 'border-gray-500' : 'border-gray-800 hover:border-gray-600'}`}
                      onClick={() => handleTalentSelect(talent)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">{talent.name}</h3>
                          <p className="text-sm text-gray-300 truncate">{talent.role}</p>
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {talent.skills.slice(0, 3).map(skill => (
                              <span key={skill} className="text-xs px-2 py-1 bg-gray-800/50 rounded-full flex items-center gap-1">
                                {skillIcons[skill] || skill}
                              </span>
                            ))}
                            {talent.skills.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-gray-800/50 rounded-full">
                                +{talent.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs ml-2">
                          <span className={`px-2 py-1 rounded-full ${talent.available ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                            {talent.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400 backdrop-blur-sm bg-gray-900/80 rounded-xl border border-gray-800">
                    No talents match your filters
                  </div>
                )}
              </div>
            </div>

            <div className={`lg:w-2/3 bg-black rounded-xl border border-gray-700 backdrop-blur-sm ${isMobileView ? (showDetailView ? 'block' : 'hidden') : 'block'}`}>
              {isMobileView && showDetailView && (
                <button 
                  onClick={handleBackToList}
                  className="flex items-center gap-2 p-4 text-gray-300 hover:text-white transition-colors"
                >
                  <FaChevronLeft />
                  Back to list
                </button>
              )}
              
              <div className="p-6 h-full flex flex-col">
                {selectedTalent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold">{selectedTalent.name}</h2>
                          <span className={`text-xs px-2 py-1 rounded-full ${selectedTalent.available ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                            {selectedTalent.available ? 'Available for work' : 'Currently unavailable'}
                          </span>
                        </div>
                        <p className="text-xl text-gray-300 mb-2">{selectedTalent.role}</p>
                        <div className="flex items-center gap-4 text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-sm" />
                            <span>{selectedTalent.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaUserTie className="text-sm" />
                            <span>{selectedTalent.experience} experience</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
                          {selectedTalent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                          <FaUserTie />
                          About
                        </h3>
                        <p className="text-gray-300 mb-6">{selectedTalent.bio}</p>

                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                          <FaGraduationCap />
                          Education
                        </h3>
                        <p className="text-gray-300 mb-6">{selectedTalent.education}</p>

                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                          <FaCode />
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedTalent.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm flex items-center gap-1">
                              {skillIcons[skill] || skill}
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
                            <FaGlobe />
                            Contact
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://${selectedTalent.portfolio}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600/30 hover:bg-blue-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-blue-600/30"
                            >
                              <FaGlobe className="text-2xl text-blue-300" />
                              <span className="text-sm text-gray-200">Portfolio</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`mailto:${selectedTalent.email}`}
                              className="bg-red-600/30 hover:bg-red-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-red-600/30"
                            >
                              <FaEnvelope className="text-2xl text-red-300" />
                              <span className="text-sm text-gray-200">Email</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`tel:${selectedTalent.phone}`}
                              className="bg-green-600/30 hover:bg-green-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-green-600/30"
                            >
                              <FaPhone className="text-2xl text-green-300" />
                              <span className="text-sm text-gray-200">Phone</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://linkedin.com/in/${selectedTalent.linkedin.split('/in/')[1]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-400/30 hover:bg-blue-400/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-blue-400/30"
                            >
                              <FaLinkedin className="text-2xl text-blue-200" />
                              <span className="text-sm text-gray-200">LinkedIn</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://github.com/${selectedTalent.github.split('github.com/')[1]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-600/30 hover:bg-gray-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-gray-600/30"
                            >
                              <FaGithub className="text-2xl text-gray-200" />
                              <span className="text-sm text-gray-200">GitHub</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://t.me/${selectedTalent.telegram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-500/30 hover:bg-blue-500/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-blue-500/30"
                            >
                              <FaTelegram className="text-2xl text-blue-200" />
                              <span className="text-sm text-gray-200">Telegram</span>
                            </motion.a>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                            <FaUserTie />
                            Quick Info
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <FaEnvelope className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedTalent.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaPhone className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedTalent.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaTelegram className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedTalent.telegram}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaGlobe className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedTalent.portfolio}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Select a talent to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}