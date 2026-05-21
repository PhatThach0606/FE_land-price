import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
           dark:bg-slate-900/300
          border-t border-slate-200 dark:border-slate-800
          pt-20 pb-10 px-6 transition-colors duration-300
        "
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Cột 1 */}
          <div>
            <h3 className="text-blue-950 dark:text-blue-400 font-black text-xl mb-6 tracking-wide">
              PHƯỜNG BẾN THÀNH
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Cơ quan hành chính nhà nước cấp cơ sở, chịu trách nhiệm quản lý
              nhà nước trên địa bàn phường Bến Thành, Quận 1, TP. Hồ Chí Minh.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition"
                aria-label="Youtube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Cột 2 */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500 dark:text-slate-400">
              Liên kết nhanh
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                Dịch vụ công trực tuyến
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                Tra cứu thủ tục hành chính
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                Lịch tiếp công dân
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                Thông báo quy hoạch
              </li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500 dark:text-slate-400">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>92 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>(028) 3829 7453</span>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="break-all">benthanh@demo.com</span>
              </li>
              <li className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>T2 - T6: 07:30 – 17:00</span>
              </li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500 dark:text-slate-400">
              Vị trí địa lý
            </h4>
            <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 dark:opacity-80 dark:hover:opacity-100 border border-slate-200 dark:border-slate-800 transition-all duration-500 h-44">
              <img
                src="https://maisonoffice.vn/wp-content/uploads/2025/08/phuong-ben-thanh-sau-sap-nhap.jpg"
                className="w-full h-full object-cover cursor-pointer"
                alt="Bản đồ Phường Bến Thành"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">
          <p>© 2026 UBND Phường Bến Thành - Quận 1</p>
          <div className="flex gap-8">
            <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
              Chính sách bảo mật
            </span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
              Điều khoản sử dụng
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
