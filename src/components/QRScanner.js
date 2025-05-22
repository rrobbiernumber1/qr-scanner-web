// src/components/QRScanner.js
import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

function QRScanner() {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('unknown');

  useEffect(() => {
    initializeCamera();
    
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      // 카메라 지원 여부 확인
      const cameraSupported = await QrScanner.hasCamera();
      setHasCamera(cameraSupported);
      
      if (!cameraSupported) {
        setError('이 기기에서는 카메라를 사용할 수 없습니다.');
        return;
      }

      // QR 스캐너 초기화
      if (videoRef.current) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            setScanResult(result.data);
            stopScanning();
          },
          {
            onDecodeError: () => {
              // 디코드 에러는 정상적인 상황이므로 무시
            },
            preferredCamera: 'environment', // 후면 카메라
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 5,
          }
        );
      }

    } catch (err) {
      console.error('Camera initialization error:', err);
      setError(`카메라 초기화 실패: ${err.message}`);
    }
  };

  const startScanning = async () => {
    try {
      setError('');
      setScanResult('');
      
      if (!hasCamera || !qrScannerRef.current) {
        setError('카메라를 사용할 수 없습니다.');
        return;
      }

      await qrScannerRef.current.start();
      setIsScanning(true);
      setCameraPermission('granted');
      
    } catch (err) {
      console.error('Camera start error:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('카메라 권한이 거부되었습니다. 브라우저에서 카메라 권한을 허용해주세요.');
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError') {
        setError('카메라를 찾을 수 없습니다.');
      } else {
        setError(`카메라 접근 실패: ${err.message}`);
      }
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setScanResult('');
    setError('');
    startScanning();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scanResult);
    alert('클립보드에 복사되었습니다!');
  };

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
        <h1 style={styles.title}>🔍 QR 코드 스캐너</h1>
        <p style={styles.subtitle}>QR 코드를 스캔하여 정보를 확인하세요</p>
      </div>

      {/* 카메라 영역 */}
      <div style={styles.cameraContainer}>
        <video
          ref={videoRef}
          style={{
            ...styles.video,
            display: scanResult ? 'none' : 'block'
          }}
        />

        {/* 스캔 가이드 */}
        {isScanning && !scanResult && (
          <div style={styles.scanGuide}>
            <div style={styles.scanFrame}>
              <div style={styles.corner1}></div>
              <div style={styles.corner2}></div>
              <div style={styles.corner3}></div>
              <div style={styles.corner4}></div>
            </div>
            <p style={styles.guideText}>QR 코드를 프레임 안에 맞춰주세요</p>
          </div>
        )}

        {/* 스캔 결과 */}
        {scanResult && (
          <div style={styles.resultContainer}>
            <div style={styles.successIcon}>✅</div>
            <h3 style={styles.successTitle}>스캔 완료!</h3>
            <div style={styles.resultBox}>
              <p style={styles.resultText}>{scanResult}</p>
              <button onClick={copyToClipboard} style={styles.copyButton}>
                📋 복사
              </button>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>❌</div>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}
      </div>

      {/* 컨트롤 버튼들 */}
      <div style={styles.controls}>
        {scanResult ? (
          <button onClick={resetScanner} style={styles.resetButton}>
            🔄 다시 스캔하기
          </button>
        ) : (
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
        )}
      </div>

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
  scanGuide: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  scanFrame: {
    position: 'relative',
    width: '200px',
    height: '200px',
    border: '2px solid #00ff00',
    borderRadius: '20px',
    margin: '0 auto 20px',
  },
  corner1: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    width: '30px',
    height: '30px',
    borderTop: '4px solid #00ff00',
    borderLeft: '4px solid #00ff00',
    borderRadius: '10px 0 0 0',
  },
  corner2: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '30px',
    height: '30px',
    borderTop: '4px solid #00ff00',
    borderRight: '4px solid #00ff00',
    borderRadius: '0 10px 0 0',
  },
  corner3: {
    position: 'absolute',
    bottom: '-2px',
    left: '-2px',
    width: '30px',
    height: '30px',
    borderBottom: '4px solid #00ff00',
    borderLeft: '4px solid #00ff00',
    borderRadius: '0 0 0 10px',
  },
  corner4: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    width: '30px',
    height: '30px',
    borderBottom: '4px solid #00ff00',
    borderRight: '4px solid #00ff00',
    borderRadius: '0 0 10px 0',
  },
  guideText: {
    color: '#00ff00',
    fontSize: '14px',
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
    margin: 0,
  },
  resultContainer: {
    textAlign: 'center',
    color: 'white',
    padding: '40px 20px',
  },
  successIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#00ff00',
  },
  resultBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
  },
  resultText: {
    fontSize: '16px',
    wordBreak: 'break-all',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  copyButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
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
  resetButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
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

export default QRScanner;