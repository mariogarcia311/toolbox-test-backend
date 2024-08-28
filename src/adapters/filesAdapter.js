const adapterDataFile = (match) => {
  if (match) {
    const { hex, text, number } = match.groups;
    return {
      hex,
      text,
      number: Number(number),
    };
  } else {
    return null;
  }
};

const validateDataFile = (_text) => {
  const regex =
    /^(?<file>[a-zA-Z0-9_.-]+),(?<text>[a-zA-Z]+),(?<number>\d+),(?<hex>[a-fA-F0-9]{32})$/;
  const match = _text.match(regex);
  return adapterDataFile(match);
};
module.exports = { validateDataFile, adapterDataFile };
