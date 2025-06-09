import { requireAdminSession } from '@/lib/protect';
import AdminEditAssignment from '@/app/components/admin/AdminEditAssignment';

export default async function ProtectedAdminEditPage() {
  await requireAdminSession();
  return <AdminEditAssignment />;
}
