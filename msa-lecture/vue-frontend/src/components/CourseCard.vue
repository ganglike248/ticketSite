<template>
  <router-link :to="`/courses/${course.id}`" class="course-card">
    <!-- 썸네일 -->
    <div class="card-thumb" :class="thumbBg">
      <img
        v-if="thumbSrc"
        :src="thumbSrc"
        :alt="course.title"
        class="thumb-img"
      />
      <div v-else class="thumb-placeholder">
        {{ course.category?.charAt(0) }}
      </div>
    </div>

    <!-- 내용 -->
    <div class="card-body">
      <span class="badge" :class="badgeClass">{{ course.category }}</span>
      <h3 class="card-title">{{ course.title }}</h3>
      <div class="card-meta">
        <span class="instructor">{{ course.instructorName }}</span>
        <span class="price">₩{{ Number(course.price).toLocaleString() }}</span>
      </div>
      <div class="card-footer">
        <span class="enrolled"
          >예매자 {{ course.enrollmentCount?.toLocaleString() }}명</span
        >
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useCourseStore } from "@/store/course.js";

const props = defineProps({
  course: { type: Object, required: true },
});

const courseStore = useCourseStore();

const categoryConfig = {
  콘서트: { bg: "thumb-teal", badge: "badge-teal" },
  뮤지컬: { bg: "thumb-blue", badge: "badge-blue" },
  연극: { bg: "thumb-amber", badge: "badge-amber" },
  클래식: { bg: "thumb-purple", badge: "badge-purple" },
  페스티벌: { bg: "thumb-pink", badge: "badge-pink" },
};

const config = computed(
  () =>
    categoryConfig[props.course.category] || {
      bg: "thumb-gray",
      badge: "badge-gray",
    },
);
const thumbBg = computed(() => config.value.bg);
const badgeClass = computed(() => config.value.badge);

const thumbSrc = computed(() => courseStore.getThumbnail(props.course));
</script>

<style scoped>
.course-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-hover);
}
.card-thumb {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.thumb-teal {
  background: #e1f5ee;
}
.thumb-blue {
  background: #e6f1fb;
}
.thumb-amber {
  background: #faeeda;
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
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-placeholder {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text-muted);
}
.card-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
}
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.instructor {
  font-size: 12px;
  color: var(--color-text-secondary);
}
.price {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}
.card-footer {
  margin-top: 2px;
}
.enrolled {
  font-size: 11px;
  color: var(--color-text-muted);
}
</style>
