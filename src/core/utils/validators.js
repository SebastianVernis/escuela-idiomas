export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone) {
  const re = /^[0-9]{10,15}$/
  return re.test(phone.replace(/\s/g, ''))
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export function validateMinLength(value, min) {
  return value && value.length >= min
}

export function validateMaxLength(value, max) {
  return value && value.length <= max
}
