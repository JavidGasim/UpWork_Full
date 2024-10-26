import React, { useState } from "react";
import "../../assets/Images/upwork.png";
import { Link } from "react-router-dom";

const Button = ({ children, primary = false, ...props }) => (
  <button
    style={{
      padding: "12px 24px",
      border: primary ? "none" : "2px solid #14a800",
      borderRadius: "24px",
      backgroundColor: primary ? "#14a800" : "transparent",
      color: primary ? "white" : "#14a800",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      outline: "none",
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = primary ? "#3c8224" : "#e7f4e4";
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = primary ? "#14a800" : "transparent";
    }}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div
    style={{
      border: "1px solid #e4e5e7",
      borderRadius: "8px",
      padding: "24px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }}
  >
    {children}
  </div>
);

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search functionality here
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#001e00",
        lineHeight: 1.6,
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #e4e5e7",
          padding: "20px 0",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <h1
              href="/"
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#14a800",
                textDecoration: "none",
                cursor: "default",
              }}
            >
              upwork
            </h1>
            <nav>
              <ul
                style={{
                  display: "flex",
                  gap: "30px",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <li>
                  <Link to="/login">
                    <span
                      href="#"
                      style={{
                        color: "#001e00",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Find Talent
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <span
                      href="#"
                      style={{
                        color: "#001e00",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Find Work
                    </span>
                  </Link>
                </li>
                {/* <li>
                  <a
                    href="#"
                    style={{
                      color: "#001e00",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Why Upwork
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      color: "#001e00",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Enterprise
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
          <div>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
            <Link to="/register">
              <Button primary style={{ marginLeft: "15px" }}>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section style={{ padding: "80px 0" }}>
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
          >
            <h2
              style={{
                fontSize: "36px",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              Browse talent by category
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {[
                "Development & IT",
                "Design & Creative",
                "Sales & Marketing",
                "Writing & Translation",
                "Admin & Customer Support",
                "Finance & Accounting",
              ].map((category) => (
                <Card key={category}>
                  <h3 style={{ marginBottom: "15px", fontSize: "20px" }}>
                    {category}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#5e6d55",
                      fontSize: "16px",
                    }}
                  >
                    <span style={{ marginRight: "5px", color: "#14a800" }}>
                      ★
                    </span>
                    4.85/5 average rating
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: "#f2f7f2", padding: "80px 0" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "60px",
              padding: "0 20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <img
                src="src\assets\Images\upwork.png"
                alt="Testimonial"
                style={{
                  borderRadius: "50%",
                  maxWidth: "100%",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <blockquote
                style={{
                  fontSize: "28px",
                  fontStyle: "italic",
                  marginBottom: "30px",
                  lineHeight: 1.4,
                }}
              >
                "Upwork enables us to differentiate ourselves from our
                competitors and produce content at a higher caliber."
              </blockquote>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                John Doe, CEO of TechCorp
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0" }}>
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
          >
            <h2
              style={{
                fontSize: "36px",
                marginBottom: "50px",
                textAlign: "center",
              }}
            >
              Why businesses turn to Upwork
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "50px",
              }}
            >
              {[
                {
                  icon: "✓",
                  title: "Proof of quality",
                  description:
                    "Check any pro's work samples, client reviews, and identity verification.",
                },
                {
                  icon: "↗",
                  title: "No cost until you hire",
                  description:
                    "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
                },
                {
                  icon: "👥",
                  title: "Safe and secure",
                  description:
                    "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
                },
              ].map((feature, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "64px",
                      color: "#14a800",
                      marginBottom: "20px",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#5e6d55", fontSize: "18px" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          backgroundColor: "#001e00",
          color: "white",
          padding: "80px 0",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "50px",
            }}
          >
            {[
              {
                title: "For Clients",
                links: [
                  "How to Hire",
                  "Talent Marketplace",
                  "Project Catalog",
                  "Talent Scout",
                ],
              },
              {
                title: "For Talent",
                links: [
                  "How to Find Work",
                  "Direct Contracts",
                  "Find Freelance Jobs",
                ],
              },
              {
                title: "Resources",
                links: ["Help & Support", "Success Stories", "Upwork Reviews"],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Leadership",
                  "Investor Relations",
                  "Careers",
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3
                  style={{
                    fontSize: "20px",
                    marginBottom: "25px",
                    color: "#14a800",
                  }}
                >
                  {column.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: "15px" }}>
                      <a
                        href="#"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontSize: "16px",
                          transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#14a800")}
                        onMouseOut={(e) => (e.target.style.color = "white")}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "60px",
              paddingTop: "30px",
              borderTop: "1px solid #14a800",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", color: "#b2b2b2" }}>
              &copy; 2024 Upwork Global Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
