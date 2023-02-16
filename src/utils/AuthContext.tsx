import { UserDto } from "../scaffold";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState<string>(
    "1384365a-b94f-4536-ad77-db845a64428b"
  );
  return {
    token,
    isLogin: true,
  };
}
