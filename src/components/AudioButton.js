import React, { useState, useEffect } from 'react';

const AudioButton = ({ text, style = {} }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indoVoice, setIndoVoice] = useState(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Specifically look for Indonesian voices
        const voice = voices.find(v =>
          v.lang.replace('-', '_').includes('id_ID') ||
          v.lang === 'id' ||
          v.name.toLowerCase().includes('indonesia')
        );
        if (voice) {
          setIndoVoice(voice);
        }
      };

      loadVoices();
      // Voices are often loaded asynchronously in some browsers
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handlePlay = (e) => {
    // Prevent event propagation so it doesn't trigger parent click handlers
    e.stopPropagation();
    e.preventDefault();

    if (!isSupported || !text) return;

    // Stop any currently playing audio
    window.speechSynthesis.cancel();

    // Clean up text if needed (e.g. remove multiple options like A / B)
    let textToRead = text;
    if (text.includes('/')) {
        textToRead = text.split('/')[0].trim();
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    if (indoVoice) {
      utterance.voice = indoVoice;
    }
    utterance.rate = 0.9; // Slightly slower for language learners

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handlePlay}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: isPlaying ? '#e0f2fe' : 'transparent',
        transition: 'all 0.2s ease',
        ...style
      }}
      title="Dengarkan (Listen)"
      aria-label="Play audio"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isPlaying ? "#0284c7" : "#64748b"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    </button>
  );
};

export default AudioButton;
