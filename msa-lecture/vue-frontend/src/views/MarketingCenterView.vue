<template>
	<div class="page-outer">
		<AppHeader />

		<div class="center-wrap">
			<div class="app-container">
			<main class="content">

				<!-- Step 1: AI 분석 및 의견(근거) -->
				<section class="card">
					<div class="section-title-wrap">
						<div class="section-title">
							<span>AI 정밀 예매 분석 & 진단</span>
							<span class="ai-tag">Forecast Engine</span>
						</div>
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
										<span class="match-rate" style="color:var(--text-muted)">목요일 21:00 (82%)</span>
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
									<span style="font-size:0.75rem; color:var(--primary); font-weight:bold;">CTR 4.8% (AI
										추천)</span>
									<div class="thumb-reason">인물 중심 구도로 클릭률 +2.7%p 상승 예측</div>
								</div>
								<div class="thumb-card">
									<div class="thumb-img">포스터 원본</div>
									<span style="font-size:0.75rem; color:var(--text-muted)">CTR 2.1%</span>
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
						<div class="tone-chip active">감성/서사 중심</div>
						<div class="tone-chip">할인/혜택 강조</div>
						<div class="tone-chip">마감임박/타이머</div>
					</div>

					<div class="tab-bar">
						<div class="tab-item active">인스타그램 릴스</div>
						<div class="tab-item">블로그/카페</div>
						<div class="tab-item">카카오 알림톡</div>
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
						<button class="btn btn-light">다시 생성</button>
						<button class="btn btn-primary" @click="() => alert('복사되었습니다.')">문구 복사하기</button>
					</div>
				</section>

			</main>
			</div>
		</div>
	</div>
</template>

<script setup>
// 정적 화면입니다. 실제 분석/추천/생성 로직은 연결되어 있지 않습니다.
import AppHeader from "@/components/AppHeader.vue";
</script>

<style scoped>
.page-outer {
	--primary: #5c46e5;
	--primary-light: #f0edff;
	--primary-hover: #4b36d1;
	--bg-main: #f8fafc;
	--bg-card: #ffffff;
	--bg-sub: #f1f5f9;
	--text-main: #0f172a;
	--text-muted: #64748b;
	--border-color: #e2e8f0;
	--accent-red: #ef4444;

	background-color: var(--bg-main);
	color: var(--text-main);
	padding-bottom: 40px;
	min-height: 100vh;
}

.center-wrap {
	display: flex;
	justify-content: center;
}

.center-wrap,
.center-wrap * {
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif;
}

.app-container {
	width: 100%;
	max-width: 840px;
}

/* Content Area */
.content {
	padding: 18px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.section-title-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
}

.section-title {
	font-size: 0.95rem;
	font-weight: 700;
	display: flex;
	align-items: center;
	gap: 6px;
}

.ai-tag {
	background-color: var(--primary-light);
	color: var(--primary);
	font-size: 0.7rem;
	font-weight: 700;
	padding: 2px 6px;
	border-radius: 4px;
}

.card {
	background-color: var(--bg-card);
	border: 1px solid var(--border-color);
	border-radius: 10px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

/* Step 1: AI 진단 & 의견 */
.insight-grid-3 {
	display: grid;
	grid-template-columns: 130px 130px 1fr;
	gap: 12px;
	background: var(--bg-sub);
	padding: 12px;
	border-radius: 8px;
}

.stat-card {
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-right: 1px solid var(--border-color);
	padding-right: 12px;
}

.stat-num {
	font-size: 1.5rem;
	font-weight: 800;
	color: var(--primary);
}

.stat-num.warning {
	color: var(--accent-red);
}

.stat-desc {
	font-size: 0.75rem;
	color: var(--text-muted);
	margin-top: 2px;
}

.ai-opinion-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4px;
}

.opinion-title {
	font-size: 0.8rem;
	font-weight: 700;
	color: var(--primary);
}

.opinion-text {
	font-size: 0.78rem;
	line-height: 1.4;
	color: #334155;
}

.risk-alert {
	background-color: #fef2f2;
	border: 1px solid #fecaca;
	color: #991b1b;
	padding: 6px 10px;
	border-radius: 6px;
	font-size: 0.75rem;
	font-weight: 600;
	margin-top: 4px;
}

/* Step 2: 채널 & 썸네일 & 근거 */
.grid-2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;
}

.channel-list {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.channel-item-group {
	background: var(--bg-main);
	padding: 8px 10px;
	border-radius: 6px;
	border: 1px solid var(--border-color);
}

.channel-item-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.82rem;
	font-weight: 600;
}

.channel-reason {
	font-size: 0.73rem;
	color: var(--text-muted);
	margin-top: 3px;
}

.match-rate {
	color: var(--primary);
	font-size: 0.75rem;
	font-weight: 700;
}

.thumb-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
}

.thumb-card {
	background: var(--bg-main);
	border: 1.5px solid var(--border-color);
	border-radius: 6px;
	padding: 6px;
	text-align: center;
	cursor: pointer;
}

.thumb-card.selected {
	border-color: var(--primary);
	background-color: var(--primary-light);
}

.thumb-img {
	width: 100%;
	height: 48px;
	background: #e2e8f0;
	border-radius: 4px;
	margin-bottom: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.72rem;
	color: var(--text-muted);
}

.thumb-reason {
	font-size: 0.7rem;
	color: var(--text-muted);
	margin-top: 2px;
}

/* Step 3: 콘텐츠 생성 */
.tone-selector {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 10px;
}

.tone-label {
	font-size: 0.78rem;
	color: var(--text-muted);
	font-weight: 600;
}

.tone-chip {
	background: var(--bg-sub);
	border: 1px solid var(--border-color);
	padding: 4px 10px;
	border-radius: 14px;
	font-size: 0.75rem;
	color: var(--text-main);
	cursor: pointer;
}

.tone-chip.active {
	background: var(--primary-light);
	border-color: var(--primary);
	color: var(--primary);
	font-weight: 700;
}

.tab-bar {
	display: flex;
	gap: 6px;
	margin-bottom: 10px;
}

.tab-item {
	background: var(--bg-sub);
	border: 1px solid var(--border-color);
	color: var(--text-muted);
	padding: 6px 12px;
	border-radius: 6px;
	font-size: 0.8rem;
	font-weight: 600;
	cursor: pointer;
}

.tab-item.active {
	background: var(--primary);
	color: white;
	border-color: var(--primary);
}

.prompt-box {
	width: 100%;
	height: 155px;
	background: var(--bg-main);
	border: 1px solid var(--border-color);
	border-radius: 6px;
	padding: 10px;
	color: var(--text-main);
	font-size: 0.82rem;
	line-height: 1.5;
	resize: none;
	margin-bottom: 10px;
}

.btn-group {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}

.btn {
	padding: 7px 14px;
	border-radius: 6px;
	font-size: 0.8rem;
	font-weight: 600;
	cursor: pointer;
	border: none;
}

.btn-light {
	background: var(--bg-sub);
	color: var(--text-main);
	border: 1px solid var(--border-color);
}

.btn-primary {
	background: var(--primary);
	color: white;
}

.btn-primary:hover {
	background-color: var(--primary-hover);
}
</style>
