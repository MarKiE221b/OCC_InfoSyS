import React from "react";
import { Link } from "react-router";

const CardSelections = ({ cards, onCardSelect }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-start">
      {cards.map((card, index) => (
        <button
          key={index}
          className="hover:scale-105 transition-transform duration-300"
          onClick={() => onCardSelect(card)}
          type="button"
        >
          <div className="card bg-base-100 w-64 shadow-xl">
            <figure className="p-5">
              <img src={card.image} alt="document" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{card.title}</h2>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CardSelections;
