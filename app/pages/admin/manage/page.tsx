import { requireAdminSession } from "@/lib/protect";
import AdminManageAssignments from "@/app/components/admin/AdminManageAssignments";

export default async function ManageAssignmentsPage() {
  // Add server-side protection
  await requireAdminSession();

  return <AdminManageAssignments />;
}
