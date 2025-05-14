'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { JSX, useState } from 'react';
import { FaUserTie, FaGraduationCap, FaCode, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTelegram, FaEnvelope, FaPhone, FaGlobe, FaFilePdf } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiPython, SiSolidity, SiReact, SiNextdotjs, SiNodedotjs } from "react-icons/si";

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
  'Cryptography': <span className="text-indigo-500 font-bold">Crypto</span>,
  'Blockchain Developer': <span className="text-blue-400 font-bold">Blockchain</span>,
  'Community Manager': <span className="text-green-400 font-bold">Community</span>,
  'UX Designer': <span className="text-pink-400 font-bold">UX</span>,
  'NFT Artist': <span className="text-purple-400 font-bold">NFT</span>,
  'Marketing': <span className="text-yellow-400 font-bold">Marketing</span>,
  'Game Developer': <span className="text-red-400 font-bold">GameDev</span>,
  'Blockchain Security': <span className="text-red-500 font-bold">Sec</span>,
};

const allSkills = Object.keys(skillIcons);

const educationLevels = [
  'Kindergarten',
  'Primary School',
  'Middle School',
  'High School',
  'Vocational School',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Other'
];

const countries = [
  'United States', 'China', 'India', 'Japan', 'Germany', 'United Kingdom', 'France',
  'Brazil', 'Italy', 'Canada', 'South Korea', 'Russia', 'Australia', 'Spain',
  'Mexico', 'Indonesia', 'Netherlands', 'Saudi Arabia', 'Turkey', 'Switzerland'
];

const languages = [
  'English', 'Mandarin', 'Hindi', 'Spanish', 'French', 'Arabic', 'Bengali',
  'Russian', 'Portuguese', 'Indonesian', 'Urdu', 'German', 'Japanese',
  'Swahili', 'Marathi', 'Telugu', 'Turkish', 'Tamil', 'Vietnamese', 'Korean'
];

const injectiveRoles = ['Ninja', 'Warrior', 'Knight', 'Ronin', 'Leader'];

const experienceYears = Array.from({ length: 10 }, (_, i) => (i + 1).toString()).concat(['10+']);

export default function TalentForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    skills: [] as string[],
    experience: '',
    education: '',
    location: '',
    bio: '',
    telegram: '',
    linkedin: '',
    github: '',
    email: '',
    phone: '',
    portfolio: '',
    cv: '',
    profilePicture: '',
    injectiveRole: '',
    languages: [] as string[],
    available: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setFormData(prev => ({
        ...prev,
        cv: e.target.files![0].name
      }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s !== skill)
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill]
        };
      }
    });
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => {
      if (prev.languages.includes(language)) {
        return {
          ...prev,
          languages: prev.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, language]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      alert('CV is required');
      return;
    }
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      skills: [],
      experience: '',
      education: '',
      location: '',
      bio: '',
      telegram: '',
      linkedin: '',
      github: '',
      email: '',
      phone: '',
      portfolio: '',
      cv: '',
      profilePicture: '',
      injectiveRole: '',
      languages: [],
      available: true
    });
    setCvFile(null);
    setSubmitted(false);
  };

  return (
    <>
      <Head>
        <title>Join Talent Pool | Submit Your Profile</title>
        <meta name="description" content="Submit your profile to join our talent pool" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-hidden font-mono">
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

        <section className="flex items-center justify-center py-12 text-center relative overflow-hidden px-2">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 max-w-4xl relative z-10"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-5 bg-clip-text text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              JOIN TALENT POOL
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
              className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </motion.div>
        </section>

        <div className="relative z-10 container mx-auto px-4 pb-16">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 p-8 rounded-xl border border-white/10 text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Profile Submitted Successfully!</h2>
              <p className="text-gray-300 mb-6">Thank you for joining our talent pool. We'll review your information and get back to you soon.</p>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Submit Another Profile
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 p-6 rounded-xl border border-white/10 max-w-4xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200">
                      <FaUserTie />
                      Personal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Role/Title*</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Years of Experience*</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select years</option>
                        {experienceYears.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Highest Education*</label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select education level</option>
                        {educationLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Location*</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Profile Picture URL</label>
                      <input
                        type="url"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Your Role in Injective</label>
                      <select
                        name="injectiveRole"
                        value={formData.injectiveRole}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select your role</option>
                        {injectiveRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200">
                      <FaGlobe />
                      Contact Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                      <div className="flex items-center">
                        <span className="bg-gray-700 border border-r-0 border-gray-600 rounded-l-md px-3 py-3">linkedin.com/in/</span>
                        <input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-r-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                      <div className="flex items-center">
                        <span className="bg-gray-700 border border-r-0 border-gray-600 rounded-l-md px-3 py-3">github.com/</span>
                        <input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-r-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Telegram</label>
                      <div className="flex items-center">
                        <span className="bg-gray-700 border border-r-0 border-gray-600 rounded-l-md px-3 py-3">@</span>
                        <input
                          type="text"
                          name="telegram"
                          value={formData.telegram}
                          onChange={handleChange}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-r-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Portfolio Website</label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">CV (PDF only)*</label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer">
                          <span className="flex items-center gap-2">
                            <FaFilePdf className="text-red-500" />
                            {cvFile ? cvFile.name : 'Choose file...'}
                          </span>
                          <input
                            type="file"
                            name="cv"
                            onChange={handleFileChange}
                            accept=".pdf"
                            required
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Languages Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                    <FaGlobe />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map(language => (
                      <motion.button
                        key={language}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLanguageToggle(language)}
                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors ${
                          formData.languages.includes(language)
                            ? 'bg-purple-600/50 border border-purple-500'
                            : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                        }`}
                      >
                        {language}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Skills Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                    <FaCode />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map(skill => (
                      <motion.button
                        key={skill}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors ${
                          formData.skills.includes(skill)
                            ? 'bg-purple-600/50 border border-purple-500'
                            : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                        }`}
                      >
                        {skillIcons[skill] || skill}
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Bio Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                    <FaUserTie />
                    Bio/Description*
                  </h3>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  />
                </div>
                
                {/* Availability */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                    className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="available" className="ml-2 text-gray-300">
                    Currently available for work
                  </label>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Submit Profile
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}