<template>
	<div class="page-outer">
		<AppHeader />

		<main class="dashboard">
			<!-- 페이지 헤드 -->
			<div class="page-head">
				<div>
					<span class="eyebrow">✦ AI MARKETING COPILOT</span>
					<h1 class="page-title">AI 마케팅 센터</h1>
					<p class="page-subtitle">예매 데이터를 분석해 홍보 채널과 콘텐츠 추천까지 한 번에 확인하세요.</p>
				</div>
				<span class="engine-badge"><i class="engine-dot"></i>Forecast Engine</span>
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
						<div class="opinion-title">💡 AI 분석 의견 (이유)</div>
						<div class="opinion-text">
							동일 인디/밴드 장르의 과거 예매 데이터 학습 결과, 티켓 오픈 10일 전 예매 속도가 평시 대비 35% 감소했습니다. 현 추세 유지 시 목표치(85%)
							미달이 우려됩니다.
						</div>
						<div class="risk-alert">
							⚠️ <strong>추천 액션:</strong> 20대 여성 관객의 반응률이 높은 숏폼 전용 프로모션 즉시 진행
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
									<strong>추천 이유:</strong> 20대 여성 관객층의 78%가 주말 저녁 시간대 릴스 콘텐츠를 통해 예매 페이지로 유입됨.
								</div>
							</div>

							<div class="channel-item-group">
								<div class="channel-item-header">
									<span>네이버 뮤지컬/공연 카페</span>
									<span class="match-rate muted">목요일 21:00 (82%)</span>
								</div>
								<div class="channel-reason">
									<strong>추천 이유:</strong> 2인 패키지 할인 정보 게시 시 커뮤니티 내 재공유 비율이 높음.
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
								<div class="thumb-img">공연 하이라이트</div>
								<span class="thumb-ctr">CTR 4.8% (AI 추천)</span>
								<div class="thumb-reason">인물 중심 구도로 클릭률 +2.7%p 상승 예측</div>
							</div>
							<div class="thumb-card">
								<div class="thumb-img">포스터 원본</div>
								<span class="thumb-ctr muted">CTR 2.1%</span>
								<div class="thumb-reason">텍스트 비중이 높아 모바일 노출 시 가독성 저하</div>
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

				<textarea class="prompt-box" readonly>[이번 주말, 놓치면 후회할 올가을 단 하나의 라이브 밴드 공연]

"일상이 지루하다면? 20대가 선택한 올해 최고의 감성 라이브로 오세요."

독보적인 음색과 압도적인 사운드로 올가을을 채울 OO밴드의 단독 라이브 콘서트!
오직 이번 주말, OO아트홀에서 단 한 번 펼쳐집니다.

- 일시: 2026.10.24 (토) 19:00
- 장소: 서울 OO아트홀 메인홀
- 특별 혜택: S석 예매 시 전 좌석 10% 할인 (AI 전용 얼리버드 혜택)

지금 프로필 상단 링크를 클릭하고 주말 데이트 티켓을 확정하세요!
#공연추천 #주말데이트 #라이브콘서트 #밴드공연 #인터파크티켓</textarea>

				<div class="btn-group">
					<button type="button" class="btn btn-ghost">다시 생성</button>
					<button type="button" class="btn btn-primary" @click="() => alert('복사되었습니다.')">문구 복사하기</button>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
// 정적 화면입니다. 실제 분석/추천/생성 로직은 연결되어 있지 않습니다.
import AppHeader from "@/components/AppHeader.vue";
</script>

<style scoped>
.page-outer {
	--primary: #6366f1;
	--primary-dark: #4f46e5;
	--primary-light: #eef2ff;
	--bg-page: #f8f8fc;
	--bg-card: #ffffff;
	--bg-sub: #f4f4f8;
	--text-main: #171334;
	--text-secondary: #524d6b;
	--text-muted: #8b87a3;
	--border-color: #ececf3;
	--accent-red: #ea580c;

	background-color: var(--bg-page);
	color: var(--text-main);
	min-height: 100vh;
}

.page-outer,
.page-outer * {
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif;
}

.dashboard {
	max-width: 880px;
	margin: 0 auto;
	padding: 32px 24px 64px;
	display: flex;
	flex-direction: column;
	gap: 18px;
}

/* 페이지 헤드 */
.page-head {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	margin-bottom: 4px;
}

.eyebrow {
	display: inline-block;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	color: var(--primary);
	margin-bottom: 8px;
}

.page-title {
	font-size: 1.7rem;
	font-weight: 800;
	letter-spacing: -0.02em;
}

.page-subtitle {
	margin-top: 6px;
	font-size: 0.85rem;
	color: var(--text-muted);
}

.engine-badge {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 7px 14px;
	border-radius: 999px;
	border: 1px solid var(--border-color);
	background: var(--bg-card);
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--text-secondary);
}

.engine-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #16a34a;
}

/* 카드 공통 */
.card {
	background-color: var(--bg-card);
	border: 1px solid var(--border-color);
	border-radius: 18px;
	padding: 22px;
	box-shadow: 0 2px 10px rgba(23, 19, 52, 0.03);
}

.section-title-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 14px;
}

.section-title {
	font-size: 1.02rem;
	font-weight: 800;
	display: flex;
	align-items: center;
	gap: 8px;
}

/* Step 1: AI 진단 & 의견 */
.insight-grid-3 {
	display: grid;
	grid-template-columns: 130px 130px 1fr;
	gap: 16px;
	background: var(--bg-sub);
	padding: 16px;
	border-radius: 12px;
}

.stat-card {
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-right: 1px solid var(--border-color);
	padding-right: 16px;
}

.stat-num {
	font-size: 1.6rem;
	font-weight: 800;
	color: var(--primary);
}

.stat-num.warning {
	color: var(--accent-red);
}

.stat-desc {
	font-size: 0.76rem;
	color: var(--text-muted);
	margin-top: 2px;
}

.ai-opinion-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 6px;
}

.opinion-title {
	font-size: 0.82rem;
	font-weight: 700;
	color: var(--primary);
}

.opinion-text {
	font-size: 0.8rem;
	line-height: 1.5;
	color: var(--text-secondary);
}

.risk-alert {
	background-color: #fff1e9;
	border: 1px solid #ffd8bf;
	color: #9a3412;
	padding: 8px 12px;
	border-radius: 10px;
	font-size: 0.76rem;
	font-weight: 600;
	margin-top: 4px;
}

/* Step 2: 채널 & 썸네일 & 근거 */
.grid-2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 18px;
}

.channel-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.channel-item-group {
	background: var(--bg-sub);
	padding: 10px 12px;
	border-radius: 10px;
	border: 1px solid var(--border-color);
}

.channel-item-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.85rem;
	font-weight: 700;
	color: var(--text-main);
}

.channel-reason {
	font-size: 0.75rem;
	color: var(--text-secondary);
	margin-top: 4px;
}

.match-rate {
	color: var(--primary);
	font-size: 0.76rem;
	font-weight: 700;
}

.match-rate.muted {
	color: var(--text-muted);
}

.thumb-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}

.thumb-card {
	background: var(--bg-sub);
	border: 1.5px solid var(--border-color);
	border-radius: 10px;
	padding: 8px;
	text-align: center;
}

.thumb-card.selected {
	border-color: var(--primary);
	background-color: var(--primary-light);
}

.thumb-img {
	width: 100%;
	height: 50px;
	background: var(--border-color);
	border-radius: 8px;
	margin-bottom: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.72rem;
	color: var(--text-muted);
}

.thumb-ctr {
	font-size: 0.75rem;
	font-weight: 700;
	color: var(--primary);
}

.thumb-ctr.muted {
	color: var(--text-muted);
	font-weight: 500;
}

.thumb-reason {
	font-size: 0.7rem;
	color: var(--text-muted);
	margin-top: 4px;
}

/* Step 3: 콘텐츠 생성 */
.tone-selector {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 12px;
}

.tone-label {
	font-size: 0.78rem;
	color: var(--text-secondary);
	font-weight: 600;
}

.tone-chip {
	background: var(--bg-sub);
	border: 1px solid var(--border-color);
	padding: 5px 12px;
	border-radius: 20px;
	font-size: 0.75rem;
	color: var(--text-main);
}

.tone-chip.active {
	background: var(--primary-light);
	border-color: var(--primary);
	color: var(--primary-dark);
	font-weight: 700;
}

.tab-bar {
	display: flex;
	gap: 8px;
	margin-bottom: 12px;
}

.tab-item {
	background: var(--bg-sub);
	border: 1px solid var(--border-color);
	color: var(--text-secondary);
	padding: 7px 14px;
	border-radius: 10px;
	font-size: 0.8rem;
	font-weight: 600;
}

.tab-item.active {
	background: var(--primary);
	color: white;
	border-color: var(--primary);
}

.prompt-box {
	width: 100%;
	height: 155px;
	background: var(--bg-sub);
	border: 1px solid var(--border-color);
	border-radius: 10px;
	padding: 12px;
	color: var(--text-main);
	font-size: 0.82rem;
	font-family: inherit;
	line-height: 1.5;
	resize: none;
	margin-bottom: 12px;
}

.btn-group {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}

.btn {
	padding: 8px 16px;
	border-radius: 10px;
	font-size: 0.8rem;
	font-weight: 700;
	cursor: pointer;
	border: none;
}

.btn-ghost {
	background: var(--bg-sub);
	color: var(--text-secondary);
	border: 1px solid var(--border-color);
}

.btn-primary {
	background: var(--primary);
	color: white;
}

.btn-primary:hover {
	background-color: var(--primary-dark);
}

@media (max-width: 640px) {
	.insight-grid-3 {
		grid-template-columns: 1fr;
	}

	.stat-card {
		border-right: none;
		border-bottom: 1px solid var(--border-color);
		padding-right: 0;
		padding-bottom: 10px;
	}

	.grid-2 {
		grid-template-columns: 1fr;
	}
}
</style>
