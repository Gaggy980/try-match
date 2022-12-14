import "./card.css";

const Card = ({ card, handleChoice, flipped, disabled, headTitle }) => {
  
  function handleCardFlip() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <div className={headTitle === "FROZEN Memory"? "back fr" : "back he"} 
        onClick={handleCardFlip}></div>
      </div>
    </div>
  );
};

export default Card;
