import React from 'react';

function CheckInResult({ checkInData, onReset }) {
  const isSuccess = checkInData?.success;
  const message = checkInData?.message || checkInData?.error || '알 수 없는 오류가 발생했습니다.';
  
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

const styles = {
  resultContainer: {
    textAlign: 'center',
    color: 'white',
    padding: '40px 20px',
    width: '100%',
  },
  successIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#00ff00',
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#ff6b6b',
  },
  resultBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
  },
  resultText: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  infoText: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '10px',
    textAlign: 'left',
  },
  dataText: {
    fontSize: '12px',
    color: '#aaa',
    wordBreak: 'break-all',
  },
  errorDetails: {
    fontSize: '13px',
    color: '#ff9999',
    marginTop: '10px',
    fontStyle: 'italic',
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
    transition: 'all 0.3s ease',
  },
};

export default CheckInResult;