import {
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function UserTable({ users, isLoading, onEdit, onDelete }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse border-spacing-0">
        <thead>
          <tr className="bg-slate-800 border-b border-gray-700">
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              ID
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              Người dùng
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              Vai trò
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              Email
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">
              Điện thoại
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em] text-right">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-900/50">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-20 text-center">
                <ArrowPathIcon className="w-10 h-10 animate-spin mx-auto text-indigo-500 mb-2" />
                <span className="text-gray-500 animate-pulse text-sm">
                  Đang tải dữ liệu...
                </span>
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user: any) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-800/80 transition-colors group"
              >
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                  #{user.user_id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700 group-hover:border-indigo-500 transition-colors">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircleIcon className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors">
                      {user.full_name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {user.role === "ADMIN" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase">
                      <ShieldCheckIcon className="w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
                      User
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                    <EnvelopeIcon className="w-4 h-4 text-gray-600" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                    <PhoneIcon className="w-4 h-4 text-gray-600" />
                    {user.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-blue-400 cursor-pointer hover:bg-blue-400/10 rounded-lg transition-all"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(user.user_id)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 cursor-pointer rounded-lg transition-all"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-12 text-center text-gray-600 italic"
              >
                Không có dữ liệu người dùng.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
