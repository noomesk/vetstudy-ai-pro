// Mock user database - en producción usarías una base de datos real
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123', // En producción esto estaría hasheado
    name: 'Usuario de Prueba',
    createdAt: new Date().toISOString(),
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.text();
    let email, password;
    
    try {
      const data = JSON.parse(body);
      email = data.email;
      password = data.password;
    } catch (error) {
      return Response.json(
        { error: 'JSON inválido' },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return Response.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return Response.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token simple - en producción usarías JWT real
    const token = btoa(JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      name: user.name 
    }));

    // Remover contraseña del response
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      user: userWithoutPassword,
      token,
      message: 'Login exitoso'
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
