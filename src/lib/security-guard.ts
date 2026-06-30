import type { ClientSecuritySignal } from '../types/security'

function detectHeadlessSignals() {
  const reasons: string[] = []

  if (navigator.webdriver) {
    reasons.push('webdriver_detected')
  }

  if (!window.isSecureContext) {
    reasons.push('insecure_context')
  }

  if (navigator.languages.length === 0) {
    reasons.push('missing_languages')
  }

  return reasons
}

function detectAutomationSignals() {
  const reasons: string[] = []
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('headless')) {
    reasons.push('headless_user_agent')
  }

  if (userAgent.includes('phantomjs')) {
    reasons.push('phantomjs_detected')
  }

  if (userAgent.includes('selenium')) {
    reasons.push('selenium_detected')
  }

  return reasons
}

function detectSuspiciousEnvironment() {
  const reasons: string[] = []

  if (window.outerWidth === 0 || window.outerHeight === 0) {
    reasons.push('zero_outer_window')
  }

  if (!('indexedDB' in window)) {
    reasons.push('indexeddb_missing')
  }

  return reasons
}

export function getClientSecuritySignal(): ClientSecuritySignal {
  const reasons = [
    ...detectHeadlessSignals(),
    ...detectAutomationSignals(),
    ...detectSuspiciousEnvironment(),
  ]

  const score = Math.max(0, 100 - reasons.length * 20)
  const blocked = reasons.includes('webdriver_detected') || reasons.length >= 3

  return {
    score,
    blocked,
    reasons,
  }
}
