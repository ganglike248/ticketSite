# TicketSite

공연(콘서트/뮤지컬/연극/클래식/페스티벌) 티켓 예매 웹 서비스입니다.
MSA 실습 강의의 "수강신청 시스템" 예제 코드를 기반으로, 프론트엔드를 티켓 구매 사이트로 재구성하고 일부 페이지(AI 마케팅 센터, 세일즈 인사이트, 챗봇 등)를 새로 추가했습니다.

## Contributors

| GitHub 계정 | 담당 작업 |
| --- | --- |
| [ganglike248](https://github.com/ganglike248) | 초기 세팅, 예매(Enrollment)/랜딩/로그인 페이지, AI 마케팅 센터, 사이드바, 헤더 리팩터링 |
| [kjsoo-1010](https://github.com/kjsoo-1010) | 공연 리스트 페이지, `course.js` 카테고리 매핑 및 오탈자 정리, 썸네일 이미지 교체 |
| [ddaaann2-jpg](https://github.com/ddaaann2-jpg) | 마이페이지 |
| [jaewon-cmd](https://github.com/jaewon-cmd) | 공연 등록 페이지, 챗봇 위젯, 메인 화면 |
| [Inu](https://github.com/Inu) | 세일즈 인사이트 페이지, 공연 상세 페이지 |

## 주요 기능
- 공연 목록/상세 조회, 검색
- 티켓 예매 (수강신청 로직 재사용)
- 마이페이지 (예매 내역 조회)
- 주최자(강사 역할) 전용: 공연 등록, AI 마케팅 센터, 세일즈 인사이트
- AI 추천 (수강 이력 → 예매 이력 기반 공연 추천)

## 기술 스택
- **Frontend**: Vue 3, Vite, Pinia
- **Backend**: Spring Boot (MSA), Spring Cloud Gateway, Eureka, OAuth2
- **추천 서비스**: Python/FastAPI
- **인프라**: MariaDB, Kafka, Docker Compose

## 서비스 구성
| 서비스 | 설명 |
|---|---|
| eureka-server | 서비스 디스커버리 |
| auth-server / api-gateway | 인증 및 API 게이트웨이 |
| user-service | 회원 관리 |
| course-service | 공연 정보 관리 |
| enrollment-service | 예매 처리 |
| payment-service | 결제 처리 |
| recommend-service | 공연 추천 |
| vue-frontend | 웹 프론트엔드 |

## 실행 방법
```bash
cd msa-lecture
docker load -i infra-images.tar
docker compose build --no-cache && docker compose up -d
```
프론트엔드 로컬 실행:
```bash
cd msa-lecture/vue-frontend
npm install
npm run dev
```

## 원본 프로젝트
본 프로젝트는 교육 목적 실습 코드를 기반으로 합니다.
