export const calculateCompleteness = (resume) => {
  if (!resume) return 0;

  let totalPoints = 0;
  let earnedPoints = 0;

  // Personal Info (30 points)
  totalPoints += 30;
  const p = resume.personalInfo || {};
  if (p.name?.trim()) earnedPoints += 10;
  if (p.title?.trim()) earnedPoints += 5;
  if (p.email?.trim()) earnedPoints += 5;
  if (p.phone?.trim()) earnedPoints += 5;
  if (p.location?.trim()) earnedPoints += 5;

  // Summary (15 points)
  totalPoints += 15;
  if (resume.summary?.trim() && resume.summary.length > 20) earnedPoints += 15;

  // Education (20 points)
  totalPoints += 20;
  if (Array.isArray(resume.education) && resume.education.length > 0) {
    const validEdu = resume.education.some(e => e.degree?.trim() && e.institution?.trim());
    if (validEdu) earnedPoints += 20;
  }

  // Skills (15 points)
  totalPoints += 15;
  if (Array.isArray(resume.skills) && resume.skills.length >= 3) {
    earnedPoints += 15;
  } else if (Array.isArray(resume.skills) && resume.skills.length > 0) {
    earnedPoints += 8;
  }

  // Projects or Experience (20 points total)
  totalPoints += 20;
  const hasProjects = Array.isArray(resume.projects) && resume.projects.length > 0;
  const hasExperience = Array.isArray(resume.experience) && resume.experience.length > 0;

  if (hasProjects && hasExperience) {
    earnedPoints += 20;
  } else if (hasProjects || hasExperience) {
    earnedPoints += 15;
  }

  return Math.min(100, Math.round((earnedPoints / totalPoints) * 100));
};
