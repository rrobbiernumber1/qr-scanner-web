// POST 테스트를 위한 공개 API (httpbin.org)
const TEST_POST_API_URL = 'https://httpbin.org/post';

/**
 * 체크인 데이터를 서버로 전송
 * @param {string} encryptedData - 암호화된 QR 데이터
 * @returns {Promise<Object>} 서버 응답
 */
export const sendCheckIn = async (encryptedData) => {
  try {
    // POST로 암호화된 데이터 전송 (테스트 API 사용)
    const response = await fetch(TEST_POST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encryptedData: encryptedData,
        timestamp: new Date().toISOString(),
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`체크인 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('체크인 응답:', data);

    // 성공 응답 (API 통신이 성공하면 체크인 성공으로 처리)
    return {
      success: true,
      message: 'QR 체크인이 완료되었습니다.',
      checkInTime: new Date().toISOString(),
      postResult: data.json // httpbin은 전송한 데이터를 json 필드에 반환
    };

  } catch (error) {
    console.error('체크인 처리 실패:', error);
    throw error;
  }
};