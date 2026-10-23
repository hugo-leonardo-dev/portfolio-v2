"use client";

import { useEffect, useRef, useState } from "react";
import { useTypewriterMotion } from "@/hooks/useTypewriterMotion";

type Props = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
};

export function RotatingTypeWriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 2000,
  className,
}: Props) {
  const reduced = useTypewriterMotion();
  const [text, setText] = useState(reduced ? words[0] : "");
  const [cursor, setCursor] = useState(true);
  const idx = useRef(0);
  const cancelled = useRef(false);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    cancelled.current = false;
    let timeout: ReturnType<typeof setTimeout>;

    const typeWord = (word: string, onDone: () => void) => {
      let i = 0;
      const step = () => {
        if (cancelled.current) return;
        i++;
        setText(word.slice(0, i));
        if (i < word.length) timeout = setTimeout(step, typingSpeed);
        else timeout = setTimeout(onDone, pause);
      };
      step();
    };

    const deleteWord = (word: string, onDone: () => void) => {
      let i = word.length;
      const step = () => {
        if (cancelled.current) return;
        i--;
        setText(word.slice(0, i));
        if (i > 0) timeout = setTimeout(step, deletingSpeed);
        else timeout = setTimeout(onDone, 300);
      };
      step();
    };

    const loop = () => {
      const word = words[idx.current % words.length];
      typeWord(word, () => {
        deleteWord(word, () => {
          idx.current++;
          loop();
        });
      });
    };

    loop();
    return () => {
      cancelled.current = true;
      clearTimeout(timeout);
    };
  }, [reduced, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="cursor-blink text-cyan">{cursor ? "█" : ""}</span>
    </span>
  );
}