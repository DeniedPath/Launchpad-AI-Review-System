import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// POST /api/admin-users/password: Change password for any admin (if email provided and session is admin), or self-service if not
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { email, password } = await req.json();
  if (!password) {
    return NextResponse.json({ error: 'New password required.' }, { status: 400 });
  }
  // Determine which user's password to change
  const targetEmail = email ?? session.user.email;
  const user = await prisma.adminUser.findUnique({ where: { email: targetEmail } });
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.update({ where: { email: targetEmail }, data: { passwordHash } });
  return NextResponse.json({ success: true });
}
