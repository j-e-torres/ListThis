import * as colors from './colors';

export const borderWidth1 = 1;
export const borderWidth2 = 2;
export const borderRadius50 = 50;
export const borderRadius5 = 5;

export const stickyNotesBorder = {
  borderLeftColor: colors.lightPink,
  borderLeftWidth: borderWidth1,
  borderBottomWidth: borderWidth1,
  borderBottomColor: colors.lightGreyBlue,
};

export const clipBoardBorder = {
  borderColor: colors.black,
  borderRadius: borderRadius50,
  borderWidth: borderWidth1,
  backgroundColor: colors.brownClipBoard,
  padding: '5%',
  marginHorizontal: -10,
};

export const clipBoardBorderHeader = {
  borderBottomWidth: borderWidth2,
  borderBottomColor: colors.black,
  color: colors.black,
  marginVertical: 10,
  textAlign: 'center',
  textAlignVertical: 'center',

  // fontSize prop causing error
  // fontSize: typography.font25,
};
