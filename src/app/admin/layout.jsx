import Link from "next/link";
import { FaHome, FaCalendarCheck, FaDollarSign, FaUsers, FaCog } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const navItems = [
    { href: "/admin", icon: <FaHome />, label: "Dashboard" },
    { href: "/admin/bookings", icon: <FaCalendarCheck />, label: "Bookings" },
    { href: "/admin/payments", icon: <FaDollarSign />, label: "Payments" },
    { href: "/admin/users", icon: <FaUsers />, label: "Users" },
    { href: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-4 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <ul className="menu space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/" className="btn btn-outline btn-sm w-full">
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t z-50">
        <ul className="menu menu-horizontal justify-around">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex flex-col items-center">
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
