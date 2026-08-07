<template>
  <div class="landing">
    <AppHeader />

    <!-- 배너 캐러셀 -->
    <section class="banner">
      <div class="banner-track">
        <div
          v-for="(slide, i) in banners"
          :key="slide.title"
          class="banner-slide"
          :class="[slide.bg, { active: i === activeBanner }]"
        >
          <div class="banner-inner">
            <div class="banner-text">
              <span class="banner-tag">{{ slide.tag }}</span>
              <h1 class="banner-title">{{ slide.title }}</h1>
              <p class="banner-desc">{{ slide.desc }}</p>
            </div>
            <img :src="slide.img" :alt="slide.title" class="banner-img" />
          </div>
        </div>
      </div>

      <button class="banner-arrow banner-arrow-prev" @click="prevBanner" aria-label="이전 배너">‹</button>
      <button class="banner-arrow banner-arrow-next" @click="nextBanner" aria-label="다음 배너">›</button>

      <div class="banner-dots">
        <button
          v-for="(slide, i) in banners"
          :key="'dot-'+slide.title"
          class="banner-dot"
          :class="{ active: i === activeBanner }"
          @click="goToBanner(i)"
          :aria-label="`${i + 1}번 배너`"
        ></button>
      </div>
    </section>

    <!-- 검색 -->
    <section class="search-section">
      <form class="search-bar" @submit.prevent="handleSearch">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="공연명, 아티스트를 검색해보세요"
        />
        <button type="submit" class="btn btn-primary search-btn">검색</button>
      </form>

      <div class="quick-categories">
        <router-link
          v-for="qc in quickCategories"
          :key="qc.label"
          to="/login"
          class="quick-category"
        >
          <span class="qc-icon">{{ qc.icon }}</span>
          <span class="qc-label">{{ qc.label }}</span>
        </router-link>
      </div>
    </section>

    <!-- 실시간 예매 랭킹 -->
    <section class="ranking-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">실시간 예매 랭킹</h2>
          <router-link to="/login" class="section-link">전체 보기 →</router-link>
        </div>
        <ol class="ranking-list">
          <li v-for="(course, i) in featuredCourses" :key="course.id" class="ranking-item">
            <router-link to="/login" class="ranking-link">
              <span class="ranking-num" :class="{ top: i < 3 }">{{ i + 1 }}</span>
              <img :src="course.thumbSrc" :alt="course.title" class="ranking-thumb" />
              <div class="ranking-info">
                <span class="badge" :class="course.badgeClass">{{ course.category }}</span>
                <p class="ranking-title">{{ course.title }}</p>
                <p class="ranking-meta">{{ course.instructor }}</p>
              </div>
              <span class="ranking-price">{{ course.price }}</span>
            </router-link>
          </li>
        </ol>
      </div>
    </section>

    <!-- 오픈예정 공연 -->
    <section class="upcoming-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">오픈예정 공연</h2>
          <router-link to="/login" class="section-link">전체 보기 →</router-link>
        </div>
        <div class="upcoming-grid">
          <div v-for="show in upcomingShows" :key="show.id" class="upcoming-card">
            <div class="upcoming-thumb">
              <img :src="show.thumbSrc" :alt="show.title" class="thumb-img" />
              <span class="dday-badge">{{ show.dday }}</span>
            </div>
            <div class="upcoming-body">
              <span class="badge" :class="show.badgeClass">{{ show.category }}</span>
              <h3 class="upcoming-title">{{ show.title }}</h3>
              <p class="upcoming-open-at">예매 오픈 {{ show.openDate }}</p>
              <button
                class="notify-btn"
                :class="{ notified: notifiedIds.has(show.id) }"
                @click="toggleNotify(show.id)"
              >
                {{ notifiedIds.has(show.id) ? '✓ 신청 완료' : '오픈 알림 신청' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 할인 중인 티켓 -->
    <section class="discount-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">할인 중인 티켓</h2>
          <router-link to="/login" class="section-link">전체 보기 →</router-link>
        </div>
        <div class="discount-grid">
          <router-link v-for="ticket in discountedTickets" :key="ticket.id" to="/login" class="discount-card">
            <div class="discount-thumb">
              <img :src="ticket.thumbSrc" :alt="ticket.title" class="thumb-img" />
              <span class="discount-badge">{{ ticket.discountPercent }}%</span>
            </div>
            <div class="discount-body">
              <span class="badge" :class="ticket.badgeClass">{{ ticket.category }}</span>
              <h3 class="discount-title">{{ ticket.title }}</h3>
              <div class="discount-price-row">
                <span class="discount-original">₩{{ ticket.originalPrice.toLocaleString() }}</span>
                <span class="discount-final">₩{{ ticket.discountPrice.toLocaleString() }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 장르별 공연 -->
    <section class="popular-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">장르별 공연</h2>
          <router-link to="/login" class="section-link">전체 보기 →</router-link>
        </div>

        <div class="genre-tabs">
          <button
            v-for="genre in genres"
            :key="genre"
            class="genre-tab"
            :class="{ active: selectedGenre === genre }"
            @click="selectedGenre = genre"
          >
            {{ genre }}
          </button>
        </div>

        <div v-if="genreFilteredCourses.length" class="course-grid">
          <div v-for="course in genreFilteredCourses" :key="course.id" class="course-card-landing">
            <div class="card-thumb" :class="course.thumbBg">
              <img :src="course.thumbSrc" :alt="course.title" class="thumb-img" />
            </div>
            <div class="card-body">
              <span class="badge" :class="course.badgeClass">{{ course.category }}</span>
              <h3 class="card-title">{{ course.title }}</h3>
              <div class="card-meta">
                <span class="instructor">{{ course.instructor }}</span>
                <span class="price">{{ course.price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="genre-empty">해당 장르의 공연이 없습니다.</div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2>지금 바로 시작하세요</h2>
        <p>수천 명의 관객들이 TicketNexus와 함께 공연을 즐기고 있습니다.</p>
        <router-link to="/login" class="btn btn-primary btn-lg">예매 시작하기</router-link>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-logo">
          <img src="@/assets/images/logo/main_logo.png" alt="TicketNexus" />
          <span>TicketNexus</span>
        </div>
        <p class="footer-copy">© 2026 TicketNexus. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

import concertImg  from '@/assets/images/courses/concert1.jpg'
import musicalImg  from '@/assets/images/courses/musical1.jpg'
import act1Img     from '@/assets/images/courses/act1.jpg'
import act2Img      from '@/assets/images/courses/act2.jpg'
import classicImg  from '@/assets/images/courses/classic1.jpg'
import festivalImg from '@/assets/images/courses/festival1.jpg'

const router = useRouter()

const featuredCourses = [
  { id:1, title:'2026 드림 콘서트 <봄의 왈츠>',   category:'콘서트',   instructor:'드림뮤직컴퍼니',     price:'₩89,000', thumbSrc: concertImg,  thumbBg:'thumb-teal',   badgeClass:'badge-teal'   },
  { id:2, title:'뮤지컬 <라이트 하우스>',         category:'뮤지컬',   instructor:'스테이지원컴퍼니',   price:'₩69,000', thumbSrc: musicalImg,  thumbBg:'thumb-teal',   badgeClass:'badge-teal'   },
  { id:3, title:'연극 <자정의 목소리>',           category:'연극',     instructor:'무대예술기획',       price:'₩99,000', thumbSrc: act1Img,     thumbBg:'thumb-blue',   badgeClass:'badge-blue'   },
  { id:4, title:'연극 <겨울, 그리고 봄>',         category:'연극',     instructor:'한여름기획',         price:'₩79,000', thumbSrc: act2Img,     thumbBg:'thumb-blue',   badgeClass:'badge-blue'   },
  { id:5, title:'클래식 갈라 콘서트 <현의 울림>', category:'클래식',   instructor:'필하모닉프로덕션',   price:'₩59,000', thumbSrc: classicImg,  thumbBg:'thumb-purple', badgeClass:'badge-purple' },
  { id:6, title:'2026 썸머 뮤직 페스티벌',        category:'페스티벌', instructor:'빅웨이브페스티벌컴퍼니', price:'₩75,000', thumbSrc: festivalImg, thumbBg:'thumb-pink',   badgeClass:'badge-pink'   },
]

const banners = [
  { tag: '얼리버드 오픈', title: '2026 드림 콘서트 <봄의 왈츠>', desc: '얼리버드 티켓 최대 20% 할인, 선착순 마감', img: concertImg, bg: 'banner-teal' },
  { tag: '단독 예매', title: '뮤지컬 <라이트 하우스>', desc: '전석 프리미엄 시야, 지금 바로 예매하세요', img: musicalImg, bg: 'banner-blue' },
  { tag: '이번 여름 최대 축제', title: '2026 썸머 뮤직 페스티벌', desc: '3일간 펼쳐지는 야외 페스티벌', img: festivalImg, bg: 'banner-pink' },
]

const activeBanner = ref(0)
let bannerTimer = null

function goToBanner(i) { activeBanner.value = i }
function nextBanner() { activeBanner.value = (activeBanner.value + 1) % banners.length }
function prevBanner() { activeBanner.value = (activeBanner.value - 1 + banners.length) % banners.length }

onMounted(() => {
  bannerTimer = setInterval(nextBanner, 4500)
})
onUnmounted(() => {
  clearInterval(bannerTimer)
})

const searchQuery = ref('')
function handleSearch() {
  router.push('/login')
}

const quickCategories = [
  { icon: '🎤', label: '콘서트' },
  { icon: '🎭', label: '뮤지컬' },
  { icon: '🎬', label: '연극' },
  { icon: '🎻', label: '클래식' },
  { icon: '🎪', label: '페스티벌' },
  { icon: '⚾', label: '스포츠' },
]

const upcomingShows = [
  { id:'u1', title:'클래식 갈라 콘서트 <현의 울림> 시즌2', category:'클래식',   openDate:'2026.08.20 10:00', dday:'D-13', thumbSrc: classicImg,  badgeClass:'badge-purple' },
  { id:'u2', title:'연극 <겨울, 그리고 봄> 앙코르',        category:'연극',     openDate:'2026.08.16 18:00', dday:'D-9',  thumbSrc: act2Img,     badgeClass:'badge-blue'   },
  { id:'u3', title:'2026 드림 콘서트 <봄의 왈츠> 지방투어', category:'콘서트',   openDate:'2026.08.12 12:00', dday:'D-5',  thumbSrc: concertImg,  badgeClass:'badge-teal'   },
]

const notifiedIds = ref(new Set())
function toggleNotify(id) {
  const next = new Set(notifiedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  notifiedIds.value = next
}

const discountedTickets = [
  { id:'d1', title:'뮤지컬 <라이트 하우스>',       category:'뮤지컬',   originalPrice:69000, discountPercent:15, thumbSrc: musicalImg,  badgeClass:'badge-teal'   },
  { id:'d2', title:'연극 <자정의 목소리>',         category:'연극',     originalPrice:99000, discountPercent:10, thumbSrc: act1Img,     badgeClass:'badge-blue'   },
  { id:'d3', title:'2026 썸머 뮤직 페스티벌',      category:'페스티벌', originalPrice:75000, discountPercent:20, thumbSrc: festivalImg, badgeClass:'badge-pink'   },
  { id:'d4', title:'2026 드림 콘서트 <봄의 왈츠>', category:'콘서트',   originalPrice:89000, discountPercent:12, thumbSrc: concertImg,  badgeClass:'badge-teal'   },
].map(t => ({ ...t, discountPrice: Math.round(t.originalPrice * (1 - t.discountPercent / 100) / 100) * 100 }))

const genres = ['전체', '콘서트', '뮤지컬', '연극', '클래식', '페스티벌']
const selectedGenre = ref('전체')
const genreFilteredCourses = computed(() => {
  if (selectedGenre.value === '전체') return featuredCourses
  return featuredCourses.filter(c => c.category === selectedGenre.value)
})
</script>

<style scoped>
.landing { background: var(--color-bg-secondary); }

/* 배너 캐러셀 */
.banner {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}
.banner-track {
  position: relative;
  height: 360px;
}
.banner-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease;
}
.banner-slide.active { opacity: 1; visibility: visible; }
.banner-teal { background: linear-gradient(135deg, #e1f5ee 0%, #eaf9f3 100%); }
.banner-blue { background: linear-gradient(135deg, #e6f1fb 0%, #eef7ff 100%); }
.banner-pink { background: linear-gradient(135deg, #fbeaf0 0%, #fdf1f5 100%); }
.banner-inner {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 64px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 40px;
}
.banner-tag {
  display: inline-block;
  padding: 5px 14px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
}
.banner-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}
.banner-desc {
  font-size: 15px;
  color: var(--color-text-secondary);
}
.banner-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  color: var(--color-text-primary);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.banner-arrow:hover { background: #fff; }
.banner-arrow-prev { left: 20px; }
.banner-arrow-next { right: 20px; }
.banner-dots {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.banner-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0,0,0,0.2);
  transition: var(--transition);
}
.banner-dot.active { background: var(--color-primary); width: 22px; border-radius: 4px; }

/* 검색 + 퀵 카테고리 */
.search-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 8px;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 640px;
  margin: 0 auto 28px;
  padding: 6px 8px 6px 18px;
  background: var(--color-bg-primary);
  border: 1.5px solid var(--color-border);
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
}
.search-bar:focus-within { border-color: var(--color-primary); }
.search-icon { font-size: 15px; }
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}
.search-btn { border-radius: 999px; padding: 9px 22px; }

.quick-categories {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
}
.quick-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  transition: var(--transition);
}
.quick-category:hover { color: var(--color-primary); }
.qc-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  transition: var(--transition);
}
.quick-category:hover .qc-icon { border-color: var(--color-primary); box-shadow: var(--shadow-md); }
.qc-label { font-size: 12px; font-weight: 500; }

/* 공통 섹션 */
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-title { font-size: 22px; font-weight: 700; color: var(--color-text-primary); }
.section-link { font-size: 14px; color: var(--color-primary); font-weight: 500; }
.section-link:hover { text-decoration: underline; }

/* 실시간 예매 랭킹 */
.ranking-section { padding: 48px 0; }
.ranking-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 32px;
}
.ranking-item { border-bottom: 1px solid var(--color-border); }
.ranking-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 4px;
}
.ranking-num {
  width: 24px;
  flex-shrink: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-align: center;
}
.ranking-num.top { color: var(--color-primary); }
.ranking-thumb {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}
.ranking-info { flex: 1; min-width: 0; }
.ranking-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ranking-meta { font-size: 11px; color: var(--color-text-muted); margin-top: 2px; }
.ranking-price { font-size: 13px; font-weight: 600; color: var(--color-primary); flex-shrink: 0; }

/* 오픈예정 공연 */
.upcoming-section { padding: 16px 0 48px; }
.upcoming-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.upcoming-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}
.upcoming-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.upcoming-thumb { position: relative; height: 110px; overflow: hidden; }
.dday-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  background: var(--color-text-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 20px;
}
.upcoming-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; }
.upcoming-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); line-height: 1.4; }
.upcoming-open-at { font-size: 12px; color: var(--color-text-secondary); }
.notify-btn {
  margin-top: 6px;
  padding: 8px 0;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-primary);
  background: #fff;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  transition: var(--transition);
}
.notify-btn:hover { background: var(--color-primary-light); }
.notify-btn.notified {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

/* 할인 중인 티켓 */
.discount-section { padding: 16px 0 48px; }
.discount-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.discount-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}
.discount-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.discount-thumb { position: relative; height: 100px; overflow: hidden; }
.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 9px;
  background: var(--color-danger);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 20px;
}
.discount-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; }
.discount-title { font-size: 13px; font-weight: 600; color: var(--color-text-primary); line-height: 1.4; }
.discount-price-row { display: flex; align-items: baseline; gap: 8px; }
.discount-original { font-size: 12px; color: var(--color-text-muted); text-decoration: line-through; }
.discount-final { font-size: 15px; font-weight: 700; color: var(--color-danger); }

/* 장르별 공연 */
.popular-section { padding: 16px 0 64px; }
.genre-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.genre-tab {
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1.5px solid var(--color-border);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  transition: var(--transition);
}
.genre-tab:hover { border-color: var(--color-primary); color: var(--color-primary); }
.genre-tab.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.course-card-landing {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}
.course-card-landing:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.card-thumb {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.thumb-teal   { background: #E1F5EE; }
.thumb-blue   { background: #E6F1FB; }
.thumb-purple { background: #EEEDFE; }
.thumb-pink   { background: #FBEAF0; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; }
.card-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); line-height: 1.4; }
.card-meta { display: flex; justify-content: space-between; align-items: center; }
.instructor { font-size: 12px; color: var(--color-text-secondary); }
.price { font-size: 14px; font-weight: 600; color: var(--color-primary); }
.genre-empty {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

/* CTA */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  text-align: center;
}
.cta-inner { max-width: 600px; margin: 0 auto; padding: 0 24px; }
.cta-inner h2 { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 12px; }
.cta-inner p { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 32px; }
.cta-inner .btn-primary {
  background: #fff;
  color: var(--color-primary);
  border-color: #fff;
  font-weight: 600;
}
.cta-inner .btn-primary:hover { background: #f0f7ff; }
.btn-lg { padding: 12px 28px; font-size: 15px; }

/* 푸터 */
.footer {
  background: var(--color-text-primary);
  padding: 32px 0;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.footer-logo img { width: 28px; height: 28px; border-radius: 6px; }
.footer-copy { font-size: 13px; color: rgba(255,255,255,0.5); }

@media (max-width: 860px) {
  .banner-inner { padding: 0 24px; grid-template-columns: 1fr; text-align: center; }
  .banner-img { display: none; }
  .ranking-list { grid-template-columns: 1fr; }
  .course-grid { grid-template-columns: repeat(2, 1fr); }
  .upcoming-grid { grid-template-columns: 1fr; }
  .discount-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
