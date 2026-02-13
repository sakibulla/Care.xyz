import { requireAdmin } from "@/lib/adminAuth";
import { dbConnect, collections } from "@/lib/dbConnect";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  await requireAdmin();

  const usersCollection = await dbConnect(collections.USERS);
  const users = await usersCollection.find().sort({ createdAt: -1 }).toArray();

  const mappedUsers = users.map(u => ({
    ...u,
    _id: u._id.toString(),
  }));

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === "admin").length,
    users: users.filter(u => u.role === "user").length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">User Management</h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-primary text-white shadow-lg">
          <div className="card-body">
            <p className="text-sm opacity-90">Total Users</p>
            <h2 className="text-3xl font-bold">{stats.total}</h2>
          </div>
        </div>
        <div className="card bg-secondary text-white shadow-lg">
          <div className="card-body">
            <p className="text-sm opacity-90">Admins</p>
            <h2 className="text-3xl font-bold">{stats.admins}</h2>
          </div>
        </div>
        <div className="card bg-accent text-white shadow-lg">
          <div className="card-body">
            <p className="text-sm opacity-90">Regular Users</p>
            <h2 className="text-3xl font-bold">{stats.users}</h2>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <UsersTable users={mappedUsers} />
        </div>
      </div>
    </div>
  );
}
