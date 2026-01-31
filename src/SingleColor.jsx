import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

const SingleColor = ({ rgb, hex, index }) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`#${hex}`);
    setCopy(true);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setCopy(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copy]);

  return (
    <div
      style={{
        backgroundColor: `rgb(${rgb})`,
      }}
      className="p-20 relative shadow-2xl my-3 rounded-md cursor-pointer"
    >
      {copy ? (
        <FaCheckDouble className="absolute text-2xl top-5 left-5" />
      ) : (
        <IoCopyOutline
          className="absolute text-2xl top-5 left-5"
          onClick={handleCopy}
        />
      )}

      <h3 className={`text-2xl ${index > 9 && "text-white"}`}>#{hex}</h3>
    </div>
  );
};

export default SingleColor;
