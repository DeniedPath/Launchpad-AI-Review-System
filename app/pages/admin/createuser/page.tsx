import { requireAdminSession } from "@/lib/protect";
import AdminCreateUserForm from "@/app/components/admin/AdminCreateUserForm";

export default async function AdminCreateUserPage() {
  await requireAdminSession();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AdminCreateUserForm />
    </div>
  );
}
