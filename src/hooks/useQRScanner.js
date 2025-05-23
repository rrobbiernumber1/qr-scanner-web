import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

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
        setError('이 기기에서는 카메라를 사용할 수 없습니다.');
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
            preferredCamera: 'environment',
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