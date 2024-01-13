import { NextResponse } from "next/server"

// This should be consulted in some database.
const user = {
  id: 'ejr3h4hgfd678gfd',
  name: 'Admin',
  email: 'admin@roche.store',
  password: '123'
}

export async function POST(request: Request) {
  const req = await request.json()

  const isValidCredentials = user.email === req.email
    && user.password === req.password

  if (!isValidCredentials) {
    return new NextResponse(JSON.stringify({error: 'Invalid cedentials'}), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  const data = {
    id: user.id,
    name: user.name,
    email: req.email
  }
 
  return Response.json({ data })
}
