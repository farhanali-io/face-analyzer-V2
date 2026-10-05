import{a as e}from"./geometry-core.BI0FvvIt.js?v=2.0.1";import{o as t,r as n}from"./face-shape-session.D5n7qy3M.js?v=2.0.1";import{r}from"./photo-input.B2aPvohU.js?v=2.0.1";import{t as i}from"./style-next-steps.CIfcAC0j.js?v=2.0.1";var a={curved:158,between:147,corner:136},o={pointed:94,between:107,broad:120},s=[`forehead`,`cheek`,`jaw`,`length`];function c(e){if(s.some(t=>!Number.isFinite(e[t])||e[t]<=0))throw Error(`All four measurements must be positive numbers.`);return{lengthRatio:e.length/e.cheek,foreheadRatio:e.forehead/e.cheek,jawRatio:e.jaw/e.cheek,gonialAngle:a[e.jawline],chinAngle:o[e.chin]}}function l(a){if(a.dataset.initialized===`true`)return;a.dataset.initialized=`true`;let o=new Map(s.map(e=>[e,a.querySelector(`[data-manual-input="${e}"]`)])),l=a.querySelector(`[data-manual-submit]`),u=a.querySelector(`[data-manual-hint]`),d=a.querySelector(`[data-manual-empty]`),f=a.querySelector(`[data-manual-results]`),p=()=>{let e=new Map;for(let t of s){let n=Number.parseFloat(o.get(t).value);if(!Number.isFinite(n)||n<=0)return null;e.set(t,n)}return e},m=(e,t)=>a.querySelector(`[data-manual-choice="${e}"]:checked`)?.value??t,h=()=>{let e=p();l.disabled=!e,u.textContent=e?`All four use the same unit, so centimetres and inches give the same result.`:`Enter all four measurements to continue.`},g=a=>{let o=e(a),[s,c]=o,l=s.score-c.score<10;f.innerHTML=`
      <div class="rounded-2xl bg-sage-soft p-5 text-sage-dark">
        <p class="text-xs font-extrabold opacity-70">Closest profile</p>
        <p class="mt-2 text-4xl font-bold tracking-[-.06em]">${r(s.name)}</p>
        <p class="mt-2 text-xs leading-5 opacity-75">${s.score}% of the match weight · runner-up ${r(c.name)} at ${c.score}%</p>
      </div>
      <div class="mt-4 grid gap-2.5">
        ${o.map((e,t)=>`
          <div class="grid grid-cols-[4.6rem_1fr_2.6rem] items-center gap-3 text-xs">
            <span class="${t===0?`font-bold`:`text-ink-muted`}">${r(e.name)}</span>
            <div class="h-2 overflow-hidden rounded-full bg-ink/8">
              <div class="h-full rounded-full ${t===0?`bg-sage`:`bg-ink/25`}" style="width:${Math.max(2,e.score)}%"></div>
            </div>
            <span class="text-right font-bold ${t===0?``:`text-ink-muted`}">${e.score}%</span>
          </div>
        `).join(``)}
      </div>
      ${l?`<p class="mt-4 rounded-xl bg-cream p-3 text-[.66rem] leading-5 text-ink-soft">Only ${s.score-c.score} points separate <strong>${r(s.name)}</strong> and <strong>${r(c.name)}</strong>. Both describe your measurements reasonably well.</p>`:``}
      <div class="mt-4 grid gap-2 sm:grid-cols-2">
        <div class="rounded-2xl border border-ink/10 bg-paper p-3.5">
          <p class="text-xs font-extrabold text-ink-muted">Your ratios</p>
          <p class="mt-2 text-[.68rem] leading-6 text-ink-soft">
            Length / cheek ${a.lengthRatio.toFixed(2)}<br>
            Forehead / cheek ${a.foreheadRatio.toFixed(2)}<br>
            Jaw / cheek ${a.jawRatio.toFixed(2)}
          </p>
        </div>
        <a class="flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper p-3.5 transition hover:border-coral/40" href="/face-shape/${s.name.toLowerCase()}">
          <p class="text-xs font-extrabold text-ink-muted">Read the guide</p>
          <p class="mt-2 text-sm font-bold">${r(s.name)} face shape →</p>
        </a>
      </div>
      <p class="mt-4 text-xs leading-5 text-ink-muted">Hand measurements and photo landmarks both depend on how the face edges are located. If the match weights are close, compare the two nearest guides.</p>
    `,t(n(o,a,`manual`)),f.insertAdjacentHTML(`beforeend`,i(window.location.search)),d.classList.add(`hidden`),f.classList.remove(`hidden`),f.scrollIntoView({behavior:`smooth`,block:`nearest`})};o.forEach(e=>e.addEventListener(`input`,h)),l.addEventListener(`click`,()=>{let e=p();e&&(window.arfTrack?.(`analysis_start`,{tool:`face-shape-detector`,mode:`manual_measurement`}),g(c({forehead:e.get(`forehead`),cheek:e.get(`cheek`),jaw:e.get(`jaw`),length:e.get(`length`),jawline:m(`jawline`,`between`),chin:m(`chin`,`between`)})),window.arfTrack?.(`analysis_success`,{tool:`face-shape-detector`,mode:`manual_measurement`}),window.arfTrack?.(`result_view`,{tool:`face-shape-detector`,mode:`manual_measurement`}))}),h()}document.querySelectorAll(`[data-manual-shape-tool]`).forEach(l);