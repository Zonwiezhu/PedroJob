'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, JSX } from 'react';
import { FaLinkedin, FaGithub, FaTelegram, FaEnvelope, FaPhone, FaGlobe, FaUserTie, FaGraduationCap, FaCode, FaMapMarkerAlt, FaChevronLeft, FaFilter, FaSearch } from "react-icons/fa";
import { SiGmail, SiTypescript, SiJavascript, SiPython, SiSolidity, SiReact, SiNextdotjs, SiNodedotjs, SiEthereum, SiBitcoin } from "react-icons/si";
import { RiCloseFill } from "react-icons/ri";

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
  hourlyRate?: string;
  timezone?: string;
  blockchainExperience?: string[];
  projectType?: string[];
  workPreference?: string[];
}

const talents: Talent[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Full-Stack Developer',
    skills: ['TypeScript', 'React', 'Node.js', 'Next.js', 'Solidity', 'Ethereum', 'Web3.js'],
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
    available: true,
    hourlyRate: '$80-$120',
    timezone: 'PST (UTC-8)',
    blockchainExperience: ['DeFi', 'NFT', 'DAOs'],
    projectType: ['Full-time', 'Part-time', 'Contract'],
    workPreference: ['Remote', 'Hybrid']
  },
  {
    id: '2',
    name: 'Maria Chen',
    role: 'Blockchain Engineer',
    skills: ['Solidity', 'Rust', 'Go', 'Ethereum', 'Cosmos', 'Substrate', 'ZKPs'],
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
    available: true,
    hourlyRate: '$100-$150',
    timezone: 'CET (UTC+1)',
    blockchainExperience: ['DeFi', 'Infrastructure', 'Security'],
    projectType: ['Full-time', 'Contract'],
    workPreference: ['Remote']
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'UI/UX', 'CSS', 'Figma', 'Three.js', 'WebGL'],
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
    available: false,
    hourlyRate: '$60-$90',
    timezone: 'KST (UTC+9)',
    blockchainExperience: ['NFT', 'Gaming'],
    projectType: ['Part-time', 'Contract'],
    workPreference: ['Remote', 'On-site']
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Ansible', 'Blockchain Nodes'],
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
    available: true,
    hourlyRate: '$90-$130',
    timezone: 'EST (UTC-5)',
    blockchainExperience: ['Infrastructure', 'Node Operations'],
    projectType: ['Full-time', 'Contract'],
    workPreference: ['Remote']
  },
  {
    id: '5',
    name: 'James Rodriguez',
    role: 'Smart Contract Auditor',
    skills: ['Solidity', 'Security', 'EVM', 'DeFi', 'Cryptography', 'Vyper', 'Formal Verification'],
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
    available: true,
    hourlyRate: '$120-$180',
    timezone: 'SGT (UTC+8)',
    blockchainExperience: ['DeFi', 'Security', 'Protocols'],
    projectType: ['Contract', 'Part-time'],
    workPreference: ['Remote']
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
  'Ethereum': <SiEthereum className="text-purple-400" />,
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
  'Cryptography': <span className="text-indigo-500 font-bold">Crypto</span>,
  'Web3.js': <span className="text-blue-400 font-bold">Web3</span>,
  'Substrate': <span className="text-pink-500 font-bold">Sub</span>,
  'ZKPs': <span className="text-indigo-400 font-bold">ZKP</span>,
  'Three.js': <span className="text-green-400 font-bold">3JS</span>,
  'WebGL': <span className="text-orange-400 font-bold">WebGL</span>,
  'Discord': <span className="text-indigo-400 font-bold">Discord</span>,
  'Telegram': <span className="text-blue-400 font-bold">TG</span>,
  'Social Media': <span className="text-pink-400 font-bold">SM</span>,
  'Content Creation': <span className="text-purple-400 font-bold">Content</span>,
  'Moderation': <span className="text-green-400 font-bold">Mod</span>,
  'Growth Hacking': <span className="text-red-400 font-bold">Growth</span>,
  'Tokenomics': <span className="text-yellow-400 font-bold">Token</span>,
  'Governance': <span className="text-blue-400 font-bold">Gov</span>,
  'Cryptoeconomics': <span className="text-indigo-400 font-bold">CryptoEcon</span>,
  'Whitepapers': <span className="text-gray-400 font-bold">WP</span>,
  'Technical Writing': <span className="text-blue-300 font-bold">TW</span>,
  'Vyper': <span className="text-blue-500 font-bold">Vyper</span>,
  'Formal Verification': <span className="text-purple-500 font-bold">FV</span>,
  'Bitcoin': <SiBitcoin className="text-orange-500" />,
  'Blockchain Nodes': <span className="text-green-500 font-bold">Nodes</span>
};

const blockchainExperienceOptions = ['DeFi', 'NFT', 'DAOs', 'Gaming', 'Infrastructure', 'Security', 'Protocols', 'SocialFi', 'Node Operations'];
const projectTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Consulting'];
const workPreferenceOptions = ['Remote', 'Hybrid', 'On-site'];
const hourlyRateRanges = ['<$50', '$50-$80', '$80-$120', '$120-$150', '$150+'];
const experienceRanges = ['<1 year', '1-3 years', '3-5 years', '5-7 years', '7+ years'];

export default function TalentPool() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    role: 'All',
    skills: [] as string[],
    availability: 'All',
    blockchainExperience: [] as string[],
    projectType: [] as string[],
    workPreference: [] as string[],
    hourlyRate: [] as string[],
    experience: [] as string[],
    timezone: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (!selectedTalent && talents.length > 0) {
      setSelectedTalent(talents[0]);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const roles = ['All', ...Array.from(new Set(talents.map(talent => talent.role)))];
  const allSkills = Array.from(new Set(talents.flatMap(talent => talent.skills)));
  const timezones = Array.from(new Set(talents.map(talent => talent.timezone).filter(Boolean)));

  const filteredTalents = talents.filter(talent => {
    if (searchQuery && !talent.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filters.role !== 'All' && talent.role !== filters.role) return false;
    
    if (filters.skills.length > 0 && !filters.skills.some(skill => talent.skills.includes(skill))) return false;
    
    if (filters.availability !== 'All') {
      if (filters.availability === 'Available' && !talent.available) return false;
      if (filters.availability === 'Unavailable' && talent.available) return false;
    }
    
    if (filters.blockchainExperience.length > 0 && talent.blockchainExperience && 
        !filters.blockchainExperience.some(exp => talent.blockchainExperience?.includes(exp))) {
      return false;
    }
    
    if (filters.projectType.length > 0 && talent.projectType && 
        !filters.projectType.some(type => talent.projectType?.includes(type))) {
      return false;
    }
    
    if (filters.workPreference.length > 0 && talent.workPreference && 
        !filters.workPreference.some(pref => talent.workPreference?.includes(pref))) {
      return false;
    }
    
    if (filters.hourlyRate.length > 0 && talent.hourlyRate) {
      const rateMatch = filters.hourlyRate.some(range => {
        if (range === '<$50') return parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) < 50;
        if (range === '$50-$80') return parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) >= 50 && 
                                    parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) <= 80;
        if (range === '$80-$120') return parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) >= 80 && 
                                      parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) <= 120;
        if (range === '$120-$150') return parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) >= 120 && 
                                       parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) <= 150;
        if (range === '$150+') return parseFloat(talent.hourlyRate!.replace('$', '').split('-')[0]) > 150;
        return false;
      });
      if (!rateMatch) return false;
    }
    
    if (filters.experience.length > 0 && talent.experience) {
      const expMatch = filters.experience.some(range => {
        const years = parseInt(talent.experience);
        if (range === '<1 year') return years < 1;
        if (range === '1-3 years') return years >= 1 && years <= 3;
        if (range === '3-5 years') return years >= 3 && years <= 5;
        if (range === '5-7 years') return years >= 5 && years <= 7;
        if (range === '7+ years') return years > 7;
        return false;
      });
      if (!expMatch) return false;
    }
    
    if (filters.timezone && talent.timezone !== filters.timezone) return false;
    
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

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleArrayFilter = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType as keyof typeof filters] as string[];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [filterType]: currentArray.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentArray, value]
        };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      role: 'All',
      skills: [],
      availability: 'All',
      blockchainExperience: [],
      projectType: [],
      workPreference: [],
      hourlyRate: [],
      experience: [],
      timezone: ''
    });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).reduce((count, filter) => {
    if (Array.isArray(filter)) {
      return count + filter.length;
    } else {
      return count + (filter !== 'All' && filter !== '' ? 1 : 0);
    }
  }, 0);

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
              TALENTED
            </h1>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </section>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`lg:w-1/3 space-y-4 ${isMobileView && showDetailView ? 'hidden' : 'block'}`}>
              <div className="bg-black p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="ml-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center gap-1"
                  >
                    <FaFilter />
                    {activeFilterCount > 0 && (
                      <span className="text-xs bg-purple-600 rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>

                {showFilters && (
                  <div className="mt-4 space-y-4">
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

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.slice(0, 10).map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleArrayFilter('skills', skill)}
                            className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 transition-colors ${
                              filters.skills.includes(skill)
                                ? 'bg-white text-black'
                                : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                            }`}
                          >
                            {skillIcons[skill] || skill}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Blockchain Experience</label>
                      <div className="flex flex-wrap gap-2">
                        {blockchainExperienceOptions.map(exp => (
                          <button
                            key={exp}
                            type="button"
                            onClick={() => toggleArrayFilter('blockchainExperience', exp)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              filters.blockchainExperience.includes(exp)
                                ? 'bg-purple-600'
                                : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Project Type</label>
                      <div className="flex flex-wrap gap-2">
                        {projectTypeOptions.map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleArrayFilter('projectType', type)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              filters.projectType.includes(type)
                                ? 'bg-blue-600'
                                : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Work Preference</label>
                      <div className="flex flex-wrap gap-2">
                        {workPreferenceOptions.map(pref => (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => toggleArrayFilter('workPreference', pref)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              filters.workPreference.includes(pref)
                                ? 'bg-green-600'
                                : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Hourly Rate</label>
                        <div className="flex flex-wrap gap-2">
                          {hourlyRateRanges.map(rate => (
                            <button
                              key={rate}
                              type="button"
                              onClick={() => toggleArrayFilter('hourlyRate', rate)}
                              className={`px-2 py-1 text-xs rounded-full ${
                                filters.hourlyRate.includes(rate)
                                  ? 'bg-yellow-600'
                                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                              }`}
                            >
                              {rate}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Experience</label>
                        <div className="flex flex-wrap gap-2">
                          {experienceRanges.map(exp => (
                            <button
                              key={exp}
                              type="button"
                              onClick={() => toggleArrayFilter('experience', exp)}
                              className={`px-2 py-1 text-xs rounded-full ${
                                filters.experience.includes(exp)
                                  ? 'bg-red-600'
                                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                              }`}
                            >
                              {exp}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Timezone</label>
                      <select 
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                        value={filters.timezone}
                        onChange={(e) => handleFilterChange('timezone', e.target.value)}
                      >
                        <option value="">All Timezones</option>
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        onClick={clearFilters}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        <RiCloseFill />
                        Clear all filters
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
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
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold truncate">{talent.name}</h3>
                            {talent.hourlyRate && (
                              <span className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-0.5 rounded-full">
                                {talent.hourlyRate}
                              </span>
                            )}
                          </div>
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
                        <div className="flex flex-col items-end gap-1 text-xs ml-2">
                          <span className={`px-2 py-1 rounded-full ${talent.available ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                            {talent.available ? 'Available' : 'Unavailable'}
                          </span>
                          {talent.timezone && (
                            <span className="text-xs text-gray-400">{talent.timezone}</span>
                          )}
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
                          {selectedTalent.hourlyRate && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-300">${selectedTalent.hourlyRate}</span>
                              <span className="text-xs">/hour</span>
                            </div>
                          )}
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

                        {selectedTalent.blockchainExperience && (
                          <>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                              Blockchain Experience
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {selectedTalent.blockchainExperience.map(exp => (
                                <span key={exp} className="px-3 py-1 bg-purple-900/30 rounded-full text-sm">
                                  {exp}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
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
                            {selectedTalent.timezone && (
                              <div className="flex items-center gap-3">
                                <span className="h-5 w-5 text-gray-400">🌐</span>
                                <span className="text-gray-300">{selectedTalent.timezone}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {(selectedTalent.projectType || selectedTalent.workPreference) && (
                          <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                              Work Preferences
                            </h3>
                            <div className="space-y-3">
                              {selectedTalent.projectType && (
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-sm text-gray-400">Project Type:</span>
                                  {selectedTalent.projectType.map(type => (
                                    <span key={type} className="px-2 py-1 bg-blue-900/30 rounded-full text-sm">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {selectedTalent.workPreference && (
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-sm text-gray-400">Work Preference:</span>
                                  {selectedTalent.workPreference.map(pref => (
                                    <span key={pref} className="px-2 py-1 bg-green-900/30 rounded-full text-sm">
                                      {pref}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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