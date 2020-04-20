export const stickyNotesTiltDegrees = () => {
  const randomInt = Math.floor(Math.random() * Math.floor(14)) - 6;

  // return `${randomInt}deg`;
  return [{rotate: `${randomInt}deg`}];
};
