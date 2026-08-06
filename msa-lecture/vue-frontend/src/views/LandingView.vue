<template>
  <div class="landing">
    <AppHeader />

    <!-- 히어로 섹션 -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-content fade-in-up">
          <span class="hero-badge">공연 티켓 예매 플랫폼</span>
          <h1 class="hero-title">최고의 공연을,<br>가장 빠르게 예매하세요</h1>
          <p class="hero-desc">콘서트, 뮤지컬, 연극 등 다양한 공연을 만나고 최적의 좌석을 예매하세요.</p>
          <div class="hero-actions">
            <router-link to="/login" class="btn btn-primary btn-lg">예매 시작하기</router-link>
            <router-link to="/courses" class="btn btn-outline btn-lg">공연 둘러보기</router-link>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">1,200+</span><span class="stat-label">공연</span></div>
            <div class="stat"><span class="stat-num">340+</span><span class="stat-label">주최자</span></div>
            <div class="stat"><span class="stat-num">28,000+</span><span class="stat-label">예매자</span></div>
          </div>
        </div>
        <div class="hero-visual fade-in">
          <img src="@/assets/images/logo/main_logo.png" alt="TicketNexus" class="hero-logo" />
        </div>
      </div>
    </section>

    <!-- 인기 공연 -->
    <section class="popular-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">인기 공연</h2>
          <router-link to="/login" class="section-link">전체 보기 →</router-link>
        </div>
        <div class="course-grid">
          <div v-for="course in featuredCourses" :key="course.id" class="course-card-landing">
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
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="features-section">
      <div class="section-inner">
        <h2 class="section-title center">왜 TicketNexus인가요?</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
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
import AppHeader from '@/components/AppHeader.vue'

import concertImg  from '@/assets/images/courses/concert1.jpg'
import musicalImg  from '@/assets/images/courses/musical1.jpg'
import act1Img     from '@/assets/images/courses/act1.jpg'
import act2Img      from '@/assets/images/courses/act2.jpg'
import classicImg  from '@/assets/images/courses/classic1.jpg'
import festivalImg from '@/assets/images/courses/festival1.jpg'

const featuredCourses = [
  { id:1, title:'2026 드림 콘서트 <봄의 왈츠>',   category:'콘서트',   instructor:'드림뮤직컴퍼니',     price:'₩89,000', thumbSrc: concertImg,  thumbBg:'thumb-teal',   badgeClass:'badge-teal'   },
  { id:2, title:'뮤지컬 <라이트 하우스>',         category:'뮤지컬',   instructor:'스테이지원컴퍼니',   price:'₩69,000', thumbSrc: musicalImg,  thumbBg:'thumb-teal',   badgeClass:'badge-teal'   },
  { id:3, title:'연극 <자정의 목소리>',           category:'연극',     instructor:'무대예술기획',       price:'₩99,000', thumbSrc: act1Img,     thumbBg:'thumb-blue',   badgeClass:'badge-blue'   },
  { id:4, title:'연극 <겨울, 그리고 봄>',         category:'연극',     instructor:'한여름기획',         price:'₩79,000', thumbSrc: act2Img,     thumbBg:'thumb-blue',   badgeClass:'badge-blue'   },
  { id:5, title:'클래식 갈라 콘서트 <현의 울림>', category:'클래식',   instructor:'필하모닉프로덕션',   price:'₩59,000', thumbSrc: classicImg,  thumbBg:'thumb-purple', badgeClass:'badge-purple' },
  { id:6, title:'2026 썸머 뮤직 페스티벌',        category:'페스티벌', instructor:'빅웨이브페스티벌컴퍼니', price:'₩75,000', thumbSrc: festivalImg, thumbBg:'thumb-pink',   badgeClass:'badge-pink'   },
]

const features = [
  { icon:'🚀', title:'다양한 공연 라인업', desc:'콘서트부터 뮤지컬, 연극까지 다양한 공연을 만나보세요.' },
  { icon:'🎯', title:'맞춤 공연 추천', desc:'AI 기반 추천 시스템이 예매 이력을 분석해 딱 맞는 공연을 추천합니다.' },
  { icon:'💳', title:'간편한 예매 신청', desc:'원클릭 결제와 즉시 예매로 관람을 바로 준비하세요.' },
  { icon:'📱', title:'언제 어디서나', desc:'PC, 태블릿, 모바일 어디서든 끊김 없이 예매하세요.' },
]
</script>

<style scoped>
.landing { background: var(--color-bg-secondary); }

/* 히어로 */
.hero {
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f0f9ff 100%);
  border-bottom: 1px solid var(--color-border);
  padding: 80px 0 64px;
}
.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
}
.hero-badge {
  display: inline-block;
  padding: 5px 14px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
}
.hero-title {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.hero-desc {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 460px;
  margin-bottom: 28px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}
.btn-lg { padding: 12px 28px; font-size: 15px; }
.hero-stats {
  display: flex;
  gap: 36px;
}
.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-num { font-size: 22px; font-weight: 700; color: var(--color-primary); }
.stat-label { font-size: 12px; color: var(--color-text-secondary); }
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-logo {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
}

/* 강의 섹션 */
.popular-section { padding: 64px 0; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.section-title { font-size: 22px; font-weight: 700; color: var(--color-text-primary); }
.section-title.center { text-align: center; margin-bottom: 40px; }
.section-link { font-size: 14px; color: var(--color-primary); font-weight: 500; }
.section-link:hover { text-decoration: underline; }

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

/* 특징 */
.features-section { padding: 64px 0; background: var(--color-bg-primary); }
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.feature-card {
  padding: 28px 24px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: var(--transition);
}
.feature-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.feature-icon { font-size: 32px; margin-bottom: 12px; }
.feature-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
.feature-desc { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }

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
</style>
