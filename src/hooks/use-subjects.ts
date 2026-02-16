import { useState, useCallback } from 'react';

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

const defaultSubjects: Subject[] = [
  {
    id: 'virology',
    name: 'Virología',
    color: 'blue',
    icon: '🦠',
    description: 'Estudio de virus y enfermedades virales',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 'parasitology',
    name: 'Parasitología',
    color: 'green',
    icon: '🐛',
    description: 'Estudio de parásitos y enfermedades parasitarias',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 'ecology',
    name: 'Fundamentos de Ecología',
    color: 'purple',
    icon: '🌿',
    description: 'Relaciones entre organismos y su ambiente',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 'literature',
    name: 'Literatura',
    color: 'red',
    icon: '📚',
    description: 'Estudio de obras literarias y escritura',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 'cinematography',
    name: 'Cinematografía',
    color: 'pink',
    icon: '🎬',
    description: 'Arte y técnica del cine',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 'english',
    name: 'Inglés',
    color: 'yellow',
    icon: '🗣️',
    description: 'Lengua y cultura inglesa',
    isActive: true,
    createdAt: new Date(),
  },
];

const colorOptions = [
  'blue', 'green', 'orange', 'purple', 'red', 'pink', 'yellow', 'indigo', 'gray', 'cyan'
];

const iconOptions = [
  '📚', '🔬', '🧪', '📖', '🎓', '💡', '🌟', '🎯', '📊', '🔍', '📝', '🌱', '🧬', '⚗️', '🔭', '🌍', '🎨', '🎭', '🎬', '📺', '💻', '📱', '⚡', '🔥', '💧', '🌊', '🌿', '🍃', '🦋', '🐝', '🐾', '🏃', '🚀', '🎪', '🎨', '🖌️', '📐', '🔧', '⚙️', '🔩', '🔨', '⛏️', '🏗️', '🏛️', '🏺', '🗿', '🎭', '🎪', '🎨', '🖼️', '📷', '📸', '🎥', '📽️', '🎞️', '📹', '📼', '💿', '💾', '💽', '🖥️', '💻', '⌨️', '🖱️', '🖨️', '🖱️', '🖱️', '🖱️', '🖱️', '🖱️', '🖱️', '🖱️', '🖱️'
];

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    // Try to load from localStorage first
    const savedSubjects = localStorage.getItem('user-subjects');
    if (savedSubjects) {
      try {
        return JSON.parse(savedSubjects);
      } catch (error) {
        console.error('Error parsing saved subjects:', error);
        return defaultSubjects;
      }
    }
    return defaultSubjects;
  });

  // Save to localStorage whenever subjects change
  const saveSubjects = useCallback((newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    localStorage.setItem('user-subjects', JSON.stringify(newSubjects));
  }, []);

  // Add a new subject
  const addSubject = useCallback((subjectData: Omit<Subject, 'id' | 'createdAt'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: subjectData.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
    };

    const updatedSubjects = [...subjects, newSubject];
    saveSubjects(updatedSubjects);
    return newSubject;
  }, [subjects, saveSubjects]);

  // Remove a subject
  const removeSubject = useCallback((subjectId: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== subjectId);
    saveSubjects(updatedSubjects);
  }, [subjects, saveSubjects]);

  // Update a subject
  const updateSubject = useCallback((subjectId: string, updates: Partial<Subject>) => {
    const updatedSubjects = subjects.map(subject =>
      subject.id === subjectId ? { ...subject, ...updates } : subject
    );
    saveSubjects(updatedSubjects);
  }, [subjects, saveSubjects]);

  // Toggle subject active status
  const toggleSubject = useCallback((subjectId: string) => {
    const updatedSubjects = subjects.map(subject =>
      subject.id === subjectId ? { ...subject, isActive: !subject.isActive } : subject
    );
    saveSubjects(updatedSubjects);
  }, [subjects, saveSubjects]);

  // Get active subjects
  const getActiveSubjects = useCallback(() => {
    return subjects.filter(subject => subject.isActive);
  }, [subjects]);

  // Get subject by ID
  const getSubjectById = useCallback((id: string) => {
    return subjects.find(subject => subject.id === id);
  }, [subjects]);

  // Check if subject name already exists
  const subjectNameExists = useCallback((name: string, excludeId?: string) => {
    return subjects.some(subject => 
      subject.name.toLowerCase() === name.toLowerCase() && 
      subject.id !== excludeId
    );
  }, [subjects]);

  // Reset to default subjects
  const resetToDefaults = useCallback(() => {
    saveSubjects(defaultSubjects);
  }, [saveSubjects]);

  // Get available colors (excluding those already used)
  const getAvailableColors = useCallback(() => {
    const usedColors = subjects.map(s => s.color);
    return colorOptions.filter(color => !usedColors.includes(color));
  }, [subjects]);

  // Get available icons
  const getAvailableIcons = useCallback(() => {
    return iconOptions;
  }, []);

  return {
    subjects,
    activeSubjects: getActiveSubjects(),
    addSubject,
    removeSubject,
    updateSubject,
    toggleSubject,
    getSubjectById,
    subjectNameExists,
    resetToDefaults,
    getAvailableColors,
    getAvailableIcons,
  };
};
