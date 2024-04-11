import React, { useState, useEffect } from "react";
import UniPopup from "./components/UniPopup";
import TropForm from "@views/trip/tripFrom";

const CardPublish = ({ route }) => {
  const [showPopup, setShowPopup] = useState(true);

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <TropForm route={route} />
      <UniPopup show={showPopup} onHidePopup={hidePopup} />
    </>
  );
};

export default CardPublish;
