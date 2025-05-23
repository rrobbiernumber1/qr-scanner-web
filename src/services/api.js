// POST 테스트를 위한 공개 API (httpbin.org)
const TEST_POST_API_URL = process.env.REACT_APP_API_URL || 'https://httpbin.org/post';
const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE === 'true';

/**
 * 체크인 데이터를 서버로 전송
 * @param {string} encryptedData - 암호화된 QR 데이터
 * @returns {Promise<Object>} 서버 응답
 */
export const sendCheckIn = async (encryptedData) => {
  try {
    if (DEBUG_MODE) console.log('체크인 요청 시작...');
    
    // POST로 암호화된 데이터 전송 (테스트 API 사용)
    const response = await fetch(TEST_POST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // CORS 관련 헤더 추가
        'Accept': 'application/json',
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

    if (DEBUG_MODE) {
      console.log('응답 상태:', response.status);
      console.log('응답 OK:', response.ok);
    }

    // 응답 텍스트 먼저 확인
    const responseText = await response.text();
    if (DEBUG_MODE) console.log('응답 텍스트:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON 파싱 에러:', parseError);
      throw new Error('서버 응답을 파싱할 수 없습니다.');
    }

    if (DEBUG_MODE) console.log('체크인 응답 데이터:', data);

    // httpbin은 200 상태 코드를 반환하면 성공
    if (response.status === 200) {
      return {
        success: true,
        message: 'QR 체크인이 완료되었습니다.',
        checkInTime: new Date().toISOString(),
        postResult: data.json // httpbin은 전송한 데이터를 json 필드에 반환
      };
    } else {
      throw new Error(`체크인 요청 실패: HTTP ${response.status}`);
    }

  } catch (error) {
    console.error('체크인 처리 실패 상세:', error);
    
    // 네트워크 에러와 다른 에러 구분
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('네트워크 연결을 확인해주세요. CORS 정책으로 인해 요청이 차단되었을 수 있습니다.');
    } else if (error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    } else {
      throw error;
    }
  }
};

/**
 * 간단한 체크인 시뮬레이션 (로컬 테스트용)
 * CORS 문제가 있을 경우 이 함수를 사용할 수 있습니다.
 */
export const sendCheckInLocal = async (encryptedData) => {
  if (DEBUG_MODE) console.log('로컬 체크인 시뮬레이션 시작...');
  
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 랜덤하게 성공/실패 시뮬레이션 (90% 성공률)
  const isSuccess = Math.random() > 0.1;
  
  if (isSuccess) {
    return {
      success: true,
      message: 'QR 체크인이 완료되었습니다. (로컬 테스트)',
      checkInTime: new Date().toISOString(),
      postResult: {
        encryptedData: encryptedData,
        timestamp: new Date().toISOString()
      }
    };
  } else {
    throw new Error('체크인 처리 중 오류가 발생했습니다. (시뮬레이션된 오류)');
  }
};