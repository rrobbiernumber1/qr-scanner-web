import { COLORS, SIZES } from '../constants';

export const styles = {
  scanGuide: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  
  scanFrame: {
    position: 'relative',
    width: SIZES.SCAN_FRAME.SIZE,
    height: SIZES.SCAN_FRAME.SIZE,
    border: `${SIZES.SCAN_FRAME.BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: SIZES.BORDER_RADIUS.LARGE,
    margin: `0 auto ${SIZES.SPACING.LG}`,
  },
  
  corner1: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    width: SIZES.SCAN_FRAME.CORNER_SIZE,
    height: SIZES.SCAN_FRAME.CORNER_SIZE,
    borderTop: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderLeft: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: `${SIZES.BORDER_RADIUS.SMALL} 0 0 0`,
  },
  
  corner2: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: SIZES.SCAN_FRAME.CORNER_SIZE,
    height: SIZES.SCAN_FRAME.CORNER_SIZE,
    borderTop: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRight: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: `0 ${SIZES.BORDER_RADIUS.SMALL} 0 0`,
  },
  
  corner3: {
    position: 'absolute',
    bottom: '-2px',
    left: '-2px',
    width: SIZES.SCAN_FRAME.CORNER_SIZE,
    height: SIZES.SCAN_FRAME.CORNER_SIZE,
    borderBottom: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderLeft: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: `0 0 0 ${SIZES.BORDER_RADIUS.SMALL}`,
  },
  
  corner4: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    width: SIZES.SCAN_FRAME.CORNER_SIZE,
    height: SIZES.SCAN_FRAME.CORNER_SIZE,
    borderBottom: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRight: `${SIZES.SCAN_FRAME.CORNER_BORDER_WIDTH} solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: `0 0 ${SIZES.BORDER_RADIUS.SMALL} 0`,
  },
  
  guideText: {
    color: COLORS.LIGHT_SUCCESS,
    fontSize: SIZES.FONT.MD,
    fontWeight: 'bold',
    textShadow: `0 0 10px rgba(0, 255, 0, 0.8)`,
    margin: 0,
  },
};