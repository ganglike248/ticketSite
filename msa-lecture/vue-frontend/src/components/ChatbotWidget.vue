<template>
  <div class="chatbot-widget">
    <transition name="chat-pop">
      <div v-if="isOpen" class="chat-panel">
        <div class="chat-header">
          <div class="chat-header-title">
            <span class="chat-header-icon">🎫</span>
            <div>
              <p class="chat-header-name">TicketNexus 도우미</p>
              <p class="chat-header-sub">자주 묻는 질문에 답해드려요</p>
            </div>
          </div>
          <button class="chat-close-btn" @click="isOpen = false" aria-label="닫기">✕</button>
        </div>

        <div ref="messageListEl" class="chat-messages">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="chat-msg"
            :class="msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'"
          >
            <span class="chat-bubble">{{ msg.text }}</span>
          </div>
          <div v-if="isTyping" class="chat-msg chat-msg-bot">
            <span class="chat-bubble chat-typing">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </span>
          </div>
        </div>

        <div class="chat-faq">
          <button
            v-for="faq in faqs"
            :key="faq.q"
            class="faq-chip"
            :disabled="isTyping"
            @click="askFaq(faq)"
          >
            {{ faq.q }}
          </button>
        </div>

        <form class="chat-input-row" @submit.prevent="sendTyped">
          <input
            v-model="draft"
            type="text"
            class="chat-input"
            placeholder="궁금한 점을 입력해보세요"
          />
          <button type="submit" class="chat-send-btn" :disabled="isTyping">전송</button>
        </form>
      </div>
    </transition>

    <button class="chat-toggle-btn" @click="isOpen = !isOpen" aria-label="AI 챗봇 열기">
      <span v-if="!isOpen">💬</span>
      <span v-else>✕</span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const isTyping = ref(false)
const draft = ref('')
const messageListEl = ref(null)

const messages = ref([
  { role: 'bot', text: '안녕하세요! TicketNexus 도우미입니다. 환불/수수료, 주차, 입장 시간 등 궁금하신 점을 아래 버튼으로 물어보세요.' }
])

const faqs = [
  {
    q: '환불 규정',
    a: '공연일 기준 7일 전까지는 전액 환불, 3~6일 전은 티켓 금액의 50%, 2일 이내는 환불이 불가합니다. 수수료는 결제 금액의 3%가 부과됩니다.'
  },
  {
    q: '주차 안내',
    a: '공연장 지하 주차장을 이용하실 수 있으며, 티켓 소지 시 관람 시간 기준 3시간 무료 주차가 제공됩니다. 초과 시 10분당 500원이 부과됩니다.'
  },
  {
    q: '입장 시간',
    a: '공연 시작 1시간 전부터 입장 가능하며, 원활한 진행을 위해 시작 30분 전까지 입장을 완료해 주시기 바랍니다.'
  }
]

function scrollToBottom() {
  nextTick(() => {
    if (messageListEl.value) {
      messageListEl.value.scrollTop = messageListEl.value.scrollHeight
    }
  })
}

function replyWith(text) {
  isTyping.value = true
  scrollToBottom()
  setTimeout(() => {
    messages.value.push({ role: 'bot', text })
    isTyping.value = false
    scrollToBottom()
  }, 600)
}

function askFaq(faq) {
  messages.value.push({ role: 'user', text: faq.q })
  scrollToBottom()
  replyWith(faq.a)
}

function sendTyped() {
  const text = draft.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', text })
  draft.value = ''
  scrollToBottom()
  replyWith('문의하신 내용은 확인 후 안내드릴게요. 더 자세한 사항은 고객센터(1588-0000)로 연락 주시면 빠르게 도와드리겠습니다.')
}
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.chat-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
}
.chat-toggle-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.chat-panel {
  width: 340px;
  max-width: calc(100vw - 48px);
  height: 460px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--color-primary);
  color: #fff;
}
.chat-header-title { display: flex; align-items: center; gap: 10px; }
.chat-header-icon { font-size: 20px; }
.chat-header-name { font-size: 14px; font-weight: 700; }
.chat-header-sub { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 1px; }
.chat-close-btn {
  background: transparent;
  color: #fff;
  font-size: 14px;
  opacity: 0.85;
}
.chat-close-btn:hover { opacity: 1; }

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-bg-secondary);
}

.chat-msg { display: flex; }
.chat-msg-bot { justify-content: flex-start; }
.chat-msg-user { justify-content: flex-end; }

.chat-bubble {
  max-width: 82%;
  padding: 9px 13px;
  border-radius: var(--radius-md);
  font-size: 13px;
  line-height: 1.55;
}
.chat-msg-bot .chat-bubble {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  border-bottom-left-radius: 2px;
}
.chat-msg-user .chat-bubble {
  background: var(--color-primary);
  color: #fff;
  border-bottom-right-radius: 2px;
}

.chat-typing { display: flex; gap: 4px; padding: 12px 13px; }
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: chat-dot-bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes chat-dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-3px); opacity: 1; }
}

.chat-faq {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 16px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-primary);
}
.faq-chip {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  transition: var(--transition);
}
.faq-chip:hover:not(:disabled) { background: var(--color-primary); color: #fff; }
.faq-chip:disabled { opacity: 0.5; cursor: default; }

.chat-input-row {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-primary);
}
.chat-input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--color-text-primary);
}
.chat-input:focus { border-color: var(--color-primary); }
.chat-send-btn {
  padding: 9px 14px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}
.chat-send-btn:hover:not(:disabled) { background: var(--color-primary-dark); }
.chat-send-btn:disabled { opacity: 0.5; cursor: default; }

.chat-pop-enter-active, .chat-pop-leave-active { transition: all 0.18s ease; }
.chat-pop-enter-from, .chat-pop-leave-to { opacity: 0; transform: translateY(12px) scale(0.98); }
</style>
