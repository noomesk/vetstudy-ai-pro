// Mock user database - en producción usarías una base de datos real
let users = [
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
    let name, email, password;
    
    try {
      const data = JSON.parse(body);
      name = data.name;
      email = data.email;
      password = data.password;
    } catch (error) {
      return Response.json(
        { error: 'JSON inválido' },
        { status: 400 }
      );
    }

    if (!name || !email || !password) {
      return Response.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return Response.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = btoa(JSON.stringify({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name 
    }));

    const { password: _, ...userWithoutPassword } = newUser;

    return Response.json({
      user: userWithoutPassword,
      token,
      message: 'Registro exitoso'
    });

  } catch (error) {
    console.error('Register error:', error);
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
