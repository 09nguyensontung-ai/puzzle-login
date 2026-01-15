"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (user === "Mymy" && pass === "1806") {
      localStorage.setItem("loggedIn", "true");
      router.push("/reward");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#ffeef5"
    }}>
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 20,
        width: 300,
        textAlign: "center"
      }}>
        <h2>💖 Đăng nhập nhận quà</h2>

        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Tên đăng nhập"
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Mật khẩu"
          style={{ width: "100%", padding: 8, marginTop: 10 }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            marginTop: 15,
            width: "100%",
            padding: 10,
            background: "#ff8fb1",
            color: "white",
            border: "none",
            borderRadius: 10
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
