import React from 'react';
import { styles } from './ScanGuide.styles';
import { UI_MESSAGES } from '../constants';

function ScanGuide() {
  return (
    <div style={styles.scanGuide}>
      <div style={styles.scanFrame}>
        <div style={styles.corner1}></div>
        <div style={styles.corner2}></div>
        <div style={styles.corner3}></div>
        <div style={styles.corner4}></div>
      </div>
      <p style={styles.guideText}>
        {UI_MESSAGES.SCAN_GUIDE.INSTRUCTION}
      </p>
    </div>
  );
}

export default ScanGuide;