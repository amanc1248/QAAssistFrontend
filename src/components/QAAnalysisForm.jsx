import React, { useState } from 'react';
import './QAAnalysisForm.css';

const QAAnalysisForm = () => {
  const [releaseVersion, setReleaseVersion] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating API call - replace with actual API integration
    try {
      // Mock response - replace with actual API response
      const mockResponse = {
        affectedAreas: [
          'User Authentication Module',
          'Payment Processing System',
          'Order Management Interface'
        ],
        testCases: [
          'Verify user login flow with new authentication changes',
          'Test payment gateway integration with updated API',
          'Validate order status updates in the admin panel'
        ],
        additionalActions: [
          'Update test environment with latest configuration',
          'Coordinate with DevOps for deployment verification',
          'Review API documentation for changed endpoints'
        ]
      };

      setTimeout(() => {
        setAnalysisResult(mockResponse);
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error fetching analysis:', error);
      setLoading(false);
    }
  };

  return (
    <div className="qa-analysis-container">
      <h1>QA Release Analysis</h1>
      
      <form onSubmit={handleSubmit} className="analysis-form">
        <div className="form-group">
          <label htmlFor="releaseVersion">Release Version:</label>
          <input
            type="text"
            id="releaseVersion"
            value={releaseVersion}
            onChange={(e) => setReleaseVersion(e.target.value)}
            placeholder="Enter release version (e.g., v2.1.0)"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Release'}
        </button>
      </form>

      {loading && <div className="loading">Analyzing release impact...</div>}

      {analysisResult && (
        <div className="analysis-results">
          <h2>Analysis Results</h2>
          
          <section>
            <h3>Affected Areas:</h3>
            <ul>
              {analysisResult.affectedAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Recommended Test Cases:</h3>
            <ul>
              {analysisResult.testCases.map((testCase, index) => (
                <li key={index}>{testCase}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Additional Actions Required:</h3>
            <ul>
              {analysisResult.additionalActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default QAAnalysisForm; 