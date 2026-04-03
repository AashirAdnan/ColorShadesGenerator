import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

const defaultColor = "#7c3aed";

const Generator = () => {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [list, setList] = useState(new Values(defaultColor).all(10));
  const handleColor = (e) => {
    e.preventDefault();

    const trimmedColor = color.trim();

    if (!trimmedColor) {
      setError("Please enter a color value.");
      return;
    }

    try {
      const palette = new Values(trimmedColor).all(10);
      setList(palette);
      setColor(trimmedColor);
      setError("");
    } catch {
      setError("That color was not recognized. Try a hex value or CSS color name.");
    }
  };
  return (
    <section className="mx-auto max-w-6xl">
      <div className="mx-auto mb-8 max-w-2xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
          Palette Studio
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
          Generate clean color shades in one step
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
          Enter any valid CSS color like <span className="font-semibold">tomato</span>,{" "}
          <span className="font-semibold">#0f766e</span>, or{" "}
          <span className="font-semibold">rgb(99, 102, 241)</span> and copy the shade you need.
        </p>

        <form onSubmit={handleColor} className="mt-6">
          <label htmlFor="color-input" className="mb-2 block text-sm font-semibold text-slate-700">
            Base color
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              id="color-input"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="e.g. #7c3aed"
              type="text"
              className={`min-h-12 flex-1 rounded-2xl border bg-white px-4 py-3 text-base outline-none transition focus:border-violet-500 ${
                error ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
              }`}
              aria-invalid={Boolean(error)}
              aria-describedby="color-help color-error"
            />
            <button
              type="submit"
              className="min-h-12 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Generate palette
            </button>
          </div>

          <p id="color-help" className="mt-3 text-sm text-slate-500">
            Tip: named colors, hex, rgb, and hsl values all work.
          </p>
          {error && (
            <p id="color-error" className="mt-2 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          {["#7c3aed", "#14b8a6", "#f97316", "#0f172a"].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setColor(sample);
                setError("");
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Generated shades</h2>
          <p className="text-sm text-slate-600">{list.length} swatches ready to copy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((item, index) => {
          return <SingleColor index={index} {...item} hex={item.hex} key={`${item.hex}-${index}`} />;
        })}
      </div>
    </section>
  );
};

export default Generator;
