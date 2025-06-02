import { requireAdminSession } from '@/lib/protect';
import AdminCreateAssignment from '@/app/components/admin/AdminCreateAssingment';

export default async function ProtectedAdminCreatePage() {
  await requireAdminSession();
  return <AdminCreateAssignment />;
}