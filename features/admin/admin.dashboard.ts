import { getAllGiaoThong, getAllThuaDat } from "./admin.map";
import { getAllUser } from "./admin.user";

export const getDashboardData = async () => {
  const [users, thuaDat, giaoThong] = await Promise.all([
    getAllUser({ page: 1, pageSize: 1 }),
    getAllThuaDat({ page: 1, pageSize: 1 }),
    getAllGiaoThong({ page: 1, pageSize: 1 }),
  ]);

  return {
    usersTotal: users.total,
    thuaDatTotal: thuaDat.total,
    giaoThongTotal: giaoThong.total,
  };
};
