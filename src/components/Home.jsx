import React, { useEffect, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";

const Home = () => {
  const emojis = ["😀", "😍", "😡", "🤫", "🥵", "🤪", "🫣", "👹"];
  const flags = ["🇧🇼", "🇷🇼", "🇱🇷", "🇧🇲", "🇵🇰", "🇧🇳", "🇮🇲", "🇧🇦"];
  const mixEmojiFlags = [...emojis, ...flags];
  const rows = 4;
  const cols = 8;

  const checkForWin = (hiddenEmoji, playerName) => {
    for (let i = 0; i < cols; i++) {
      const first = hiddenEmoji[i];
      console.log("first", first);

      const second = hiddenEmoji[cols + i];
      console.log("second", second);

      const third = hiddenEmoji[2 * cols + i];
      console.log("third", third);

      const fourth = hiddenEmoji[3 * cols + i];
      console.log("fourth", fourth);

      if (first && first === second && first === third && first === fourth) {
        alert(`${playerName} wins!`);
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return true;
      }
    }
    return false;
  };

  const generateHiddenEmojis = () => {
    return Array(rows * cols)
      .fill(null)
      .map(
        () => mixEmojiFlags[Math.floor(Math.random() * mixEmojiFlags.length)]
      );
  };
  const generateHiddenFlags = () => {
    return Array(rows * cols)
      .fill(null)
      .map(
        () => mixEmojiFlags[Math.floor(Math.random() * mixEmojiFlags.length)]
      );
  };

  const [hiddenEmojisP1, setHiddenEmojisP1] = useState(generateHiddenEmojis);
  const [hiddenEmojisP2, setHiddenEmojisP2] = useState(generateHiddenFlags);
  const [randomEmoji, setRandomEmoji] = useState("🤪");
  const [visibleP1, setVisibleP1] = useState(Array(rows * cols).fill(false));
  const [visibleP2, setVisibleP2] = useState(Array(rows * cols).fill(false));
  const [randomEmojis, setRandomEmojis] = useState(emojis[0]);
  const [randomFlag, setRandomFlag] = useState(flags[0]);

  const renderGrid = (hiddenEmojis, visible) => {
    return Array.from({ length: rows }, (_, rowIndex) => (
      <div className="row" key={rowIndex}>
        {Array.from({ length: cols }, (_, colIndex) => {
          const idx = rowIndex * cols + colIndex;
          return (
            <div className="col" key={colIndex}>
              <span
                style={{
                  visibility: visible[idx] ? "visible" : "hidden",
                  fontSize: "30px",
                }}
              >
                {hiddenEmojis[idx]}
              </span>
            </div>
          );
        })}
      </div>
    ));
  };
  const handleClickEmoji = (col) => {
    if (!emojis.includes(randomEmoji)) return;

    setHiddenEmojisP1((prevGrid) => {
      const newGrid = [...prevGrid];
      let targetRow = -1;

      for (let row = 0; row < rows; row++) {
        const idx = row * cols + col;

        if (!visibleP1[idx]) {
          if (row > 0) {
            const aboveIdx = (row - 1) * cols + col;
            if (visibleP1[aboveIdx] && newGrid[aboveIdx] !== randomEmoji) {
              return prevGrid;
            }
          }
          targetRow = row;
          break;
        }
      }

      if (targetRow === -1) return prevGrid;

      const idx = targetRow * cols + col;
      newGrid[idx] = randomEmoji;
      setVisibleP1((prevVisible) => {
        const newVisible = [...prevVisible];
        newVisible[idx] = true;
        return newVisible;
      });

      const newPlaceholder =
        mixEmojiFlags[Math.floor(Math.random() * mixEmojiFlags.length)];
      setRandomEmoji(newPlaceholder);

      return newGrid;
    });
  };

  const handleClickFlags = (col) => {
    if (!flags.includes(randomEmoji)) return;

    setHiddenEmojisP2((prevGrid) => {
      const newGrid = [...prevGrid];
      let targetRow = -1;

      for (let row = 0; row < rows; row++) {
        const idx = row * cols + col;

        if (!visibleP2[idx]) {
          if (row > 0) {
            const aboveIdx = (row - 1) * cols + col;
            if (visibleP2[aboveIdx] && newGrid[aboveIdx] !== randomEmoji) {
              return prevGrid;
            }
          }
          targetRow = row;
          break;
        }
      }

      if (targetRow === -1) return prevGrid;

      const idx = targetRow * cols + col;
      newGrid[idx] = randomEmoji;
      setVisibleP2((prevVisible) => {
        const newVisible = [...prevVisible];
        newVisible[idx] = true;
        return newVisible;
      });

      const newPlaceholder =
        mixEmojiFlags[Math.floor(Math.random() * mixEmojiFlags.length)];
      setRandomEmoji(newPlaceholder);

      return newGrid;
    });
  };

  useEffect(() => {
    checkForWin(hiddenEmojisP1, "Player 1");
  }, [hiddenEmojisP1]);
  useEffect(() => {
    checkForWin(hiddenEmojisP2, "Player 2");
  }, [hiddenEmojisP2]);

  return (
    <>
      <div>
        <p>{randomEmoji}</p>
      </div>
      <h1>Player 1</h1>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="arrow">
          {Array.from({ length: cols }).map((_, value) => (
            <TiArrowDownThick
              key={value}
              onClick={() => handleClickEmoji(value)}
            />
          ))}
        </div>
        {renderGrid(hiddenEmojisP1, visibleP1)}
      </div>

      <h1>Player 2</h1>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="arrow">
          {Array.from({ length: cols }).map((_, value) => (
            <TiArrowDownThick
              key={value}
              onClick={() => handleClickFlags(value)}
            />
          ))}
        </div>
        {renderGrid(hiddenEmojisP2, visibleP2)}
      </div>
    </>
  );
};
export default Home;
