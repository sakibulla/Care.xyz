"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function UsersTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(null);

  const updateRole = async (userId, newRole) => {
    const result = await Swal.fire({
      title: "Change User Role?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
    });

    if (!result.isConfirmed) return;

    setLoading(userId);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, role: newRole } : u
        ));
        Swal.fire("Success", "Role updated successfully", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(null);
    }
  };

  if (users.length === 0) {
    return <p className="text-gray-500 text-center py-8">No users found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>NID</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Provider</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="font-semibold">{user.name}</td>
              <td>{user.email}</td>
              <td className="text-sm">{user.nid || "N/A"}</td>
              <td className="text-sm">{user.contact || "N/A"}</td>
              <td>
                <span className={`badge ${
                  user.role === "admin" ? "badge-secondary" : "badge-primary"
                }`}>
                  {user.role}
                </span>
              </td>
              <td>
                <span className="badge badge-outline">
                  {user.provider || "credentials"}
                </span>
              </td>
              <td className="text-sm">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </td>
              <td>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-sm btn-ghost">
                    Actions
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {user.role === "user" && (
                      <li>
                        <button 
                          onClick={() => updateRole(user._id, "admin")}
                          disabled={loading === user._id}
                        >
                          Make Admin
                        </button>
                      </li>
                    )}
                    {user.role === "admin" && (
                      <li>
                        <button 
                          onClick={() => updateRole(user._id, "user")}
                          disabled={loading === user._id}
                        >
                          Make User
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
