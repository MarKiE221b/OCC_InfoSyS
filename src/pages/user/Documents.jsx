import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import CardSelections from "../../components/user-components/documentComponents/CardSelections";
import documentImg from "../../assets/document-svgrepo-com.png";
import travelImg from "../../assets/airplane-plane-svgrepo-com.png";
import nonTravelImg from "../../assets/no-traveling.png"

const Documents = () => {
  const pathname = useLocation().pathname;

  const cards = [
    {
      title: "Referendum",
      image: documentImg,
      link: "ref",
    },
    {
      title: "Resolution",
      image: documentImg,
      link: "reso",
    },
  ];

  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setShowPrompt(true);
  };

  const handlePromptSelect = (type) => {
    setShowPrompt(false);
    window.location.href = `/user/documents/${selectedCard.link}/${type}`;
  };

  return (
    <div className="py-20">
      {pathname === "/user/documents" ? (
        <div>
          {showPrompt && selectedCard.title === "Referendum" ? (
            <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center lg:pl-96">
              <div className="bg-white p-11 rounded-lg">
                <h2 className="text-lg text-center font-bold mb-10">
                  Select Type
                </h2>
                <div className="flex gap-4">
                  <button
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={() => handlePromptSelect("travel")}
                    type="button"
                  >
                    <div className="card bg-base-100 w-64 shadow-xl">
                      <figure className="p-5">
                        <img src={travelImg} alt="document" />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">Travel</h2>
                      </div>
                    </div>
                  </button>

                  <button
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={() => handlePromptSelect("non-travel")}
                    type="button"
                  >
                    <div className="card bg-base-100 w-64 shadow-xl">
                      <figure className="p-5">
                        <img src={nonTravelImg} alt="document" />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">Non-Travel</h2>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <CardSelections cards={cards} onCardSelect={handleCardSelect} />
          )}
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Documents;
