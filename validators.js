export function isNameJoe(value) {
  return value === 'Joe'
}

export function notGmail(value = '') {
  return !value.includes('gmail')
}

export function isEmailAvailable(value) {
  if (value === '') return true

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value.length > 10)
    }, 500)
  })
}
