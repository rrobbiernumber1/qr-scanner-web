import React, { useState } from 'react';
import { useQRScanner } from '../hooks/useQRScanner';
import { encryptData } from '../utils/crypto';
import { sendCheckIn } from '../services/api';
import ScanGuide from './ScanGuide';
import CheckInResult from './CheckInResult';

function QRScanner() {
  const [scanResult, setScanResult] = useState('');
  const [checkInData, setCheckInData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // QR 스캔 성공 핸들러
  const handleScanSuccess = async (data) => {
    setScanResult(data);
    setIsProcessing(true);
    
    try {
      // 1. 데이터 암호화
      const encryptedData = encryptData(data);
      console.log('암호화된 데이터:', encryptedData);
      
      // 2. 서버로 전송
      const response = await sendCheckIn(encryptedData);
      
      // 3. 체크인 성공
      setCheckInData({
        success: true,
        message: response.message,
        scanData: data,
        checkInTime: response.checkInTime,
        postResult: response.postResult
      });
      
    } catch (error) {
      // 체크인 실패
      setCheckInData({
        success: false,
        error: error.message || '체크인 처리 중 오류가 발생했습니다.',
        scanData: data
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

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
      </div>

      {/* 카메라 영역 */}
      <div style={styles.cameraContainer}>
        <video
          ref={videoRef}
          style={{
            ...styles.video,
            display: checkInData || isProcessing ? 'none' : 'block'
          }}
        />

        {/* 스캔 가이드 */}
        {isScanning && !scanResult && !isProcessing && <ScanGuide />}

        {/* 처리 중 표시 */}
        {isProcessing && (
          <div style={styles.processingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.processingText}>체크인 처리 중...</p>
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
            disabled={!hasCamera || cameraPermission === 'denied'}
            style={{
              ...styles.actionButton,
              backgroundColor: !hasCamera || cameraPermission === 'denied' 
                ? '#ccc' 
                : isScanning 
                  ? '#dc3545' 
                  : '#28a745',
              cursor: !hasCamera || cameraPermission === 'denied' 
                ? 'not-allowed' 
                : 'pointer'
            }}
          >
            {!hasCamera 
              ? '📵 카메라 없음' 
              : cameraPermission === 'denied' 
                ? '🚫 권한 필요' 
                : isScanning 
                  ? '⏸️ 스캔 중지' 
                  : '📷 스캔 시작'
            }
          </button>
        </div>
      )}

      {/* 상태 정보 */}
      <div style={styles.statusBar}>
        <span style={styles.statusText}>
          📱 {navigator.userAgent.includes('Mobile') ? '모바일' : '데스크톱'} | 
          📹 카메라: {hasCamera ? '지원' : '미지원'} | 
          🔐 권한: {cameraPermission}
        </span>
      </div>
    </div>
  );
}

// 스타일 정의
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  cameraContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#000',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '30px',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  processingContainer: {
    textAlign: 'center',
    color: 'white',
    padding: '40px 20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #00ff00',
    borderRadius: '50%',
    margin: '0 auto 20px',
    animation: 'spin 1s linear infinite',
  },
  processingText: {
    fontSize: '18px',
    color: '#00ff00',
  },
  errorContainer: {
    textAlign: 'center',
    color: 'white',
    padding: '40px 20px',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  errorText: {
    fontSize: '16px',
    color: '#ff6b6b',
  },
  controls: {
    marginBottom: '20px',
  },
  actionButton: {
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  statusBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '10px 20px',
    marginTop: 'auto',
  },
  statusText: {
    fontSize: '12px',
    color: '#666',
  }
};

// 애니메이션 추가를 위한 글로벌 스타일
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default QRScanner;