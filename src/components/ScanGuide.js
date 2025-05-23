import React from 'react';

function ScanGuide() {
  return (
    <div style={styles.scanGuide}>
      <div style={styles.scanFrame}>
        <div style={styles.corner1}></div>
        <div style={styles.corner2}></div>
        <div style={styles.corner3}></div>
        <div style={styles.corner4}></div>
      </div>
      <p style={styles.guideText}>QR 코드를 프레임 안에 맞춰주세요</p>
    </div>
  );
}

const styles = {
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
};

export default ScanGuide;