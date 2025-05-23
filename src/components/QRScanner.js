import React, { useState, useEffect } from 'react';
import { useQRScanner } from '../hooks/useQRScanner';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { encryptData } from '../utils/crypto';
import { sendCheckIn, sendCheckInLocal } from '../services/api';
import ScanGuide from './ScanGuide';
import CheckInResult from './CheckInResult';
import { styles, getDynamicStyles, globalStyles } from './QRScanner.styles';
import { UI_MESSAGES } from '../constants';

// 개발 환경에서 CORS 문제 시 로컬 시뮬레이션 사용
const USE_LOCAL_SIMULATION = process.env.REACT_APP_USE_LOCAL_SIMULATION === 'true';

function QRScanner() {
  const [scanResult, setScanResult] = useState('');
  const [checkInData, setCheckInData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 인터넷 연결 상태
  const isOnline = useOnlineStatus();
  
  // HTTPS 체크
  const isSecureContext = window.isSecureContext;
  
  // 글로벌 스타일 추가 (애니메이션)
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  // QR 스캔 성공 핸들러
  const handleScanSuccess = async (data) => {
    setScanResult(data);
    setIsProcessing(true);
    
    try {
      // 인터넷 연결 상태 확인
      if (!isOnline) {
        throw new Error(UI_MESSAGES.ERROR.INTERNET_REQUIRED);
      }
      
      // 1. 데이터 암호화
      const encryptedData = encryptData(data);
      if (process.env.REACT_APP_DEBUG_MODE === 'true') {
        console.log('암호화된 데이터:', encryptedData);
      }
      
      // 2. 서버로 전송 (로컬 시뮬레이션 또는 실제 API)
      const response = USE_LOCAL_SIMULATION 
        ? await sendCheckInLocal(encryptedData)
        : await sendCheckIn(encryptedData);
      
      // 3. 체크인 성공
      setCheckInData({
        success: true,
        message: response.message,
        scanData: data,
        checkInTime: response.checkInTime,
        postResult: response.postResult
      });
      
    } catch (error) {
      if (process.env.REACT_APP_DEBUG_MODE === 'true') {
        console.error('체크인 에러:', error);
      }
      
      // 에러 메시지 처리
      let errorMessage = error.message || UI_MESSAGES.ERROR.CHECKIN_PROCESS_ERROR;
      let details = null;
      
      // CORS 에러인 경우 더 친절한 메시지
      if (errorMessage.includes('CORS')) {
        errorMessage = 'API 요청이 차단되었습니다. 개발 환경에서는 로컬 시뮬레이션을 사용해보세요.';
        details = 'api.js 파일에서 USE_LOCAL_SIMULATION을 true로 설정하세요.';
      } else if (!isOnline) {
        details = UI_MESSAGES.ERROR.NETWORK_CHECK;
      }
      
      // 체크인 실패
      setCheckInData({
        success: false,
        error: errorMessage,
        scanData: data,
        details: details
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const {
    videoRef,
    isScanning,
    hasCamera,
    cameraPermission,
    error,
    startScanning,
    stopScanning,
  } = useQRScanner(handleScanSuccess);

  const resetScanner = () => {
    setScanResult('');
    setCheckInData(null);
    setIsProcessing(false);
    startScanning();
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (!hasCamera) return UI_MESSAGES.CAMERA.NO_CAMERA;
    if (cameraPermission === 'denied') return UI_MESSAGES.CAMERA.PERMISSION_DENIED;
    if (!isOnline) return UI_MESSAGES.CAMERA.NO_INTERNET;
    return isScanning ? UI_MESSAGES.CAMERA.SCANNING : UI_MESSAGES.CAMERA.START_SCAN;
  };

  // 상태 텍스트 생성
  const getStatusText = () => {
    const device = navigator.userAgent.includes('Mobile') 
      ? UI_MESSAGES.DEVICE.MOBILE 
      : UI_MESSAGES.DEVICE.DESKTOP;
    const cameraStatus = hasCamera 
      ? UI_MESSAGES.STATUS.CAMERA_SUPPORT 
      : UI_MESSAGES.STATUS.CAMERA_NOT_SUPPORT;
    const internetStatus = isOnline 
      ? UI_MESSAGES.STATUS.INTERNET_CONNECTED 
      : UI_MESSAGES.STATUS.INTERNET_DISCONNECTED;
    
    return `${device} | ${cameraStatus} | ${UI_MESSAGES.STATUS.PERMISSION_PREFIX} ${cameraPermission} | ${internetStatus}`;
  };

  return (
    <div style={styles.container}>
      {/* 상태 정보를 최상단으로 이동 */}
      <div style={styles.statusBar}>
        <span style={styles.statusText}>
          {getStatusText()}
        </span>
        
        {/* 오프라인 경고 메시지 */}
        {!isOnline && (
          <div style={styles.offlineWarning}>
            {UI_MESSAGES.ERROR.OFFLINE_WARNING}
          </div>
        )}
        
        {/* HTTPS 경고 메시지 */}
        {!isSecureContext && (
          <div style={styles.offlineWarning}>
            ⚠️ 보안 연결이 필요합니다. localhost 또는 HTTPS로 접속해주세요.
          </div>
        )}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div style={styles.mainContent}>
        {/* 카메라 영역 */}
        <div style={styles.cameraContainer}>
          <video
            ref={videoRef}
            style={getDynamicStyles.video(checkInData, isProcessing)}
          />

          {/* 스캔 가이드 */}
          {isScanning && !scanResult && !isProcessing && <ScanGuide />}

          {/* 처리 중 표시 */}
          {isProcessing && (
            <div style={styles.processingContainer}>
              <div style={styles.spinner}></div>
              <p style={styles.processingText}>
                {UI_MESSAGES.PROCESSING.CHECKING_IN}
              </p>
            </div>
          )}

          {/* 체크인 결과 */}
          {checkInData && !isProcessing && (
            <CheckInResult checkInData={checkInData} onReset={resetScanner} />
          )}

          {/* 에러 메시지 */}
          {error && !checkInData && !isProcessing && (
            <div style={styles.errorContainer}>
              <div style={styles.errorIcon}>❌</div>
              <p style={styles.errorText}>{error}</p>
            </div>
          )}
        </div>

        {/* 컨트롤 버튼들 */}
        {!checkInData && !isProcessing && (
          <div style={styles.controls}>
            <button 
              onClick={isScanning ? stopScanning : startScanning}
              disabled={!hasCamera || cameraPermission === 'denied' || !isOnline}
              style={getDynamicStyles.actionButton(
                hasCamera, 
                cameraPermission, 
                isOnline, 
                isScanning
              )}
            >
              {getButtonText()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRScanner;