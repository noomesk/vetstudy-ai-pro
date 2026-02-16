import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SubjectManager from '@/components/ui/subject-manager';
import { Settings, BookOpen, Users, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subjects' | 'general' | 'account'>('subjects');

  const tabs = [
    { id: 'subjects', label: 'Materias', icon: BookOpen },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Cuenta', icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Configuración
              </h1>
              <p className="text-muted-foreground">Personaliza tu experiencia de estudio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'subjects' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Gestión de Materias
              </h2>
              <p className="text-muted-foreground">
                Personaliza tus materias de estudio. Puedes agregar, editar o eliminar materias según tus necesidades.
                Los cambios se guardarán localmente en tu navegador.
              </p>
            </div>
            <SubjectManager />
          </div>
        )}

        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de la Aplicación</CardTitle>
                <CardDescription>
                  Configura cómo funciona la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Modo Oscuro</h4>
                    <p className="text-sm text-muted-foreground">
                      Cambia entre tema claro y oscuro
                    </p>
                  </div>
                  <Button variant="outline">
                    Activar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificaciones</h4>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas de estudio y recordatorios
                    </p>
                  </div>
                  <Button variant="outline">
                    Configurar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Idioma</h4>
                    <p className="text-sm text-muted-foreground">
                      Selecciona el idioma de la interfaz
                    </p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Español</option>
                    <option>English</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas y Datos</CardTitle>
                <CardDescription>
                  Administra tu información de estudio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Exportar Datos</h4>
                    <p className="text-sm text-muted-foreground">
                      Descarga tu progreso y estadísticas
                    </p>
                  </div>
                  <Button variant="outline">
                    Exportar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Limpiar Cache</h4>
                    <p className="text-sm text-muted-foreground">
                      Borra datos temporales de la aplicación
                    </p>
                  </div>
                  <Button variant="outline">
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Perfil</CardTitle>
                <CardDescription>
                  Gestiona tu información personal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Estudiante"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    defaultValue="estudiante@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Institución Educativa
                  </label>
                  <input
                    type="text"
                    placeholder="Universidad, escuela, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>
                  Protege tu cuenta y datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cambiar Contraseña</h4>
                    <p className="text-sm text-muted-foreground">
                      Actualiza tu contraseña de acceso
                    </p>
                  </div>
                  <Button variant="outline">
                    Cambiar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Autenticación de Dos Factores</h4>
                    <p className="text-sm text-muted-foreground">
                      Añade una capa extra de seguridad
                    </p>
                  </div>
                  <Button variant="outline">
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compartir App</CardTitle>
                <CardDescription>
                  Invita a tus amigos a usar VetStudy AI Pro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Comparte con tus compañeros
                    </h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                    Cada usuario puede personalizar sus propias materias. La configuración se guarda localmente en el navegador de cada persona.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Copiar Enlace
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Compartir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
