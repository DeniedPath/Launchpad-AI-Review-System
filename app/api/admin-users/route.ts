// API route for admin user creation
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '../../../lib/protect';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// POST /api/admin-users: Create a new admin user
export async function POST(req: NextRequest) {
  await requireAdminSession();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
  }
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Admin user already exists.' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.adminUser.create({ data: { email, passwordHash } });
  return NextResponse.json({ id: user.id, email: user.email });
}

// GET /api/admin-users: List all admin users
export async function GET() {
  await requireAdminSession();
  const users = await prisma.adminUser.findMany({ select: { email: true, id: true } });
  return NextResponse.json({ users });
}

// DELETE /api/admin-users: Delete an admin user by email
export async function DELETE(req: NextRequest) {
  await requireAdminSession();
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email required.' }, { status: 400 });
  }
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  await prisma.adminUser.delete({ where: { email } });
  return NextResponse.json({ success: true });
}
