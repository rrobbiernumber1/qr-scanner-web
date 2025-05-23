import { COLORS, SIZES, ANIMATIONS } from '../constants';

export const styles = {
  resultContainer: {
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: `${SIZES.SPACING.XL} ${SIZES.SPACING.LG}`, // 상하 패딩 줄임
    width: '100%',
  },
  
  successIcon: {
    fontSize: SIZES.FONT.ICON,
    marginBottom: SIZES.SPACING.LG,
  },
  
  errorIcon: {
    fontSize: SIZES.FONT.ICON,
    marginBottom: SIZES.SPACING.LG,
  },
  
  successTitle: {
    fontSize: SIZES.FONT.XXL,
    fontWeight: 'bold',
    marginBottom: SIZES.SPACING.LG,
    color: COLORS.LIGHT_SUCCESS,
  },
  
  errorTitle: {
    fontSize: SIZES.FONT.XXL,
    fontWeight: 'bold',
    marginBottom: SIZES.SPACING.LG,
    color: COLORS.WARNING,
  },
  
  resultBox: {
    backgroundColor: COLORS.TRANSPARENT.WHITE_10,
    borderRadius: SIZES.BORDER_RADIUS.SMALL,
    padding: SIZES.SPACING.LG,
    marginBottom: SIZES.SPACING.LG,
  },
  
  resultText: {
    fontSize: SIZES.FONT.LG,
    lineHeight: '1.5',
    marginBottom: SIZES.SPACING.MD,
  },
  
  infoText: {
    fontSize: SIZES.FONT.MD,
    color: '#ddd',
    marginBottom: SIZES.SPACING.SM,
    textAlign: 'left',
  },
  
  dataText: {
    fontSize: SIZES.FONT.XS,
    color: '#aaa',
    wordBreak: 'break-all',
  },
  
  errorDetails: {
    fontSize: SIZES.FONT.SM,
    color: '#ff9999',
    marginTop: SIZES.SPACING.SM,
    fontStyle: 'italic',
  },
  
  resetButton: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    border: 'none',
    borderRadius: SIZES.BORDER_RADIUS.ROUND,
    padding: `${SIZES.SPACING.MD} ${SIZES.SPACING.XL}`,
    fontSize: SIZES.FONT.LG,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: `0 4px 15px rgba(0, 123, 255, 0.3)`,
    transition: ANIMATIONS.TRANSITION,
  },
};