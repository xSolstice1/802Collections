/**
 * Resume Service
 * 
 * Handles PDF/DOCX export and file parsing for the resume builder.
 */

import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeData } from '../types/resume';

/**
 * Export resume as PDF using html2pdf
 */
export const exportToPDF = async (element: HTMLElement, filename: string): Promise<boolean> => {
  try {
    const opt = {
      margin: 0.5,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as ('avoid-all' | 'css' | 'legacy')[] },
    };

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
};

/**
 * Export resume as DOCX using docx library
 */
export const exportToDOCX = async (resume: ResumeData, filename: string): Promise<boolean> => {
  try {
    const docChildren: any[] = [];

    // Name and Title
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: resume.contact.fullName, bold: true, size: 28 })],
        spacing: { after: 50 },
      })
    );

    if (resume.contact.title) {
      docChildren.push(
        new Paragraph({
          children: [new TextRun({ text: resume.contact.title, size: 24 })],
          spacing: { after: 100 },
        })
      );
    }

    // Contact Info
    const contactParts: TextRun[] = [];
    if (resume.contact.email) contactParts.push(new TextRun({ text: resume.contact.email }));
    if (resume.contact.phone) {
      if (contactParts.length > 0) contactParts.push(new TextRun({ text: ' | ' }));
      contactParts.push(new TextRun({ text: resume.contact.phone }));
    }
    if (resume.contact.location) {
      if (contactParts.length > 0) contactParts.push(new TextRun({ text: ' | ' }));
      contactParts.push(new TextRun({ text: resume.contact.location }));
    }
    if (resume.contact.website) {
      if (contactParts.length > 0) contactParts.push(new TextRun({ text: ' | ' }));
      contactParts.push(new TextRun({ text: resume.contact.website }));
    }
    if (resume.contact.linkedin) {
      if (contactParts.length > 0) contactParts.push(new TextRun({ text: ' | ' }));
      contactParts.push(new TextRun({ text: resume.contact.linkedin }));
    }

    if (contactParts.length > 0) {
      docChildren.push(
        new Paragraph({
          children: contactParts,
          spacing: { after: 200 },
        })
      );
    }

    // Summary
    if (resume.contact.summary) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Professional Summary', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );
      docChildren.push(
        new Paragraph({
          children: [new TextRun({ text: resume.contact.summary, size: 22 })],
          spacing: { after: 200 },
        })
      );
    }

    // Experience
    if (resume.experience.length > 0) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Experience', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );

      for (const exp of resume.experience) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.position, bold: true, size: 22 }),
              new TextRun({ text: ` | ${exp.company}`, size: 22 }),
            ],
          })
        );
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${exp.location} | ${exp.startDate}${exp.current ? ' - Present' : ` - ${exp.endDate}`}`, size: 20, italics: true }),
            ],
            spacing: { after: 100 },
          })
        );

        if (exp.description) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: exp.description, size: 22 })],
              spacing: { after: 100 },
            })
          );
        }

        if (exp.highlights && exp.highlights.length > 0) {
          for (const highlight of exp.highlights) {
            docChildren.push(
              new Paragraph({
                children: [new TextRun({ text: `• ${highlight}`, size: 22 })],
                indent: { left: 720 },
              })
            );
          }
          docChildren.push(
            new Paragraph({ children: [], spacing: { after: 100 } })
          );
        }
      }
    }

    // Education
    if (resume.education.length > 0) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Education', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );

      for (const edu of resume.education) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: edu.degree, bold: true, size: 22 }),
              new TextRun({ text: ` in ${edu.field}`, size: 22 }),
            ],
          })
        );
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.institution}, ${edu.location} | ${edu.startDate}${edu.endDate ? ` - ${edu.endDate}` : ''}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`, size: 20, italics: true }),
            ],
            spacing: { after: 100 },
          })
        );
      }
    }

    // Skills
    if (resume.skills.length > 0) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Skills', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );

      for (const skillCat of resume.skills) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${skillCat.name}: `, bold: true, size: 22 }),
              new TextRun({ text: skillCat.skills.join(', '), size: 22 }),
            ],
            spacing: { after: 50 },
          })
        );
      }
    }

    // Certifications
    if (resume.certifications.length > 0) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Certifications', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );

      for (const cert of resume.certifications) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: cert.name, bold: true, size: 22 }),
              new TextRun({ text: ` | ${cert.issuer}`, size: 22 }),
            ],
          })
        );
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Issued: ${cert.date}${cert.expiryDate ? ` | Expires: ${cert.expiryDate}` : ''}${cert.credentialId ? ` | ID: ${cert.credentialId}` : ''}`, size: 20, italics: true }),
            ],
            spacing: { after: 100 },
          })
        );
      }
    }

    // Awards
    if (resume.awards.length > 0) {
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: 'Awards', bold: true, size: 24 })],
          spacing: { before: 200, after: 100 },
        })
      );

      for (const award of resume.awards) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: award.title, bold: true, size: 22 }),
              new TextRun({ text: ` | ${award.issuer}`, size: 22 }),
            ],
          })
        );
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: award.date, size: 20, italics: true }),
            ],
            spacing: { after: 50 },
          })
        );
        if (award.description) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: award.description, size: 22 })],
              spacing: { after: 100 },
            })
          );
        }
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docChildren,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${filename}.docx`);
    return true;
  } catch (error) {
    console.error('DOCX export failed:', error);
    return false;
  }
};

/**
 * Parse a resume from JSON file
 */
export const parseResumeFromJSON = async (file: File): Promise<ResumeData | null> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    return validateResumeData(data);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

/**
 * Basic validation and normalization of resume data
 */
const validateResumeData = (data: any): ResumeData | null => {
  if (!data || typeof data !== 'object') return null;

  // Ensure all required fields exist with defaults
  return {
    contact: {
      fullName: data.contact?.fullName || '',
      title: data.contact?.title || '',
      email: data.contact?.email || '',
      phone: data.contact?.phone || '',
      location: data.contact?.location || '',
      website: data.contact?.website || '',
      linkedin: data.contact?.linkedin || '',
      github: data.contact?.github || '',
      summary: data.contact?.summary || '',
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    awards: Array.isArray(data.awards) ? data.awards : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
  };
};

/**
 * Generate a filename from resume data
 */
export const generateFilename = (resume: ResumeData): string => {
  const name = resume.contact.fullName || 'resume';
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};