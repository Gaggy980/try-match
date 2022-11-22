import "./card.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  
  function handleCardFlip() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <div className="back" onClick={handleCardFlip}></div>
      </div>
    </div>
  );
};

export default Card;
