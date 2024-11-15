import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const styles = {
  jobSearchPage: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#14a800",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
  },
  activeNavLink: {
    fontWeight: "bold",
    color: "#14a800",
  },
  userActions: {
    display: "flex",
    gap: "0.5rem",
  },
  iconButton: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  mainContent: {
    display: "flex",
    padding: "2rem",
    gap: "2rem",
  },
  sidebar: {
    width: "250px",
  },
  filterSection: {
    marginBottom: "1.5rem",
  },
  filterTitle: {
    marginBottom: "0.5rem",
    textAlign: "left",
  },
  filterList: {
    listStyleType: "none",
    textAlign: "left",
    padding: 0,
  },
  filterItem: {
    marginBottom: "0.5rem",
  },
  jobListings: {
    flexGrow: 1,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    height: "35px",
    marginBottom: "1rem",
    height: "35px",
  },
  searchInput: {
    flexGrow: 1,
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "0px 10px",
    backgroundColor: "#14a800",
    color: "white",
  },
  searchButton: {
    padding: "0.73rem 1rem",
    backgroundColor: "#14a800",
    color: "white",
    border: "none",
    borderRadius: "4px 4px 4px 4px",
    cursor: "pointer",
    marginLeft: "1em",
    marginRight: "1em",
  },
  jobCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  jobDescription: {
    margin: "0.5rem 0",
    color: "#666",
  },
  jobDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  budget: {
    fontWeight: "bold",
  },
  proposals: {
    color: "#666",
  },
  skills: {
    marginBottom: "0.5rem",
  },
  skillTag: {
    display: "inline-block",
    backgroundColor: "#f2f2f2",
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: "0.8rem",
  },
  applyButton: {
    backgroundColor: "#14a800",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  showMoreButton: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    padding: "10px",
    fontSize: "16px",
  },
  showLessButton: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    padding: "10px",
    fontSize: "16px",
  },
  selectedTags: {
    marginTop: "15px",
  },
  selectedTitle: {
    fontSize: "16px",
    marginBottom: "5px",
    border: "5px solid black",
    borderRadius: "5px",
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [birthdate, setBirthdate] = useState("");
  const [skills, setSkills] = useState([]);
  const [connections, setConnections] = useState();
  const [about, setAbout] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Sessiyanı təmizləmək
    localStorage.removeItem("token"); // Tokeni silmək
    localStorage.removeItem("imagePath"); // İstifadəçi məlumatlarını silmək

    // Giriş səhifəsinə yönləndirmək
    navigate("/login");
  };

  const handleEditPhoto = () => {
    // Implement photo edit functionality
    console.log("Edit photo clicked");
  };

  const handleEditAbout = () => {
    // Implement about edit functionality
    console.log("Edit about clicked");
  };

  const handleEditSkills = () => {
    // Implement skills edit functionality
    console.log("Edit skills clicked");
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const editIconStyle = {
    width: "16px",
    height: "16px",
    marginRight: "8px",
    color: "black",
  };

  const defaultProfileImageUrl =
    "data:image/png;base64,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";

  const homepageHandler = () => {
    navigate("/home");
  };

  const token = localStorage.getItem("token");
  const imagePath = localStorage.getItem("imagePath");

  let userRole = null;
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log("User role: " + decodedToken);
      console.log(JSON.stringify(decodedToken, null, 2));
      userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]; // JWT strukturu əsasında düzəldin
      console.log(userRole);

      userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      userId = userId.toString();
      console.log("İstifadəçi ID-si:", userId);
    } catch (error) {
      console.error("Tokenin şifrlənməsi uğursuz oldu", error);
    }
  }

  if (userRole == "Applicant") {
    useEffect(() => {
      fetch("https://localhost:7086/api/applicant/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //   const data = response.json();

          // Datanı state-lərə təyin etmək
          console.log(userId);

          setName(data.firstname);
          setSurname(data.lastname);
          setEmail(data.email);
          setCountry(data.country);
          setBirthdate(data.birthDate);
          setSkills(data.skills || []); // Array olduğu üçün boş array olaraq təyin edirik
          setConnections(data.connections); // Əgər connections bir rəqəmdirsə
          setAbout(data.about); //

          console.log(name);
          console.log(surname);
          console.log(email);
          console.log(country);
          console.log(birthdate);
          console.log(skills);
          console.log(connections);
          console.log(about);

          // console.log("Məlumatların alınması başarılı");
        })
        .catch((error) => console.log(error));
    }, []);
    // fetchGetApplicant();
    return (
      <div style={{ height: "100vh" }}>
        <div style={styles.jobSearchPage}>
          <header style={styles.header}>
            <div style={styles.logo}>Upwork</div>
            <div style={styles.searchBar}>
              <button style={styles.searchButton} onClick={homepageHandler}>
                HOME
              </button>
              <div style={styles.userActions}>
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "-5px 5px",
                    fontSize: "16px",
                    color: "#ffffff",
                    backgroundColor: "#14a800",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  // onMouseOver={(e) =>
                  //   (e.currentTarget.style.backgroundColor = "#d32f2f")
                  // }
                  // onMouseOut={(e) =>
                  //   (e.currentTarget.style.backgroundColor = "#f44336")
                  // }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "3px",
                    }}
                  >
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
                    <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" />
                  </svg>
                  Logout
                </button>
                <img
                  src={imagePath || defaultProfileImageUrl}
                  alt="profile_image"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    marginLeft: "10px",
                    border: "1px solid transparent",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          </header>
        </div>
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "2rem",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={imagePath}
                alt="Freelancer profile picture"
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "20px",
                  objectFit: "fill",
                }}
              />
            </div>
            <div style={{ marginLeft: "1.5rem" }}>
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {name} {surname}
              </h1>
              <h4
                style={{
                  fontSize: "1.25rem",
                  color: "#4b5563",
                  marginTop: "0.5rem",
                }}
              >
                {country}
              </h4>
            </div>
            <button
              style={
                (buttonStyle,
                {
                  color: "black",
                  backgroundColor: "white",
                  marginLeft: "1.5rem",
                })
              }
              onClick={handleEditAbout}
            >
              <svg
                style={editIconStyle}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "1rem",
              }}
            >
              {["about", "skills", "connections"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.5rem 1rem",
                    fontWeight: "500",
                    color: activeTab === tab ? "#2563eb" : "#4b5563",
                    borderBottom:
                      activeTab === tab ? "2px solid #2563eb" : "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              {activeTab === "about" && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#111827",
                      }}
                    >
                      About Me
                    </h2>
                    <h3
                      style={{
                        color: "black",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      {about}
                    </h3>
                  </div>
                  <p style={{ color: "#374151" }}>{about}</p>
                </div>
              )}

              {activeTab === "skills" && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#111827",
                      }}
                    >
                      Skills
                    </h2>
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "0.25rem 0.75rem",
                          backgroundColor: "#e5e7eb",
                          color: "#1f2937",
                          borderRadius: "9999px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "connections" && (
                <div>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#111827",
                    }}
                  >
                    Available Connections
                  </h2>
                  <div>
                    <span style={{ color: "#2563eb", cursor: "pointer" }}>
                      {connections} connections
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div style={{ height: "100vh" }}>qwertyuio</div>;
  }
}
