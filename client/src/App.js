import React, { useEffect, useState } from "react";
import './App.css';

function App() {
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState([]);

    const submitJob = async () => {
        await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job }),
        });
        setJob('');
        fetchJobs();
    };

    const fetchJobs = async () => {
        const res = await fetch('http://localhost:5000/jobs');
        const data = await res.json();
        setJobs(data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="App">
            <h1>Enter Your Job Title</h1>
            <input
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="e.g. Software Engineer"
            />
            <button onClick={submitJob}>Submit</button>

            <div className="bubbles">
                {jobs.map(({ job, percent }) => (
                    <div
                        key={job}
                        className="bubble"
                        style={{ width: `${percent * 3}px`, height: `${percent * 3}px` }}
                    >
                        {job} ({percent}%)
                        </div>
                ))}
            </div>
        </div>
    );
}

export default App;