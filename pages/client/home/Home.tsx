"use client";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// animation
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function BenThanhPortal() {
  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans leading-relaxed">
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://cdnphoto.dantri.com.vn/v86rbT2rYOWhf1L0w9omvWnaZjk=/thumb_w/1920/2025/07/06/phuong-ben-thanh-tphcm-bao-quyen-1751782106149.jpg?watermark=true"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          alt="Ben Thanh"
          loading="lazy"
        />
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6">
            PHƯỜNG BẾN THÀNH
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Trái tim của TP.HCM - nơi hội tụ kinh tế, văn hóa và giao thương
            hiện đại
          </p>
        </motion.div>
      </section>

      {/* THÔNG TIN */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-4 uppercase">
            Thông Tin Hành Chính
          </h2>
          <h3>Trụ sở chính:Đặt tại số 92 Nguyễn Trãi, phường Bến Thành</h3>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              label: "Cơ quan chủ quản",
              val: "UBND phường Bình Thạnh",
              icon: ShieldCheckIcon,
              color: "text-blue-600",
            },
            {
              label: "Diện tích sau sáp nhập",
              val: "1,85 km²",
              icon: MapPinIcon,
              color: "text-red-500",
            },
            {
              label: "Dân số (2026)",
              val: "71.785 - 71.875 người",
              icon: UserGroupIcon,
              color: "text-green-600",
            },
            {
              label: "Đơn vị hành chính",
              val: "Cấp phường",
              icon: BuildingLibraryIcon,
              color: "text-purple-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-xl"
            >
              <item.icon className={`w-10 h-10 ${item.color} mb-6`} />
              <p className="text-slate-500 text-sm uppercase">{item.label}</p>
              <h4 className="text-xl font-extrabold mt-1">{item.val}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUY HOẠCH */}
      <section className="bg-white py-24 px-6 border-y">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">
              Quản Lý Đô Thị & Quy Hoạch
            </h2>
            <p className="text-slate-600 mb-8">
              Phường Bến Thành đang phát triển mạnh theo mô hình đô thị thông
              minh, kết hợp bảo tồn di sản và phát triển kinh tế đêm.
            </p>

            {[
              "Số hóa quản lý đất đai",
              "Khu phố thông minh",
              "Phát triển kinh tế đêm",
              "Nâng cao dịch vụ công",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <ChevronRightIcon className="w-5 text-blue-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.img
            src="https://www.officesaigon.vn/data/upload/ga-metro-ben-thanh(1).jpg"
            className="rounded-3xl shadow-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            loading="lazy"
          />
        </div>
      </section>

      {/* DỊCH VỤ */}
      <section className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Cải cách hành chính",
              desc: "Dịch vụ công trực tuyến mức cao.",
              icon: DocumentTextIcon,
            },
            {
              title: "An ninh trật tự",
              desc: "Đảm bảo an toàn khu vực trung tâm.",
              icon: ShieldCheckIcon,
            },
            {
              title: "An sinh xã hội",
              desc: "Phát triển giáo dục và đời sống.",
              icon: AcademicCapIcon,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-10 bg-white/5 rounded-3xl"
            >
              <item.icon className="w-14 h-14 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ĐỊA DANH */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10">Điểm đến văn hóa</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Chợ Bến Thành",
              img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ben_Thanh_market_2.jpg",
            },
            {
              title: "Công viên Tao Đàn",
              img: "https://statics.vinpearl.com/cong-vien-tao-dan-7_1630851463.jpeg",
            },
            {
              title: "Ga Metro Bến Thành",
              img: "https://www.officesaigon.vn/data/upload/metro-ben-thanh-suoi-tien%20(3).jpg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              <img src={item.img} className="h-56 w-full object-cover" />
              <div className="p-6 font-bold">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-100 pt-20 pb-10 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Cột 1: Thông tin chung */}
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-blue-900 font-black text-xl mb-6">
                PHƯỜNG BẾN THÀNH
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Cơ quan hành chính nhà nước cấp cơ sở, chịu trách nhiệm quản lý
                nhà nước trên địa bàn phường Bến Thành, TP. Hồ Chí Minh.
              </p>
              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      w-10 h-10 bg-blue-600 rounded-full
      flex items-center justify-center text-white
      hover:bg-blue-700 transition
    "
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      w-10 h-10 bg-red-600 rounded-full
      flex items-center justify-center text-white
      hover:bg-red-700 transition
    "
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Cột 2: Liên kết nhanh */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">
                Liên kết nhanh
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Dịch vụ công trực tuyến
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Tra cứu thủ tục hành chính
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Lịch tiếp công dân
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Thông báo quy hoạch
                </li>
              </ul>
            </div>
            {/* Cột 3: Liên hệ */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">
                Thông tin liên hệ
              </h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>24-26 Lê Thánh Tôn, Bến Thành, TP.HCM</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>(028) 3829 7453</span>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>benthanh.q1@tphcm.gov.vn</span>
                </li>
                <li className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>T2 - T6: 07:30 – 17:00</span>
                </li>
              </ul>
            </div>
            {/* Cột 4: Bản đồ thu nhỏ/Thống kê */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">
                Vị trí địa lý
              </h4>
              <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 h-40">
                <img
                  src="https://maisonoffice.vn/wp-content/uploads/2025/08/phuong-ben-thanh-sau-sap-nhap.jpg"
                  className="w-full h-full object-cover cursor-pointer"
                  alt="Map snippet"
                />
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 uppercase font-medium tracking-widest">
            <p>© 2026 UBND Phường Bến Thành </p>
            <div className="flex gap-8">
              <span className="hover:text-blue-600 cursor-pointer">
                Chính sách bảo mật
              </span>
              <span className="hover:text-blue-600 cursor-pointer">
                Điều khoản sử dụng
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
