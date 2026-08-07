<template>
  <div class="page-outer">
    <AppHeader />

    <main class="dashboard">
      <!-- 페이지 헤드 -->
      <div class="page-head">
        <div>
          <span class="eyebrow"
            ><Sparkle class="eyebrow-icon" :size="12" /> AI MARKETING
            COPILOT</span
          >
          <h1 class="page-title">AI 마케팅 센터</h1>
          <p class="page-subtitle">
            예매 데이터를 분석해 홍보 채널과 콘텐츠 추천까지 한 번에 확인하세요.
          </p>
        </div>
        <span class="engine-badge"
          ><i class="engine-dot"></i>Forecast Engine</span
        >
      </div>

      <!-- Step 1: AI 분석 및 의견(근거) -->
      <section class="card">
        <div class="section-title-wrap">
          <div class="section-title">AI 정밀 예매 분석 & 진단</div>
        </div>
        <div class="insight-grid-3">
          <div class="stat-card">
            <div class="stat-num">64%</div>
            <div class="stat-desc">주 타겟: 20대 여성</div>
          </div>
          <div class="stat-card">
            <div class="stat-num warning">72%</div>
            <div class="stat-desc">예상 최종 매진율</div>
          </div>
          <div class="ai-opinion-box">
            <div class="opinion-title">
              <Lightbulb :size="14" /> AI 분석 의견 (이유)
            </div>
            <div class="opinion-text">
              동일 인디/밴드 장르의 과거 예매 데이터 학습 결과, 티켓 오픈 10일
              전 예매 속도가 평시 대비 35% 감소했습니다. 현 추세 유지 시
              목표치(85%) 미달이 우려됩니다.
            </div>
            <div class="risk-alert">
              <TriangleAlert :size="14" /> <strong>추천 액션:</strong> 20대 여성
              관객의 반응률이 높은 숏폼 전용 프로모션 즉시 진행
            </div>
          </div>
        </div>
      </section>

      <!-- Step 2: 채널 & 썸네일 추천 이유 -->
      <section class="card">
        <div class="grid-2">
          <div>
            <div class="section-title-wrap">
              <div class="section-title">추천 채널 & 추천 이유</div>
            </div>
            <div class="channel-list">
              <div class="channel-item-group">
                <div class="channel-item-header">
                  <span>인스타그램 릴스</span>
                  <span class="match-rate">토요일 19:30 (95%)</span>
                </div>
                <div class="channel-reason">
                  <strong>추천 이유:</strong> 20대 여성 관객층의 78%가 주말 저녁
                  시간대 릴스 콘텐츠를 통해 예매 페이지로 유입됨.
                </div>
              </div>

              <div class="channel-item-group">
                <div class="channel-item-header">
                  <span>네이버 뮤지컬/공연 카페</span>
                  <span class="match-rate muted">목요일 21:00 (82%)</span>
                </div>
                <div class="channel-reason">
                  <strong>추천 이유:</strong> 2인 패키지 할인 정보 게시 시
                  커뮤니티 내 재공유 비율이 높음.
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="section-title-wrap">
              <div class="section-title">추천 썸네일 (A/B)</div>
            </div>
            <div class="thumb-grid">
              <div class="thumb-card selected">
                <img
                  :src="thumbA"
                  alt="공연 하이라이트 썸네일"
                  class="thumb-img"
                />
                <span class="thumb-ctr">CTR 4.8% (AI 추천)</span>
                <div class="thumb-reason">
                  인물 중심 구도로 클릭률 +2.7%p 상승 예측
                </div>
              </div>
              <div class="thumb-card">
                <img :src="thumbB" alt="포스터 원본 썸네일" class="thumb-img" />
                <span class="thumb-ctr muted">CTR 2.1%</span>
                <div class="thumb-reason">
                  텍스트 비중이 높아 모바일 노출 시 가독성 저하
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Step 3: AI 콘텐츠 생성 -->
      <section class="card">
        <div class="section-title-wrap">
          <div class="section-title">원클릭 AI 홍보 콘텐츠 생성</div>
        </div>

        <div class="tone-selector">
          <span class="tone-label">홍보 톤앤매너:</span>
          <span class="tone-chip active">감성/서사 중심</span>
          <span class="tone-chip">할인/혜택 강조</span>
          <span class="tone-chip">마감임박/타이머</span>
        </div>

        <div class="tab-bar">
          <span class="tab-item active">인스타그램 릴스</span>
          <span class="tab-item">블로그/카페</span>
          <span class="tab-item">카카오 알림톡</span>
        </div>

        <textarea class="prompt-box" readonly>
[이번 주말, 놓치면 후회할 올가을 단 하나의 라이브 밴드 공연]

"일상이 지루하다면? 20대가 선택한 올해 최고의 감성 라이브로 오세요."

독보적인 음색과 압도적인 사운드로 올가을을 채울 OO밴드의 단독 라이브 콘서트!
오직 이번 주말, OO아트홀에서 단 한 번 펼쳐집니다.

- 일시: 2026.10.24 (토) 19:00
- 장소: 서울 OO아트홀 메인홀
- 특별 혜택: S석 예매 시 전 좌석 10% 할인 (AI 전용 얼리버드 혜택)

지금 프로필 상단 링크를 클릭하고 주말 데이트 티켓을 확정하세요!
#공연추천 #주말데이트 #라이브콘서트 #밴드공연 #인터파크티켓</textarea
        >

        <div class="btn-group">
          <button type="button" class="btn btn-ghost">다시 생성</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => alert('복사되었습니다.')"
          >
            문구 복사하기
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// 정적 화면입니다. 실제 분석/추천/생성 로직은 연결되어 있지 않습니다.
import AppHeader from "@/components/AppHeader.vue";
import { Sparkle, Lightbulb, TriangleAlert } from "@lucide/vue";
import thumbA from "@/assets/images/courses/band1.png";
import thumbB from "@/assets/images/courses/band2.png";
</script>

<style scoped>
/* 색상·타이포·카드 토큰은 global.css의 공용 변수를 그대로 사용합니다(AI 판매 인사이트와 동일 팔레트). */
.page-outer {
  /* insight 계열 페이지 전용 보조 색상(성공/코랄 계열은 global.css에 없어 로컬로 유지) */
  --coral: #ef6655;
  --coral-light: #fff0ed;

  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  min-height: 100vh;
}

.dashboard {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 38px 0 72px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* 페이지 헤드 */
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  margin-bottom: 7px;
}

.page-title {
  font-size: clamp(27px, 3vw, 36px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.04em;
}

.page-subtitle {
  margin-top: 9px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.engine-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border-radius: 999px;
  border: 1px solid #ddd8ff;
  background: var(--color-primary-light);
  font-size: 12px;
  font-weight: 700;
  color: #5c49cb;
  white-space: nowrap;
}

.engine-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6d59dd;
  box-shadow: 0 0 0 4px rgba(109, 89, 221, 0.12);
}

/* 카드 공통 */
.card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(35, 35, 52, 0.035);
}

.section-title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Step 1: AI 진단 & 의견 */
.insight-grid-3 {
  display: grid;
  grid-template-columns: 160px 160px 1fr;
  gap: 20px;
  background: #fafafd;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--color-border);
  padding-right: 20px;
}

.stat-num {
  font-size: 2rem;
  font-weight: 850;
  letter-spacing: -0.03em;
  color: var(--color-primary);
}

.stat-num.warning {
  color: var(--coral);
}

.stat-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.ai-opinion-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.opinion-title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.opinion-text {
  max-width: 640px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.risk-alert {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  max-width: 640px;
  background-color: var(--coral-light);
  border: 1px solid #ffddd7;
  color: #7f4139;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
}

.risk-alert svg {
  flex-shrink: 0;
  margin-top: 1px;
}

.risk-alert strong {
  color: #d05a49;
}

/* Step 2: 채널 & 썸네일 & 근거 */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.channel-item-group {
  background: #fafafd;
  padding: 13px;
  border-radius: 11px;
  border: 1px solid var(--color-border);
}

.channel-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.channel-reason {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 5px;
  line-height: 1.5;
}

.match-rate {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
}

.match-rate.muted {
  color: var(--color-text-muted);
}

.thumb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.thumb-card {
  background: #fafafd;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  padding: 10px;
  text-align: center;
}

.thumb-card.selected {
  border-color: #d9d2ff;
  background: linear-gradient(145deg, #fff 55%, #f5f2ff);
}

.thumb-img {
  width: 100%;
  background: #ececf2;
  border-radius: 8px;
  margin-bottom: 8px;
  object-fit: cover;
  display: block;
}

.thumb-ctr {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
}

.thumb-ctr.muted {
  color: var(--color-text-muted);
  font-weight: 500;
}

.thumb-reason {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 5px;
  line-height: 1.5;
}

/* Step 3: 콘텐츠 생성 */
.tone-selector {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.tone-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-weight: 700;
}

.tone-chip {
  background: var(--color-bg-tertiary);
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #66636f;
}

.tone-chip.active {
  background: var(--color-primary-light);
  color: #5d49c9;
}

.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.tab-item {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  padding: 7px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
}

.tab-item.active {
  background: var(--color-primary);
  color: white;
}

.prompt-box {
  width: 100%;
  height: 170px;
  background: #fafafd;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px;
  color: var(--color-text-primary);
  font-size: 13px;
  font-family: inherit;
  line-height: 1.65;
  resize: none;
  margin-bottom: 14px;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: 0.2s ease;
}

.btn-ghost {
  background: #f2f2f6;
  color: #5f5f66;
}

.btn-ghost:hover {
  background: #e9e7f7;
  color: #5a47c4;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 7px 16px rgba(102, 84, 217, 0.2);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .insight-grid-3 {
    grid-template-columns: 1fr 1fr;
  }

  .ai-opinion-box {
    grid-column: 1 / -1;
  }
}

@media (max-width: 720px) {
  .dashboard {
    width: min(100% - 32px, 1280px);
    padding-top: 26px;
  }

  .page-head {
    flex-direction: column;
  }

  .insight-grid-3 {
    grid-template-columns: 1fr;
  }

  .stat-card {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-right: 0;
    padding-bottom: 12px;
  }

  .ai-opinion-box {
    grid-column: auto;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
