import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import {IoMdSnow} from 'react-icons/io'
import {HiMenuAlt1} from 'react-icons/hi'

const cardImages = [
  { src: "./elsa.png", matched: false },
  { src: "./anna.png", matched: false },
  { src: "./gecko.png", matched: false },
  { src: "./hans.png", matched: false },
  { src: "./kristoff.png", matched: false },
  { src: "./sven.png", matched: false },
  { src: "./olaf.png", matched: false },
  { src: "./troll.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices and update turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start game automaticly
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game-window">
      <h1 className="title">FROZEN Memory</h1>
      <div onClick={shuffleCards} className="play-btn">
       <IoMdSnow size={30}/> Play <IoMdSnow size={30}/>
      </div>
      <div className="scores-box">
        <h2 className="turn-display">Turns: {turns}</h2>
        <h2 className="scoreboard-display">ScoreBoard <HiMenuAlt1 size={20}/></h2>
      </div>
      <div className="cards-box">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
