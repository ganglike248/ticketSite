<template>
  <div class="page-wrapper">
    <AppHeader />

    <div class="detail-layout" v-if="course">
      <div class="detail-hero">
        <div class="detail-hero-inner">
          <!-- 좌측 상세 정보 -->
          <div class="detail-info fade-in-up">
            <router-link to="/courses" class="back-link">
              <span aria-hidden="true">←</span> 공연 목록으로
            </router-link>

            <div class="badge-row">
              <span class="badge" :class="badgeClass">{{ displayCategory }}</span>
              <span class="sale-status" :class="{ 'sale-status-closed': isSalesClosed }">
                <span class="status-dot"></span>
                {{ saleStatusLabel }}
              </span>
            </div>

            <h1 class="detail-title">{{ course.title }}</h1>
            <p class="detail-desc">
              {{ course.description || '최고의 아티스트와 스태프가 준비한 특별한 무대를 만나보세요.' }}
            </p>

            <div class="detail-meta">
              <span class="meta-item">📅 {{ displaySchedule }}</span>
              <span class="meta-item">📍 {{ displayVenue }}</span>
              <span v-if="displayRuntime" class="meta-item">⏱️ {{ displayRuntime }}</span>
              <span v-if="displayAgeRating" class="meta-item">🎫 {{ displayAgeRating }}</span>
            </div>

            <div class="detail-sub-meta">
              <span><strong>주최자</strong> {{ displayOrganizerName }}</span>
              <span><strong>예매자</strong> {{ displayBookingCount }}명</span>
            </div>
          </div>

          <!-- 우측 결제/예매 카드 -->
          <div class="enroll-card fade-in">
            <div class="enroll-thumb" :class="thumbBg">
              <img v-if="thumbSrc" :src="thumbSrc" :alt="course.title" />
              <div v-else class="poster-placeholder">
                <span class="poster-icon">🎟️</span>
                <span class="poster-category">{{ displayCategory }}</span>
              </div>
            </div>

            <div class="enroll-body">
              <div class="price-row">
                <span class="price-label">티켓 1매</span>
                <div class="enroll-price">₩{{ displayPrice }}</div>
              </div>

              <button
                class="btn btn-primary btn-full"
                @click="handlePrimaryAction"
                :disabled="buttonDisabled"
                :class="{ 'btn-disabled': buttonDisabled }"
              >
                <span v-if="enrolling">처리 중...</span>
                <span v-else>{{ buttonLabel }}</span>
              </button>

              <div v-if="enrollError" class="error-msg">{{ enrollError }}</div>

              <p class="helper-text" v-if="helperText">
                {{ helperText }}
              </p>

              <ul class="enroll-info-list">
                <li>✅ 결제 완료 후 예매 확정</li>
                <li>✅ 내 예매 목록에서 상태 확인</li>
                <li>✅ 현재 상품은 1인 1매 예매</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="loading-center">
      <div class="spinner"></div>
    </div>

    <div v-else class="loading-center">
      <p class="empty-text">공연 정보를 불러오지 못했습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useCourseStore } from '@/store/course.js'
import { enrollmentApi } from '@/api/enrollment.js'
import { useAuthStore } from '@/store/auth.js'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const auth = useAuthStore()

const enrolling = ref(false)
const enrollError = ref('')
const enrollmentStatus = ref('NONE') // NONE | PENDING | ACTIVE | CANCELLED

const course = computed(() => courseStore.selectedCourse)
const loading = computed(() => courseStore.loading)
const isInstructor = computed(() => auth.user?.role === 'INSTRUCTOR')
const isSalesClosed = computed(() => {
  const status = course.value?.status
  return Boolean(status) && String(status).toUpperCase() !== 'ACTIVE'
})
const saleStatusLabel = computed(() => isSalesClosed.value ? '예매 마감' : '예매 가능')

const eventCategoryLabelMap = {
  MOVIE: '영화',
  MUSICAL: '뮤지컬',
  PLAY: '연극',
  THEATER: '연극',
  CONCERT: '콘서트',
  CLASSIC: '클래식',
  EXHIBITION: '전시',
  FESTIVAL: '페스티벌',
  PERFORMANCE: '공연'
}

const legacyCategoryLabelMap = {
  '백엔드': '콘서트',
  '프론트엔드': '뮤지컬',
  'DevOps': '연극',
  '데이터': '클래식',
  'AI': '페스티벌',
  BACKEND: '콘서트',
  FRONTEND: '뮤지컬',
  DEVOPS: '연극',
  DATA: '클래식',
  DATA_SCIENCE: '클래식'
}

const categoryConfig = {
  '영화': { badge: 'badge-pink', bg: 'thumb-red' },
  '뮤지컬': { badge: 'badge-purple', bg: 'thumb-purple' },
  '연극': { badge: 'badge-amber', bg: 'thumb-amber' },
  '콘서트': { badge: 'badge-blue', bg: 'thumb-blue' },
  '클래식': { badge: 'badge-teal', bg: 'thumb-teal' },
  '페스티벌': { badge: 'badge-pink', bg: 'thumb-pink' },
  '전시': { badge: 'badge-purple', bg: 'thumb-purple' },
  '공연': { badge: 'badge-blue', bg: 'thumb-blue' },
  '영화·공연': { badge: 'badge-gray', bg: 'thumb-gray' }
}

const displayCategory = computed(() => {
  const category = course.value?.eventType || course.value?.type || course.value?.category
  if (!category) return '공연'
  if (eventCategoryLabelMap[category]) return eventCategoryLabelMap[category]
  if (legacyCategoryLabelMap[category]) return legacyCategoryLabelMap[category]
  return category
})

const config = computed(() => categoryConfig[displayCategory.value] || {})
const badgeClass = computed(() => config.value.badge || 'badge-gray')
const thumbBg = computed(() => config.value.bg || 'thumb-gray')

const displayOrganizerName = computed(() => {
  return (
    course.value?.organizerName ||
    course.value?.providerName ||
    course.value?.distributorName ||
    course.value?.instructorName ||
    course.value?.teacherName ||
    course.value?.instructor?.name ||
    course.value?.instructor_name ||
    course.value?.ownerName ||
    '주최자 정보 준비 중'
  )
})

const displayBookingCount = computed(() => {
  const value = Number(
    course.value?.bookingCount ??
    course.value?.reservationCount ??
    course.value?.enrollmentCount ??
    course.value?.enrollment_count ??
    0
  )
  return Number.isNaN(value) ? 0 : value.toLocaleString()
})

const displaySchedule = computed(() => {
  const value =
    course.value?.showAt ||
    course.value?.startAt ||
    course.value?.performanceAt ||
    course.value?.screeningAt ||
    course.value?.showtime ||
    course.value?.eventDate

  if (!value) return '일정 정보 준비 중'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
})

const displayVenue = computed(() => {
  return (
    course.value?.venueName ||
    course.value?.theaterName ||
    course.value?.hallName ||
    course.value?.location ||
    course.value?.venue ||
    '장소 정보 준비 중'
  )
})

const displayRuntime = computed(() => {
  const value = course.value?.runtimeMinutes ?? course.value?.runningTime
  if (value === null || value === undefined || value === '') return ''
  return typeof value === 'number' || /^\d+$/.test(String(value))
    ? `${value}분`
    : String(value)
})

const displayAgeRating = computed(() => {
  const value = course.value?.ageRating ?? course.value?.rating
  if (value === null || value === undefined || value === '') return ''
  return typeof value === 'number' || /^\d+$/.test(String(value))
    ? `${value}세 이상`
    : String(value)
})

const displayPrice = computed(() => {
  const value = Number(course.value?.price ?? 0)
  return Number.isNaN(value) ? '0' : value.toLocaleString()
})

const thumbSrc = computed(() => {
  const key =
    course.value?.posterUrl ||
    course.value?.poster ||
    course.value?.imageUrl ||
    course.value?.thumbnail ||
    config.value.thumb

  if (!key) return null

  const source = String(key)
  if (/^(https?:|data:|\/)/.test(source)) return source

  try {
    const fileName = /\.(png|jpe?g|webp|gif)$/i.test(source) ? source : `${source}.png`
    return new URL(`../assets/images/courses/${fileName}`, import.meta.url).href
  } catch {
    return null
  }
})

const buttonLabel = computed(() => {
  if (isInstructor.value) return '주최자 계정은 예매 불가'
  if (enrollmentStatus.value === 'ACTIVE') return '내 예매 목록으로 이동'
  if (enrollmentStatus.value === 'PENDING') return '예매 접수 · 결제 처리 중'
  if (enrollmentStatus.value === 'CANCELLED') return '취소된 예매입니다'
  if (isSalesClosed.value) return '예매가 종료되었습니다'
  return '예매 신청하기'
})

const buttonDisabled = computed(() => {
  if (enrolling.value) return true
  if (isInstructor.value) return true
  if (enrollmentStatus.value === 'PENDING') return true
  if (enrollmentStatus.value === 'CANCELLED') return true
  if (isSalesClosed.value && enrollmentStatus.value !== 'ACTIVE') return true
  return false
})

const helperText = computed(() => {
  if (isInstructor.value) {
    return '주최자 계정은 공연을 예매할 수 없습니다.'
  }

  if (enrollmentStatus.value === 'ACTIVE') {
    return '예매가 확정된 공연입니다. 내 예매 목록에서 상세 정보를 확인할 수 있습니다.'
  }

  if (enrollmentStatus.value === 'PENDING') {
    return '예매 신청이 접수되었습니다. 결제 처리 후 예매 상태가 반영됩니다.'
  }

  if (enrollmentStatus.value === 'CANCELLED') {
    return '취소된 예매입니다. 현재 시스템에서는 같은 상품을 다시 예매할 수 없습니다.'
  }

  if (isSalesClosed.value) {
    return '판매가 종료되어 더 이상 예매할 수 없습니다.'
  }

  return '예매 신청과 함께 결제가 처리되며, 현재 상품은 1인 1매 기준입니다.'
})

async function loadEnrollmentStatus() {
  if (!auth.user?.id || !course.value?.id || isInstructor.value) {
    enrollmentStatus.value = 'NONE'
    return
  }

  try {
    const res = await enrollmentApi.getMyEnrollments()
    console.log('[CourseDetail] my enrollments response =', res.data)

    const enrollments = Array.isArray(res.data?.data)
      ? res.data.data
      : Array.isArray(res.data)
        ? res.data
        : []

    const matched = enrollments.find(item => Number(item.courseId) === Number(course.value.id))

    if (!matched) {
      enrollmentStatus.value = 'NONE'
      return
    }

    if (matched.status === 'ACTIVE') {
      enrollmentStatus.value = 'ACTIVE'
    } else if (matched.status === 'CANCELLED') {
      enrollmentStatus.value = 'CANCELLED'
    } else {
      enrollmentStatus.value = 'PENDING'
    }
  } catch (e) {
    console.error('[CourseDetail] failed to load enrollment status:', e)
    enrollmentStatus.value = 'NONE'
  }
}

async function handlePrimaryAction() {
  enrollError.value = ''

  if (!course.value?.id) {
    enrollError.value = '공연 정보가 올바르지 않습니다.'
    return
  }

  if (isInstructor.value) {
    enrollError.value = '주최자 계정은 공연을 예매할 수 없습니다.'
    return
  }

  if (enrollmentStatus.value === 'ACTIVE') {
    router.push('/enrollments')
    return
  }

  if (enrollmentStatus.value === 'PENDING') {
    return
  }

  if (enrollmentStatus.value === 'CANCELLED' || isSalesClosed.value) {
    return
  }

  enrolling.value = true

  try {
    await enrollmentApi.enroll(course.value.id)
    enrollmentStatus.value = 'PENDING'
  } catch (e) {
    console.error('[CourseDetail] enroll failed:', e)
    enrollError.value = e.response?.data?.message || '결제/예매 신청에 실패했습니다.'
  } finally {
    enrolling.value = false
  }
}

onMounted(async () => {
  await courseStore.fetchCourse(route.params.id)
  console.log('[CourseDetail] selectedCourse =', courseStore.selectedCourse)
})

watch(
  () => course.value?.id,
  async (courseId) => {
    if (courseId) {
      await loadEnrollmentStatus()
    } else {
      enrollmentStatus.value = 'NONE'
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f7f9fc;
}

.detail-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 12%, rgba(55, 138, 221, 0.18), transparent 28%),
    radial-gradient(circle at 10% 90%, rgba(83, 74, 183, 0.1), transparent 30%),
    linear-gradient(135deg, #f7fbff 0%, #eaf4ff 52%, #f5f2ff 100%);
  border-bottom: 1px solid var(--color-border);
  padding: 56px 0 72px;
}

.detail-hero::before,
.detail-hero::after {
  position: absolute;
  content: '';
  border-radius: 50%;
  pointer-events: none;
}

.detail-hero::before {
  top: -140px;
  right: -80px;
  width: 360px;
  height: 360px;
  border: 1px solid rgba(24, 95, 165, 0.09);
}

.detail-hero::after {
  right: 180px;
  bottom: -190px;
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.32);
}

.detail-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 64px;
  align-items: center;
}

.detail-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  min-width: 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
  transition: var(--transition);
}

.back-link:hover {
  color: var(--color-primary);
  transform: translateX(-2px);
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge-row .badge {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
}

.sale-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid rgba(15, 110, 86, 0.15);
  border-radius: 999px;
  background: rgba(225, 245, 238, 0.72);
  color: #0f6e56;
  font-size: 11px;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 4px rgba(15, 110, 86, 0.1);
  animation: statusPulse 1.8s ease-in-out infinite;
}

.sale-status-closed {
  border-color: rgba(107, 114, 128, 0.16);
  background: rgba(243, 244, 246, 0.86);
  color: #6b7280;
}

.sale-status-closed .status-dot {
  box-shadow: none;
  animation: none;
}

.detail-title {
  max-width: 720px;
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.035em;
  color: #162033;
  word-break: keep-all;
}

.detail-desc {
  max-width: 680px;
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  word-break: keep-all;
}

.detail-meta {
  width: 100%;
  max-width: 680px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.meta-item {
  min-width: 0;
  padding: 11px 13px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 8px 24px rgba(24, 95, 165, 0.04);
  backdrop-filter: blur(10px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-sub-meta {
  width: 100%;
  max-width: 680px;
  display: flex;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.22);
  font-size: 13px;
  color: var(--color-text-muted);
  flex-wrap: wrap;
}

.detail-sub-meta strong {
  margin-right: 6px;
  color: var(--color-text-secondary);
  font-weight: 700;
}

.enroll-card {
  position: relative;
  background: var(--color-bg-primary);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(24, 95, 165, 0.16), 0 6px 18px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.enroll-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 70px rgba(24, 95, 165, 0.2), 0 8px 22px rgba(15, 23, 42, 0.09);
}

.enroll-thumb {
  position: relative;
  height: 236px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.enroll-thumb::after {
  position: absolute;
  inset: auto 0 0;
  height: 72px;
  content: '';
  background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.16));
  pointer-events: none;
}

.enroll-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.enroll-card:hover .enroll-thumb img {
  transform: scale(1.035);
}

.thumb-red { background: linear-gradient(145deg, #fde8e8 0%, #f8bfc4 100%); }
.thumb-teal { background: linear-gradient(145deg, #e1f5ee 0%, #b9e7d9 100%); }
.thumb-blue { background: linear-gradient(145deg, #e6f1fb 0%, #bedcf5 100%); }
.thumb-amber { background: linear-gradient(145deg, #faeeda 0%, #f4d59f 100%); }
.thumb-purple { background: linear-gradient(145deg, #eeedfe 0%, #d4cff7 100%); }
.thumb-pink { background: linear-gradient(145deg, #fbeaf0 0%, #f3c4d4 100%); }
.thumb-gray { background: linear-gradient(145deg, #f1efe8 0%, #dfddd4 100%); }

.poster-placeholder {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-text-secondary);
}

.poster-icon {
  font-size: 60px;
  filter: drop-shadow(0 10px 14px rgba(15, 23, 42, 0.14));
}

.poster-category {
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  backdrop-filter: blur(6px);
}

.enroll-body {
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top: 1px dashed var(--color-border-hover);
}

.enroll-body::before,
.enroll-body::after {
  position: absolute;
  top: -12px;
  width: 24px;
  height: 24px;
  content: '';
  border-radius: 50%;
  background: #edf5fd;
}

.enroll-body::before {
  left: -13px;
}

.enroll-body::after {
  right: -13px;
}

.price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.price-label {
  padding-bottom: 3px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.enroll-price {
  font-size: 29px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.04em;
}

.btn-full {
  width: 100%;
  min-height: 50px;
  padding: 13px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(24, 95, 165, 0.2);
}

.btn-full:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-color: transparent;
}

.btn-disabled {
  opacity: 0.62;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-disabled:hover {
  transform: none;
}

.enroll-info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
}

.enroll-info-list li {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.error-msg {
  font-size: 13px;
  color: #dc2626;
  padding: 10px 12px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  border-radius: var(--radius-md);
}

.helper-text {
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.empty-text {
  font-size: 14px;
  color: var(--color-text-muted);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 100px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.badge-gray {
  background: #f3f4f6;
  color: #6b7280;
}

@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .detail-hero {
    padding: 42px 0 56px;
  }

  .detail-hero-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .enroll-card {
    width: min(100%, 520px);
    justify-self: center;
  }
}

@media (max-width: 600px) {
  .detail-hero {
    padding: 28px 0 40px;
  }

  .detail-hero-inner {
    padding: 0 18px;
    gap: 28px;
  }

  .detail-info {
    gap: 15px;
  }

  .detail-title {
    font-size: 30px;
  }

  .detail-desc {
    font-size: 14px;
  }

  .detail-meta {
    grid-template-columns: 1fr;
  }

  .detail-sub-meta {
    flex-direction: column;
    gap: 6px;
  }

  .enroll-thumb {
    height: 210px;
  }

  .enroll-body {
    padding: 20px;
  }
}
</style>
