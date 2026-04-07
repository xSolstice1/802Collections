import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react'
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Layers,
  Download,
  Upload,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle
} from 'lucide-react'
import type {
  ResumeData,
  ContactInfo,
  Experience,
  Education,
  Certification,
  Award as AwardType,
  SkillCategory,
  TemplateId,
  ExportFormat,
  FontFamily
} from './types/resume'
import {
  exportToPDF,
  exportToDOCX,
  parseResumeFromJSON,
  generateFilename
} from './services/resumeService'
import {
  createEmptyResume,
  generateId,
  AVAILABLE_TEMPLATES,
  AVAILABLE_FONTS,
  AVAILABLE_COLOR_ACCENTS
} from '../../apps/resume-builder/types/resume.ts'

type ActiveSection =
  | 'contact'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'awards'
  | 'skills'
  | null

/**
 * Resume Builder App
 *
 * A comprehensive resume builder with ATS-friendly templates,
 * multiple export options, and re-import capability.
 */
const ResumeBuilderApp = () => {
  // State
  const [resume, setResume] = useState<ResumeData>(createEmptyResume)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern')
  const [selectedFont, setSelectedFont] = useState<FontFamily>('sans-serif')
  const [selectedAccent, setSelectedAccent] = useState<string>('green')
  const [activeSection, setActiveSection] = useState<ActiveSection>('contact')
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resume-data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setResume(parsed)
      } catch (e) {
        console.error('Failed to load saved resume:', e)
      }
    }
    const savedTemplate = localStorage.getItem('resume-template')
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateId)
    }
    const savedFont = localStorage.getItem('resume-font')
    if (savedFont) {
      setSelectedFont(savedFont as FontFamily)
    }
    const savedAccent = localStorage.getItem('resume-accent')
    if (savedAccent) {
      setSelectedAccent(savedAccent)
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(resume))
  }, [resume])

  useEffect(() => {
    localStorage.setItem('resume-template', selectedTemplate)
  }, [selectedTemplate])

  useEffect(() => {
    localStorage.setItem('resume-font', selectedFont)
  }, [selectedFont])

  useEffect(() => {
    localStorage.setItem('resume-accent', selectedAccent)
  }, [selectedAccent])

  // Contact info handlers
  const updateContact = useCallback(
    (field: keyof ContactInfo, value: string) => {
      setResume((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }))
    },
    []
  )

  // Experience handlers
  const addExperience = useCallback(() => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: ['']
    }
    setResume((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }))
  }, [])

  const updateExperience = useCallback(
    (
      id: string,
      field: keyof Experience,
      value: Experience[keyof Experience]
    ) => {
      setResume((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        )
      }))
    },
    []
  )

  const removeExperience = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id)
    }))
  }, [])

  const addHighlight = useCallback((expId: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId ? { ...exp, highlights: [...exp.highlights, ''] } : exp
      )
    }))
  }, [])

  const updateHighlight = useCallback(
    (expId: string, index: number, value: string) => {
      setResume((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === expId
            ? {
                ...exp,
                highlights: exp.highlights.map((h, i) =>
                  i === index ? value : h
                )
              }
            : exp
        )
      }))
    },
    []
  )

  const removeHighlight = useCallback((expId: string, index: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, highlights: exp.highlights.filter((_, i) => i !== index) }
          : exp
      )
    }))
  }, [])

  // Education handlers
  const addEducation = useCallback(() => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: ['']
    }
    setResume((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }))
  }, [])

  const updateEducation = useCallback(
    (id: string, field: keyof Education, value: Education[keyof Education]) => {
      setResume((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        )
      }))
    },
    []
  )

  const removeEducation = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id)
    }))
  }, [])

  // Certification handlers
  const addCertification = useCallback(() => {
    const newCert: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    }
    setResume((prev) => ({
      ...prev,
      certifications: [newCert, ...prev.certifications]
    }))
  }, [])

  const updateCertification = useCallback(
    (
      id: string,
      field: keyof Certification,
      value: Certification[keyof Certification]
    ) => {
      setResume((prev) => ({
        ...prev,
        certifications: prev.certifications.map((cert) =>
          cert.id === id ? { ...cert, [field]: value } : cert
        )
      }))
    },
    []
  )

  const removeCertification = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id)
    }))
  }, [])

  // Award handlers
  const addAward = useCallback(() => {
    const newAward: AwardType = {
      id: generateId(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    }
    setResume((prev) => ({
      ...prev,
      awards: [newAward, ...prev.awards]
    }))
  }, [])

  const updateAward = useCallback(
    (id: string, field: keyof AwardType, value: AwardType[keyof AwardType]) => {
      setResume((prev) => ({
        ...prev,
        awards: prev.awards.map((award) =>
          award.id === id ? { ...award, [field]: value } : award
        )
      }))
    },
    []
  )

  const removeAward = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      awards: prev.awards.filter((award) => award.id !== id)
    }))
  }, [])

  // Skills handlers
  const addSkillCategory = useCallback(() => {
    const newCat: SkillCategory = {
      id: generateId(),
      name: '',
      skills: ['']
    }
    setResume((prev) => ({
      ...prev,
      skills: [newCat, ...prev.skills]
    }))
  }, [])

  const updateSkillCategory = useCallback(
    (
      id: string,
      field: keyof SkillCategory,
      value: SkillCategory[keyof SkillCategory]
    ) => {
      setResume((prev) => ({
        ...prev,
        skills: prev.skills.map((cat) =>
          cat.id === id ? { ...cat, [field]: value } : cat
        )
      }))
    },
    []
  )

  const removeSkillCategory = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((cat) => cat.id !== id)
    }))
  }, [])

  const addSkill = useCallback((catId: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === catId ? { ...cat, skills: [...cat.skills, ''] } : cat
      )
    }))
  }, [])

  const updateSkill = useCallback(
    (catId: string, index: number, value: string) => {
      setResume((prev) => ({
        ...prev,
        skills: prev.skills.map((cat) =>
          cat.id === catId
            ? {
                ...cat,
                skills: cat.skills.map((s, i) => (i === index ? value : s))
              }
            : cat
        )
      }))
    },
    []
  )

  const removeSkill = useCallback((catId: string, index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === catId
          ? { ...cat, skills: cat.skills.filter((_, i) => i !== index) }
          : cat
      )
    }))
  }, [])

  // File import handlers
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)
    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file exported from this app')
      return
    }
    const result = await parseResumeFromJSON(file)
    if (result) {
      setResume(result)
      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 3000)
    } else {
      setError('Failed to parse resume file. Please ensure it is valid.')
    }
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [handleFileSelect]
  )

  // Export handlers
  const handleExport = useCallback(async () => {
    setIsExporting(true)
    setError(null)
    const filename = generateFilename(resume)

    try {
      if (exportFormat === 'pdf') {
        if (previewRef.current) {
          const success = await exportToPDF(previewRef.current, filename)
          if (!success) throw new Error('PDF export failed')
        }
      } else {
        const success = await exportToDOCX(resume, filename)
        if (!success) throw new Error('DOCX export failed')
      }
      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }, [resume, exportFormat])

  // Clear all data
  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear all resume data?')) {
      setResume(createEmptyResume())
    }
  }, [])

  // Section icons
  const sectionIcons: Record<Exclude<ActiveSection, null>, ReactNode> = {
    contact: <User className='w-4 h-4' />,
    experience: <Briefcase className='w-4 h-4' />,
    education: <GraduationCap className='w-4 h-4' />,
    certifications: <Award className='w-4 h-4' />,
    awards: <Star className='w-4 h-4' />,
    skills: <Layers className='w-4 h-4' />
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-lg bg-802/10 flex items-center justify-center'>
          <FileText className='w-5 h-5 text-802' />
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-semibold text-dark-100'>
            Resume Builder
          </h2>
          <p className='text-sm text-dark-500'>
            Create ATS-friendly resumes with multiple templates
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className='card flex flex-wrap items-center gap-3'>
        {/* Template Selector */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-dark-400'>Template:</span>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
            className='input w-auto text-sm'
          >
            {AVAILABLE_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Selector */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-dark-400'>Font:</span>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value as FontFamily)}
            className='input w-auto text-sm'
          >
            {AVAILABLE_FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Accent Selector */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-dark-400'>Accent:</span>
          <div className='flex gap-1'>
            {AVAILABLE_COLOR_ACCENTS.map((accent) => (
              <button
                key={accent.id}
                onClick={() => setSelectedAccent(accent.id)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedAccent === accent.id
                    ? 'border-dark-900 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: accent.color }}
                title={accent.name}
              />
            ))}
          </div>
        </div>

        {/* Export Format */}
        <div className='flex items-center gap-2 ml-auto'>
          <span className='text-sm text-dark-400'>Export:</span>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            className='input w-auto text-sm'
          >
            <option value='pdf'>PDF</option>
            <option value='docx'>DOCX</option>
          </select>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className='btn-primary flex items-center gap-2'
          >
            {isExporting ? (
              <>
                <span className='w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin' />
                Exporting...
              </>
            ) : (
              <>
                <Download className='w-4 h-4' />
                Export
              </>
            )}
          </button>
        </div>

        {/* Import & Clear */}
        <div
          className={`card cursor-pointer transition-all duration-200 ${
            dragActive ? 'border-802 bg-802/5' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type='file'
            accept='.json'
            onChange={handleInputChange}
            className='hidden'
          />
          <div className='flex items-center gap-2 text-sm text-dark-400'>
            <Upload className='w-4 h-4' />
            <span>Import JSON</span>
          </div>
        </div>

        <button
          onClick={handleClear}
          className='btn-ghost flex items-center gap-2'
        >
          <Trash2 className='w-4 h-4' />
          Clear
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className='p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3'>
          <AlertCircle className='w-5 h-5 text-red-400' />
          <span className='text-red-400 text-sm'>{error}</span>
        </div>
      )}

      {exportSuccess && (
        <div className='p-4 rounded-lg bg-802/10 border border-802/30 flex items-center gap-3'>
          <Check className='w-5 h-5 text-802' />
          <span className='text-802 text-sm'>Export successful!</span>
        </div>
      )}

      {/* Main Content - Editor and Preview side by side */}
      <div className='grid lg:grid-cols-2 gap-6'>
        {/* Editor Panel */}
        <div className='space-y-4'>
          {/* Contact Section */}
          <div className='card'>
            <button
              onClick={() =>
                setActiveSection(activeSection === 'contact' ? null : 'contact')
              }
              className='flex items-center justify-between w-full mb-4'
            >
              <div className='flex items-center gap-2'>
                {sectionIcons.contact}
                <span className='text-dark-200 font-medium'>
                  Contact Information
                </span>
              </div>
              {activeSection === 'contact' ? (
                <ChevronUp className='w-4 h-4 text-dark-500' />
              ) : (
                <ChevronDown className='w-4 h-4 text-dark-500' />
              )}
            </button>

            {activeSection === 'contact' && (
              <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      value={resume.contact.fullName}
                      onChange={(e) =>
                        updateContact('fullName', e.target.value)
                      }
                      className='input'
                      placeholder='John Doe'
                    />
                  </div>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      Title
                    </label>
                    <input
                      type='text'
                      value={resume.contact.title}
                      onChange={(e) => updateContact('title', e.target.value)}
                      className='input'
                      placeholder='Software Engineer'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      Email
                    </label>
                    <input
                      type='email'
                      value={resume.contact.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      className='input'
                      placeholder='john@example.com'
                    />
                  </div>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      value={resume.contact.phone}
                      onChange={(e) => updateContact('phone', e.target.value)}
                      className='input'
                      placeholder='+1 234 567 8900'
                    />
                  </div>
                </div>
                <div>
                  <label className='text-sm text-dark-400 mb-1 block'>
                    Location
                  </label>
                  <input
                    type='text'
                    value={resume.contact.location}
                    onChange={(e) => updateContact('location', e.target.value)}
                    className='input'
                    placeholder='San Francisco, CA'
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      Website
                    </label>
                    <input
                      type='url'
                      value={resume.contact.website}
                      onChange={(e) => updateContact('website', e.target.value)}
                      className='input'
                      placeholder='https://johndoe.com'
                    />
                  </div>
                  <div>
                    <label className='text-sm text-dark-400 mb-1 block'>
                      LinkedIn
                    </label>
                    <input
                      type='url'
                      value={resume.contact.linkedin}
                      onChange={(e) =>
                        updateContact('linkedin', e.target.value)
                      }
                      className='input'
                      placeholder='linkedin.com/in/johndoe'
                    />
                  </div>
                </div>
                <div>
                  <label className='text-sm text-dark-400 mb-1 block'>
                    GitHub
                  </label>
                  <input
                    type='url'
                    value={resume.contact.github}
                    onChange={(e) => updateContact('github', e.target.value)}
                    className='input'
                    placeholder='github.com/johndoe'
                  />
                </div>
                <div>
                  <label className='text-sm text-dark-400 mb-1 block'>
                    Professional Summary
                  </label>
                  <textarea
                    value={resume.contact.summary}
                    onChange={(e) => updateContact('summary', e.target.value)}
                    className='input min-h-[100px]'
                    placeholder='Write a brief summary of your professional background...'
                  />
                </div>
              </div>
            )}
          </div>

          {/* Experience Section */}
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {sectionIcons.experience}
                <span className='text-dark-200 font-medium'>
                  Work Experience
                </span>
              </div>
              <button
                onClick={addExperience}
                className='btn-secondary text-sm flex items-center gap-1'
              >
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>

            <div className='space-y-4'>
              {resume.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className='p-4 rounded-lg bg-dark-700/50 border border-dark-600'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm text-dark-400'>
                      Position #{resume.experience.length - idx}
                    </span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                  <div className='space-y-3'>
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, 'position', e.target.value)
                        }
                        className='input'
                        placeholder='Job Title'
                      />
                      <input
                        type='text'
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, 'company', e.target.value)
                        }
                        className='input'
                        placeholder='Company Name'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(exp.id, 'location', e.target.value)
                        }
                        className='input'
                        placeholder='Location'
                      />
                      <div className='flex items-center gap-2'>
                        <input
                          type='text'
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              'startDate',
                              e.target.value
                            )
                          }
                          className='input flex-1'
                          placeholder='Start Date'
                        />
                        <span className='text-dark-500'>-</span>
                        <input
                          type='text'
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, 'endDate', e.target.value)
                          }
                          className='input flex-1'
                          placeholder='End Date'
                          disabled={exp.current}
                        />
                      </div>
                    </div>
                    <label className='flex items-center gap-2 text-sm text-dark-400'>
                      <input
                        type='checkbox'
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, 'current', e.target.checked)
                        }
                        className='accent-802'
                      />
                      I currently work here
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, 'description', e.target.value)
                      }
                      className='input min-h-[60px]'
                      placeholder='Job description...'
                    />
                    <div>
                      <label className='text-sm text-dark-400 mb-2 block'>
                        Highlights
                      </label>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className='flex items-center gap-2 mb-2'
                        >
                          <span className='text-dark-500'>•</span>
                          <input
                            type='text'
                            value={highlight}
                            onChange={(e) =>
                              updateHighlight(exp.id, hIdx, e.target.value)
                            }
                            className='input flex-1'
                            placeholder='Achievement or responsibility'
                          />
                          <button
                            onClick={() => removeHighlight(exp.id, hIdx)}
                            className='text-red-400 hover:text-red-300'
                          >
                            <Trash2 className='w-3.5 h-3.5' />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addHighlight(exp.id)}
                        className='text-sm text-802 hover:text-802/80 flex items-center gap-1'
                      >
                        <Plus className='w-3.5 h-3.5' />
                        Add Highlight
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {resume.experience.length === 0 && (
                <p className='text-dark-500 text-sm text-center py-4'>
                  No experience added yet. Click "Add" to get started.
                </p>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {sectionIcons.education}
                <span className='text-dark-200 font-medium'>Education</span>
              </div>
              <button
                onClick={addEducation}
                className='btn-secondary text-sm flex items-center gap-1'
              >
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>

            <div className='space-y-4'>
              {resume.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className='p-4 rounded-lg bg-dark-700/50 border border-dark-600'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm text-dark-400'>
                      Education #{resume.education.length - idx}
                    </span>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                  <div className='space-y-3'>
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, 'degree', e.target.value)
                        }
                        className='input'
                        placeholder='Degree (e.g., Bachelor of Science)'
                      />
                      <input
                        type='text'
                        value={edu.field}
                        onChange={(e) =>
                          updateEducation(edu.id, 'field', e.target.value)
                        }
                        className='input'
                        placeholder='Field of Study'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, 'institution', e.target.value)
                        }
                        className='input'
                        placeholder='Institution Name'
                      />
                      <input
                        type='text'
                        value={edu.location}
                        onChange={(e) =>
                          updateEducation(edu.id, 'location', e.target.value)
                        }
                        className='input'
                        placeholder='Location'
                      />
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                      <input
                        type='text'
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, 'startDate', e.target.value)
                        }
                        className='input'
                        placeholder='Start Date'
                      />
                      <input
                        type='text'
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, 'endDate', e.target.value)
                        }
                        className='input'
                        placeholder='End Date'
                      />
                      <input
                        type='text'
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(edu.id, 'gpa', e.target.value)
                        }
                        className='input'
                        placeholder='GPA'
                      />
                    </div>
                  </div>
                </div>
              ))}
              {resume.education.length === 0 && (
                <p className='text-dark-500 text-sm text-center py-4'>
                  No education added yet.
                </p>
              )}
            </div>
          </div>

          {/* Certifications Section */}
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {sectionIcons.certifications}
                <span className='text-dark-200 font-medium'>
                  Certifications
                </span>
              </div>
              <button
                onClick={addCertification}
                className='btn-secondary text-sm flex items-center gap-1'
              >
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>

            <div className='space-y-4'>
              {resume.certifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className='p-4 rounded-lg bg-dark-700/50 border border-dark-600'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm text-dark-400'>
                      Certification #{resume.certifications.length - idx}
                    </span>
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={cert.name}
                      onChange={(e) =>
                        updateCertification(cert.id, 'name', e.target.value)
                      }
                      className='input'
                      placeholder='Certification Name'
                    />
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={cert.issuer}
                        onChange={(e) =>
                          updateCertification(cert.id, 'issuer', e.target.value)
                        }
                        className='input'
                        placeholder='Issuing Organization'
                      />
                      <input
                        type='text'
                        value={cert.date}
                        onChange={(e) =>
                          updateCertification(cert.id, 'date', e.target.value)
                        }
                        className='input'
                        placeholder='Issue Date'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={cert.credentialId}
                        onChange={(e) =>
                          updateCertification(
                            cert.id,
                            'credentialId',
                            e.target.value
                          )
                        }
                        className='input'
                        placeholder='Credential ID'
                      />
                      <input
                        type='text'
                        value={cert.expiryDate}
                        onChange={(e) =>
                          updateCertification(
                            cert.id,
                            'expiryDate',
                            e.target.value
                          )
                        }
                        className='input'
                        placeholder='Expiry Date'
                      />
                    </div>
                  </div>
                </div>
              ))}
              {resume.certifications.length === 0 && (
                <p className='text-dark-500 text-sm text-center py-4'>
                  No certifications added yet.
                </p>
              )}
            </div>
          </div>

          {/* Awards Section */}
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {sectionIcons.awards}
                <span className='text-dark-200 font-medium'>Awards</span>
              </div>
              <button
                onClick={addAward}
                className='btn-secondary text-sm flex items-center gap-1'
              >
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>

            <div className='space-y-4'>
              {resume.awards.map((award, idx) => (
                <div
                  key={award.id}
                  className='p-4 rounded-lg bg-dark-700/50 border border-dark-600'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm text-dark-400'>
                      Award #{resume.awards.length - idx}
                    </span>
                    <button
                      onClick={() => removeAward(award.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={award.title}
                      onChange={(e) =>
                        updateAward(award.id, 'title', e.target.value)
                      }
                      className='input'
                      placeholder='Award Title'
                    />
                    <div className='grid grid-cols-2 gap-3'>
                      <input
                        type='text'
                        value={award.issuer}
                        onChange={(e) =>
                          updateAward(award.id, 'issuer', e.target.value)
                        }
                        className='input'
                        placeholder='Issuing Organization'
                      />
                      <input
                        type='text'
                        value={award.date}
                        onChange={(e) =>
                          updateAward(award.id, 'date', e.target.value)
                        }
                        className='input'
                        placeholder='Date'
                      />
                    </div>
                    <textarea
                      value={award.description}
                      onChange={(e) =>
                        updateAward(award.id, 'description', e.target.value)
                      }
                      className='input min-h-[60px]'
                      placeholder='Description (optional)'
                    />
                  </div>
                </div>
              ))}
              {resume.awards.length === 0 && (
                <p className='text-dark-500 text-sm text-center py-4'>
                  No awards added yet.
                </p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {sectionIcons.skills}
                <span className='text-dark-200 font-medium'>Skills</span>
              </div>
              <button
                onClick={addSkillCategory}
                className='btn-secondary text-sm flex items-center gap-1'
              >
                <Plus className='w-3.5 h-3.5' />
                Add Category
              </button>
            </div>

            <div className='space-y-4'>
              {resume.skills.map((cat, idx) => (
                <div
                  key={cat.id}
                  className='p-4 rounded-lg bg-dark-700/50 border border-dark-600'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm text-dark-400'>
                      Category #{resume.skills.length - idx}
                    </span>
                    <button
                      onClick={() => removeSkillCategory(cat.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={cat.name}
                      onChange={(e) =>
                        updateSkillCategory(cat.id, 'name', e.target.value)
                      }
                      className='input'
                      placeholder='Category Name (e.g., Programming Languages)'
                    />
                    <div>
                      <label className='text-sm text-dark-400 mb-2 block'>
                        Skills
                      </label>
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className='flex items-center gap-2 mb-2'
                        >
                          <span className='text-dark-500'>•</span>
                          <input
                            type='text'
                            value={skill}
                            onChange={(e) =>
                              updateSkill(cat.id, sIdx, e.target.value)
                            }
                            className='input flex-1'
                            placeholder='Skill name'
                          />
                          <button
                            onClick={() => removeSkill(cat.id, sIdx)}
                            className='text-red-400 hover:text-red-300'
                          >
                            <Trash2 className='w-3.5 h-3.5' />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addSkill(cat.id)}
                        className='text-sm text-802 hover:text-802/80 flex items-center gap-1'
                      >
                        <Plus className='w-3.5 h-3.5' />
                        Add Skill
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {resume.skills.length === 0 && (
                <p className='text-dark-500 text-sm text-center py-4'>
                  No skills added yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className='card p-0 overflow-hidden sticky top-6'>
          <div className='p-4 border-b border-dark-600 flex items-center justify-between'>
            <span className='text-dark-400 text-sm'>
              Preview -{' '}
              {AVAILABLE_TEMPLATES.find((t) => t.id === selectedTemplate)?.name}{' '}
              Template
            </span>
            <span className='text-dark-500 text-xs'>A4 / Letter</span>
          </div>
          <div className='bg-dark-800 p-4 overflow-auto max-h-[calc(100vh-200px)] flex items-start justify-center'>
            <div
              ref={previewRef}
              className='bg-white text-black shadow-2xl'
              style={{
                width: '8.5in',
                minHeight: '11in',
                padding: '0.75in',
                fontFamily:
                  AVAILABLE_FONTS.find((f) => f.id === selectedFont)
                    ?.cssValue ||
                  "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                transformOrigin: 'top center'
              }}
            >
              <ResumePreview
                resume={resume}
                template={selectedTemplate}
                font={selectedFont}
                accentColor={selectedAccent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Resume Preview Component
 * Renders the resume based on selected template with improved styling
 */
const ResumePreview = ({
  resume,
  template,
  font,
  accentColor
}: {
  resume: ResumeData
  template: TemplateId
  font: FontFamily
  accentColor: string
}) => {
  const { contact, experience, education, certifications, awards, skills } =
    resume

  // Get font CSS value
  const fontCSS =
    AVAILABLE_FONTS.find((f) => f.id === font)?.cssValue ||
    "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

  // Get accent color value
  const accent = AVAILABLE_COLOR_ACCENTS.find((a) => a.id === accentColor)
  const accentHex = accent?.color || '#44D62C'

  // Improved common styles for all templates
  const styles = {
    heading: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1a1a1a',
      borderBottom: `2px solid ${accentHex}`,
      paddingBottom: '6px',
      marginTop: '20px',
      marginBottom: '10px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    subheading: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#2d2d2d'
    },
    text: {
      fontSize: '10.5px',
      color: '#4a4a4a',
      lineHeight: '1.6'
    },
    date: {
      fontSize: '10.5px',
      color: '#7a7a7a',
      fontStyle: 'italic'
    }
  }

  if (template === 'modern') {
    return (
      <div style={{ display: 'flex', gap: '24px', fontFamily: fontCSS }}>
        {/* Main Content */}
        <div style={{ flex: '2.2' }}>
          {/* Header */}
          <div
            style={{
              marginBottom: '20px',
              textAlign: 'center' as const,
              paddingBottom: '16px',
              borderBottom: `2px solid ${accentHex}`
            }}
          >
            <h1
              style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#1a1a1a',
                margin: '0 0 6px 0',
                letterSpacing: '-0.5px'
              }}
            >
              {contact.fullName || 'Your Name'}
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: accentHex,
                margin: '0 0 8px 0',
                fontWeight: '600'
              }}
            >
              {contact.title}
            </p>
            <p
              style={{
                fontSize: '10px',
                color: '#888',
                margin: 0,
                lineHeight: '1.6'
              }}
            >
              {[contact.email, contact.phone, contact.location]
                .filter(Boolean)
                .join(' | ')}
            </p>
            {(contact.linkedin || contact.github || contact.website) && (
              <p
                style={{
                  fontSize: '10px',
                  color: '#888',
                  margin: '4px 0 0 0',
                  lineHeight: '1.6'
                }}
              >
                {[contact.linkedin, contact.github, contact.website]
                  .filter(Boolean)
                  .join(' | ')}
              </p>
            )}
          </div>

          {/* Summary */}
          {contact.summary && (
            <>
              <h2 style={styles.heading}>Professional Summary</h2>
              <p style={{ ...styles.text, textAlign: 'justify' as const }}>
                {contact.summary}
              </p>
            </>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <>
              <h2 style={styles.heading}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      flexWrap: 'wrap' as const
                    }}
                  >
                    <span style={styles.subheading}>{exp.position}</span>
                    <span style={styles.date}>
                      {exp.startDate}
                      {exp.current
                        ? ' – Present'
                        : exp.endDate
                          ? ` – ${exp.endDate}`
                          : ''}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: accentHex,
                      margin: '2px 0 4px 0',
                      fontWeight: '600'
                    }}
                  >
                    {exp.company}
                    {exp.location && ` — ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p style={styles.text}>{exp.description}</p>
                  )}
                  {exp.highlights.filter(Boolean).length > 0 && (
                    <ul style={{ margin: '6px 0', paddingLeft: '18px' }}>
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <li
                          key={i}
                          style={{ ...styles.text, marginBottom: '2px' }}
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Education */}
          {education.length > 0 && (
            <>
              <h2 style={styles.heading}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline'
                    }}
                  >
                    <span style={styles.subheading}>
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </span>
                    <span style={styles.date}>
                      {edu.startDate}
                      {edu.endDate ? ` – ${edu.endDate}` : ''}
                    </span>
                  </div>
                  <p
                    style={{ fontSize: '11px', color: '#555', margin: '2px 0' }}
                  >
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                    {edu.gpa && ` — GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div
          style={{
            flex: '1',
            borderLeft: '1px solid #e0e0e0',
            paddingLeft: '20px'
          }}
        >
          {/* Skills */}
          {skills.length > 0 && (
            <>
              <h2 style={styles.heading}>Skills</h2>
              {skills.map((cat) => (
                <div key={cat.id} style={{ marginBottom: '12px' }}>
                  <p
                    style={{
                      ...styles.subheading,
                      fontSize: '11px',
                      marginBottom: '4px',
                      color: accentHex
                    }}
                  >
                    {cat.name}
                  </p>
                  <p style={styles.text}>
                    {cat.skills.filter(Boolean).join(', ')}
                  </p>
                </div>
              ))}
            </>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <>
              <h2 style={styles.heading}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <p style={styles.subheading}>{cert.name}</p>
                  <p style={{ ...styles.text, fontSize: '10px' }}>
                    {cert.issuer}
                    {cert.date && `, ${cert.date}`}
                  </p>
                </div>
              ))}
            </>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <>
              <h2 style={styles.heading}>Awards</h2>
              {awards.map((award) => (
                <div key={award.id} style={{ marginBottom: '10px' }}>
                  <p style={styles.subheading}>{award.title}</p>
                  <p style={{ ...styles.text, fontSize: '10px' }}>
                    {award.issuer}
                    {award.date && `, ${award.date}`}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )
  }

  // Classic, Minimal, Professional templates (single column)
  return (
    <div style={{ fontFamily: fontCSS, maxWidth: '6.5in', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: `2px solid ${accentHex}`
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#1a1a1a',
            margin: '0 0 6px 0',
            letterSpacing: '-0.5px'
          }}
        >
          {contact.fullName || 'Your Name'}
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: accentHex,
            margin: '0 0 8px 0',
            fontWeight: '600'
          }}
        >
          {contact.title}
        </p>
        <p
          style={{
            fontSize: '10px',
            color: '#888',
            margin: 0,
            lineHeight: '1.6'
          }}
        >
          {[contact.email, contact.phone, contact.location]
            .filter(Boolean)
            .join(' | ')}
        </p>
        {(contact.linkedin || contact.github || contact.website) && (
          <p
            style={{
              fontSize: '10px',
              color: '#888',
              margin: '4px 0 0 0',
              lineHeight: '1.6'
            }}
          >
            {[contact.linkedin, contact.github, contact.website]
              .filter(Boolean)
              .join(' | ')}
          </p>
        )}
      </div>

      {/* Summary */}
      {contact.summary && (
        <>
          <h2 style={styles.heading}>Professional Summary</h2>
          <p style={{ ...styles.text, textAlign: 'justify' as const }}>
            {contact.summary}
          </p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <h2 style={styles.heading}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap' as const
                }}
              >
                <span style={styles.subheading}>{exp.position}</span>
                <span style={styles.date}>
                  {exp.startDate}
                  {exp.current
                    ? ' – Present'
                    : exp.endDate
                      ? ` – ${exp.endDate}`
                      : ''}
                </span>
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: accentHex,
                  margin: '2px 0 4px 0',
                  fontWeight: '600'
                }}
              >
                {exp.company}
                {exp.location && ` — ${exp.location}`}
              </p>
              {exp.description && <p style={styles.text}>{exp.description}</p>}
              {exp.highlights.filter(Boolean).length > 0 && (
                <ul style={{ margin: '6px 0', paddingLeft: '18px' }}>
                  {exp.highlights.filter(Boolean).map((h, i) => (
                    <li key={i} style={{ ...styles.text, marginBottom: '2px' }}>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <h2 style={styles.heading}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}
              >
                <span style={styles.subheading}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </span>
                <span style={styles.date}>
                  {edu.startDate}
                  {edu.endDate ? ` – ${edu.endDate}` : ''}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#555', margin: '2px 0' }}>
                {edu.institution}
                {edu.location && `, ${edu.location}`}
                {edu.gpa && ` — GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <h2 style={styles.heading}>Skills</h2>
          {skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '8px' }}>
              <p
                style={{
                  ...styles.text,
                  fontWeight: '700',
                  color: accentHex,
                  fontSize: '11px'
                }}
              >
                {cat.name}:
              </p>
              <p style={styles.text}>{cat.skills.filter(Boolean).join(', ')}</p>
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <h2 style={styles.heading}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={styles.subheading}>{cert.name}</span>
                <span style={styles.date}>{cert.date}</span>
              </div>
              <p style={styles.text}>{cert.issuer}</p>
            </div>
          ))}
        </>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <>
          <h2 style={styles.heading}>Awards</h2>
          {awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={styles.subheading}>{award.title}</span>
                <span style={styles.date}>{award.date}</span>
              </div>
              <p style={styles.text}>{award.issuer}</p>
              {award.description && (
                <p style={styles.text}>{award.description}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ResumeBuilderApp
