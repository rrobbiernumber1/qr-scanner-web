import React from 'react';
import { styles } from './CheckInResult.styles';
import { UI_MESSAGES } from '../constants';

function CheckInResult({ checkInData, onReset }) {
  const isSuccess = checkInData?.success;
  const message = checkInData?.message || checkInData?.error || UI_MESSAGES.ERROR.UNKNOWN_ERROR;
  
  // 체크인 시간 포맷팅
  const formatCheckInTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <div style={styles.resultContainer}>
      <div style={isSuccess ? styles.successIcon : styles.errorIcon}>
        {isSuccess ? '✅' : '❌'}
      </div>
      <h3 style={isSuccess ? styles.successTitle : styles.errorTitle}>
        {isSuccess ? 'QR 체크인 완료!' : '체크인 실패'}
      </h3>
      <div style={styles.resultBox}>
        <p style={styles.resultText}>{message}</p>
        
        {isSuccess && (
          <>
            {checkInData.checkInTime && (
              <p style={styles.infoText}>
                <strong>체크인 시간:</strong> {formatCheckInTime(checkInData.checkInTime)}
              </p>
            )}
            {checkInData.scanData && (
              <p style={styles.infoText}>
                <strong>QR 데이터:</strong> <span style={styles.dataText}>{checkInData.scanData}</span>
              </p>
            )}
          </>
        )}
        
        {!isSuccess && checkInData.details && (
          <p style={styles.errorDetails}>{checkInData.details}</p>
        )}
      </div>
      
      <button onClick={onReset} style={styles.resetButton}>
        🔄 다시 스캔하기
      </button>
    </div>
  );
}

export default CheckInResult;