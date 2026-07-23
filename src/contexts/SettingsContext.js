import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [englishAssist, setEnglishAssist] = useState(() => {
    const saved = localStorage.getItem('katapult_english_assist');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('katapult_english_assist', JSON.stringify(englishAssist));
  }, [englishAssist]);

  const toggleEnglishAssist = () => {
    setEnglishAssist((prev) => !prev);
  };

  return (
    <SettingsContext.Provider value={{ englishAssist, toggleEnglishAssist, setEnglishAssist }}>
      {children}
    </SettingsContext.Provider>
  );
};
