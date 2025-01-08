import api from "../axios";

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await api.put("/api/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Update profile failed");
  }
};
