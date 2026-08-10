import{bc as s,b2 as o,bI as a,bJ as i,ab as u,U as c,f as d}from"./index-DRKLdcOO.js";const r={prefix:Math.floor(Math.random()*1e4),current:0},I=Symbol("elIdInjection"),p=()=>u()?c(I,r):r,m=n=>{const e=p();!s&&e===r&&o("IdInjection",`Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);const t=a();return i(()=>d(n)||`${t.value}-id-${e.prefix}-${e.current++}`)};export{p as a,m as u};
