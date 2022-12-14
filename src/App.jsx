import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { HiMenuAlt1 } from "react-icons/hi";
import { cardsFrozen, cardsHeroes } from "./database";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cardImages, setCardImages] = useState([]);
  const [headTitle, setHeadTitle] = useState("");
  const [hidden, setHidden] = useState(false);

  // set cards theme to Heroes or Frozen
  const startFrozen = () => {
    setCardImages(cardsFrozen);
    setColorPallete("#242070", "#B5EFE8", "rgb(36,32,112,0.70)");
    setHeadTitle("FROZEN Memory");
    setHidden(true);
    shuffleCards();
  };
  const startHeroes = () => {
    setCardImages(cardsHeroes);
    setColorPallete("#390100", "#D30C0F", "rgb(57,1,0,0.9)");
    setHeadTitle("HEROES Memory");
    setHidden(true);
    shuffleCards();
  };
  const setBg = () => {
    if (headTitle === "HEROES Memory") {
      return "h";
    } else {
      return "f";
    }
  };

  const setColorPallete = (colorPrim, colorSec, colorPrimTran) => {
    document.documentElement.style.setProperty("--color-prim", colorPrim);
    document.documentElement.style.setProperty("--color-sec", colorSec);
    document.documentElement.style.setProperty("--color-prim-trans",colorPrimTran);
  };

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

  // reset choices and update turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start game automaticly
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game-box">
      <div className={setBg()}>
        <div className={hidden ? "hidden" : "theme-box"}>
          <button onClick={startFrozen}>For Girls</button>
          <button onClick={startHeroes}>For Boys</button>
        </div>
        <h1 className="title">{headTitle}</h1>
        <div onClick={shuffleCards} className="play-btn">
          Play
        </div>
        <div className="scores-box">
          <h2 className="turn-display">Turns: {turns}</h2>
          <h2 className="scoreboard-display">
            ScoreBoard <HiMenuAlt1 size={20} />
          </h2>
        </div>
        <div className="cards-box">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              headTitle={headTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
