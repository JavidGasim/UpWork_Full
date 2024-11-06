import React, { useEffect, useState } from "react";
import "../RegisterPage/RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

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
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCheckboxChange = (selectedRole) => {
    setRole((prevRole) => (prevRole === selectedRole ? "" : selectedRole));
  };

  const fetchReg = async () => {
    const formattedBirthday = birthday
      ? new Date(birthday).toISOString().split("T")[0]
      : "";
    const imagePath = imageUrl;
    try {
      const body = {
        username,
        firstName,
        lastName,
        email,
        password,
        country,
        imagePath,
        role,
        birthDate: formattedBirthday,
      };

      const response = await fetch(
        "https://localhost:7086/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Qeydiyyat baş tutmadı: " + errorText);
      }

      navigate("/login");
    } catch (error) {
      alert("Xəta: " + error.message);
    }
  };

  const fetchUserName = async () => {
    try {
      const body = { username }; // Obyekt formatında göndər
      const response = await fetch(
        "https://localhost:7086/api/account/existUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // Burada düzəliş et
        }
      );

      if (response.ok) {
        console.log("Good");
        setCheck(true);
      } else {
        setCheck(false);
        console.log("o la la la");
      }
    } catch (error) {
      setCheck(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchImg = async () => {
    try {
      const formData = new FormData();
      formData.append("File", image);

      const response = await fetch("https://localhost:7086/api/Image/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log(data.imageUrl);
      setImageUrl(data.imageUrl.toString());
      await fetchUserName();
      // await fetchReg();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Yüklənir statusunu ayarla
    setError(""); // Hata mesajını sıfırla

    await fetchImg();
  };

  useEffect(() => {
    if (imageUrl) {
      fetchReg();
    }
  }, [imageUrl]);

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
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#001e00",
                }}
              >
                User name
              </label>
              <input
                label="User name"
                type="text"
                id="username"
                style={{
                  width: "95%",
                  padding: "12px",
                  fontSize: "16px",
                  // border: "1px solid #e0e0e0",
                  border: check ? "1px solid #e0e0e0" : "1px solid red",
                  borderRadius: "8px",
                  outline: "none",
                  backgroundColor: "white",
                  color: "black",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="User name"
              />
            </div>
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

          <div style={{ marginTop: "20px" }}>
            <label
              htmlFor="image"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#001e00",
              }}
            >
              Image
            </label>
            <input
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
              // label="Image"
              type="file"
              id="image"
              name="image"
              onChange={(e) => handleFileChange(e)}
            />
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
              <option value="United States of America">
                United States of America
              </option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="Russia">Russia</option>
              <option value="Australia">Australia</option>
              <option value="Mexico">Mexico</option>
              <option value="South Africa">South Africa</option>
              <option value="Spain">Spain</option>
              <option value="South Korea">South Korea</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Sweden">Sweden</option>
              <option value="Norway">Norway</option>
              <option value="Denmark">Denmark</option>
              <option value="Finland">Finland</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Belgium">Belgium</option>
              <option value="Ireland">Ireland</option>
              <option value="Singapore">Singapore</option>
              <option value="Austria">Austria</option>
              <option value="Portugal">Portugal</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Turkey">Turkey</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Iran">Iran</option>
              <option value="Chile">Chile</option>
              <option value="Philippines">Philippines</option>
              <option value="Argentina">Argentina</option>
              <option value="Colombia">Colombia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Thailand">Thailand</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Egypt">Egypt</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Croatia">Croatia</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Latvia">Latvia</option>
              <option value="Iceland">Iceland</option>
              <option value="Georgia">Georgia</option>
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
