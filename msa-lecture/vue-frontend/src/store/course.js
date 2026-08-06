import { defineStore } from "pinia";
import { ref } from "vue";
import { courseApi } from "@/api/course.js";

export const useCourseStore = defineStore("course", () => {
	const courses = ref([]);
	const selectedCourse = ref(null);
	const loading = ref(false);
	const error = ref(null);
	const selectedCategory = ref("전체");

	const categories = ["전체", "콘서트", "뮤지컬", "연극", "클래식", "페스티벌"];

	// 백엔드 카테고리 → 프론트 표시용 장르
	const categoryLabelMap = {
		BACKEND: "콘서트",
		FRONTEND: "뮤지컬",
		DEVOPS: "연극",
		DATA: "클래식",
		AI: "페스티벌",
	};

	// 썸네일 이미지 매핑
	const thumbnailMap = {
		SPRING: new URL("../assets/images/courses/spring_boot.png", import.meta.url)
			.href,
		VUE: new URL("../assets/images/courses/vue_js.png", import.meta.url).href,
		DOCKER: new URL("../assets/images/courses/docker.png", import.meta.url)
			.href,
		KUBERNETES: new URL(
			"../assets/images/courses/kubernetes.png",
			import.meta.url,
		).href,
		PYTHON: new URL("../assets/images/courses/python.png", import.meta.url)
			.href,
		AI: new URL("../assets/images/courses/generative_ai.png", import.meta.url)
			.href,
	};

	const categoryThumbnailMap = {
		콘서트: thumbnailMap.SPRING,
		뮤지컬: thumbnailMap.VUE,
		연극: thumbnailMap.KUBERNETES,
		클래식: thumbnailMap.PYTHON,
		페스티벌: thumbnailMap.AI,
	};

	function normalizeCategory(category) {
		if (!category) return "";
		return categoryLabelMap[category] || category;
	}

	function normalizeCourse(course) {
		if (!course || typeof course !== "object") return course;

		return {
			...course,
			category: normalizeCategory(course.category),
		};
	}

	function getThumbnail(course) {
		const thumbKey = course?.thumbnail?.toUpperCase?.() || "";
		if (thumbKey && thumbnailMap[thumbKey]) {
			return thumbnailMap[thumbKey];
		}

		return categoryThumbnailMap[course?.category] || null;
	}

	async function fetchCourses() {
		loading.value = true;
		error.value = null;

		try {
			const res = await courseApi.getAll();
			console.log("[CourseStore] fetchCourses response =", res.data);

			const rawCourses = Array.isArray(res.data?.data)
				? res.data.data
				: Array.isArray(res.data)
					? res.data
					: [];

			courses.value = rawCourses.map(normalizeCourse);

			console.log("[CourseStore] normalized courses =", courses.value);
		} catch (e) {
			console.error("[CourseStore] fetchCourses failed:", e);
			error.value = e.message || "공연 목록을 불러오지 못했습니다.";
			courses.value = [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchCourse(id) {
		loading.value = true;
		error.value = null;

		try {
			const res = await courseApi.getById(id);
			console.log("[CourseStore] fetchCourse response =", res.data);

			const rawCourse =
				res.data?.data && typeof res.data.data === "object"
					? res.data.data
					: res.data;

			selectedCourse.value = normalizeCourse(rawCourse);

			console.log(
				"[CourseStore] normalized selectedCourse =",
				selectedCourse.value,
			);
		} catch (e) {
			console.error("[CourseStore] fetchCourse failed:", e);
			error.value = e.message || "공연 정보를 불러오지 못했습니다.";
			selectedCourse.value = null;
		} finally {
			loading.value = false;
		}
	}

	function setCategory(cat) {
		selectedCategory.value = cat;
	}

	return {
		courses,
		selectedCourse,
		loading,
		error,
		categories,
		selectedCategory,
		thumbnailMap,
		categoryLabelMap,
		normalizeCategory,
		normalizeCourse,
		getThumbnail,
		fetchCourses,
		fetchCourse,
		setCategory,
	};
});
