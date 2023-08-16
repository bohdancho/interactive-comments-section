const MINUTE_IN_MS = 60000
const HOUR_IN_MS = MINUTE_IN_MS * 60
const DAY_IN_MS = HOUR_IN_MS * 24
const WEEK_IN_MS = DAY_IN_MS * 7
const MONTHS_IN_MS = DAY_IN_MS * 30

export function formatTimeDifference(timestamp: number): string {
  const timeDiff = Date.now() - timestamp

  if (timeDiff < MINUTE_IN_MS) {
    return 'less than a minute ago'
  } else if (timeDiff < HOUR_IN_MS) {
    const minutes = Math.floor(timeDiff / MINUTE_IN_MS)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else if (timeDiff < DAY_IN_MS) {
    const hours = Math.floor(timeDiff / HOUR_IN_MS)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else if (timeDiff < WEEK_IN_MS) {
    const days = Math.floor(timeDiff / DAY_IN_MS)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  } else if (timeDiff < MONTHS_IN_MS) {
    const weeks = Math.floor(timeDiff / WEEK_IN_MS)
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
  } else {
    const months = Math.floor(timeDiff / MONTHS_IN_MS)
    return `${months} month${months !== 1 ? 's' : ''} ago`
  }
}
