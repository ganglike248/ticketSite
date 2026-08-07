<template>
  <div class="page-wrapper">
    <AppHeader />

    <main class="page-container">
      <section class="page-head">
        <div>
          <span class="eyebrow">✦ MY TICKETS</span>
          <h1 class="page-title">내 티켓 목록</h1>
          <p class="page-subtitle">예매한 공연과 예매 상태를 확인하세요.</p>
        </div>
      </section>

      <div class="page-body">
        <AppSidebar />

        <div class="main-content">
          <section class="card-surface list-card">
            <div v-if="loading" class="loading-center">
              <div class="spinner"></div>
            </div>

            <div v-else-if="enrollments.length" class="enrollment-list fade-in">
              <div
                v-for="item in enrollments"
                :key="item.id"
                class="enrollment-card"
              >
                <div
                  class="enroll-thumb"
                  :class="getThumbBg(item.course?.category)"
                >
                  <img :src="getThumbSrc(item.course)" :alt="item.course?.title" />
                </div>

                <div class="enroll-info">
                  <span class="badge" :class="getBadge(item.course?.category)">
                    {{ item.course?.category }}
                  </span>
                  <h3 class="enroll-title">{{ item.course?.title }}</h3>
                  <p class="enroll-instructor">
                    주최자: {{ item.course?.instructorName }}
                  </p>
                </div>

                <div class="enroll-status">
                  <span
                    :class="[
                      'status-badge',
                      item.status === 'ACTIVE' ? 'status-active' : 'status-pending',
                    ]"
                  >
                    {{ item.status === "ACTIVE" ? "예매 확정" : "대기 중" }}
                  </span>
                  <router-link
                    :to="`/courses/${item.courseId}`"
                    class="btn btn-ghost btn-sm"
                  >
                    공연 보기
                  </router-link>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <p class="empty-icon">📭</p>
              <p>구매한 티켓이 없습니다.</p>
              <router-link
                to="/courses"
                class="btn btn-primary"
                style="margin-top: 16px"
              >
                공연 둘러보기
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { enrollmentApi } from "@/api/enrollment.js";
import { useAuthStore } from "@/store/auth.js";

const router = useRouter();
const auth = useAuthStore();

const enrollments = ref([]);
const loading = ref(true);

const isInstructor = computed(() => auth.user?.role === "INSTRUCTOR");

const categoryConfig = {
  콘서트: { bg: "thumb-teal", badge: "badge-teal", thumb: "spring_boot" },
  뮤지컬: { bg: "thumb-teal", badge: "badge-teal", thumb: "vue_js" },
  연극: { bg: "thumb-blue", badge: "badge-blue", thumb: "kubernetes" },
  클래식: { bg: "thumb-purple", badge: "badge-purple", thumb: "python" },
  페스티벌: { bg: "thumb-pink", badge: "badge-pink", thumb: "generative_ai" },
};

function getThumbBg(cat) {
  return categoryConfig[cat]?.bg || "thumb-gray";
}

function getBadge(cat) {
  return categoryConfig[cat]?.badge || "badge-gray";
}

function getThumbSrc(course) {
  const key = course?.thumbnail || categoryConfig[course?.category]?.thumb;
  if (!key) return "";
  try {
    return new URL(`../assets/images/courses/${key}.png`, import.meta.url).href;
  } catch {
    return "";
  }
}

onMounted(async () => {
  // 주최자는 이 페이지 접근 불가 → 마이페이지로 이동
  if (isInstructor.value) {
    console.warn(
      "[EnrollmentView] instructor tried to access /enrollments, redirect to /mypage",
    );
    router.replace("/mypage");
    return;
  }

  try {
    const res = await enrollmentApi.getMyEnrollments();
    console.log("[EnrollmentView] my enrollments response:", res.data);

    if (Array.isArray(res.data?.data)) {
      enrollments.value = res.data.data;
    } else if (Array.isArray(res.data)) {
      enrollments.value = res.data;
    } else {
      enrollments.value = [];
    }
  } catch (error) {
    console.error("[EnrollmentView] failed to load enrollments:", error);
    enrollments.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.list-card {
  padding: 24px;
}

.enrollment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.enrollment-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: var(--transition);
}

.enrollment-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-sm);
}

.enroll-thumb {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.enroll-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.thumb-teal {
  background: #e1f5ee;
}

.thumb-blue {
  background: #e6f1fb;
}

.thumb-purple {
  background: #eeedfe;
}

.thumb-pink {
  background: #fbeaf0;
}

.thumb-gray {
  background: #f1efe8;
}

.enroll-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.enroll-title {
  font-size: 15px;
  font-weight: 600;
}

.enroll-instructor {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.enroll-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: var(--color-success-light);
  color: var(--color-success);
}

.status-pending {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.btn-sm {
  padding: 7px 14px;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
