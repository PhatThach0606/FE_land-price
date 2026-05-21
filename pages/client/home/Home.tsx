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
import Footer from "@/components/Footer/Footer";
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
    <div
      className="
        w-full
        bg-slate-50 text-slate-800
        dark:bg-[#020817] dark:text-slate-100
        transition-colors duration-300
        font-sans leading-relaxed
      "
    >
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-start overflow-hidden bg-slate-950">
        {/* Background Image với hiệu ứng zoom nhẹ khi load và làm tối chuẩn điện ảnh */}
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="https://cdn.thuviennhadat.vn/upload/hinh-anh-bai-viet/LMV/thang-3-2025/5-5-2025/ben-thanh-moi.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.8] dark:brightness-[0.4] contrast-[1.05]"
          alt="Chợ Bến Thành - Trung tâm phường Bình Thạnh"
          loading="eager"
        />

        {/* Khối Content canh trái hiện đại, đẩy sang một bên tạo khoảng thở cho ảnh nền */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="lg:col-span-8 flex flex-col items-start text-left"
          >
            {/* Badge định danh cơ quan hiện đại với hiệu ứng Glassmorphism nhẹ */}
            {/* <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 text-green-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900 animate-pulse" />
              ỦY BAN NHÂN DÂN PHƯỜNG BẾN THÀNH
            </motion.div> */}
            <div className="">
              {/* Tiêu đề Phường Bến Thành đổ bóng mềm và font co giãn cực mượt */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tight leading-none mb-6 drop-shadow-md uppercase"
              >
                Phường <br className="hidden md:block" />
                <span className="bg-linear-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  Bến Thành
                </span>
              </motion.h1>

              {/* Đoạn mô tả căn chỉnh lại font-size phù hợp cho cả Mobile lẫn Desktop */}
              {/* <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-slate-900 dark:text-slate-300 max-w-xl mb-8 font-medium leading-relaxed drop-shadow-sm"
              >
                Trái tim hành chính, văn hóa và giao thương biểu tượng tại trung
                tâm kinh tế sầm uất bậc nhất Thành phố Hồ Chí Minh.
              </motion.p> */}
            </div>

            {/* Nút bấm Kêu gọi hành động (Call to Action) chuẩn Portal điện tử */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="px-6 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200">
                <a
                  target="_blank"
                  href="https://phuongbenthanh.gov.vn/category/trung-tam-hanh-chinh-cong/dich-vu-hanh-chinh-cong/"
                >
                  Dịch vụ công trực tuyến
                </a>
              </button>
              <button className="px-6 py-3 cursor-pointer  bg-white/10 dark:bg-slate-900/40 hover:bg-white/20 dark:hover:bg-slate-800/60 active:scale-95 text-white border border-white/20 dark:border-slate-800 font-bold text-sm rounded-xl backdrop-blur-md transition-all duration-200">
                <a
                  target="_blank"
                  href="https://guland.vn/soi-quy-hoach/tp-ho-chi-minh/quan-1"
                >
                  {" "}
                  Tra cứu quy hoạch
                </a>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* THÔNG TIN HÀNH CHÍNH */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-4 uppercase tracking-wide">
            Thông Tin Hành Chính
          </h2>
          <h3 className="text-slate-600 dark:text-slate-300 font-medium">
            Trụ sở chính: Đặt tại số 92 Nguyễn Trãi, phường Bến Thành, Thành phố
            Hồ Chí Minh
          </h3>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              label: "Cơ quan chủ quản",
              val: "UBND phường Bến Thành, TP.HCM",
              icon: ShieldCheckIcon,
              color: "text-blue-600 dark:text-blue-400",
            },
            {
              label: "Diện tích sau sáp nhập",
              val: "1,852 km²",
              icon: MapPinIcon,
              color: "text-red-500 dark:text-red-400",
            },
            {
              label: "Dân số (2026)",
              val: "71.785 - 71.875 người",
              icon: UserGroupIcon,
              color: "text-green-600 dark:text-green-400",
            },
            {
              label: "Đơn vị hành chính",
              val: "Cấp phường",
              icon: BuildingLibraryIcon,
              color: "text-purple-600 dark:text-purple-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="
                bg-white dark:bg-slate-900/50
                border border-slate-200 dark:border-slate-800
                p-8 rounded-2xl shadow-sm hover:shadow-xl
                transition-all duration-300
              "
            >
              <item.icon className={`w-10 h-10 ${item.color} mb-6`} />
              <p className="text-slate-400 dark:text-slate-500 text-sm uppercase font-semibold tracking-wider">
                {item.label}
              </p>
              <h4 className="text-xl font-extrabold mt-1 text-slate-800 dark:text-slate-800">
                {item.val}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUY HOẠCH */}
      <section
        className="
     dark:bg-[#0f172a]
    border-y border-slate-200 dark:border-slate-800
    py-24 px-6
    transition-colors duration-300
  "
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">
              Quản Lý Đô Thị & Quy Hoạch
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              Phường Bến Thành đang phát triển mạnh theo mô hình đô thị thông
              minh, kết hợp bảo tồn di sản và phát triển kinh tế đêm.
            </p>

            <div className="space-y-4">
              {[
                "Số hóa quản lý đất đai",
                "Khu phố thông minh",
                "Phát triển kinh tế đêm",
                "Nâng cao dịch vụ công",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200"
                >
                  <ChevronRightIcon className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <img
              src="./BDQH.png"
              className="w-full h-full object-cover object-center"
              alt="Quy hoạch Ga Metro Bến Thành"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Cải cách hành chính",
              desc: "Triển khai dịch vụ công trực tuyến toàn trình, tối ưu quy trình xử lý hồ sơ một cửa tinh gọn, nhanh chóng và minh bạch cho công dân.",
              icon: DocumentTextIcon,
              glow: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
              badge: "Thủ tục 4.0",
              badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
            },
            {
              title: "An ninh trật tự 24/7",
              desc: "Đảm bảo an toàn tuyệt đối địa bàn trọng điểm khu vực trung tâm, duy trì tuần tra kiểm soát và hệ thống giám sát đô thị thông minh.",
              icon: ShieldCheckIcon,
              glow: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
              badge: "Trọng điểm",
              badgeBg:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            },
            {
              title: "An sinh xã hội",
              desc: "Nâng cao chất lượng y tế cơ sở, phát triển hệ thống giáo dục toàn diện và thực hiện tốt các chính sách an sinh, hỗ trợ đời sống nhân dân.",
              icon: AcademicCapIcon,
              glow: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
              badge: "Bền vững",
              badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="
          group relative p-8 md:p-10
          bg-white dark:bg-slate-900
          border border-slate-200/80 dark:border-slate-800/60
          rounded-3xl shadow-sm hover:shadow-xl
          hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700
          transition-all duration-300 ease-out
        "
            >
              {/* Lớp phủ sáng nhẹ ở góc khi hover tạo cảm giác Premium */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                {/* Icon bọc trong khung tròn, đổi màu linh hoạt khi hover toàn card */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/800 border border-slate-100 dark:border-slate-950/800 text-slate-700 dark:text-slate-700 transition-colors duration-300">
                  <item.icon
                    className={`w-8 h-8 transition-colors duration-300 ${item.glow}`}
                  />
                </div>

                {/* Tag nhỏ góc phải định hình thêm thông tin */}
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${item.badgeBg}`}
                >
                  {item.badge}
                </span>
              </div>

              {/* Khối Content chữ */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-slate-600 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ĐỊA DANH */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-slate-100 text-center md:text-left uppercase tracking-wide">
          Điểm đến văn hóa & Di sản
        </h2>

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
              className="
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-3xl shadow-md overflow-hidden hover:shadow-xl
                transition-all duration-300 group
              "
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={item.img}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={item.title}
                />
              </div>
              <div className="p-6 font-bold text-lg text-slate-800 dark:text-slate-700">
                {item.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
