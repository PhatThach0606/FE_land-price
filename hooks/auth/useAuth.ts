import { LoginApi, RegisterApi } from "@/features/auth/auth";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const res = await LoginApi({ email, password });

    document.cookie = `accessToken=${res.accessToken}; path=/; max-age=86400`;
    return res;
  };
  const register = async (account: any) => {
    const res = await RegisterApi(account);
    return res;
  };

  return { login, register };
};
