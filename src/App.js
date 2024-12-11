import './App.css';
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import personPee from './person_pee.png';
import noPerson from './no_person.png';
import bottle from './bottle.png';
import plant from './plant.png';
import background from './background.jpg';

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [averageFunnyScore, setAverageFunnyScore] = useState(60); // Example average funny score

  const handleOkClick = () => {
    if (!name.trim()) {
      alert('Please enter your name!');
      return;
    }
    setIntroVisible(false);
  };

  const handleChoice = (choicePoints) => {
    setPoints((prevPoints) => prevPoints + choicePoints);

    if (question < 6) {
      setQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetGame = () => {
    setQuestion(1);
    setPoints(0);
    setShowResults(false);
    setIntroVisible(true);
  };

  const questions = {
    1: [personPee, noPerson, noPerson],
    2: [noPerson, noPerson, personPee, noPerson],
    3: [personPee, noPerson, personPee, noPerson],
    4: [noPerson, noPerson, noPerson, noPerson],
    5: [personPee, personPee, personPee, personPee],
    6: [personPee, noPerson, bottle, plant],
  };

  const pointsMapping = {
    1: [2, 1, 0],
    2: [0, 1, 2, 1],
    3: [2, 1, 1, 0],
    4: [0, 1, 1, 0],
    5: [0, 1, 1, 0],
    6: [2, 0, 1, -1],
  };

  const getResult = () => {
    if (points >= -1 && points <= 2) {
      return {
        title: "The Overthinker",
        description: "You’re the type who debates endlessly before making any decision. Your life motto is 'What if?'",
        funnyValue: 20,
        chaosLevel: 5,
      };
    } else if (points >= 3 && points <= 5) {
      return {
        title: "The Rule Follower",
        description: "You stick to societal norms like glue. Rules are your safe zone, and chaos is your worst nightmare.",
        funnyValue: 50,
        chaosLevel: 10,
      };
    } else if (points >= 6 && points <= 8) {
      return {
        title: "The Mischief Maker",
        description: "Chaos is your middle name. You’re the person who flips toilet paper rolls just to confuse people.",
        funnyValue: 80,
        chaosLevel: 50,
      };
    } else if (points >= 9 && points <= 10) {
      return {
        title: "The Wild Card",
        description: "Rules? What rules? You live life on the edge, starting conversations at urinals. A true legend.",
        funnyValue: 100,
        chaosLevel: 100,
      };
    }
  };

  const result = getResult();

  const chartData = [
    ["Category", "Score"],
    ["Your Funny Score", result.funnyValue],
    ["Average Funny Score", averageFunnyScore],
  ];

  const chartOptions = {
    pieHole: 0.4,
    colors: ['#61dafb', '#ff6f61'],
    pieSliceTextStyle: {
      color: 'black',
    },
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <header className="App-header">
        <div className="App-header-left">PeePee</div>
        <div className="App-header-right" onClick={() => alert('PeePee is a fun game to test your personality based on urinal etiquette!')}>
          Information
        </div>
      </header>

      {introVisible ? (
        <div className="App-intro-modal">
          <h1>Welcome to PeePee!</h1>
          <p>
            Enter your name below to start the game and discover your personality based on fun scenarios!
          </p>
          <div className="App-input-container">
            <input
              type="text"
              className="App-input"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="App-button" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      ) : showResults ? (
        <div className="results">
          <h1>{result.title}</h1>
          <p>{result.description}</p>
          <div className="chart-container">
            <h2>Your Funny Score</h2>
            <Chart chartType="PieChart" data={chartData} options={chartOptions} width="100%" height="300px" />
          </div>
          <button className="App-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="game">
          <h2>Question {question}</h2>
          <p>Where will you go?</p>
          <div className="urinal-row">
            {questions[question].map((imgSrc, index) => (
              <div
                key={index}
                className="urinal"
                onClick={() => handleChoice(pointsMapping[question][index])}
              >
                <img src={imgSrc} alt={`Choice ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
