import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode token untuk memeriksa expiration
        const decodedToken: any = jwtDecode(token);

        // Periksa apakah token sudah expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, logout otomatis
          logout();
          return;
        }

        // Set cookie untuk middleware
        document.cookie = `next-auth.token=${token}; path=/; SameSite=Strict`;

        setIsAuthenticated(true);
      } catch (error) {
        // Token invalid
        logout();
      }
    }

    setIsLoading(false);
  };

  const logout = async () => {
    try {
      // Hapus token dari localStorage dan cookie
      localStorage.removeItem("token");
      document.cookie =
        "next-auth.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Update state autentikasi
      setIsAuthenticated(false);

      // Tampilkan toast notifikasi
      toast({
        description: "Logged out successfully",
      });

      // Redirect ke halaman login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
  };
};
