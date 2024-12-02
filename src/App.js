
import './App.css';
// components
import StartScreen from './components/StartScreen';
import { useCallback, useEffect, useState} from 'react';
import { wordsList } from './data/words';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

function App() {
  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessesLetters, setGuessesLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(20);
  const [score, setScore] = useState(0);

  const clearLetterState = () => {
    setGuessesLetters([]);
    setWrongLetters([]);
  }
  useEffect(() => {
    if(guesses <= 0){
      clearLetterState();
      setStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    if(guessesLetters.length === uniqueLetters.length){ 
      setScore((actualScore) => actualScore += 100);
      stratGame();}
  }, [guessesLetters, letters, stratGame]);

  const retry = () => {
    setScore(0);
    setGuesses(20);
    setStage(stages[0].name);
  };

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    if (!category) {
        console.error("Categoria não encontrada.");
        return;
    }

    const wordList = words[category];
    if (!wordList || wordList.length === 0) {
        console.error("Nenhuma palavra encontrada para a categoria:", category);
        return;
    }
    console.log(category);
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);

    return {word, category};
  }, [words]);
  const stratGame = useCallback(() => {

    clearLetterState();
    const {word, category} = pickWordAndCategory();
    let lowWord = word.toLowerCase();
    let wordLtters = lowWord.split('');
    console.log(wordLtters);
    
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLtters);
    setStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if(guessesLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if(letters.includes(normalizedLetter)){
      setGuessesLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, 
        normalizedLetter
      ]);
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  return (
    <div className="App">
      {stage === 'start' && <StartScreen stratGame={stratGame}/>}
      {stage === 'game' && <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        guessesLetters={guessesLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {stage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
