import{i as o,e as s,bI as a,m as i,h as u,u as c}from"./vue-vendor-DB5e1Y5f.js";import{G as d}from"./index-D1axHJY-.js";const r={prefix:Math.floor(Math.random()*1e4),current:0},I=Symbol("elIdInjection"),p=()=>i()?u(I,r):r,l=n=>{const e=p();!o&&e===r&&s("IdInjection",`Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);const t=d();return a(()=>c(n)||`${t.value}-id-${e.prefix}-${e.current++}`)};export{p as a,l as u};
