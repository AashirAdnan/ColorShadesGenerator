import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

const Generator = () => {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [list, setList] = useState(new Values("purple").all(10));
  const handleColor = (e) => {
    e.preventDefault();
    if (!color) {
      setError(true);
    } else {
      setError(false);
      try {
        setColorError(false);
        const rang = new Values(color).all(10);
        setList(rang);
        console.log(rang);
      } catch (error) {
        setColorError(true);
      }
    }
  };
  return (
    <>
      <form
        action=""
        className="w-1/2 rounded-md shadow-2xl mx-auto shadow-gray-500 p-5 my-10"
      >
        <h1>Color Generator</h1>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g. Green"
          type="text"
          className={`w-full rounded-md outline-0 focus:border-cyan-500 border ${colorError ? "border-red-300 border-2" : "border-gray-200"} p-2 my-2`}
        />

        {error && (
          <p className="text-red-500 font-semibold">Please enter a color</p>
        )}

        <button
          onClick={handleColor}
          className="w-full rounded-md bg-purple-500 p-3 text-white "
        >
          Generate
        </button>
      </form>

      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {list?.map((item, index) => {
          return (
            <SingleColor index={index} {...item} hex={item.hex} key={index} />
          );
        })}
      </div>
    </>
  );
};

export default Generator;
