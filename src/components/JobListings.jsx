import React, { useState, useEffect } from "react";
import JobListing from "./JobListing";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetchJobs function
  const fetchJobs = async () => {
    const apiUrl = isHome
      ? "http://localhost:8000/jobs?_limit=3"
      : "http://localhost:8000/jobs";

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 texta-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {jobs?.length > 0 &&
                  jobs?.map((job, index) => (
                    <JobListing key={index} job={job} />
                  ))}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobListings;
