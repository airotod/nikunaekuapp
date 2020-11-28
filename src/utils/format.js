export function dateUTCWithDot(date) {
  return `${date.getUTCFullYear()}.${
    date.getUTCMonth() + 1
  }.${date.getUTCDate()}`;
}

export function dateUTCWithKorean(date) {
  return `${date.getUTCFullYear()}년 ${
    date.getUTCMonth() + 1
  }월 ${date.getUTCDate()}일`;
}

export function dateWithKorean(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function numWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
