import {useState} from 'react';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const StatisticsLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
}

const Statistics = (props) => {
  const {good, neutral, bad, total} = props;

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={(good - bad) / total} />
        <StatisticsLine text="positive" value={(good / total) * 100 + " %"} />
      </table>
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => {
        setGood(good+1)
        setTotal(total+1)
      }} text="good" />
      <Button onClick={() => {
        setNeutral(neutral+1)
        setTotal(total+1)
      }} text="neutral" />
      <Button onClick={() => {
        setBad(bad+1)
        setTotal(total+1)
      }} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  );
}

export default App;