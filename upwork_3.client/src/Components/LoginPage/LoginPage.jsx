import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.css";

const Input = ({ label, type, id, value, onChange, required }) => (
  <div style={{ marginBottom: "20px" }}>
    <label
      htmlFor={id}
      style={{
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "black",
        textAlign: "left",
      }}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        backgroundColor: "white",
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        outline: "none",
        color: "black",
      }}
    />
  </div>
);

const Button = ({ children, primary, fullWidth, ...props }) => (
  <button
    style={{
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "bold",
      color: primary ? "white" : "#14a800",
      backgroundColor: primary ? "#14a800" : "white",
      border: primary ? "none" : "2px solid #14a800",
      borderRadius: "24px",
      cursor: "pointer",
      width: fullWidth ? "100%" : "auto",
      transition: "background-color 0.3s",
    }}
    {...props}
  >
    {children}
  </button>
);

// const url = "https://localhost:7086";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    setLoading(true); // Yükleniyor durumunu ayarla
    setError(""); // Hata mesajını sıfırla

    try {
      const response = await fetch("https://localhost:7086/api/account/login", {
        method: "POST", // HTTP metodunu belirt
        headers: {
          "Content-Type": "application/json", // JSON içeriği gönderdiğimizi belirt
        },
        body: JSON.stringify({ username, password }), // Form verilerini JSON formatında gönder
      });

      if (!response.ok) {
        throw new Error("Giriş hatası. Bilgilerinizi kontrol edin."); // Hata durumunda bir hata fırlat
      } else {
        const data = await response.json(); // Cevabı JSON formatında al
        localStorage.setItem("token", data.token); // Token'ı localStorage'a kaydet
        navigate("/home");
        console.log("Giriş başarılı:", data);
        // console.log("Giriş başarılı:", response);

        // Başka bir sayfaya yönlendirme işlemi yapabilirsin
      }
    } catch (error) {
      setError(error.message); // Hata mesajını duruma ekle
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Yüklenme durumunu sona erdir
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f7f2",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "28px", color: "#14a800", marginBottom: "10px" }}
          >
            upwork
          </h1>
          <h2
            style={{ fontSize: "24px", fontWeight: "normal", color: "#001e00" }}
          >
            Log in to Upwork
          </h2>
        </header>

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  marginRight: "8px",
                }}
              />
              <span style={{ color: "black" }}>Keep me logged in</span>
            </label>
            <a href="#" style={{ color: "#14a800", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          <Button primary fullWidth type="submit">
            Log in
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p
            style={{ marginBottom: "20px", color: "black", cursor: "default" }}
          >
            Don't have an Upwork account?
          </p>
          <Link to="/register">
            <Button fullWidth>Sign Up</Button>
          </Link>
        </div>

        <footer
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "14px",
            color: "#5e6d55",
            cursor: "default",
          }}
        >
          <p>&copy; 2015 - 2024 Upwork® Global Inc.</p>
        </footer>
      </div>
    </div>
  );
}
