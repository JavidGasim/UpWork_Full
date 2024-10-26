import { useEffect } from "react";
import React, { useState } from "react";
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
    width: "100%",
    height: "35px",
    marginBottom: "1rem",
    width: "70%",
    height: "35px",
  },
  searchInput: {
    flexGrow: 1,
    color: "black",
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

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

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

  let userRole = null;

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
              <button style={styles.iconButton}>👤</button>
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
              <button style={styles.iconButton}>👤</button>
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
