<template>
  <aside class="sidebar card-surface">
    <div class="sidebar-section">
      <div class="sidebar-label">메뉴</div>

      <router-link
        to="/courses"
        class="sidebar-item"
        :class="{ active: $route.path.startsWith('/courses') }"
      >
        <BookOpen class="si-icon" :size="16" /> 공연 목록
      </router-link>

      <router-link
        v-if="!auth.isInstructor"
        to="/enrollments"
        class="sidebar-item"
        :class="{ active: $route.path === '/enrollments' }"
      >
        <Ticket class="si-icon" :size="16" /> 내 예매 목록
      </router-link>

      <router-link
        to="/mypage"
        class="sidebar-item"
        :class="{ active: $route.path === '/mypage' }"
      >
        <Star class="si-icon" :size="16" /> 마이페이지
      </router-link>

      <router-link
        v-if="auth.isInstructor"
        to="/marketing"
        class="sidebar-item"
        :class="{ active: $route.path.startsWith('/marketing') }"
      >
        <Megaphone class="si-icon" :size="16" /> AI 마케팅 센터
      </router-link>

      <router-link
        v-if="auth.isInstructor"
        to="/sales-insight"
        class="sidebar-item"
        :class="{ active: $route.path === '/sales-insight' }"
      >
        <Sparkles class="si-icon" :size="16" /> AI 판매 인사이트
      </router-link>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-label">계정</div>
      <button class="sidebar-item sidebar-btn" @click="handleLogout">
        <LogOut class="si-icon" :size="16" /> 로그아웃
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";
import {
  BookOpen,
  Ticket,
  Star,
  Megaphone,
  Sparkles,
  LogOut,
} from "@lucide/vue";

const router = useRouter();
const auth = useAuthStore();

function handleLogout() {
  auth.logout();
  router.push("/");
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  position: sticky;
  top: 88px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-section:not(:last-child) {
  margin-bottom: 8px;
}

.sidebar-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  padding: 8px 12px 4px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: var(--transition);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-sans);
  text-decoration: none;
}

.sidebar-item:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.sidebar-item.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 500;
}

.si-icon {
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .sidebar {
    position: static;
  }
}
</style>
