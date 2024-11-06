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
    padding: "0.5rem 1rem",
    backgroundColor: "#14a800",
    color: "white",
    border: "none",
    borderRadius: "0 4px 4px 0",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("about");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [birthdate, setBirthdate] = useState("");
  const [skills, setSkills] = useState([]);
  const [connections, setConnections] = useState();

  const navigate = useNavigate();
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

          console.log(name);
          console.log(surname);
          console.log(email);
          console.log(country);
          console.log(birthdate);
          console.log(skills);
          console.log(connections);
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
                <img
                  src={imagePath || defaultProfileImageUrl}
                  alt="profile_image"
                  style={{
                    width: "40px",
                    height: "35px",
                    marginLeft: "10px",
                    border: "1px solid transparent",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </header>
        </div>
        <div
          className="max-w-4xl mx-auto p-6 space-y-6"
          style={{ marginTop: "20px" }}
        >
          {/* Profile Header */}
          <div className="flex items-start space-x-6">
            <img
              src={imagePath || defaultProfileImageUrl}
              alt="Freelancer profile picture"
              className="w-36 h-36 rounded-full"
              style={{ width: "250px", height: "250px", borderRadius: "20px" }}
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold" style={{ color: "black" }}>
                {name} {surname}
              </h1>
              <h4 className="text-xl text-gray-600" style={{ color: "black" }}>
                {country}
              </h4>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full">
            <div className="flex border-b mb-4">
              {["about", "skills", "connections"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div
              className="bg-white shadow rounded-lg p-6"
              style={{
                background: "#f7f7f7",
                width: "50%",
                margin: "auto",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              {activeTab === "about" && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "black" }}
                  >
                    About Me
                  </h2>
                  <p className="text-gray-700" style={{ color: "black" }}>
                    {/* I'm a passionate web developer with over 5 years of
                    experience in creating responsive and user-friendly
                    websites. My expertise lies in front-end development,
                    particularly with React.js, but I'm also proficient in
                    back-end technologies. I love tackling challenging projects
                    and continuously learning new technologies to stay at the
                    forefront of web development. */}
                    I am {name} {surname}. I am{" "}
                    {new Date().getFullYear() - birthdate.slice(0, 4)} years
                    old. I am from {country}.
                  </p>
                </div>
              )}

              {activeTab === "skills" && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "black" }}
                  >
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                        style={{ color: "black" }}
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
                    className="text-2xl font-bold mb-4"
                    style={{ color: "black" }}
                  >
                    Available Connections
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {/* <Linkedin className="w-5 h-5 text-blue-600" /> */}
                      <span
                        className="text-blue-600 hover:underline"
                        style={{ color: "black", fontSize: "1em" }}
                      >
                        {connections} connections
                      </span>
                    </div>
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
