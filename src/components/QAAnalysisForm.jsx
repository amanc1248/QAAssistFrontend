import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QAAnalysisForm.css';

const QAAnalysisForm = () => {
  const [releaseVersion, setReleaseVersion] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [releases, setReleases] = useState([]);

  // Fetch releases on component mount
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/jira/get-releases');
        setReleases(response.data);
      } catch (error) {
        console.error('Error fetching releases:', error);
        setError('Failed to fetch releases. Please try again.');
      }
    };

    fetchReleases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5002/api/qa/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ releaseVersion }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setError('Failed to analyze release. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qa-analysis-container">
      <h1>QA Release Analysis</h1>
      
      <form onSubmit={handleSubmit} className="analysis-form">
        <div className="form-group">
          <label htmlFor="releaseVersion">Release Version:</label>
          <select
            id="releaseVersion"
            value={releaseVersion}
            onChange={(e) => setReleaseVersion(e.target.value)}
            required
          >
            <option value="">Select a release</option>
            {releases.map((release) => (
              <option key={release.id} value={release.id}>
                {release.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Release'}
        </button>
      </form>

      {loading && <div className="loading">Analyzing release impact...</div>}
      {error && <div className="error-message">{error}</div>}

      {analysisResult && (
        <div className="analysis-results">
          <h2>Analysis Results</h2>
          {analysisResult}
          
          {/* <section>
            <h3>Affected Areas:</h3>
            <ul>
              {analysisResult.affectedAreas.map((area, index) => (
                <li key={index} className={`impact-${area.impactLevel.toLowerCase()}`}>
                  <span className="area-name">{area.name}</span>
                  <div className="area-details">
                    <span className="confidence">Confidence: {(area.confidence * 100).toFixed(1)}%</span>
                    <span className="impact-level">Impact: {area.impactLevel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Recommended Test Cases:</h3>
            <ul>
              {analysisResult.testCases.map((testCase, index) => (
                <li key={index} className={`priority-${testCase.priority.toLowerCase()}`}>
                  <div className="test-case-header">
                    <span className="test-id">{testCase.id}</span>
                    <span className="test-area">{testCase.area}</span>
                  </div>
                  <p className="test-name">{testCase.name}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Additional Actions Required:</h3>
            <ul>
              {analysisResult.additionalActions.map((action, index) => (
                <li key={index} className={`priority-${action.priority.toLowerCase()}`}>
                  <p className="action-text">{action.action}</p>
                  <div className="action-details">
                    <span className="priority">Priority: {action.priority}</span>
                    <span className="deadline">Deadline: {action.deadline}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section> */}
        </div>
      )}
    </div>
  );
};

export default QAAnalysisForm;