import { requireAdminSession } from "@/lib/protect";
import AdminUserManagerClient from "@/app/components/admin/AdminUserManagerClient";

export default async function AdminUserManagerPage() {
  await requireAdminSession();
  return <AdminUserManagerClient />;
}
