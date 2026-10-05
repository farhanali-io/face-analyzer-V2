const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["/_astro/face-landmarker.Oxpj_t18.js?v=2.0.1","/_astro/photo-input.B2aPvohU.js?v=2.0.1"])))=>i.map(i=>d[i]);
import{i as e}from"./geometry-core.BI0FvvIt.js?v=2.0.1";import{a as t,c as n,l as r,n as i,o as a,r as o,t as s}from"./photo-input.B2aPvohU.js?v=2.0.1";import{t as c}from"./photo-signals.Cot3PtuE.js?v=2.0.1";var l=e=>e.length?Math.max(...e)-Math.min(...e):0,u=(e,t)=>e.split.drivers.find(e=>e.label===t)?.score??0,d=[{label:`Lighting`,note:`Average brightness against a mid-tone reference.`},{label:`Sharpness`,note:`Local edge detail across the sampled pixels.`},{label:`Head angle`,note:`Eye-line roll and the nose-offset yaw proxy.`},{label:`Framing`,note:`How much of the frame the visible face occupies.`},{label:`Tonal contrast`,note:`Separation between light and dark tones.`}];function f(e){return Math.round(e.split.faceGeometry*.7+e.split.photoPresentation*.3)}function p(e){if(e.length<2)throw Error(`Two analysed photos are required for a comparison.`);let t=e=>e.indexOf(Math.max(...e)),n=(n,r,i,a)=>{let o=e.map(e=>Math.round(a(e.report)));return{label:n,values:o,best:t(o),spread:l(o),note:r,isGeometry:i}},r=[n(`Face geometry`,`The part of the score that describes the face rather than the photo.`,!0,e=>e.split.faceGeometry),n(`Visible symmetry`,`Paired landmark agreement, which also drifts with head rotation.`,!0,e=>e.split.symmetry),...d.map(e=>n(e.label,e.note,!1,t=>u(t,e.label))),n(`Overall presentation`,`The combined photo-quality signal used to gate every geometry result.`,!1,e=>e.split.photoPresentation)],i=r.at(-1),a=i.best,o=Math.max(...i.values.filter((e,t)=>t!==a)),s=i.values[a]-o,c=r.filter(e=>!e.isGeometry&&e.label!==`Overall presentation`).map(e=>({row:e,advantage:e.values[a]-Math.max(...e.values.filter((e,t)=>t!==a))})).filter(e=>e.advantage>3).sort((e,t)=>t.advantage-e.advantage).slice(0,3).map(t=>`${t.row.label}: ${e[a].label} scores ${t.row.values[a]}, ahead by ${t.advantage} points.`),f=r[0],p=f.spread<=4?`Face geometry stayed within ${f.spread} point${f.spread===1?``:`s`} across these photos, so the difference is coming from the photography, not the face.`:`Face geometry moved ${f.spread} points between these photos. Expression, camera distance or a large angle change can shift the underlying measurement as well.`;return{rows:r,winner:a,margin:s,verdict:s<=2?`${e[a].label} is marginally stronger, but the two photos are close enough to be interchangeable.`:`${e[a].label} is the stronger photo, by ${s} points of photo presentation.`,reasons:c,geometryNote:p}}function m(e){if(e.length<2)throw Error(`At least two analysed photos are required for a consistency test.`);let t=e.map(e=>e.report.split.faceGeometry),n=e.map(e=>e.report.split.photoPresentation),r=e.map(e=>f(e.report)),i=l(t),a=l(n),o=l(r),s=d.map(t=>{let n=e.map(e=>u(e.report,t.label));return{label:t.label,spread:l(n),values:n}}).sort((e,t)=>t.spread-e.spread),c=i<=3?`Stable`:i<=7?`Mostly stable`:`Variable`,p=s.filter(e=>e.spread>=5).slice(0,2),m=p.length?p.map(e=>e.label.toLowerCase()).join(` and `):`small differences spread across several factors`;return{faceScores:t,photoScores:n,overallScores:r,faceSpread:i,photoSpread:a,overallSpread:o,stability:c,verdict:c===`Stable`?`Your facial geometry was stable across these photos — it moved by ${i} point${i===1?``:`s`}.`:c===`Mostly stable`?`Your facial geometry moved ${i} points, which is within the range that pose and expression alone can produce.`:`Your facial geometry moved ${i} points, which is more than pose alone usually explains.`,detail:a>i?`Photo presentation varied by ${a} points over the same set. Most of the score difference came from ${m}.`:`Photo presentation varied by only ${a} points, so the photos themselves were consistent. Check expression, camera distance and crop, which change the measured geometry directly.`,drivers:s}}var h=[`Photo A`,`Photo B`,`Photo C`],g=(e,t=`bg-sage`)=>`
  <div class="h-1.5 overflow-hidden rounded-full bg-ink/8">
    <div class="h-full rounded-full ${t}" style="width:${Math.max(2,Math.min(100,e))}%"></div>
  </div>
`;function _(e,t,n,r){return`
    <div class="rounded-2xl ${r} p-5 sm:p-6">
      <p class="text-xs font-extrabold opacity-70">${o(e)}</p>
      <p class="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold tracking-[-.045em]">${o(t)}</p>
      <p class="mt-2 max-w-2xl text-xs leading-6 opacity-80">${o(n)}</p>
    </div>
  `}function v(e,t,n){let r=t.length;return`
    <div class="mt-4 overflow-x-auto rounded-2xl border border-ink/10">
      <table class="w-full min-w-[34rem] border-collapse text-left text-xs">
        <thead>
          <tr class="border-b border-ink/10 bg-paper">
            <th class="p-3 font-extrabold ">Measurement</th>
            ${t.map((e,t)=>`
              <th class="p-3 text-center font-extrabold ${t===n?`text-coral-dark`:`text-ink-muted`}">
                ${o(e)}${t===n?` ★`:``}
              </th>
            `).join(``)}
          </tr>
        </thead>
        <tbody>
          ${e.map(e=>`
            <tr class="border-b border-ink/8 last:border-0 ${e.isGeometry?`bg-sage-soft/25`:``}">
              <td class="p-3 align-top">
                <span class="font-bold">${o(e.label)}</span>
                ${e.isGeometry?`<span class="ml-1.5 rounded-full bg-sage-soft px-1.5 py-0.5 text-xs font-extrabold text-sage-dark ">Face</span>`:``}
                <p class="mt-1 text-xs leading-5 text-ink-muted">${o(e.note)}</p>
              </td>
              ${e.values.map((t,n)=>`
                <td class="p-3 text-center align-top" style="width:${Math.round(60/r)}%">
                  <strong class="text-lg font-bold tracking-[-.03em] ${n===e.best&&e.spread>0?`text-coral-dark`:``}">${t}</strong>
                  <div class="mt-1.5">${g(t,n===e.best&&e.spread>0?`bg-coral`:`bg-sage`)}</div>
                </td>
              `).join(``)}
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function y(e,t){return`
    ${_(`Stronger photo`,e.verdict,e.geometryNote,`bg-coral-soft text-coral-dark`)}
    ${v(e.rows,t,e.winner)}
    <div class="mt-4 rounded-2xl border border-ink/10 bg-paper p-4">
      <h3 class="text-sm font-bold">Why ${o(t[e.winner])} came out ahead</h3>
      <ul class="mt-2.5 grid gap-1.5 text-xs leading-5 text-ink-muted">
        ${e.reasons.length?e.reasons.map(e=>`<li>• ${o(e)}</li>`).join(``):`<li>No single factor separated these photos by more than a few points — they are close to interchangeable.</li>`}
      </ul>
    </div>
    <p class="mt-4 text-xs leading-5 text-ink-muted">This compares how well each photograph presents a face, using lighting, focus, framing and pose. It is not a judgment of which face is more attractive.</p>
  `}function b(e,t){let n=[{label:`Face geometry`,values:e.faceScores,spread:e.faceSpread,tone:`bg-sage`},{label:`Photo presentation`,values:e.photoScores,spread:e.photoSpread,tone:`bg-coral`}];return`
    ${_(e.stability===`Stable`?`Your face did not change — the photos did`:`How much your score moved`,e.verdict,e.detail,e.stability===`Stable`?`bg-sage-soft text-sage-dark`:`bg-amber-100 text-amber-900`)}
    <div class="mt-4 grid gap-3 sm:grid-cols-2">
      ${n.map(e=>`
        <div class="rounded-2xl border border-ink/10 bg-paper p-4">
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="text-sm font-bold">${o(e.label)}</h3>
            <span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${e.spread<=3?`bg-sage-soft text-sage-dark`:`bg-amber-100 text-amber-800`}">Range ${e.spread}</span>
          </div>
          <div class="mt-3 grid gap-2">
            ${e.values.map((n,r)=>`
              <div class="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-2 text-xs">
                <span class="font-bold">${o(t[r]??`Photo ${r+1}`)}</span>
                ${g(n,e.tone)}
                <span class="text-right font-bold">${n}</span>
              </div>
            `).join(``)}
          </div>
        </div>
      `).join(``)}
    </div>
    <div class="mt-4 rounded-2xl border border-ink/10 bg-paper p-4">
      <h3 class="text-sm font-bold">What varied most between these photos</h3>
      <div class="mt-3 grid gap-2">
        ${e.drivers.map(e=>`
          <div class="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-xs">
            <span class="font-bold">${o(e.label)}</span>
            ${g(Math.min(100,e.spread*3),e.spread>=10?`bg-coral`:`bg-sage`)}
            <span class="text-right font-bold text-ink-muted">±${e.spread}</span>
          </div>
        `).join(``)}
      </div>
      <p class="mt-3 text-xs leading-5 text-ink-muted">A wide bar means that factor changed a lot across your photos, which is usually the real reason a score moved.</p>
    </div>
    <p class="mt-4 text-xs leading-5 text-ink-muted">The formulas are deterministic: the same processed image always returns the same numbers. Any variation you see here comes from the photographs, not from a random model.</p>
  `}function x(e,t){return[`Photo comparison — ${e.verdict}`,e.geometryNote,...e.rows.map(e=>`${e.label}: ${e.values.map((e,n)=>`${t[n]} ${e}`).join(` · `)}`),`Measured on-device by Tool Genie. Describes the photographs, not the person.`].join(`
`)}function S(e,t){return[`Face score consistency — ${e.verdict}`,e.detail,`Face geometry: ${e.faceScores.map((e,n)=>`${t[n]} ${e}`).join(` · `)} (range ${e.faceSpread})`,`Photo presentation: ${e.photoScores.map((e,n)=>`${t[n]} ${e}`).join(` · `)} (range ${e.photoSpread})`,`Measured on-device by Tool Genie with deterministic formulas.`].join(`
`)}function C(o){if(o.dataset.initialized===`true`)return;o.dataset.initialized=`true`;let l=o.dataset.mode??`compare`,u=o.querySelector(`[data-multi-consent]`),d=o.querySelector(`[data-multi-analyze]`),f=o.querySelector(`[data-multi-reset]`),g=o.querySelector(`[data-multi-restart]`),_=o.querySelector(`[data-multi-copy]`),v=o.querySelector(`[data-multi-loading]`),C=o.querySelector(`[data-multi-loading-title]`),w=o.querySelector(`[data-multi-loading-copy]`),T=o.querySelector(`[data-multi-error]`),E=o.querySelector(`[data-multi-error-copy]`),D=o.querySelector(`[data-multi-results]`),O=o.querySelector(`[data-multi-result-content]`),k=l===`compare`?`compare-face-photos`:`face-score-consistency-test`,A=(e,t={})=>{window.arfTrack?.(e,{tool:k,...t})},j=e=>e<8e3?`under_8s`:e<18e3?`8_to_18s`:`over_18s`,M=e=>e.includes(`More than one face`)?`multiple_faces`:e.includes(`No clear face`)?`no_face`:`runtime`,N=``,P=!1,modelLoaded=!1;async function initModel(){try{let ml=o.querySelector(`#model-loading`)||document.getElementById(`model-loading`),ua=o.querySelector(`#upload-area`)||document.getElementById(`upload-area`);if(ml)ml.style.display=`block`;if(ua)ua.style.display=`none`;let start=performance.now();A(`model_download_start`);let mod=await import(`./face-landmarker.Oxpj_t18.js?v=2.0.1`).then(e=>e.n||e);let loader=mod.loadFaceLandmarker||mod.prepareFaceLandmarker;await loader(progress=>{let pct=Math.round((typeof progress===`number`?progress:1)*100),pt=o.querySelector(`#model-progress`)||document.getElementById(`model-progress`),pb=o.querySelector(`#model-progress-bar`)||document.getElementById(`model-progress-bar`);if(pt)pt.textContent=pct+`%`;if(pb)pb.value=pct});modelLoaded=!0,P=!0;if(ml)ml.style.display=`none`;if(ua)ua.style.display=`block`;A(`model_download_complete`,{session_state:`ready`,duration_band:j(Math.round(performance.now()-start))})}catch(err){P=!1;let ml=o.querySelector(`#model-loading`)||document.getElementById(`model-loading`);if(ml)ml.innerHTML=`<p>Model failed to load: ${err?.message||`Network error`} <button onclick="initModel()">Retry</button></p>`;A(`model_download_failed`)}}window.initModel=initModel;let F=()=>{if(!modelLoaded)return initModel();return Promise.resolve()};initModel();let I=[...o.querySelectorAll(`[data-photo-slot]`)].map((e,t)=>({index:t,label:h[t]??`Photo ${t+1}`,element:e,input:e.querySelector(`[data-slot-input]`),canvas:e.querySelector(`[data-slot-canvas]`),empty:e.querySelector(`[data-slot-empty]`),meta:e.querySelector(`[data-slot-meta]`),name:e.querySelector(`[data-slot-name]`),status:e.querySelector(`[data-slot-status]`),remove:e.querySelector(`[data-slot-remove]`),processCanvas:document.createElement(`canvas`),image:null,file:null})),L=()=>I.filter(e=>e.image),R=e=>{v.classList.toggle(`hidden`,e!==`loading`),T.classList.toggle(`hidden`,e!==`error`),D.classList.toggle(`hidden`,e!==`results`)},z=()=>{d.disabled=!(L().length>=2&&u.checked)},B=e=>{if(e.currentImage?.revoke)e.currentImage.revoke();if(e.currentImage?.objectUrl)URL.revokeObjectURL(e.currentImage.objectUrl);e.currentImage=null;n(e.image),e.image=null,e.file=null,e.input.value=``,e.canvas.width=0,e.canvas.height=0,e.canvas.classList.add(`hidden`),e.empty.classList.remove(`hidden`),e.meta.classList.add(`hidden`),e.meta.classList.remove(`flex`),e.status.textContent=e.index>=2?`Optional`:`Required`,e.status.className=`rounded-full bg-cream px-2.5 py-1 text-xs font-bold text-ink-muted`},V=async(e,r,oSrc)=>{if(!modelLoaded){let prog=(o.querySelector(`#model-progress`)||document.getElementById(`model-progress`))?.textContent||`0%`;window.arfToast?.(`Model still loading, please wait... `+prog);await initModel()}let c=t(r);c&&A(`image_conversion_start`,{source:oSrc,slot:String(e.index+1)});let l=await a(r,{onStatus:()=>{C.textContent=`Converting ${e.label} from HEIC/HEIF…`,w.textContent=`The decoder runs locally in this browser; the original photo is not uploaded.`,R(`loading`)}}).catch(t=>{throw c&&A(`image_conversion_failed`,{source:oSrc,slot:String(e.index+1)}),t});if(e.currentImage?.revoke)e.currentImage.revoke();if(e.currentImage?.objectUrl)URL.revokeObjectURL(e.currentImage.objectUrl);e.currentImage=l;n(e.image),e.image=l?.image,e.file=l?.file||r;if(e.image){i(e.processCanvas,e.image),s(e.canvas,e.processCanvas)};e.canvas.classList.remove(`hidden`),e.empty.classList.add(`hidden`),e.name.textContent=r.name,e.meta.classList.remove(`hidden`),e.meta.classList.add(`flex`),e.status.textContent=`Ready`,e.status.className=`rounded-full bg-sage-soft px-2.5 py-1 text-xs font-bold text-sage-dark`;if(u&&!u.checked)u.checked=!0;R(`idle`),z(),A(`image_selected`,{source:oSrc,slot:String(e.index+1),input_format:l.convertedFromHeic?`heic_converted`:`browser_native`}),l.convertedFromHeic&&A(`image_conversion_complete`,{source:oSrc,slot:String(e.index+1)})},H=e=>{E.textContent=e,R(`error`)};I.forEach(e=>{e.input.addEventListener(`change`,async()=>{let t=e.input.files?.[0];if(t)try{await V(e,t,`picker`)}catch(t){H(t instanceof Error?t.message:`Choose a different image.`),A(`image_validation_failed`,{source:`picker`,slot:String(e.index+1)})}}),e.remove.addEventListener(`click`,()=>{B(e),O.replaceChildren(),R(`idle`),z()}),[`dragenter`,`dragover`].forEach(t=>{e.element.addEventListener(t,t=>{t.preventDefault(),e.element.classList.add(`border-coral`,`bg-coral-soft/25`)})}),[`dragleave`,`drop`].forEach(t=>{e.element.addEventListener(t,t=>{t.preventDefault(),e.element.classList.remove(`border-coral`,`bg-coral-soft/25`)})}),e.element.addEventListener(`drop`,async t=>{let n=t.dataTransfer?.files?.[0];if(n)try{await V(e,n,`drop`)}catch(t){H(t instanceof Error?t.message:`Choose a different image.`),A(`image_validation_failed`,{source:`drop`,slot:String(e.index+1)})}})}),u.addEventListener(`change`,z),d.addEventListener(`click`,async()=>{let t=L();if(t.length<2)return;if(u&&!u.checked){u.checked=!0;z()}R(`loading`);let n=performance.now();A(`analysis_start`,{photo_count:String(t.length)}),C.textContent=`Loading local face model…`,w.textContent=`The first run can take a moment. Your photos remain on this device.`;try{let{detectFaceLandmarks:i}=await r(async()=>{let{detectFaceLandmarks:e}=await import(`./face-landmarker.Oxpj_t18.js?v=2.0.1`).then(e=>e.n||e);return{detectFaceLandmarks:e}},__vite__mapDeps([0,1])),a=[];for(let n of t){C.textContent=`Measuring ${n.label}…`,w.textContent=`Photo ${a.length+1} of ${t.length}. Checking face count, pose, contour and photo quality.`,await new Promise(e=>requestAnimationFrame(()=>e()));let r=await i(n.processCanvas);if(!r||!r.faces||r.faces.length===0)throw Error(`No clear face was detected in ${n.label}. Use a brighter, front-facing portrait.`);if(r.faces.length>1)throw Error(`More than one face was detected in ${n.label}. Crop it to one consenting adult and try again.`);let o=c(n.processCanvas),s=e(r.faces[0],o);a.push({label:n.label,report:s})}let o=a.map(e=>e.label);if(l===`compare`){let e=p(a);O.innerHTML=y(e,o),N=x(e,o)}else{let e=m(a);O.innerHTML=b(e,o),N=S(e,o)}R(`results`),A(`analysis_success`,{photo_count:String(t.length),duration_band:j(performance.now()-n)}),A(`result_view`,{photo_count:String(t.length)}),D.scrollIntoView({behavior:`smooth`,block:`nearest`})}catch(e){let r=e instanceof Error?e.message:`The local model could not analyze these images. Please try other photos.`;H(r),A(`analysis_failed`,{reason:M(r),photo_count:String(t.length),duration_band:j(performance.now()-n)})}});let U=()=>{I.forEach(B),u.checked=!1,N=``,O.replaceChildren(),R(`idle`),z(),o.scrollIntoView({behavior:`smooth`,block:`start`})};f.addEventListener(`click`,U),g.addEventListener(`click`,U),_.addEventListener(`click`,async()=>{if(N)try{await navigator.clipboard.writeText(N);let e=_.textContent;_.textContent=`Copied`,setTimeout(()=>{_.textContent=e},1500),A(`result_share`,{method:`clipboard`})}catch{_.textContent=`Copy unavailable`}}),z()}document.querySelectorAll(`[data-multi-photo-tool]`).forEach(C);