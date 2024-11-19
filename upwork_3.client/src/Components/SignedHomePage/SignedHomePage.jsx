import { useEffect } from "react";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    width: "100%",
    height: "35px",
    marginBottom: "1rem",
    width: "70%",
    height: "35px",
  },
  searchInput: {
    flexGrow: 1,
    padding: "0.73rem 1rem",

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
    borderRadius: "4px",
    cursor: "pointer",
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

export default function SignedHomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer Needed",
      description: "Looking for an experienced React developer...",
      budget: "$30-50/hr",
      proposals: 10,
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Graphic Designer for Logo Creation",
      description: "Need a creative designer for company logo...",
      budget: "$100-200",
      proposals: 15,
      skills: ["Illustrator", "Photoshop", "Logo Design"],
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      description: "Seeking a skilled writer for our technology blog...",
      budget: "$0.10/word",
      proposals: 8,
      skills: ["Content Writing", "SEO", "Tech Knowledge"],
    },
  ];
  const allSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Flask",
    "C#",
    "ASP.NET",
    "Java",
    "Spring",
    "SQL",
    "MySQL",
    "MongoDB",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "Linux",
    "Ruby",
    "PHP",
    "Laravel",
    "TypeScript",
    "Sass",
    "Less",
    "Bootstrap",
    "Tailwind CSS",
    "JQuery",
    "Go",
    "Rust",
    "Swift",
    "Objective-C",
    "Kotlin",
    "Android",
    "iOS",
    "Redux",
    "Next.js",
    "Gatsby",
    "Webpack",
    "Babel",
    "Jenkins",
    "Terraform",
    "Ansible",
    "Puppet",
    "Chef",
    "C++",
    "F#",
    "Elixir",
    "Scala",
    "Perl",
    "Haskell",
    "R",
    "MATLAB",
  ];

  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedTags, setSelectedTags] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Sessiyanı təmizləmək
    localStorage.removeItem("token"); // Tokeni silmək
    localStorage.removeItem("imagePath"); // İstifadəçi məlumatlarını silmək

    // Giriş səhifəsinə yönləndirmək
    navigate("/login");
  };

  const imageClickHandler = () => {
    navigate("/profile");
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 10, allSkills.length));
  };

  const handleShowLess = () => {
    setVisibleCount(10); // Reset to show the first 10 items
  };

  const handleTagChange = (skill) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(skill)) {
        // If already selected, remove it
        return prevSelectedTags.filter((tag) => tag !== skill);
      } else {
        // Otherwise, add it
        return [...prevSelectedTags, skill];
      }
    });
  };

  const token = localStorage.getItem("token");
  const imagePath = localStorage.getItem("imagePath");
  const defaultProfileImageUrl =
    "data:image/png;base64,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";

  let userRole = null;

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "https://localhost:7086/api/job/{searchTerm}",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
      console.log("Search Results:", data); // Axtarış nəticələrini burada idarə edin
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

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
    } catch (error) {
      console.error("Tokenin şifrlənməsi uğursuz oldu", error);
    }
  }

  if (userRole == "Applicant") {
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await fetch("https://localhost:7086/api/job", {
            method: "GET", // HTTP metodunu belirt
            headers: {
              "Content-Type": "application/json", // JSON içeriği gönderdiğimizi belirt
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });

          console.log("aaaaaaaa");

          // API endpoint
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setJobs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }, []);
    return (
      <div style={styles.jobSearchPage}>
        <header style={styles.header}>
          <div style={styles.logo}>Upwork</div>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>Search</button>
            <div style={styles.userActions}>
              {/* <button style={styles.iconButton}>👤</button> */}
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
                  marginLeft: "10px",
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
                onClick={imageClickHandler}
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

        <div style={styles.mainContent}>
          <aside style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Experience Level</h3>
              <ul style={styles.filterList}>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Entry Level
                  </label>
                </li>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Intermediate
                  </label>
                </li>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Expert
                  </label>
                </li>
              </ul>
            </div>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Tags</h3>
              <div style={styles.selectedTags}>
                {/* <h4 style={styles.selectedTitle}>Selected Tags:</h4> */}
                {selectedTags.length > 0 ? (
                  <p>{selectedTags.join(" ")}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <ul style={styles.filterList}>
                {allSkills.slice(0, visibleCount).map((skill, index) => (
                  <li key={index} style={styles.filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(skill)}
                        onChange={() => handleTagChange(skill)}
                      />{" "}
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
              {visibleCount < allSkills.length && (
                <button style={styles.showMoreButton} onClick={handleShowMore}>
                  Show More ⬇
                </button>
              )}
              {visibleCount === allSkills.length && (
                <button style={styles.showLessButton} onClick={handleShowLess}>
                  Show Less ⬆
                </button>
              )}
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#14a800" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </aside>

          <main style={styles.jobListings}>
            <h2>Jobs you might like</h2>

            {jobs.map((job) => (
              <div key={job.id} style={styles.jobCard}>
                <h3>{job.content}</h3>
                <p style={styles.jobDescription}>{job.description}</p>
                <div style={styles.jobDetails}>
                  <span style={styles.budget}>{job.price}</span>
                  <span style={styles.proposals}>{job.tags} proposals</span>
                </div>
                <div style={styles.skills}>
                  {job.skills.map((skill) => (
                    <span key={skill} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
                <button style={styles.applyButton}>Apply Now</button>
              </div>
            ))}
          </main>
        </div>
      </div>
    );
  } else {
    useEffect(() => {
      const fetchApplicants = async () => {
        try {
          const response = await fetch("https://localhost:7086/api/job", {
            method: "GET", // HTTP metodunu belirt
            headers: {
              "Content-Type": "application/json", // JSON içeriği gönderdiğimizi belirt
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });

          console.log("aaaaaaaa");

          // API endpoint
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setJobs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicants();
    }, []);
    return (
      <div style={styles.jobSearchPage}>
        <header style={styles.header}>
          <div style={styles.logo}>Upwork</div>
          <div style={styles.searchBar}>
            <button style={styles.searchInput}>My Jobs</button>
            <button style={styles.searchInput}>Add Job</button>
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
                  marginLeft: "10px",
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
                onClick={imageClickHandler}
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

        <div style={styles.mainContent}>
          <aside style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Experience Level</h3>
              <ul style={styles.filterList}>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Entry Level
                  </label>
                </li>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Intermediate
                  </label>
                </li>
                <li style={styles.filterItem}>
                  <label>
                    <input type="checkbox" /> Expert
                  </label>
                </li>
              </ul>
            </div>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Tags</h3>
              <div style={styles.selectedTags}>
                {/* <h4 style={styles.selectedTitle}>Selected Tags:</h4> */}
                {selectedTags.length > 0 ? (
                  <p>{selectedTags.join(" ")}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <ul style={styles.filterList}>
                {allSkills.slice(0, visibleCount).map((skill, index) => (
                  <li key={index} style={styles.filterItem}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(skill)}
                        onChange={() => handleTagChange(skill)}
                      />{" "}
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
              {visibleCount < allSkills.length && (
                <button style={styles.showMoreButton} onClick={handleShowMore}>
                  Show More ⬇
                </button>
              )}
              {visibleCount === allSkills.length && (
                <button style={styles.showLessButton} onClick={handleShowLess}>
                  Show Less ⬆
                </button>
              )}
            </div>
            <button type="submit" style={{ backgroundColor: "#14a800" }}>
              Search
            </button>
          </aside>

          <main style={styles.jobListings}>
            <h2>Jobs you might like</h2>

            {jobs.map((job) => (
              <div key={job.id} style={styles.jobCard}>
                <h3>{job.content}</h3>
                <p style={styles.jobDescription}>{job.description}</p>
                <div style={styles.jobDetails}>
                  <span style={styles.budget}>{job.price}</span>
                  <span style={styles.proposals}>{job.tags} proposals</span>
                </div>
                <div style={styles.skills}>
                  {job.skills.map((skill) => (
                    <span key={skill} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
                <button style={styles.applyButton}>Apply Now</button>
              </div>
            ))}
          </main>
        </div>
      </div>
    );
  }
}
