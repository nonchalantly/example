// 1. 필요한 모듈 가져오기
require('dotenv').config(); // .env 파일에서 환경 변수 로드
const express = require('express'); // Express 모듈 가져오기
const path = require('path'); // 경로 관련 모듈
const indexRouter = require('./routes/index'); // 라우터 모듈

const app = express(); // Express 애플리케이션 생성


// 4. Body-parser 설정
app.use(express.json()); // JSON 요청 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 파싱

// 5. 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views')); // 뷰 파일 경로 설정
app.set('view engine', 'ejs'); // 뷰 엔진으로 EJS 사용

// 6. 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 경로 설정



// 8. 라우트 설정
app.use('/', indexRouter); // 기본 라우트 설정

// 9. 지도 페이지 라우트
app.get('/map', (req, res) => {
    res.render('Map', { title: 'Map' }); // Map.ejs 파일 렌더링
});

// 10. Naver API 라우트
app.get('/search', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const query = req.query.query;

        console.log(`Received search query: ${query}`);

        // display 파라미터를 10으로 설정하여 최대 10개의 결과 요청
        const response = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=10`, {
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching data:', errorData);
            return res.status(response.status).json({ message: errorData.message || 'Internal Server Error' });
        }

        const data = await response.json();
        console.log('Response data:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// 11. 서버 시작
const PORT = process.env.PORT || 3001; // 포트 설정
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // 서버 시작 메시지
});

module.exports = app; // 모듈 내보내기
