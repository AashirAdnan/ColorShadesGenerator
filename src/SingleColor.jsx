import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

const SingleColor = ({ rgb, hex, index, weight, type }) => {
  const [copy, setCopy] = useState(false);
  const isDarkText = index < 10;
  const textColorClass = isDarkText ? "text-slate-950" : "text-white";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`#${hex}`);
      setCopy(true);
    } catch {
      setCopy(false);
    }
  };

  useEffect(() => {
    if (!copy) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCopy(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copy]);

  return (
    <article
      style={{
        backgroundColor: `rgb(${rgb})`,
      }}
      className={`relative overflow-hidden rounded-3xl p-6 shadow-[0_20px_45px_rgba(15,23,42,0.16)] transition duration-200 hover:-translate-y-1 ${textColorClass}`}
    >
      <div className="absolute right-4 top-4">
        <button
          type="button"
          onClick={handleCopy}
          className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur transition ${
            isDarkText
              ? "border-black/10 bg-white/55 text-slate-900 hover:bg-white/75"
              : "border-white/20 bg-black/10 text-white hover:bg-black/20"
          }`}
          aria-label={`Copy #${hex}`}
        >
          {copy ? <FaCheckDouble className="text-xl" /> : <IoCopyOutline className="text-xl" />}
        </button>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.28em] opacity-70">
        {type} {weight}
      </p>
      <h3 className="mt-10 text-3xl font-black tracking-tight">#{hex}</h3>
      <p className="mt-2 text-sm font-medium opacity-80">rgb({rgb.join(", ")})</p>
      <p className="mt-8 text-sm font-semibold opacity-90">{copy ? "Copied to clipboard" : "Tap copy"}</p>
    </article>
  );
};

export default SingleColor;
