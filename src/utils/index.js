import {
  css
} from 'styled-components'

const XS_WIDTH = 375
const SM_WIDTH = 768
const MD_WIDTH = 1024
const LG_WIDTH = 1280
const XL_WIDTH = 1440

export const Breakpoint = {
  XS: XS_WIDTH,
  SM: SM_WIDTH,
  MD: MD_WIDTH,
  LG: LG_WIDTH,
  XL: XL_WIDTH,
}

export function responsiveXs(
  template,
  ...args
) {
  return css`
    @media (max-width: ${XS_WIDTH}px) {
      ${css(template, ...args)}
    }
  `
}

export function responsiveSm(
  template,
  ...args
) {
  return css`
    @media (max-width: ${SM_WIDTH}px) {
      ${css(template, ...args)}
    }
  `
}

export function responsiveMd(
  template,
  ...args
) {
  return css`
    @media (max-width: ${MD_WIDTH}px) {
      ${css(template, ...args)}
    }
  `
}

export function responsiveLg(
  template,
  ...args
) {
  return css`
    @media (max-width: ${LG_WIDTH}px) {
      ${css(template, ...args)}
    }
  `
}

export function responsiveXl(
  template,
  ...args
) {
  return css`
    @media (min-width: ${LG_WIDTH}px) {
      ${css(template, ...args)}
    }
  `
}