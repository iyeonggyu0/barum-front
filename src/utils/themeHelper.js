/**
 * @typedef {keyof typeof colors} ColorKey
 */

/**
 * theme에서 색상값을 가져오는 헬퍼 함수
 * @param {ColorKey} color - 가져올 색상 키 (자동완성 지원)
 * @returns {(props: {theme: {colors: typeof colors}}) => string}
 *
 * 사용 예시:
 *   color: ${colors('ink1')};
 *   background: ${colors('greenDeep')};
 */
export const colorsHelper =
  (color) =>
  ({ theme }) =>
    theme.colors[color];

/**
 * @typedef {keyof typeof fonts} FontKey
 */

/**
 * theme에서 폰트 스타일을 가져오는 헬퍼 함수
 * @param {FontKey} variant - 가져올 폰트 스타일 키 (자동완성 지원)
 * @returns {(props: {theme: {fonts: typeof fonts}}) => object}
 *
 * 사용 예시:
 *   ${fontsHelper('titleM')}
 *   ${fontsHelper('body')}
 */
export const fontsHelper =
  (variant) =>
  ({ theme }) =>
    theme.fonts[variant];

/**
 * @typedef {'center'|'lowCenter'|'colCenter'
 *   |'between'|'lowBetween'|'colBetween'
 *   |'around'|'lowAround'|'colAround'
 *   |'rowCenter'|'rowBetween'|'rowAround'
 *   |'flexEnd'|'flexStart'|'colStart'|'colEnd'
 * } FlexKey
 */

/**
 * theme에서 flex 스타일을 가져오는 헬퍼 함수 (예시 유지)
 * @param {FlexKey} variant - 가져올 flex 스타일 키 (자동완성 지원)
 * @returns {(props: {theme: {flex: object}}) => object}
 */
export const flexHelper =
  (variant) =>
  ({ theme }) =>
    theme.flex[variant];
