"use client"
import { useState, useEffect } from "react";
import countries from "../data";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");

  const translate = async () => {
    if (!fromText.trim() || !translateFrom || !translateTo) return;

    try {
      const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setToText(data.matches[0]?.translation || data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const exchangeLanguages = () => {
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
    setFromText(toText);
    translate();
  };

  useEffect(() => {
    translate();
  }, [fromText, translateFrom, translateTo]);

  return (
    <div className="container">
      <div className="sm:mt-32 mt-32 bg-white border-2 border-slate-400 shadow-lg shadow-slate-300 rounded-lg p-5">
        <div className="flex items-center justify-center mb-4">
          <svg width="2rem" height="2rem" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" height="60" rx="10" width="60" /><rect fill="#f1f3f4" height="30" rx="4" width="24" x="8" y="8" /><path d="M28,39.5H12A5.506,5.506,0,0,1,6.5,34V12A5.506,5.506,0,0,1,12,6.5H28A5.506,5.506,0,0,1,33.5,12V34A5.506,5.506,0,0,1,28,39.5ZM12,9.5A2.5,2.5,0,0,0,9.5,12V34A2.5,2.5,0,0,0,12,36.5H28A2.5,2.5,0,0,0,30.5,34V12A2.5,2.5,0,0,0,28,9.5Z" fill="#aaadbf" /><path d="M26,33.5a1.482,1.482,0,0,1-.77-.214C24.79,33.023,14.5,26.749,14.5,18a1.5,1.5,0,0,1,3,0c0,7.045,9.18,12.658,9.273,12.715A1.5,1.5,0,0,1,26,33.5Z" fill="#aaadbf" /><path d="M26,21H14a3,3,0,0,1,0-6H26a3,3,0,0,1,0,6Z" fill="#f1f3f4" /><path d="M28,19.5H12a1.5,1.5,0,0,1,0-3H28a1.5,1.5,0,0,1,0,3Z" fill="#aaadbf" /><path d="M20,19.5A1.5,1.5,0,0,1,18.5,18V14a1.5,1.5,0,0,1,3,0v4A1.5,1.5,0,0,1,20,19.5Z" fill="#aaadbf" /><path d="M14,33.5a1.5,1.5,0,0,1-.775-2.785C13.32,30.658,22.5,25.045,22.5,18a1.5,1.5,0,0,1,3,0c0,8.749-10.29,15.023-10.728,15.286A1.494,1.494,0,0,1,14,33.5Z" fill="#aaadbf" /><rect fill="#bec6f4" height="30" rx="4" width="24" x="28" y="22" /><path d="M48,53.5H32A5.506,5.506,0,0,1,26.5,48V26A5.506,5.506,0,0,1,32,20.5H48A5.506,5.506,0,0,1,53.5,26V48A5.506,5.506,0,0,1,48,53.5Zm-16-30A2.5,2.5,0,0,0,29.5,26V48A2.5,2.5,0,0,0,32,50.5H48A2.5,2.5,0,0,0,50.5,48V26A2.5,2.5,0,0,0,48,23.5Z" fill="#8d9cf4" /><path d="M28,49.5A1.5,1.5,0,0,1,26.5,48V26A5.506,5.506,0,0,1,32,20.5H48a1.5,1.5,0,0,1,0,3H32A2.5,2.5,0,0,0,29.5,26V48A1.5,1.5,0,0,1,28,49.5Z" fill="#7bcdd1" /><path d="M46,45.5a1.5,1.5,0,0,1-1.379-.909L40,33.808,35.379,44.591a1.5,1.5,0,0,1-2.758-1.182l6-14a1.5,1.5,0,0,1,2.758,0l6,14A1.5,1.5,0,0,1,46,45.5Z" fill="#f1f3f4" /><path d="M44,41.5H36a1.5,1.5,0,0,1,0-3h8a1.5,1.5,0,0,1,0,3Z" fill="#f1f3f4" /></svg>
          <div className="text-black font-semibold text-lg ml-2">Translate</div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <select
              className="rounded font-semibold text-sm p-1"
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
          <div onClick={exchangeLanguages}>
            <svg width="1rem" height="1rem" viewBox="0 -1 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M369.152,6496.32302 L367.74,6494.843..." />
            </svg>
          </div>
          <div>
            <select
              className="rounded font-semibold text-sm p-1"
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
            >
              <option value="">Translate</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          className="w-full border-2 mt-3 rounded-lg p-3 h-32"
          spellCheck="false"
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
          placeholder="Enter text"
        ></textarea>

        <textarea
          className="w-full border-2 mt-3 rounded-lg p-3 h-32"
          spellCheck="false"
          readOnly
          disabled
          value={toText}
          placeholder="Translation"
        ></textarea>
      </div>
    </div>
  );
};

export default Translate;
