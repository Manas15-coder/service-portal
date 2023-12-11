import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewApplicants({ match }) {
  const jobId = match.params.jobId;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch job applicants
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`https://job-portal-uqhl.onrender.com/api/job/view-applicants/64e0f80e65e43e42efa960a4`);
        if (response.data.success) {
          setApplicants(response.data.applicants);
          setLoading(false);
        } else {
          setError('Error fetching applicants.');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching applicants.');
        setLoading(false);
      }
    };

    // Call the fetchApplicants function
    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <h1>View Applicants</h1>
      {loading && <p>Loading applicants...</p>}
      {error && <p>{error}</p>}
      {applicants.length > 0 && (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant._id}>
              <h3>{applicant.name}</h3>
              <p>Email: {applicant.email}</p>
              {/* Display additional applicant information as needed */}
            </li>
          ))}
        </ul>
      )}
      {applicants.length === 0 && !loading && !error && (
        <p>No applicants found for this job.</p>
      )}
    </div>
  );
}

export default ViewApplicants;
