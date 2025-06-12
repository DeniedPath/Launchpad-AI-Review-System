import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// POST /api/admin-users/password: Change password for current admin
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { password } = await req.json();
  if (!password) {
    return NextResponse.json({ error: 'New password required.' }, { status: 400 });
  }
  const user = await prisma.adminUser.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.update({ where: { email: user.email }, data: { passwordHash } });
  return NextResponse.json({ success: true });
}
