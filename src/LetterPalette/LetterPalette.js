import "./letterpalette.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function LetterCount(props) {
  const { letter, count } = props;
  const available = count > 0 ? "available" : "unavailable";
  return (
    <div className={`letterbox ${available}`}>
      {letter}
      {count > 0 && <span className="circle">{count}</span>}
    </div>
  );
}

export default function LetterPalette(props) {
  const { letterCounts } = props;

  const letterComponents = [];
  letters.forEach((letter, index) => {
    letterComponents.push(
      <LetterCount
        key={letter}
        letter={letter}
        count={letterCounts[letter]}
      ></LetterCount>
    );
  });

  return <div className="palette">{letterComponents}</div>;
}
