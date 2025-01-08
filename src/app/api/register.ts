import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      // Proxy request ke API eksternal
      const response = await axios.post(
        "http://localhost:8000/api/register",
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
            Referer: "http://localhost:3000",
          },
        }
      );

      // Set CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      return res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Proxy Registration Error:", error);

      // Set CORS headers untuk error response
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      if (error.response) {
        return res.status(error.response.status).json({
          message: error.response.data.message || "Registration failed",
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  } else {
    // Handle method not allowed
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
