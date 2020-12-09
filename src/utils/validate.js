export function checkBirthday(birth) {
  // yyyymmdd
  const birthdayRegrex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return birthdayRegrex.test(birth);
}

export function checkPhone(phone) {
  // dd-dddd-dddd
  const phoneRegrex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return phoneRegrex.test(phone);
}

export function checkNumber(num) {
  // only number
  const numRegrex = /^[0-9]*$/;
  return numRegrex.test(num);
}

export function checkKorean(word) {
  // only Korean
  const koreanRegrex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  return koreanRegrex.test(word);
}

export function checkEng(word) {
  // only English
  const engRegrex = /^[a-zA-Z]*$/;
  return engRegrex.test(word);
}

export function checkEngOrKorean(word) {
  // English or Korean
  const engKoreanRegrex = /^[a-zA-Z0-9]*$/;
  return engKoreanRegrex.test(word);
}

export function checkEmail(email) {
  // [eng+num]@[eng+num]
  const emailRegrex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
  return emailRegrex.test(email);
}

export function checkSSN(num) {
  // Social Security Number
  const SSCRegrex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
  return SSCRegrex.test(num);
}

export function checkPW(word) {
  const num = word.search(/[0-9]/g);
  const eng = word.search(/[a-z]/ig);
  const spe = word.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (word.length < 10) {
    return '비밀번호는 10글자 이상이어야 합니다.'
  } else if (word.search(/\s/) !== -1) {
    return '비밀번호는 공백을 입력할 수 없습니다.'
  } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
    return '비밀번호는 영어, 숫자, 특수문자 중 2가지 이상 조합해주세요.'
  } else {
    return ''
  }
}