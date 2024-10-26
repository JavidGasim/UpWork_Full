import React, { useState } from "react";
import "../RegisterPage/RegisterPage.css";
import { Link } from "react-router-dom";

const Input = ({ label, type, id, value, onChange, required, placeholder }) => (
  <div style={{ marginBottom: "20px" }}>
    <label
      htmlFor={id}
      style={{
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#001e00",
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
      placeholder={placeholder}
      style={{
        width: "95%",
        padding: "12px",
        fontSize: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        outline: "none",
        backgroundColor: "white",
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

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = (role) => {
    setRole((prevRole) => (prevRole === role ? "" : role)); // Seçimi dəyiş
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Yükleniyor durumunu ayarla
    setError(""); // Hata mesajını sıfırla

    try {
      const response = await fetch(
        "https://localhost:7086/api/account/register",
        {
          method: "POST", // HTTP metodunu belirt
          headers: {
            "Content-Type": "application/json", // JSON içeriği gönderdiğimizi belirt
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
            country,
            birthday,
            role,
          }), // Form verilerini JSON formatında gönder
        }
      );
    } catch (error) {}
    console.log("Signup attempted with:", {
      firstName,
      lastName,
      email,
      password,
      country,
      birthday,
      role,
    });
    // Implement actual signup logic here
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
        padding: "20px",
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
            Get your free account
          </h2>
        </header>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px" }}>
            <Input
              label="First name"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First name"
            />
            <Input
              label="Last name"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last name"
            />
            <Input
              label="User name"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="User name"
            />
          </div>
          <Input
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <Input
            label="Password (8 or more characters)"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
          <div>
            <label
              htmlFor="birthday"
              style={{
                color: "black",
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            >
              Birthday:
            </label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              style={{
                color: "black",
                backgroundColor: "white",
                width: "100%",
                border: "1px solid black",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "white",
                color: "black",
              }}
            />
            {birthday && (
              <p>Your birthday is: {new Date(birthday).toLocaleDateString()}</p>
            )}
          </div>

          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <label
              htmlFor="country"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#001e00",
              }}
            >
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                outline: "none",
                appearance: "none",
                color: "black",
                backgroundColor: "white",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23001e00' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              <option value="RU">Russia</option>
              <option value="AU">Australia</option>
              <option value="MX">Mexico</option>
              <option value="ZA">South Africa</option>
              <option value="ES">Spain</option>
              <option value="KR">South Korea</option>
              <option value="NL">Netherlands</option>
              <option value="SE">Sweden</option>
              <option value="NO">Norway</option>
              <option value="DK">Denmark</option>
              <option value="FI">Finland</option>
              <option value="CH">Switzerland</option>
              <option value="BE">Belgium</option>
              <option value="IE">Ireland</option>
              <option value="SG">Singapore</option>
              <option value="AT">Austria</option>
              <option value="PT">Portugal</option>
              <option value="KZ">Kazakhstan</option>
              <option value="UZ">Uzbekistan</option>
              <option value="TR">Turkey</option>
              <option value="AZ">Azerbaijan</option>
              <option value="IR">Iran</option>
              <option value="CL">Chile</option>
              <option value="PH">Philippines</option>
              <option value="AR">Argentina</option>
              <option value="CO">Colombia</option>
              <option value="MY">Malaysia</option>
              <option value="TH">Thailand</option>
              <option value="VN">Vietnam</option>
              <option value="EG">Egypt</option>
              <option value="SA">Saudi Arabia</option>
              <option value="NG">Nigeria</option>
              <option value="KH">Cambodia</option>
              <option value="BG">Bulgaria</option>
              <option value="HR">Croatia</option>
              <option value="LT">Lithuania</option>
              <option value="LV">Latvia</option>
              <option value="IS">Iceland</option>
              <option value="GE">Georgia</option>
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <input
                type="checkbox"
                checked={role === "Applicant"} // Seçilən rola uyğun olub-olmamağı yoxla
                onChange={() => handleCheckboxChange("Applicant")} // Seçimi dəyiş
              />
              Join as Applicant
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <input
                type="checkbox"
                checked={role === "Advertiser"} // Seçilən rola uyğun olub-olmamağı yoxla
                onChange={() => handleCheckboxChange("Advertiser")} // Seçimi dəyiş
              />
              Join as Advertiser
            </label>
          </div>
          <Button primary fullWidth type="submit">
            Create my account
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p
            style={{ marginBottom: "20px", fontSize: "14px", color: "#5e6d55" }}
          >
            Already have an account?{" "}
            <Link to="/login">
              <span style={{ color: "#14a800", textDecoration: "none" }}>
                Log In
              </span>
            </Link>
          </p>
        </div>

        <footer
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "14px",
            color: "#5e6d55",
          }}
        >
          <p>&copy; 2015 - 2024 Upwork® Global Inc.</p>
        </footer>
      </div>
    </div>
  );
}
