import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  selectedTags1: {
    marginTop: "15px",
  },
  selectedTitle: {
    fontSize: "16px",
    marginBottom: "5px",
    border: "5px solid black",
    borderRadius: "5px",
  },
};

const styles2 = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
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
  headerButtons: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#14a800",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "transparent",
    color: "#14a800",
    border: "1px solid #14a800",
  },
  main: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    minHeight: "100px",
    resize: "vertical",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "white",
  },
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  color: "black",
  backgroundColor: "transparent",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  width: "100%",
};

export default function AddJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [requiredConnections, setRequiredConnections] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  //   const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    advertiserId: "",
    jobTitle: "",
    content: "",
    requiredConnections: "",
    experienceLevel: "",
    tags: [],
    price: "",
    isDone: false,
  });

  const tags = [
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
  
  const navigate = useNavigate();

  const defaultProfileImageUrl =
    "data:image/png;base64,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";

  const token = localStorage.getItem("token");
  const imagePath = localStorage.getItem("imagePath");
  const homepageHandler = () => {
    navigate("/home");
  };

  let userRole = null;
  let userId = null;

  const handleLogout = () => {
    // Sessiyanı təmizləmək
    localStorage.removeItem("token"); // Tokeni silmək
    localStorage.removeItem("imagePath"); // İstifadəçi məlumatlarını silmək

    // Giriş səhifəsinə yönləndirmək
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to an API
    console.log({
      formData,
    });
    // Clear form after submission
    // setTitle("");
    // setCompany("");
    // setLocation("");
    // setDescription("");
    // setContent("");
    // setRequiredConnections("");
    // setExperienceLevel("");
    // setTags("");
    // setPrice("");
    // Clear form after submission
    // setFormData({
    //   id: uuidv4().toString(),
    //   advertiserId: userId,
    //   title: "",
    //   content: "",
    //   price: "",
    //   requiredConnections: "",
    //   experienceLevel: "",
    //   tags: "",
    // });
    fetchAddJob();
    // alert("Job added successfully!");
    // setSelectedSkills([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    formData.tags = selectedTags;
    formData.isDone = false;
  };

  const toggleSkill = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((item) => item !== tag)
        : [...prevSelected, tag]
    );

    console.log(selectedTags);
  };

  const fetchAddJob = async () => {
    try {
      formData.advertiserId = userId;
      formData.id = uuidv4().toString();
      formData.tags = selectedTags;

      const response = await fetch(`https://localhost:7086/api/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job əlavə edildi:", data);
        alert(data.Message); // Backend-dən gələn mesajı göstərin
      } else {
        const errorData = await response.json();
        console.error("Xəta baş verdi:", errorData);
        alert("Job əlavə edilərkən xəta baş verdi.");
      }
    } catch (error) {
      console.error("Server ilə əlaqə mümkün olmadı:", error);
      alert("Server ilə əlaqə mümkün olmadı.");
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

  return (
    <div>
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
      <main style={styles2.main}>
        <h1 style={{ color: "#14a800" }}>Add New Job</h1>
        <form style={styles2.form} onSubmit={handleSubmit}>
          <div style={styles2.formGroup}>
            <label
              htmlFor="title"
              style={{ ...styles2.label, color: "black", textAlign: "left" }}
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              style={{
                ...styles2.input,
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                cursor: "pointer",
                height: "2em",
              }}
              required
            />
          </div>
          <div style={styles2.formGroup}>
            <label
              htmlFor="content"
              style={{ ...styles2.label, color: "black", textAlign: "left" }}
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              style={{
                ...styles2.textarea,
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
              required
            />
          </div>
          <div style={styles2.formGroup}>
            <label
              htmlFor="price"
              style={{ ...styles2.label, color: "black", textAlign: "left" }}
            >
              Price (with Dollar $)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              style={{
                ...styles2.input,
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                cursor: "pointer",
                height: "2em",
              }}
              required
            />
          </div>
          <div style={styles2.formGroup}>
            <label
              htmlFor="requiredConnections"
              style={{ ...styles2.label, color: "black", textAlign: "left" }}
            >
              Required Connections
            </label>
            <input
              type="number"
              id="requiredConnections"
              name="requiredConnections"
              value={formData.requiredConnections}
              onChange={handleInputChange}
              style={{
                ...styles2.input,
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                cursor: "pointer",
                height: "2em",
              }}
              required
            />
          </div>
          <div style={styles2.formGroup}>
            <label
              htmlFor="experienceLevel"
              style={{ ...styles2.label, color: "black", textAlign: "left" }}
            >
              Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleInputChange}
              style={{
                ...styles2.select,
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                cursor: "pointer",
                height: "3em",
              }}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div style={styles2.formGroup}>
            {/* <div style={{ marginTop: "20px" }}> */}
            <label
              style={
                (styles2.label,
                { color: "black", textAlign: "left", fontWeight: "bold" })
              }
            >
              Selected Tags:
            </label>
            {selectedTags.length > 0 ? (
              <ul style={{ color: "black", listStyleType: "none" }}>
                {selectedTags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  color: "black",
                  textAlign: "left",
                  marginLeft: "20px",
                }}
              >
                No tags selected.
              </p>
            )}
            {/* </div> */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px", // space between tags
                border: "1px solid #ccc",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              {tags.map((tag, index) => (
                <div
                  key={index}
                  onClick={() => toggleSkill(tag)}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    margin: "5px 0",
                    backgroundColor: selectedTags.includes(tag)
                      ? "#4caf50"
                      : "#f0f0f0",
                    color: selectedTags.includes(tag) ? "#fff" : "#000",
                    borderRadius: "3px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button type="submit" style={styles2.button}>
            Add Job
          </button>
        </form>
      </main>
    </div>
  );
}
