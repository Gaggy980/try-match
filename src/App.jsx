import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import {IoMdSnow} from 'react-icons/io'
import {HiMenuAlt1} from 'react-icons/hi'
import {cardsFrozen, cardsHeroes} from './database'



function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cardImages, setCardImages] = useState([]);
  const [headTitle, setHeadTitle]  = useState("");
  const [hidden, setHidden] = useState(false);


  // set cards theme to Heroes or Frozen
  const startFrozen = () => {
    setCardImages(cardsFrozen)
    shuffleCards()
    setColorPallete("#242070", "#B5EFE8", "rgb(36,32,112,0.70)")
    toggleBack('url("back.png")')
    toggleBgImage('url("./public/bgfrozen.png")')
    setHeadTitle("FROZEN Memory")
    setHidden(true)
  }
  const startHeroes = () => {
    setCardImages(cardsHeroes)
    shuffleCards()
    setColorPallete("#390100", "#D30C0F", "rgb(57,1,0,0.9)")
    toggleBack('url("./backHeros.png")')
    toggleBgImage('url("MarvelHeroes.png")')
    setHeadTitle("HEROES Memory")
    setHidden(true)

  }
  // update back of the cards css variable
  const toggleBack = (bgPic) => {
    document.documentElement.style.setProperty('--bg-pic',bgPic)
  }
  // update background image css variable
  const toggleBgImage = (bgImg) => {
    document.documentElement.style.setProperty('--bg-img',bgImg)
  }
  const setColorPallete = (colorPrim,colorSec,colorPrimTran) => {
    document.documentElement.style.setProperty('--color-prim',colorPrim)
    document.documentElement.style.setProperty('--color-sec',colorSec)
    document.documentElement.style.setProperty('--color-prim-trans',colorPrimTran)
  }
  

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

  // // start game automaticly
  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  return (
    <div className="game-window">
      <div className={hidden ? "hidden"   : "theme-box"}>
        <button onClick={startFrozen}>For Girls</button>
        <button onClick={startHeroes}>For Boys</button>
      </div>
      <h1 className="title">{headTitle}</h1>
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
