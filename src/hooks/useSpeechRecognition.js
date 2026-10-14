import { useCallback, useEffect, useRef, useState } from 'react';

function getSpeechRecognitionCtor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function useSpeechRecognition({ lang = 'ru-RU', onFinalText } = {}) {
  const ctor = getSpeechRecognitionCtor();
  const [isSupported] = useState(() => Boolean(ctor));
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const start = useCallback(() => {
    if (!ctor || isListening) return;

    setError('');
    const recognition = new ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (!event.results[i].isFinal) continue;
        finalText += event.results[i][0]?.transcript ?? '';
      }

      const text = finalText.trim();
      if (text) onFinalText?.(text);
    };

    recognition.onerror = (event) => {
      const code = event.error;
      if (code === 'no-speech') {
        setError('Речь не распознана. Попробуйте ещё раз.');
      } else if (code === 'not-allowed') {
        setError('Нет доступа к микрофону. Разрешите его в браузере.');
      } else if (code !== 'aborted') {
        setError('Не удалось распознать речь.');
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setError('Микрофон уже используется.');
      setIsListening(false);
    }
  }, [ctor, isListening, lang, onFinalText]);

  const toggle = useCallback(() => {
    if (isListening) stop();
    else start();
  }, [isListening, start, stop]);

  return {
    isSupported,
    isListening,
    error,
    start,
    stop,
    toggle,
    clearError: () => setError(''),
  };
}
