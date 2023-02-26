import { UserDto } from "../scaffold";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState<string>(
    "5244a3e1-f074-4952-b88c-68d9957bbcee"
  );
  return {
    token,
    isLogin: true,
  };
}
