import React, { useEffect, useState } from "react";
import "../styles/Resume.css";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/resume")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resume");
        return res.json();
      })
      .then((data) => {
        setResume(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching resume:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="loading-text">Loading resume...</p>;

  if (!resume)
    return <p className="loading-text">No resume data found.</p>;

  return (
    <div className="resume">
      <header className="resume-header">
        <h1 className="resume-name">{resume.name}</h1>
        {/* <p className="resume-title">{resume.title}</p> */}
        <p className="resume-contact">
          {resume.email}
        </p>
      </header>

      <section className="resume-section">
        <h2>Professional Summary</h2>
        <p>{resume.summary}</p>
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <ul className="skills">
          {resume.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        {resume.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <strong>{exp.position}</strong>, {exp.company}
            </div>
            <div className="experience-duration">{exp.duration}</div>
            <p className="experience-details">{exp.details}</p>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="education-item">
            <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resume;
