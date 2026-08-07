<template>
  <div class="page-wrapper">
    <AppHeader />

    <main class="page-container">
      <section class="page-head">
        <div>
          <span class="eyebrow">✦ NEW EVENT</span>
          <h1 class="page-title">공연 등록</h1>
          <p class="page-subtitle">
            주최자 계정으로 새로운 공연을 등록합니다.
          </p>
        </div>
      </section>

      <div class="page-body">
        <AppSidebar />

        <div class="main-content">
          <div class="card-surface form-card">
            <form class="course-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label class="form-label" for="title">공연명</label>
                <input
                  id="title"
                  v-model.trim="form.title"
                  type="text"
                  class="form-input"
                  placeholder="예: 2026 여름 락 페스티벌"
                  maxlength="100"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="description">공연 설명</label>
                <textarea
                  id="description"
                  v-model.trim="form.description"
                  class="form-textarea"
                  rows="6"
                  placeholder="공연 소개, 출연진, 관람 등급 등을 입력해 주세요."
                ></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="category">장르</label>
                  <select
                    id="category"
                    v-model="form.category"
                    class="form-select"
                  >
                    <option disabled value="">장르를 선택하세요</option>
                    <option
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="price">티켓 가격</label>
                  <input
                    id="price"
                    v-model.number="form.price"
                    type="number"
                    min="0"
                    step="1000"
                    class="form-input"
                    placeholder="예: 50000"
                  />
                </div>
              </div>

              <div v-if="validationError" class="error-box">
                {{ validationError }}
              </div>

              <div v-if="submitError" class="error-box">
                {{ submitError }}
              </div>

              <div v-if="submitSuccess" class="success-box">
                {{ submitSuccess }}
              </div>

              <div class="form-actions">
                <router-link to="/courses" class="btn btn-ghost">
                  취소
                </router-link>

                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="submitting"
                >
                  <span v-if="submitting">등록 중...</span>
                  <span v-else>공연 등록</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { courseApi } from "@/api/course.js";
import { useAuthStore } from "@/store/auth.js";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  title: "",
  description: "",
  category: "",
  price: null,
});

const submitting = ref(false);
const validationError = ref("");
const submitError = ref("");
const submitSuccess = ref("");

const categoryOptions = [
  { label: "콘서트", value: "BACKEND" },
  { label: "뮤지컬", value: "FRONTEND" },
  { label: "연극", value: "DEVOPS" },
  { label: "전시/행사", value: "DATA" },
  { label: "패스티벌", value: "AI" },
];

function validateForm() {
  validationError.value = "";

  if (!auth.user || auth.user.role !== "INSTRUCTOR") {
    validationError.value = "호스트 계정만 공연을 등록할 수 있습니다.";
    return false;
  }

  if (!form.title) {
    validationError.value = "공연명을 입력해 주세요.";
    return false;
  }

  if (!form.description) {
    validationError.value = "공연 설명을 입력해 주세요.";
    return false;
  }

  if (!form.category) {
    validationError.value = "장르를 선택해 주세요.";
    return false;
  }

  if (form.price === null || form.price === undefined || form.price === "") {
    validationError.value = "티켓 가격을 입력해 주세요.";
    return false;
  }

  const price = Number(form.price);
  if (Number.isNaN(price) || price < 0) {
    validationError.value = "티켓 가격은 0 이상의 숫자로 입력해 주세요.";
    return false;
  }

  return true;
}

async function handleSubmit() {
  submitError.value = "";
  submitSuccess.value = "";

  if (!validateForm()) return;

  submitting.value = true;

  try {
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      price: Number(form.price),
    };

    const res = await courseApi.create(payload);
    console.log("[CourseCreate] create response =", res.data);

    submitSuccess.value = "공연이 성공적으로 등록되었습니다.";

    const createdCourseId = res.data?.data?.id ?? res.data?.id;

    if (createdCourseId) {
      setTimeout(() => {
        router.push(`/courses/${createdCourseId}`);
      }, 500);
    } else {
      setTimeout(() => {
        router.push("/courses");
      }, 500);
    }
  } catch (error) {
    console.error("[CourseCreate] create failed:", error);
    submitError.value =
      error.response?.data?.message || "공연 등록에 실패했습니다.";
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.form-card {
  max-width: 640px;
  padding: 28px;
}

.course-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  padding: 12px 14px;
  font-size: 14px;
  font-family: inherit;
  color: var(--color-text-primary);
  outline: none;
  transition: var(--transition);
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  border-color: var(--color-primary);
  background: var(--color-bg-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
  line-height: 1.5;
}

.error-box {
  background: #fef2f2;
  color: #dc2626;
  border-radius: var(--radius-md);
  padding: 12px 14px;
  font-size: 13px;
}

.success-box {
  background: var(--color-success-light);
  color: var(--color-success);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  font-size: 13px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 6px;
}

@media (max-width: 720px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
