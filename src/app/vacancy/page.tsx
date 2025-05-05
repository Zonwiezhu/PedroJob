'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { FaLinkedin, FaDiscord, FaTelegram, FaEnvelope, FaPhone, FaGlobe, FaClock, FaChevronLeft, FaMailchimp, FaMailBulk, FaFilter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyLink: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
  type: string;
  contactEmail: string;
  contactPhone: string;
  discord: string;
  telegram: string;
  postedDate: string;
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Collab Manager',
    company: 'Pedro',
    location: 'Brussels, BELGIUM',
    applyLink: 'None',
    description: 'Were looking for a dynamic Collab Manager to help build and manage exciting collaborations within the Pedro community! If you love connecting with people, fostering partnerships, and growing a thriving community, this could be the perfect fit for you. You do not have any ervaring dont worry just learn it!',
    requirements: [
      '0+ year of experience with Collab',
      '1+ year on Injective and active',
      'English and preference for another language communication skills on point',
      'Love to become a Pedro fam',
      'U can spend some time for pedro'
    ],
    responsibilities: [
      'Develop and oversee collaboration to expand the pedro network',
      'Engage with communites in english to strengthen our presence',
      'Work closely with team members to identify new partnership opportunitues',
      'Be active and passionate memeber of pedro'  
    ],
    salary: 'Free - 1.000.000 $PEDRO',
    type: 'Part-time',
    contactEmail: 'injectivepedro@gmail.com',
    contactPhone: 'none',
    discord: 'letsrule.inj',
    telegram: '@pedrotheraccoon',
    postedDate: '2025-05-15'
  },
  {
    id: '2',
    title: 'Community Manager',
    company: 'Injective',
    location: 'Remote',
    applyLink: 'None',
    description: 'Looking for a Community Manager to engage with our growing community and help moderate discussions.',
    requirements: [
      '1+ year of community management experience',
      'Strong knowledge of blockchain and DeFi',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Moderate community channels',
      'Organize community events',
      'Create engaging content'
    ],
    salary: '$60,000 - $80,000',
    type: 'Full-time',
    contactEmail: 'hr@injective.com',
    contactPhone: 'none',
    discord: 'injective.cm',
    telegram: '@injectiveofficial',
    postedDate: '2025-05-10'
  },
  {
    id: '3',
    title: 'Solidity Developer',
    company: 'Ethereum Foundation',
    location: 'Remote',
    applyLink: 'None',
    description: 'Seeking an experienced Solidity developer to work on cutting-edge smart contracts.',
    requirements: [
      '3+ years Solidity experience',
      'Deep understanding of EVM',
      'Experience with security audits'
    ],
    responsibilities: [
      'Develop and optimize smart contracts',
      'Conduct code reviews',
      'Implement security best practices'
    ],
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    contactEmail: 'devs@ethereum.org',
    contactPhone: 'none',
    discord: 'eth.dev',
    telegram: '@ethereumdevs',
    postedDate: '2025-05-05'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'Pedro',
    location: 'Brussels, BELGIUM',
    applyLink: 'None',
    description: 'Looking for a marketing specialist to help grow our brand presence.',
    requirements: [
      '2+ years marketing experience',
      'Social media expertise',
      'Content creation skills'
    ],
    responsibilities: [
      'Develop marketing campaigns',
      'Manage social media accounts',
      'Create engaging content'
    ],
    salary: 'Free - 800,000 $PEDRO',
    type: 'Part-time',
    contactEmail: 'injectivepedro@gmail.com',
    contactPhone: 'none',
    discord: 'letsrule.inj',
    telegram: '@pedrotheraccoon',
    postedDate: '2025-04-28'
  },
  {
    id: '5',
    title: 'UX Designer',
    company: 'Injective',
    location: 'Remote',
    applyLink: 'None',
    description: 'Seeking a talented UX designer to improve our product interfaces.',
    requirements: [
      '3+ years UX design experience',
      'Portfolio of previous work',
      'Figma/Sketch proficiency'
    ],
    responsibilities: [
      'Design user flows',
      'Create wireframes and prototypes',
      'Conduct user research'
    ],
    salary: '$90,000 - $110,000',
    type: 'Contract',
    contactEmail: 'design@injective.com',
    contactPhone: 'none',
    discord: 'injective.ux',
    telegram: '@injectiveofficial',
    postedDate: '2025-04-20'
  },
];

function getDaysSincePosted(postedDate: string): string {
  const posted = new Date(postedDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - posted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays/7)} week${Math.floor(diffDays/7) === 1 ? '' : 's'} ago`;
  return `${Math.floor(diffDays/30)} month${Math.floor(diffDays/30) === 1 ? '' : 's'} ago`;
}

export default function Vacancies() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    company: 'All',
    datePosted: 'All'
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

  const jobTypes = ['All', ...Array.from(new Set(jobs.map(job => job.type)))];
  const companies = ['All', ...Array.from(new Set(jobs.map(job => job.company)))];
  const dateOptions = ['All', 'Last 24 hours', 'Last week', 'Last month'];

  const filteredJobs = jobs.filter(job => {
    if (filters.type !== 'All' && job.type !== filters.type) return false;
    
    if (filters.company !== 'All' && job.company !== filters.company) return false;
    
    if (filters.datePosted !== 'All') {
      const posted = new Date(job.postedDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - posted.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (filters.datePosted === 'Last 24 hours' && diffDays > 1) return false;
      if (filters.datePosted === 'Last week' && diffDays > 7) return false;
      if (filters.datePosted === 'Last month' && diffDays > 30) return false;
    }
    
    return true;
  });

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
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
        <title>Careers | Job Openings</title>
        <meta name="description" content="Find your next opportunity with us" />
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
              JOB VACANCY
            </h1>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </section>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`lg:w-1/3 space-y-4 ${isMobileView && showDetailView ? 'hidden' : 'block'}`}>
              <div className="bg-black p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-300">
                  <FaFilter />
                  <span className="font-medium">Filter Vacancies</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Job Type</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Company</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.company}
                      onChange={(e) => handleFilterChange('company', e.target.value)}
                    >
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date Posted</label>
                    <select 
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={filters.datePosted}
                      onChange={(e) => handleFilterChange('datePosted', e.target.value)}
                    >
                      {dateOptions.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[900px] overflow-y-auto pr-2">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      whileHover={{ scale: isMobileView ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl cursor-pointer transition-all backdrop-blur-sm bg-black border ${selectedJob?.id === job.id ? 'border-gray-500' : 'border-gray-800 hover:border-gray-600'}`}
                      onClick={() => handleJobSelect(job)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">{job.title}</h3>
                          <p className="text-sm text-gray-300 truncate">{job.company} • {job.location}</p>
                          <div className="flex gap-1 mt-2 flex-wrap">
                            <span className="text-xs px-2 py-1 bg-black-900/30 text-blue-300 rounded-full">
                              {job.type}
                            </span>
                            <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full">
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 ml-2">
                          <FaClock className="text-gray-500" />
                          <span>{getDaysSincePosted(job.postedDate)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400 backdrop-blur-sm bg-gray-900/80 rounded-xl border border-gray-800">
                    No jobs match your filters
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
                {selectedJob ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                          <span className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded-full">
                            {selectedJob.type}
                          </span>
                        </div>
                        <p className="text-xl text-gray-300 mb-2">{selectedJob.company}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {selectedJob.location}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <FaClock className="text-gray-500" />
                            <span>Posted {getDaysSincePosted(selectedJob.postedDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <p className="text-lg font-medium text-center">{selectedJob.salary}</p>
                        <p className="text-sm text-gray-400 text-center">per year</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Job Description
                        </h3>
                        <p className="text-gray-300 mb-10">{selectedJob.description}</p>

                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Requirements
                        </h3>
                        <ul className="space-y-2 text-gray-300 mb-10">
                          {selectedJob.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {req}
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-lg font-semibold mb-3 mt-6 flex items-center gap-2 text-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Responsibilities
                        </h3>
                        <ul className="space-y-2 text-gray-300">
                          {selectedJob.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            Contact & Apply
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={selectedJob.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600/30 hover:bg-blue-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-blue-600/30"
                            >
                              <FaGlobe className="text-2xl text-blue-300" />
                              <span className="text-sm text-gray-200">Apply Online</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`mailto:${selectedJob.contactEmail}`}
                              className="bg-red-600/30 hover:bg-red-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-red-600/30"
                            >
                              <FaMailBulk className="text-2xl text-red-300" />
                              <span className="text-sm text-gray-200">Email</span>
                            </motion.a>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`tel:${selectedJob.contactPhone}`}
                              className="bg-green-600/30 hover:bg-green-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors border border-green-600/30"
                            >
                              <FaPhone className="text-2xl text-green-300" />
                              <span className="text-sm text-gray-200">Call</span>
                            </motion.a>
                            
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(selectedJob.contactEmail, 'linkedin')}
                              className="bg-blue-400/30 hover:bg-blue-400/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer border border-blue-400/30"
                            >
                              <FaLinkedin className="text-2xl text-blue-200" />
                              <span className="text-sm text-gray-200">
                                {copied === 'linkedin' ? 'Copied!' : 'LinkedIn'}
                              </span>
                            </motion.div>
                            
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(selectedJob.discord, 'discord')}
                              className="bg-indigo-600/30 hover:bg-indigo-600/50 p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer border border-indigo-600/30"
                            >
                              <FaDiscord className="text-2xl text-indigo-200" />
                              <span className="text-sm text-gray-200">
                                {copied === 'discord' ? 'Copied!' : 'Discord'}
                              </span>
                            </motion.div>
                            
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://t.me/${selectedJob.telegram.replace('@', '')}`}
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Quick Info
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-300">{selectedJob.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaDiscord className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedJob.discord}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaTelegram className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">{selectedJob.telegram}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Select a job to view details</p>
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