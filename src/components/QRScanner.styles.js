import { COLORS, SIZES, ANIMATIONS } from '../constants';

export const styles = {
  container: {
    height: '100vh',
    backgroundColor: COLORS.GRAY.LIGHT,
    fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden', // 스크롤 방지
  },
  
  // 상태바를 최상단에 배치
  statusBar: {
    width: '100%',
    backgroundColor: COLORS.TRANSPARENT.BLACK_10,
    padding: `${SIZES.SPACING.SM} ${SIZES.SPACING.LG}`,
    textAlign: 'center',
    flexShrink: 0, // 크기 고정
  },
  
  statusText: {
    fontSize: SIZES.FONT.XS,
    color: COLORS.GRAY.DARK,
  },
  
  offlineWarning: {
    backgroundColor: COLORS.WARNING,
    color: COLORS.WHITE,
    padding: `${SIZES.SPACING.XS} ${SIZES.SPACING.LG}`,
    borderRadius: SIZES.BORDER_RADIUS.MEDIUM,
    marginTop: SIZES.SPACING.SM,
    fontSize: SIZES.FONT.XS,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // 상단 정렬로 변경
    width: '100%',
    padding: `${SIZES.SPACING.LG} ${SIZES.CONTAINER.PADDING}`, // 상단 패딩 줄임
    overflow: 'hidden',
  },
  
  cameraContainer: {
    position: 'relative',
    width: '90%',
    maxWidth: SIZES.CONTAINER.MAX_WIDTH,
    backgroundColor: COLORS.BLACK,
    borderRadius: SIZES.BORDER_RADIUS.LARGE,
    overflow: 'hidden',
    minHeight: SIZES.VIDEO.HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: SIZES.SPACING.SM, // 상태바와의 간격 최소화
  },
  
  video: {
    width: '100%',
    height: SIZES.VIDEO.HEIGHT,
    objectFit: 'cover',
  },
  
  processingContainer: {
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: `${SIZES.SPACING.XL} ${SIZES.SPACING.LG}`, // 상하 패딩 줄임
  },
  
  spinner: {
    width: '50px',
    height: '50px',
    border: `4px solid ${COLORS.TRANSPARENT.WHITE_30}`,
    borderTop: `4px solid ${COLORS.LIGHT_SUCCESS}`,
    borderRadius: '50%',
    margin: `0 auto ${SIZES.SPACING.LG}`,
    animation: ANIMATIONS.SPIN,
  },
  
  processingText: {
    fontSize: SIZES.FONT.XL,
    color: COLORS.LIGHT_SUCCESS,
  },
  
  errorContainer: {
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: `${SIZES.SPACING.XL} ${SIZES.SPACING.LG}`, // 상하 패딩 줄임
  },
  
  errorIcon: {
    fontSize: SIZES.FONT.ICON,
    marginBottom: SIZES.SPACING.LG,
  },
  
  errorText: {
    fontSize: SIZES.FONT.LG,
    color: COLORS.WARNING,
  },
  
  controls: {
    marginTop: SIZES.SPACING.LG, // 간격 줄임
    flexShrink: 0,
  },
  
  actionButton: {
    color: COLORS.WHITE,
    border: 'none',
    borderRadius: SIZES.BORDER_RADIUS.ROUND,
    padding: `${SIZES.SPACING.MD} ${SIZES.SPACING.XL}`,
    fontSize: SIZES.FONT.LG,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: `0 4px 15px ${COLORS.TRANSPARENT.BLACK_20}`,
    transition: ANIMATIONS.TRANSITION,
  },
};

// 동적 스타일 함수들
export const getDynamicStyles = {
  actionButton: (hasCamera, cameraPermission, isOnline, isScanning) => ({
    ...styles.actionButton,
    backgroundColor: !hasCamera || cameraPermission === 'denied' || !isOnline
      ? COLORS.GRAY.MEDIUM
      : isScanning
        ? COLORS.DANGER
        : COLORS.SUCCESS,
    cursor: !hasCamera || cameraPermission === 'denied' || !isOnline
      ? 'not-allowed'
      : 'pointer'
  }),
  
  video: (checkInData, isProcessing) => ({
    ...styles.video,
    display: checkInData || isProcessing ? 'none' : 'block'
  }),
};

// 글로벌 스타일 (애니메이션)
export const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;