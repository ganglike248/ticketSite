<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- 로고 -->
      <router-link to="/" class="logo">
        <img
          src="@/assets/images/logo/main_logo.png"
          alt="TicketNexus"
          class="logo-img"
        />
        <span class="logo-text">TICKET<span class="logo-accent">Nexus</span></span>
      </router-link>

      <!-- 네비게이션 -->
      <nav class="nav-links" v-if="auth.isAuthenticated">
        <router-link
          to="/courses"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/courses') }"
          >공연</router-link
        >
        <router-link
          v-if="auth.isInstructor"
          to="/marketing"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/marketing') }"
          >AI 마케팅 센터</router-link
        >
        <router-link
          v-if="auth.isInstructor"
          to="/sales-insight"
          class="nav-link"
          :class="{ active: $route.path === '/sales-insight' }"
          >AI 판매 인사이트</router-link
        >
        <router-link
          v-else
          to="/enrollments"
          class="nav-link"
          :class="{ active: $route.path === '/enrollments' }"
          >내 예매</router-link
        >
      </nav>

      <!-- 우측 액션 -->
      <div class="header-actions">
        <template v-if="auth.isAuthenticated">
          <router-link
            to="/mypage"
            class="user-avatar"
            :title="auth.user?.name"
          >
            {{ auth.user?.name?.charAt(0) || "?" }}
          </router-link>
          <button class="btn btn-ghost btn-sm" @click="handleLogout">
            로그아웃
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost btn-sm"
            >로그인</router-link
          >
          <router-link to="/login" class="btn btn-primary btn-sm"
            >시작하기</router-link
          >
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/store/auth.js";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function handleLogout() {
  auth.logout();
  router.push("/");
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 8px;
}
.logo-text {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: var(--color-text-primary);
}
.logo-accent {
  color: var(--color-primary);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.nav-link {
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: var(--transition);
}
.nav-link:hover,
.nav-link.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.btn-sm {
  padding: 7px 16px;
  font-size: 13px;
}
.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}
.user-avatar:hover {
  background: var(--color-primary);
  color: #fff;
}

@media (max-width: 720px) {
  .header-inner {
    padding: 12px 16px;
    gap: 12px;
  }

  .logo-text {
    display: none;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-link {
    font-size: 12px;
  }

  .header-actions .btn {
    display: none;
  }
}
</style>
