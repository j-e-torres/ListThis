export const stickyNotesTiltDegrees = () => {
  const randomInt = Math.floor(Math.random() * Math.floor(7)) - 6;

  return [{rotate: `${randomInt}deg`}];
};
