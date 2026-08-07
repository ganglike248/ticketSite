<template>
  <div class="insight-page">
    <AppHeader />

    <main class="insight-container">
      <section class="page-heading fade-in-up">
        <div>
          <div class="eyebrow">
            <Sparkle class="eyebrow-spark" :size="15" />
            AI SALES COPILOT
          </div>
          <h1>AI 판매 인사이트</h1>
          <p>
            예매 흐름을 진단하고, 지금 실행할 수 있는 판매 전략을 제안합니다.
          </p>
        </div>
        <span class="engine-badge">
          <span class="engine-dot"></span>
          Forecast Engine
        </span>
      </section>

      <section class="performance-panel card-surface">
        <div class="performance-poster-wrap">
          <img
            v-if="selectedPoster"
            :src="selectedPoster"
            :alt="`${selectedCourse?.title || '선택 공연'} 포스터`"
            class="performance-poster"
          />
          <div v-else class="poster-placeholder" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <rect x="10" y="8" width="44" height="48" rx="8" />
              <path d="M19 43 29 31l7 8 5-5 7 9" />
              <circle cx="42" cy="21" r="5" />
            </svg>
          </div>
        </div>

        <div class="performance-main">
          <div class="performance-topline">
            <span class="status-pill">AI 분석 완료</span>
            <span class="updated-at">{{ lastUpdated }}</span>
          </div>
          <label for="performance-select" class="select-label">분석 공연</label>
          <select
            id="performance-select"
            v-model="selectedCourseId"
            class="performance-select"
            @change="handleCourseChange"
          >
            <option
              v-for="course in displayCourses"
              :key="course.id"
              :value="String(course.id)"
            >
              {{ course.title }}
            </option>
          </select>
          <div class="performance-meta">
            <span>{{ selectedCourse?.category || "공연" }}</span>
            <span class="meta-divider"></span>
            <span>공연까지 D-{{ activeInsight.daysLeft }}</span>
            <span class="meta-divider"></span>
            <span>{{ formatPrice(selectedCourse?.price) }}</span>
          </div>
        </div>

        <button
          type="button"
          class="reanalyze-button"
          :disabled="isAnalyzing"
          @click="reanalyze"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11a8 8 0 1 0-2.34 5.66" />
            <path d="M20 5v6h-6" />
          </svg>
          {{ isAnalyzing ? "분석 중..." : "다시 분석" }}
        </button>
      </section>

      <div v-if="isAnalyzing" class="analysis-loading card-surface">
        <div class="analysis-orb">
          <span></span><span></span><span></span>
        </div>
        <strong>예매 데이터를 다시 분석하고 있습니다</strong>
        <p>판매 속도와 관객 반응을 종합하는 중입니다.</p>
      </div>

      <template v-else>
        <section class="metric-grid fade-in" aria-label="핵심 판매 지표">
          <article class="metric-card">
            <div class="metric-icon metric-icon-purple" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />
              </svg>
            </div>
            <div class="metric-label">현재 판매율</div>
            <div class="metric-value purple">
              {{ activeInsight.currentSellRate }}<small>%</small>
            </div>
            <div class="metric-caption">
              목표 대비 {{ activeInsight.goalGap }}%p 부족
            </div>
          </article>

          <article class="metric-card metric-card-featured">
            <div class="metric-icon metric-icon-coral" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m4 16 5-5 4 3 7-8" />
                <path d="M15 6h5v5" />
              </svg>
            </div>
            <div class="metric-label">예상 최종 판매율</div>
            <div class="metric-value coral">
              {{ displayedProjectedRate }}<small>%</small>
            </div>
            <div class="metric-caption" :class="{ uplift: simulationApplied }">
              {{
                simulationApplied
                  ? `추천 적용 시 +${activeInsight.recommendation.upliftPoint}%p`
                  : "현재 추세 기준 AI 예측"
              }}
            </div>
          </article>

          <article class="metric-card">
            <div class="metric-icon metric-icon-green" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 17 9 11l4 4 8-9" />
                <path d="M16 6h5v5" />
              </svg>
            </div>
            <div class="metric-label">최근 7일 증가율</div>
            <div class="metric-value green">
              +{{ activeInsight.weeklyGrowth }}<small>%</small>
            </div>
            <div class="metric-caption">
              전주 대비 {{ activeInsight.growthDelta }}%p
            </div>
          </article>

          <article class="metric-card">
            <div class="metric-icon metric-icon-warning" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 2.7 19a1.4 1.4 0 0 0 1.2 2h16.2a1.4 1.4 0 0 0 1.2-2L12 3Z" />
                <path d="M12 9v5m0 3v.1" />
              </svg>
            </div>
            <div class="metric-label">예매 위험</div>
            <div class="metric-value warning-text">
              {{ activeInsight.riskLevel }}
            </div>
            <div class="metric-caption">
              확인할 알림 {{ activeInsight.risks.length }}건
            </div>
          </article>
        </section>

        <section class="analysis-grid">
          <article class="chart-card card-surface">
            <div class="card-heading-row">
              <div>
                <div class="section-kicker">SALES FORECAST</div>
                <h2>예매 추이 및 AI 예측</h2>
                <p>누적 판매율 기준 · 최근 28일</p>
              </div>
              <div class="chart-legend" aria-label="그래프 범례">
                <span><i class="legend-line actual"></i>실제 판매</span>
                <span><i class="legend-line forecast"></i>AI 예측</span>
              </div>
            </div>

            <div class="chart-wrap">
              <svg
                class="sales-chart"
                viewBox="0 0 640 250"
                role="img"
                aria-label="실제 판매율과 AI 예상 판매율 그래프"
              >
                <defs>
                  <linearGradient id="salesArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6654d9" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#6654d9" stop-opacity="0" />
                  </linearGradient>
                </defs>

                <g class="chart-grid">
                  <line
                    v-for="tick in chartTicks"
                    :key="tick"
                    x1="42"
                    x2="610"
                    :y1="chartY(tick)"
                    :y2="chartY(tick)"
                  />
                </g>
                <g class="chart-labels">
                  <text
                    v-for="tick in chartTicks"
                    :key="`label-${tick}`"
                    x="32"
                    :y="chartY(tick) + 4"
                    text-anchor="end"
                  >
                    {{ tick }}%
                  </text>
                  <text x="42" y="236">D-28</text>
                  <text x="230" y="236">D-14</text>
                  <text x="373" y="236">오늘</text>
                  <text x="610" y="236" text-anchor="end">공연일</text>
                </g>

                <polygon :points="actualAreaPoints" fill="url(#salesArea)" />
                <polyline class="actual-line" :points="actualPoints" />
                <polyline class="forecast-line" :points="forecastPoints" />
                <circle
                  :cx="chartX(activeInsight.actualTrend.length - 1)"
                  :cy="chartY(activeInsight.currentSellRate)"
                  r="5"
                  class="today-dot"
                />
                <circle
                  :cx="chartX(12)"
                  :cy="chartY(displayedProjectedRate)"
                  r="5"
                  class="forecast-dot"
                />
              </svg>

              <div class="chart-now-label">
                현재 {{ activeInsight.currentSellRate }}%
              </div>
              <div class="chart-projection-label" :class="{ applied: simulationApplied }">
                예상 {{ displayedProjectedRate }}%
              </div>
            </div>
          </article>

          <article class="diagnosis-card card-surface">
            <div class="diagnosis-illustration" aria-hidden="true">
              <svg viewBox="0 0 120 96">
                <defs>
                  <linearGradient id="brainGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7565df" />
                    <stop offset="100%" stop-color="#a798ff" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="48" r="40" fill="#f0edff" />
                <path
                  class="brain-shape"
                  d="M45 58c-7-2-10-9-7-15-3-7 2-14 9-15 3-7 13-8 18-3 7-3 15 2 15 10 7 3 8 13 3 18 2 7-5 14-12 13-4 6-14 6-18 0-4 1-8-2-8-8Z"
                  fill="url(#brainGlow)"
                />
                <path class="brain-lines" d="M58 29v34m-10-26c6 1 9 5 10 10m13-13c-6 2-9 6-9 12m14 5c-6-2-11 1-14 6M47 55c5-2 8 0 11 4" />
                <path class="brain-spark" d="m88 17 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
              </svg>
            </div>
            <div class="section-kicker">AI DIAGNOSIS</div>
            <h2>AI 분석 의견</h2>
            <p class="diagnosis-summary">{{ activeInsight.diagnosis }}</p>
            <div class="diagnosis-reasons">
              <span v-for="reason in activeInsight.reasons" :key="reason">
                {{ reason }}
              </span>
            </div>
            <div class="diagnosis-conclusion">
              <span>핵심 진단</span>
              <strong>{{ activeInsight.conclusion }}</strong>
            </div>
          </article>
        </section>

        <section class="action-card card-surface">
          <div class="ticket-illustration" aria-hidden="true">
            <svg viewBox="0 0 130 120">
              <g transform="rotate(-8 65 60)">
                <path
                  d="M23 31h84v18a12 12 0 0 0 0 22v18H23V71a12 12 0 0 0 0-22V31Z"
                  fill="#6b55dc"
                />
                <path d="M50 31v58" stroke="#bdb2ff" stroke-dasharray="5 5" />
                <circle cx="78" cy="57" r="14" fill="#fff" opacity=".96" />
                <path d="M74 50h8M74 64h8M77 48v18" />
                <path d="M61 80h36" stroke="#d8d1ff" />
              </g>
              <path class="ticket-spark" d="m106 18 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
            </svg>
          </div>

          <div class="action-content">
            <div class="section-kicker">TODAY'S BEST ACTION</div>
            <div class="action-title-row">
              <h2>오늘의 AI 행동추천</h2>
              <span class="confidence-pill">신뢰도 {{ activeInsight.recommendation.confidence }}%</span>
            </div>
            <p class="action-lead">{{ activeInsight.recommendation.title }}</p>
            <p class="action-reason">{{ activeInsight.recommendation.reason }}</p>
            <div class="action-effects">
              <div>
                <span>예상 판매량</span>
                <strong>+{{ activeInsight.recommendation.salesLift }}%</strong>
              </div>
              <div>
                <span>예상 추가 예매</span>
                <strong>+{{ activeInsight.recommendation.additionalBookings }}명</strong>
              </div>
              <div>
                <span>추천 실행 시점</span>
                <strong>D-{{ activeInsight.recommendation.startDay }}</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="simulation-button"
            :class="{ applied: simulationApplied }"
            @click="toggleSimulation"
          >
            <svg v-if="!simulationApplied" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 5 11 7-11 7V5Z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 12 4 4L19 6" />
            </svg>
            {{ simulationApplied ? "효과 반영됨" : "효과 미리보기" }}
          </button>
        </section>

        <section class="bottom-grid">
          <article class="risk-card card-surface">
            <div class="card-heading-row compact">
              <div>
                <div class="section-kicker">RISK MONITOR</div>
                <h2>AI 예매 위험 알림</h2>
              </div>
              <span class="risk-count">{{ activeInsight.risks.length }}건</span>
            </div>

            <div class="risk-list">
              <div
                v-for="risk in activeInsight.risks"
                :key="risk.title"
                class="risk-item"
                :class="`risk-${risk.level}`"
              >
                <div class="risk-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3 2.7 19a1.4 1.4 0 0 0 1.2 2h16.2a1.4 1.4 0 0 0 1.2-2L12 3Z" />
                    <path d="M12 9v5m0 3v.1" />
                  </svg>
                </div>
                <div>
                  <div class="risk-title-row">
                    <strong>{{ risk.title }}</strong>
                    <span>{{ risk.badge }}</span>
                  </div>
                  <p>{{ risk.message }}</p>
                  <small>{{ risk.action }}</small>
                </div>
              </div>
            </div>
          </article>

          <article class="review-card card-surface">
            <div class="card-heading-row compact">
              <div>
                <div class="section-kicker">REVIEW INTELLIGENCE</div>
                <h2>리뷰 AI 요약</h2>
              </div>
              <span class="review-count">리뷰 {{ activeInsight.review.total }}건</span>
            </div>

            <div class="review-overview">
              <div
                class="sentiment-donut"
                :style="sentimentDonutStyle"
                role="img"
                :aria-label="`긍정 리뷰 ${activeInsight.review.positive}%`"
              >
                <div>
                  <strong>{{ activeInsight.review.positive }}%</strong>
                  <span>긍정 반응</span>
                </div>
              </div>
              <div class="review-summary">
                <div class="rating-row">
                  <span class="stars">
                    <Star v-for="n in 5" :key="n" :size="13" fill="currentColor" />
                  </span>
                  <strong>{{ activeInsight.review.rating }}</strong>
                </div>
                <p>{{ activeInsight.review.summary }}</p>
                <div class="keyword-row">
                  <span v-for="keyword in activeInsight.review.keywords" :key="keyword">
                    #{{ keyword }}
                  </span>
                </div>
              </div>
            </div>

            <div class="improvement-box">
              <div class="improvement-icon" aria-hidden="true">
              <Sparkle :size="16" />
            </div>
              <div>
                <span>다음 공연 개선 제안</span>
                <strong>{{ activeInsight.review.improvement }}</strong>
              </div>
            </div>
          </article>
        </section>
      </template>
    </main>

    <Transition name="toast">
      <div v-if="toastMessage" class="insight-toast" role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import { Sparkle, Star } from "@lucide/vue";
import { courseApi } from "@/api/course.js";
import { useAuthStore } from "@/store/auth.js";
import { useCourseStore } from "@/store/course.js";

const auth = useAuthStore();
const courseStore = useCourseStore();
const route = useRoute();
const router = useRouter();

const myCourses = ref([]);
const selectedCourseId = ref("");
const isAnalyzing = ref(false);
const simulationApplied = ref(false);
const lastUpdated = ref("방금 전 업데이트");
const toastMessage = ref("");
let analyzeTimer;
let toastTimer;

const demoCourses = [
  {
    id: "demo-1",
    title: "2026 여름 재즈 페스티벌",
    description: "도심에서 즐기는 한여름의 라이브 재즈 공연",
    category: "콘서트",
    price: 99000,
    instructorId: auth.user?.id,
    enrollmentCount: 642,
    status: "ACTIVE",
  },
  {
    id: "demo-2",
    title: "뮤지컬 별빛 아래",
    description: "청춘의 꿈과 사랑을 그린 창작 뮤지컬",
    category: "뮤지컬",
    price: 78000,
    instructorId: auth.user?.id,
    enrollmentCount: 518,
    status: "ACTIVE",
  },
];

const insightPresets = [
  {
    daysLeft: 14,
    currentSellRate: 64,
    projectedFinalRate: 72,
    simulatedFinalRate: 81,
    goalGap: 11,
    weeklyGrowth: 11.8,
    growthDelta: 3.6,
    riskLevel: "주의",
    actualTrend: [17, 22, 28, 34, 41, 49, 56, 64],
    forecastTrend: [64, 66, 68, 69, 71, 72],
    simulatedTrend: [64, 68, 72, 75, 78, 81],
    diagnosis:
      "초기 판매 흐름은 안정적이지만 최근 3일간 증가 폭이 줄었습니다. 현재 속도가 유지되면 목표 판매율에 미치지 못할 가능성이 높습니다.",
    reasons: ["최근 3일 성장률 둔화", "D-14 잔여 재고 36%", "주말 전환율 우세"],
    conclusion: "이번 주말 전 가격 자극이 필요한 시점입니다.",
    recommendation: {
      title: "공연 D-7부터 10% 타임세일을 진행해 보세요.",
      reason:
        "동일 장르의 과거 판매 패턴을 분석한 결과, 주말 저녁 할인 캠페인의 전환 효과가 가장 높았습니다.",
      confidence: 87,
      salesLift: 18,
      additionalBookings: 54,
      startDay: 7,
      upliftPoint: 9,
    },
    risks: [
      {
        level: "high",
        badge: "주의",
        title: "판매 증가율 둔화",
        message: "최근 3일 판매 속도가 이전 주보다 14% 낮습니다.",
        action: "권장 대응 · D-7 타임세일 준비",
      },
      {
        level: "medium",
        badge: "관찰",
        title: "목표 판매율 미달 가능성",
        message: "현재 추세 기준 최종 판매율이 목표보다 11%p 낮습니다.",
        action: "권장 대응 · 주말 집중 캠페인",
      },
    ],
    review: {
      total: 124,
      positive: 81,
      neutral: 13,
      negative: 6,
      rating: 4.6,
      summary:
        "공연의 몰입도와 출연진에 대한 만족도가 높습니다. 다만 입장 대기와 일부 좌석의 시야 안내에 대한 의견이 반복됩니다.",
      keywords: ["배우 연기", "공연 몰입도", "라이브 연주"],
      improvement: "입장 동선 인력을 보강하고 시야 제한 정보를 예매 전에 안내하세요.",
    },
  },
  {
    daysLeft: 9,
    currentSellRate: 78,
    projectedFinalRate: 89,
    simulatedFinalRate: 94,
    goalGap: 4,
    weeklyGrowth: 16.2,
    growthDelta: 5.1,
    riskLevel: "관찰",
    actualTrend: [24, 31, 39, 47, 55, 63, 70, 78],
    forecastTrend: [78, 81, 83, 86, 88, 89],
    simulatedTrend: [78, 83, 87, 90, 92, 94],
    diagnosis:
      "입소문과 재관람 수요로 판매 속도가 상승하고 있습니다. 현재 흐름만으로도 안정적이지만 마지막 주 집중 노출 시 매진 가능성이 큽니다.",
    reasons: ["리뷰 유입 +28%", "재관람 검색 증가", "주말 예매 집중"],
    conclusion: "할인보다 후기 기반 노출 확대가 효과적입니다.",
    recommendation: {
      title: "관객 후기 중심의 D-5 리마인드 캠페인을 진행하세요.",
      reason:
        "가격 민감도보다 긍정 리뷰의 영향을 크게 받는 공연입니다. 베스트 리뷰를 강조하면 구매 결정을 앞당길 수 있습니다.",
      confidence: 91,
      salesLift: 11,
      additionalBookings: 37,
      startDay: 5,
      upliftPoint: 5,
    },
    risks: [
      {
        level: "medium",
        badge: "관찰",
        title: "평일 판매 편중",
        message: "주말 회차에 비해 평일 회차의 전환율이 18% 낮습니다.",
        action: "권장 대응 · 평일 관람 후기 노출",
      },
    ],
    review: {
      total: 208,
      positive: 89,
      neutral: 8,
      negative: 3,
      rating: 4.8,
      summary:
        "배우들의 합과 넘버에 대한 호평이 두드러집니다. 커튼콜 촬영 안내가 더 명확했으면 좋겠다는 의견이 있습니다.",
      keywords: ["배우 케미", "뮤지컬 넘버", "재관람"],
      improvement: "커튼콜과 촬영 가능 구간을 입장 전 알림으로 명확히 안내하세요.",
    },
  },
  {
    daysLeft: 21,
    currentSellRate: 43,
    projectedFinalRate: 58,
    simulatedFinalRate: 69,
    goalGap: 22,
    weeklyGrowth: 6.4,
    growthDelta: -1.8,
    riskLevel: "위험",
    actualTrend: [9, 13, 18, 23, 29, 34, 39, 43],
    forecastTrend: [43, 46, 49, 52, 55, 58],
    simulatedTrend: [43, 49, 55, 60, 65, 69],
    diagnosis:
      "검색 유입과 상세 페이지 전환이 모두 감소해 판매 정체가 예상됩니다. 조기 대응이 없으면 손익분기 판매율 도달이 어렵습니다.",
    reasons: ["검색 유입 -12%", "상세 전환율 2.1%", "판매 속도 정체"],
    conclusion: "타깃을 좁힌 즉시 프로모션이 필요합니다.",
    recommendation: {
      title: "오늘부터 20대 관객 대상 12% 얼리버드 할인을 시작하세요.",
      reason:
        "유사 공연에서 20대 관객의 할인 반응도가 가장 높았으며, 공연 3주 전이 가격 프로모션의 적정 시점입니다.",
      confidence: 84,
      salesLift: 24,
      additionalBookings: 71,
      startDay: 21,
      upliftPoint: 11,
    },
    risks: [
      {
        level: "high",
        badge: "위험",
        title: "손익분기 판매율 미달",
        message: "현재 추세로는 손익분기점보다 17%p 낮게 마감될 수 있습니다.",
        action: "권장 대응 · 오늘 프로모션 시작",
      },
      {
        level: "high",
        badge: "주의",
        title: "신규 유입 감소",
        message: "공연 상세 페이지 신규 방문이 지난주보다 12% 감소했습니다.",
        action: "권장 대응 · 타깃 채널 재선정",
      },
    ],
    review: {
      total: 67,
      positive: 72,
      neutral: 18,
      negative: 10,
      rating: 4.2,
      summary:
        "공연의 독창적인 연출은 좋은 반응을 얻었지만 음향 밸런스와 공연장 안내에 대한 개선 요구가 확인됩니다.",
      keywords: ["독창적 연출", "무대 구성", "스토리"],
      improvement: "공연 전 음향 점검을 강화하고 주차·입장 안내를 상세히 제공하세요.",
    },
  },
];

const displayCourses = computed(() =>
  myCourses.value.length ? myCourses.value : demoCourses,
);

const selectedCourse = computed(() =>
  displayCourses.value.find(
    (course) => String(course.id) === String(selectedCourseId.value),
  ),
);

const selectedCourseIndex = computed(() => {
  const index = displayCourses.value.findIndex(
    (course) => String(course.id) === String(selectedCourseId.value),
  );
  return index < 0 ? 0 : index;
});

const activeInsight = computed(
  () => insightPresets[selectedCourseIndex.value % insightPresets.length],
);

const selectedPoster = computed(() =>
  courseStore.getThumbnail(selectedCourse.value),
);

const displayedProjectedRate = computed(() =>
  simulationApplied.value
    ? activeInsight.value.simulatedFinalRate
    : activeInsight.value.projectedFinalRate,
);

const displayedForecastTrend = computed(() =>
  simulationApplied.value
    ? activeInsight.value.simulatedTrend
    : activeInsight.value.forecastTrend,
);

const chartTicks = [25, 50, 75, 100];

function chartX(index) {
  return 42 + (index / 12) * 568;
}

function chartY(value) {
  return 210 - (Number(value) / 100) * 170;
}

function createPoints(values, startIndex = 0) {
  return values
    .map((value, index) => `${chartX(startIndex + index)},${chartY(value)}`)
    .join(" ");
}

const actualPoints = computed(() => createPoints(activeInsight.value.actualTrend));
const forecastPoints = computed(() =>
  createPoints(displayedForecastTrend.value, activeInsight.value.actualTrend.length - 1),
);
const actualAreaPoints = computed(() => {
  const lastIndex = activeInsight.value.actualTrend.length - 1;
  return `${chartX(0)},210 ${actualPoints.value} ${chartX(lastIndex)},210`;
});

const sentimentDonutStyle = computed(() => {
  const positive = activeInsight.value.review.positive;
  const neutralEnd = positive + activeInsight.value.review.neutral;
  return {
    background: `conic-gradient(#6654d9 0 ${positive}%, #f2ae55 ${positive}% ${neutralEnd}%, #ef6b73 ${neutralEnd}% 100%)`,
  };
});

function getCourseInstructorId(course) {
  return (
    course.instructorId ??
    course.instructor_id ??
    course.instructor ??
    course.teacherId ??
    course.teacher_id ??
    null
  );
}

function formatPrice(price) {
  const value = Number(price ?? 0);
  return Number.isNaN(value) ? "가격 정보 없음" : `${value.toLocaleString()}원`;
}

async function loadCourses() {
  try {
    const response = await courseApi.getCourses();
    const rawCourses = Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
        ? response.data
        : [];
    const instructorId = Number(auth.user?.id);

    myCourses.value = rawCourses
      .filter((course) => {
        const courseInstructorId = Number(getCourseInstructorId(course));
        return (
          !Number.isNaN(instructorId) &&
          !Number.isNaN(courseInstructorId) &&
          courseInstructorId === instructorId
        );
      })
      .map(courseStore.normalizeCourse);
  } catch (error) {
    console.warn("[SalesInsight] 공연 목록을 불러오지 못해 데모 데이터를 사용합니다.", error);
    myCourses.value = [];
  }

  const requestedId = String(route.query.courseId ?? "");
  const requestedCourse = displayCourses.value.find(
    (course) => String(course.id) === requestedId,
  );
  selectedCourseId.value = String(
    requestedCourse?.id ?? displayCourses.value[0]?.id ?? "",
  );
}

function handleCourseChange() {
  simulationApplied.value = false;
  lastUpdated.value = "방금 전 업데이트";
  router.replace({
    name: "SalesInsight",
    query: { courseId: selectedCourseId.value },
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastMessage.value = message;
  toastTimer = window.setTimeout(() => {
    toastMessage.value = "";
  }, 2600);
}

function reanalyze() {
  window.clearTimeout(analyzeTimer);
  isAnalyzing.value = true;
  simulationApplied.value = false;
  analyzeTimer = window.setTimeout(() => {
    isAnalyzing.value = false;
    lastUpdated.value = "방금 전 업데이트";
    showToast("최신 예매 데이터로 AI 분석을 완료했습니다.");
  }, 900);
}

function toggleSimulation() {
  simulationApplied.value = !simulationApplied.value;
  showToast(
    simulationApplied.value
      ? `추천 적용 시 최종 판매율이 ${activeInsight.value.simulatedFinalRate}%로 예상됩니다.`
      : "기본 판매 예측으로 돌아왔습니다.",
  );
}

onMounted(loadCourses);
</script>

<style scoped>
.insight-page {
  min-height: 100vh;
  background: #f7f7fa;
  color: #29292d;
}

.insight-container {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 38px 0 72px;
}

.page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.eyebrow,
.section-kicker {
  color: #6654d9;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 7px;
}

.eyebrow-spark {
  flex-shrink: 0;
}

.page-heading h1 {
  font-size: clamp(27px, 3vw, 36px);
  line-height: 1.25;
  letter-spacing: -0.04em;
}

.page-heading p {
  margin-top: 9px;
  color: #77777e;
  font-size: 14px;
}

.engine-badge,
.status-pill,
.confidence-pill,
.risk-count,
.review-count {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  white-space: nowrap;
  font-weight: 700;
}

.engine-badge {
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid #ddd8ff;
  background: #f0edff;
  color: #5c49cb;
  font-size: 12px;
}

.engine-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6d59dd;
  box-shadow: 0 0 0 4px rgba(109, 89, 221, 0.12);
}

.card-surface,
.metric-card {
  border: 1px solid #e6e6eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(35, 35, 52, 0.035);
}

.performance-panel {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 18px;
  margin-bottom: 18px;
}

.performance-poster-wrap {
  width: 82px;
  height: 106px;
  overflow: hidden;
  border-radius: 10px;
  background: #ececf2;
}

.performance-poster,
.poster-placeholder {
  width: 100%;
  height: 100%;
}

.performance-poster {
  object-fit: cover;
}

.poster-placeholder {
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #ebe8ff, #f6f4ff);
}

.poster-placeholder svg {
  width: 44px;
  fill: none;
  stroke: #7a68dc;
  stroke-width: 2;
}

.performance-main {
  min-width: 0;
}

.performance-topline {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 9px;
}

.status-pill {
  padding: 4px 9px;
  background: #e9f8ef;
  color: #197343;
  font-size: 10px;
}

.updated-at {
  color: #9a9aa1;
  font-size: 11px;
}

.select-label {
  display: block;
  margin-bottom: 5px;
  color: #8a8a91;
  font-size: 11px;
  font-weight: 700;
}

.performance-select {
  width: min(100%, 620px);
  padding: 0 34px 0 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #232329;
  font-family: inherit;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.025em;
  cursor: pointer;
}

.performance-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 9px;
  color: #77777e;
  font-size: 12px;
}

.meta-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #c6c6cc;
}

.reanalyze-button,
.simulation-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 700;
  transition: 0.2s ease;
}

.reanalyze-button {
  padding: 11px 14px;
  background: #f2f2f6;
  color: #5f5f66;
  font-size: 12px;
}

.reanalyze-button:hover:not(:disabled) {
  background: #e9e7f7;
  color: #5a47c4;
}

.reanalyze-button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.reanalyze-button svg,
.simulation-button svg,
.insight-toast svg {
  width: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.analysis-loading {
  min-height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.analysis-loading strong {
  margin-top: 20px;
  font-size: 17px;
}

.analysis-loading p {
  margin-top: 7px;
  color: #8a8a91;
  font-size: 13px;
}

.analysis-orb {
  position: relative;
  width: 70px;
  height: 70px;
}

.analysis-orb span {
  position: absolute;
  inset: 0;
  border: 2px solid #7a67df;
  border-radius: 50%;
  animation: orbit 1.15s ease-in-out infinite alternate;
}

.analysis-orb span:nth-child(2) {
  transform: rotate(60deg) scaleX(0.55);
  animation-delay: -0.25s;
}

.analysis-orb span:nth-child(3) {
  transform: rotate(-60deg) scaleX(0.55);
  animation-delay: -0.5s;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.metric-card {
  position: relative;
  min-height: 176px;
  padding: 19px;
  overflow: hidden;
}

.metric-card-featured {
  border-color: #d9d2ff;
  background: linear-gradient(145deg, #fff 55%, #f5f2ff);
}

.metric-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
}

.metric-icon svg {
  width: 19px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.metric-icon-purple { background: #efecff; color: #6553d2; }
.metric-icon-coral { background: #fff0ed; color: #e15e4d; }
.metric-icon-green { background: #e8f7ef; color: #178154; }
.metric-icon-warning { background: #fff5df; color: #bc7518; }

.metric-label {
  color: #77777e;
  font-size: 12px;
  font-weight: 700;
}

.metric-value {
  margin-top: 5px;
  font-size: 34px;
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -0.045em;
}

.metric-value small {
  margin-left: 2px;
  font-size: 17px;
  font-weight: 800;
}

.metric-value.purple { color: #6654d9; }
.metric-value.coral { color: #ef6655; }
.metric-value.green { color: #19845a; }
.metric-value.warning-text { color: #c27b20; font-size: 27px; }

.metric-caption {
  margin-top: 8px;
  color: #9a9aa1;
  font-size: 11px;
}

.metric-caption.uplift {
  color: #1b7e55;
  font-weight: 700;
}

.analysis-grid,
.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(300px, 0.8fr);
  gap: 18px;
  margin-bottom: 18px;
}

.chart-card,
.diagnosis-card,
.risk-card,
.review-card {
  padding: 23px;
}

.card-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.card-heading-row.compact {
  align-items: center;
}

.card-heading-row h2,
.diagnosis-card h2,
.action-card h2 {
  margin-top: 4px;
  font-size: 18px;
  letter-spacing: -0.025em;
}

.card-heading-row p {
  margin-top: 4px;
  color: #9999a0;
  font-size: 11px;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #77777e;
  font-size: 10px;
}

.chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.legend-line {
  width: 17px;
  height: 2px;
  background: #6654d9;
}

.legend-line.forecast {
  background: repeating-linear-gradient(90deg, #f07862 0 4px, transparent 4px 7px);
}

.chart-wrap {
  position: relative;
  min-height: 270px;
}

.sales-chart {
  width: 100%;
  height: auto;
  overflow: visible;
}

.chart-grid line {
  stroke: #ececf1;
  stroke-width: 1;
}

.chart-labels text {
  fill: #aaaab1;
  font-size: 10px;
}

.actual-line,
.forecast-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
}

.actual-line { stroke: #6654d9; }
.forecast-line { stroke: #f07862; stroke-dasharray: 7 7; }
.today-dot { fill: #fff; stroke: #6654d9; stroke-width: 3; }
.forecast-dot { fill: #fff; stroke: #f07862; stroke-width: 3; }

.chart-now-label,
.chart-projection-label {
  position: absolute;
  padding: 4px 7px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 800;
  pointer-events: none;
}

.chart-now-label {
  top: 42%;
  left: 57%;
  background: #ece9ff;
  color: #5945c4;
}

.chart-projection-label {
  top: 23%;
  right: 1%;
  background: #fff0ed;
  color: #cf5545;
}

.chart-projection-label.applied {
  top: 10%;
  background: #e8f7ef;
  color: #17794f;
}

.diagnosis-card {
  position: relative;
  overflow: hidden;
}

.diagnosis-illustration {
  height: 94px;
  display: flex;
  justify-content: flex-end;
  margin: -9px -5px 3px 0;
}

.diagnosis-illustration svg {
  height: 100%;
}

.diagnosis-illustration .brain-lines {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.diagnosis-illustration .brain-spark,
.ticket-illustration .ticket-spark {
  fill: #ffad55;
  stroke: none;
}

.diagnosis-summary {
  margin-top: 13px;
  color: #55555d;
  font-size: 13px;
  line-height: 1.75;
}

.diagnosis-reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
}

.diagnosis-reasons span,
.keyword-row span {
  padding: 5px 8px;
  border-radius: 999px;
  background: #f2f1f7;
  color: #66636f;
  font-size: 10px;
  font-weight: 700;
}

.diagnosis-conclusion {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #ffddd7;
  border-radius: 10px;
  background: #fff6f4;
}

.diagnosis-conclusion span {
  color: #d05a49;
  font-size: 10px;
  font-weight: 800;
}

.diagnosis-conclusion strong {
  color: #7f4139;
  font-size: 12px;
  line-height: 1.5;
}

.action-card {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  padding: 24px;
  margin-bottom: 18px;
  border-color: #dcd6ff;
  background: linear-gradient(115deg, #faf9ff 0%, #fff 58%, #fff9f4 100%);
}

.ticket-illustration {
  display: grid;
  place-items: center;
  border-right: 1px solid #e5e1f7;
}

.ticket-illustration svg {
  width: 122px;
}

.ticket-illustration path:not(:first-child) {
  fill: none;
  stroke: #6654d9;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.ticket-illustration .ticket-spark {
  fill: #ffad55;
  stroke: none;
}

.action-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}

.confidence-pill {
  padding: 4px 8px;
  background: #eeebff;
  color: #5d49c9;
  font-size: 9px;
}

.action-lead {
  margin-top: 11px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.action-reason {
  margin-top: 6px;
  color: #6f6f76;
  font-size: 12px;
  line-height: 1.6;
}

.action-effects {
  display: flex;
  gap: 26px;
  margin-top: 17px;
}

.action-effects div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-effects span {
  color: #9999a0;
  font-size: 9px;
}

.action-effects strong {
  color: #5e4bc7;
  font-size: 14px;
}

.simulation-button {
  min-width: 138px;
  padding: 13px 16px;
  background: #6654d9;
  color: #fff;
  font-size: 12px;
  box-shadow: 0 7px 16px rgba(102, 84, 217, 0.2);
}

.simulation-button:hover {
  transform: translateY(-1px);
  background: #5946c7;
}

.simulation-button.applied {
  background: #178154;
  box-shadow: 0 7px 16px rgba(23, 129, 84, 0.18);
}

.bottom-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 0;
}

.risk-count {
  padding: 5px 9px;
  background: #fff1ee;
  color: #d15b4d;
  font-size: 10px;
}

.review-count {
  padding: 5px 9px;
  background: #efedff;
  color: #5e4bc8;
  font-size: 10px;
}

.risk-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.risk-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 11px;
  padding: 13px;
  border: 1px solid #eeeef2;
  border-radius: 11px;
  background: #fafafd;
}

.risk-item.risk-high {
  border-color: #f6d5d0;
  background: #fff8f7;
}

.risk-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #fff0ed;
  color: #dc6454;
}

.risk-icon svg {
  width: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.risk-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.risk-title-row strong {
  font-size: 12px;
}

.risk-title-row span {
  color: #d25e4e;
  font-size: 9px;
  font-weight: 800;
}

.risk-item p {
  margin-top: 3px;
  color: #74747b;
  font-size: 10px;
  line-height: 1.5;
}

.risk-item small {
  display: block;
  margin-top: 6px;
  color: #6552c9;
  font-size: 9px;
  font-weight: 700;
}

.review-overview {
  display: grid;
  grid-template-columns: 122px 1fr;
  align-items: center;
  gap: 20px;
}

.sentiment-donut {
  position: relative;
  width: 118px;
  height: 118px;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.sentiment-donut::after {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  background: #fff;
}

.sentiment-donut > div {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sentiment-donut strong {
  color: #5d49ca;
  font-size: 24px;
}

.sentiment-donut span {
  color: #9999a0;
  font-size: 9px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  color: #f0a83b;
}

.rating-row strong {
  font-size: 14px;
}

.review-summary p {
  margin-top: 8px;
  color: #66666e;
  font-size: 11px;
  line-height: 1.65;
}

.keyword-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.improvement-box {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  margin-top: 16px;
  padding: 12px;
  border-radius: 10px;
  background: #f3f1ff;
}

.improvement-icon {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #6654d9;
  color: #fff;
}

.improvement-box div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.improvement-box span {
  color: #6b57cf;
  font-size: 9px;
  font-weight: 800;
}

.improvement-box strong {
  color: #514a69;
  font-size: 11px;
  line-height: 1.5;
}

.insight-toast {
  position: fixed;
  z-index: 300;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: calc(100% - 40px);
  padding: 12px 17px;
  border-radius: 11px;
  background: #29292d;
  color: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  font-weight: 700;
}

.insight-toast svg {
  width: 18px;
  color: #a99cff;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}

@keyframes orbit {
  to { transform: rotate(180deg) scaleX(0.65); }
}

@media (max-width: 1024px) {
  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .analysis-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .action-card {
    grid-template-columns: 120px 1fr;
  }

  .simulation-button {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 720px) {
  .insight-container {
    width: min(100% - 32px, 1280px);
    padding-top: 26px;
  }

  .page-heading {
    flex-direction: column;
  }

  .performance-panel {
    grid-template-columns: 64px 1fr;
  }

  .performance-poster-wrap {
    width: 64px;
    height: 84px;
  }

  .reanalyze-button {
    grid-column: 1 / -1;
    width: 100%;
  }

  .performance-select {
    font-size: 17px;
  }

  .card-heading-row {
    flex-direction: column;
  }

  .action-card {
    grid-template-columns: 1fr;
  }

  .ticket-illustration {
    display: none;
  }

  .simulation-button {
    grid-column: 1;
    width: 100%;
  }

  .action-effects {
    gap: 14px;
    justify-content: space-between;
  }
}

@media (max-width: 500px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .metric-card {
    min-height: 148px;
  }

  .review-overview {
    grid-template-columns: 1fr;
  }

  .sentiment-donut {
    margin: 0 auto;
  }

  .action-effects {
    flex-direction: column;
    gap: 9px;
  }
}
</style>
