import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Award, BookOpen, Target, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Perfil de Usuario
              </h1>
              <p className="text-muted-foreground">Gestiona tu cuenta y preferencias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-500" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JD</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Juan Demo</h3>
                  <p className="text-muted-foreground">juan.demo@vetstudy.com</p>
                  <p className="text-sm text-muted-foreground">Estudiante de Veterinaria</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nombre completo</label>
                  <input 
                    type="text" 
                    value="Juan Demo" 
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input 
                    type="email" 
                    value="juan.demo@vetstudy.com" 
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Universidad</label>
                  <input 
                    type="text" 
                    value="Universidad Nacional" 
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Semestre</label>
                  <input 
                    type="text" 
                    value="6° Semestre" 
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Button>
                <Button variant="outline">
                  Cambiar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Estudiante Dedicado</p>
                  <p className="text-xs text-muted-foreground">7 días seguidos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Experto en Flashcards</p>
                  <p className="text-xs text-muted-foreground">156 tarjetas dominadas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Maestro del Quiz</p>
                  <p className="text-xs text-muted-foreground">85% promedio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Notificaciones</span>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tema</span>
                <Button variant="outline" size="sm">Cambiar</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Idioma</span>
                <Button variant="outline" size="sm">Español</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-purple-50 dark:bg-purple-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Miembro desde
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3 meses</div>
            <p className="text-xs text-muted-foreground">Nov 2024</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total estudio
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156h</div>
            <p className="text-xs text-muted-foreground">Tiempo total</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Flashcards
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">203</div>
            <p className="text-xs text-muted-foreground">Creadas</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quizzes
            </CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">45</div>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
