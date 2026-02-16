import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import { useSubjects, Subject } from '@/hooks/use-subjects';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  EyeOff, 
  RotateCcw,
  BookOpen,
  Settings
} from 'lucide-react';

interface SubjectManagerProps {
  onClose?: () => void;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({ onClose }) => {
  const {
    subjects,
    activeSubjects,
    addSubject,
    removeSubject,
    updateSubject,
    toggleSubject,
    subjectNameExists,
    resetToDefaults,
    getAvailableColors,
    getAvailableIcons,
  } = useSubjects();

  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'blue',
    icon: '📚',
    description: '',
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      color: 'blue',
      icon: '📚',
      description: '',
      isActive: true,
    });
    setIsAddingSubject(false);
    setEditingSubject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Por favor ingresa un nombre para la materia');
      return;
    }

    if (subjectNameExists(formData.name, editingSubject?.id)) {
      alert('Ya existe una materia con ese nombre');
      return;
    }

    if (editingSubject) {
      updateSubject(editingSubject.id, formData);
    } else {
      addSubject(formData);
    }

    resetForm();
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      color: subject.color,
      icon: subject.icon,
      description: subject.description || '',
      isActive: subject.isActive,
    });
    setIsAddingSubject(true);
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    };
    return colors[color] || colors.blue;
  };

  const getGradientClass = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600',
      yellow: 'from-yellow-500 to-yellow-600',
      indigo: 'from-indigo-500 to-indigo-600',
      gray: 'from-gray-500 to-gray-600',
      cyan: 'from-cyan-500 to-cyan-600',
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Gestión de Materias</h3>
          <p className="text-sm text-muted-foreground">
            Agrega o personaliza tus materias de estudio
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer
          </Button>
          <Button
            onClick={() => setIsAddingSubject(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="w-4 h-4" />
            Agregar Materia
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {isAddingSubject && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSubject ? 'Editar Materia' : 'Nueva Materia'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nombre de la materia *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Matemáticas, Historia, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {getAvailableColors().map(color => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Icono
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {getAvailableIcons().slice(0, 24).map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`p-2 text-lg rounded border-2 transition-all ${
                        formData.icon === icon
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descripción (opcional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Breve descripción de la materia..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm text-foreground">
                  Materia activa
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  {editingSubject ? 'Actualizar' : 'Agregar'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Subjects List */}
      <div className="space-y-3">
        {subjects.map((subject) => (
          <Card key={subject.id} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradientClass(subject.color)} flex items-center justify-center text-white text-xl font-bold`}>
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{subject.name}</h4>
                      <Badge className={getColorClass(subject.color)}>
                        {subject.isActive ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </div>
                    {subject.description && (
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSubject(subject.id)}
                    className="p-2"
                  >
                    {subject.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(subject)}
                    className="p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(subject.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {subjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay materias configuradas
            </h3>
            <p className="text-muted-foreground mb-4">
              Agrega tu primera materia para comenzar
            </p>
            <Button
              onClick={() => setIsAddingSubject(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Materia
            </Button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Total: {subjects.length} materias</span>
          <span>Activas: {activeSubjects.length} materias</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectManager;
