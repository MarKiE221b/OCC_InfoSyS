import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";
import { FaMapMarkerAlt } from "react-icons/fa";
import { createRoot } from "react-dom/client";

const regionColors = {
  "Region 3": "text-red-500",
  "Region 8": "text-yellow-500",
  "Region 9": "text-blue-500",
  "Region 10": "text-green-500",
  "Region 11": "text-orange-500",
  "Region 12": "text-purple-500",
};

const SchoolMap = ({ sucDetails }) => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (!sucDetails || sucDetails.length === 0) return;

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([121.774, 12.8797]),
        zoom: 6,
      }),
    });

    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
    });
    map.addOverlay(popup);

    sucDetails.forEach((school) => {
      if (!school.coordinates || school.coordinates.length !== 2) return;
      const [latitude, longitude] = school.coordinates;
      const coords = fromLonLat([longitude, latitude]);

      const markerElement = document.createElement("div");
      markerElement.className = "text-3xl cursor-pointer";
      
      // Use React Icons as markers
      const root = createRoot(markerElement);
      root.render(<FaMapMarkerAlt className={`${regionColors[school.region] || "text-black"}`} />);
      
      const markerOverlay = new Overlay({
        position: coords,
        element: markerElement,
      });
      map.addOverlay(markerOverlay);

      markerElement.addEventListener("click", () => {
        popup.setPosition(coords);
        popupRef.current.innerHTML = `
          <div class='p-4 bg-white shadow-lg rounded-lg w-64'>
            <h2 class='text-lg font-semibold'>${school.name}</h2>
            <p class='text-sm'>${school.address}</p>
            <p class='text-sm text-gray-500'>Region: ${school.region}</p>
          </div>`;
      });
    });

    return () => map.setTarget(null);
  }, [sucDetails]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[700px] rounded-lg shadow-lg overflow-hidden" />
      <div ref={popupRef} className="absolute z-10 left-10"></div>
      <div className="absolute top-4 left-10 bg-white p-3 shadow-lg rounded-lg">
        <h3 className="font-semibold mb-2">School Categories</h3>
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center space-x-2">
            <FaMapMarkerAlt className={`${color} text-xl`} />
            <span>{region}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolMap;