import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { CAMERA_CONFIG, UI_MESSAGES } from '../constants';

export const useQRScanner = (onScanSuccess) => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('unknown');
  const [error, setError] = useState('');

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
      const cameraSupported = await QrScanner.hasCamera();
      setHasCamera(cameraSupported);
      
      if (!cameraSupported) {
        setError(UI_MESSAGES.ERROR.NO_CAMERA_DEVICE);
        return;
      }

      if (videoRef.current) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            onScanSuccess(result.data);
            stopScanning();
          },
          {
            onDecodeError: () => {
              // 디코드 에러는 정상적인 상황이므로 무시
            },
            preferredCamera: CAMERA_CONFIG.PREFERRED_CAMERA,
            highlightScanRegion: CAMERA_CONFIG.HIGHLIGHT_SCAN_REGION,
            highlightCodeOutline: CAMERA_CONFIG.HIGHLIGHT_CODE_OUTLINE,
            maxScansPerSecond: CAMERA_CONFIG.MAX_SCANS_PER_SECOND,
          }
        );
      }
    } catch (err) {
      console.error('Camera initialization error:', err);
      setError(`${UI_MESSAGES.ERROR.CAMERA_INIT_FAIL} ${err.message}`);
    }
  };

  const startScanning = async () => {
    try {
      setError('');
      
      if (!hasCamera || !qrScannerRef.current) {
        setError(UI_MESSAGES.ERROR.CAMERA_NOT_AVAILABLE);
        return;
      }

      await qrScannerRef.current.start();
      setIsScanning(true);
      setCameraPermission('granted');
      
    } catch (err) {
      console.error('Camera start error:', err);
      
      if (err.name === 'NotAllowedError') {
        // HTTPS 관련 에러인지 확인
        if (err.message && err.message.toLowerCase().includes('https')) {
          setError(UI_MESSAGES.ERROR.HTTPS_REQUIRED);
        } else {
          setError(UI_MESSAGES.ERROR.PERMISSION_DENIED);
        }
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError') {
        setError(UI_MESSAGES.ERROR.CAMERA_NOT_FOUND);
      } else if (err.message && err.message.toLowerCase().includes('https')) {
        setError(UI_MESSAGES.ERROR.HTTPS_REQUIRED);
        setCameraPermission('denied');
      } else {
        setError(`${UI_MESSAGES.ERROR.CAMERA_ACCESS_FAIL} ${err.message}`);
      }
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return {
    videoRef,
    isScanning,
    hasCamera,
    cameraPermission,
    error,
    startScanning,
    stopScanning,
  };
};