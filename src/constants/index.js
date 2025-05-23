// 카메라 관련 상수
export const CAMERA_CONFIG = {
    PREFERRED_CAMERA: 'environment',
    HIGHLIGHT_SCAN_REGION: true,
    HIGHLIGHT_CODE_OUTLINE: true,
    MAX_SCANS_PER_SECOND: 5,
  };
  
  // UI 메시지 상수
  export const UI_MESSAGES = {
    CAMERA: {
      NO_CAMERA: '📵 카메라 없음',
      PERMISSION_DENIED: '🚫 카메라 권한 필요',
      NO_INTERNET: '🌐 인터넷 연결 필요',
      SCANNING: '⏸️ 스캔 중지',
      START_SCAN: '📷 스캔 시작',
    },
    DEVICE: {
      MOBILE: '📱 모바일',
      DESKTOP: '📱 데스크톱',
    },
    STATUS: {
      CAMERA_SUPPORT: '📹 카메라: 지원',
      CAMERA_NOT_SUPPORT: '📹 카메라: 미지원',
      PERMISSION_PREFIX: '🔐 카메라 권한:',
      INTERNET_CONNECTED: '🌐 인터넷: 연결됨',
      INTERNET_DISCONNECTED: '🌐 인터넷: 연결안됨',
    },
    ERROR: {
      NO_CAMERA_DEVICE: '이 기기에서는 카메라를 사용할 수 없습니다.',
      CAMERA_INIT_FAIL: '카메라 초기화 실패:',
      CAMERA_NOT_AVAILABLE: '카메라를 사용할 수 없습니다.',
      PERMISSION_DENIED: '카메라 권한이 거부되었습니다. 브라우저에서 카메라 권한을 허용해주세요.',
      CAMERA_NOT_FOUND: '카메라를 찾을 수 없습니다.',
      CAMERA_ACCESS_FAIL: '카메라 접근 실패:',
      HTTPS_REQUIRED: '보안 연결(HTTPS)이 필요합니다. localhost를 사용하거나 HTTPS로 접속해주세요.',
      INTERNET_REQUIRED: '인터넷 연결이 필요합니다. 네트워크 상태를 확인해주세요.',
      NETWORK_CHECK: '네트워크 연결을 확인하고 다시 시도해주세요.',
      CHECKIN_PROCESS_ERROR: '체크인 처리 중 오류가 발생했습니다.',
      UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
      OFFLINE_WARNING: '⚠️ 인터넷 연결이 끊어졌습니다. 체크인을 위해 네트워크 연결을 확인해주세요.',
    },
    PROCESSING: {
      CHECKING_IN: '체크인 처리 중...',
    },
    SCAN_GUIDE: {
      INSTRUCTION: 'QR 코드를 프레임 안에 맞춰주세요',
    },
  };
  
  // 색상 상수
  export const COLORS = {
    PRIMARY: '#007bff',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ff6b6b',
    LIGHT_SUCCESS: '#00ff00',
    GRAY: {
      LIGHT: '#f8f9fa',
      MEDIUM: '#ccc',
      DARK: '#666',
      DARKER: '#333',
    },
    WHITE: '#ffffff',
    BLACK: '#000000',
    TRANSPARENT: {
      WHITE_10: 'rgba(255, 255, 255, 0.1)',
      WHITE_30: 'rgba(255, 255, 255, 0.3)',
      BLACK_10: 'rgba(0, 0, 0, 0.1)',
      BLACK_20: 'rgba(0, 0, 0, 0.2)',
    },
  };
  
  // 사이즈 상수
  export const SIZES = {
    CONTAINER: {
      MAX_WIDTH: '400px',
      PADDING: '20px',
    },
    VIDEO: {
      HEIGHT: '350px', // 높이 증가
    },
    SCAN_FRAME: {
      SIZE: '200px',
      BORDER_WIDTH: '2px',
      CORNER_SIZE: '30px',
      CORNER_BORDER_WIDTH: '4px',
    },
    BORDER_RADIUS: {
      SMALL: '10px',
      MEDIUM: '15px',
      LARGE: '20px',
      ROUND: '25px',
    },
    FONT: {
      XS: '12px',
      SM: '13px',
      MD: '14px',
      LG: '16px',
      XL: '18px',
      XXL: '24px',
      XXXL: '28px',
      ICON: '48px',
    },
    SPACING: {
      XS: '8px',
      SM: '10px',
      MD: '15px',
      LG: '20px',
      XL: '30px',
      XXL: '40px',
    },
  };
  
  // 애니메이션 상수
  export const ANIMATIONS = {
    TRANSITION: 'all 0.3s ease',
    SPIN: 'spin 1s linear infinite',
  };