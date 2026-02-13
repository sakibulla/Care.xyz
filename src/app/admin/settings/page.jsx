import { requireAdmin } from "@/lib/adminAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      {/* Admin Profile */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Admin Profile</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {session.user.name}</p>
            <p><span className="font-semibold">Email:</span> {session.user.email}</p>
            <p><span className="font-semibold">Role:</span> <span className="badge badge-secondary">Admin</span></p>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">System Information</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Platform:</span> Care.xyz</p>
            <p><span className="font-semibold">Version:</span> 1.0.0</p>
            <p><span className="font-semibold">Environment:</span> {process.env.NODE_ENV}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="alert alert-info">
              <div>
                <h3 className="font-bold">Make User Admin</h3>
                <p className="text-sm">Use the command line to promote users:</p>
                <code className="block mt-2 bg-base-200 p-2 rounded text-xs">
                  node scripts/makeAdmin.js user@example.com
                </code>
              </div>
            </div>
            <div className="alert alert-warning">
              <div>
                <h3 className="font-bold">Database Backup</h3>
                <p className="text-sm">Regular backups are recommended</p>
                <p className="text-xs mt-2">Use MongoDB Atlas automated backups or mongodump</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
