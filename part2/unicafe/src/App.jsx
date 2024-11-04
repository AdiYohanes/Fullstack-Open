/* eslint-disable react/prop-types */
import { useState } from "react";

const FeedbackButton = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

const StatisticRow = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleGoodClick = () => {
    setGoodCount(goodCount + 1);
    setTotalCount(totalCount + 1);
  };

  const handleNeutralClick = () => {
    setNeutralCount(neutralCount + 1);
    setTotalCount(totalCount + 1);
  };

  const handleBadClick = () => {
    setBadCount(badCount + 1);
    setTotalCount(totalCount + 1);
  };

  const Statistics = ({ good, neutral, bad, total }) => {
    const average = total > 0 ? (good - bad) / total : 0;
    const positivePercentage = total > 0 ? (good / total) * 100 : 0;

    return (
      <table>
        <tbody>
          <StatisticRow label="Good " value={good} />
          <StatisticRow label="Neutra l" value={neutral} />
          <StatisticRow label="Bad " value={bad} />
          <StatisticRow label="Total " value={total} />
          <StatisticRow label="Average " value={average.toFixed(2)} />
          <StatisticRow
            label="Positive"
            value={`${positivePercentage.toFixed(2)} %`}
          />
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <FeedbackButton onClick={handleGoodClick} label="Good" />
        <FeedbackButton onClick={handleNeutralClick} label="Neutral" />
        <FeedbackButton onClick={handleBadClick} label="Bad" />
      </div>

      <h2>Statistics</h2>
      {totalCount === 0 ? (
        <p>No Feedback Given</p>
      ) : (
        <Statistics
          good={goodCount}
          neutral={neutralCount}
          bad={badCount}
          total={totalCount}
        />
      )}
    </div>
  );
}

export default App;
