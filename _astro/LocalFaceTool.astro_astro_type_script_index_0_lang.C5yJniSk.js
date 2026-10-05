const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["/_astro/face-landmarker.Oxpj_t18.js?v=2.0.1","/_astro/photo-input.B2aPvohU.js?v=2.0.1"])))=>i.map(i=>d[i]);
import{i as e,t}from"./geometry-core.BI0FvvIt.js?v=2.0.1";import{i as n,n as r,o as i,r as a}from"./face-shape-session.D5n7qy3M.js?v=2.0.1";import{a as o,c as s,i as c,l,n as u,o as d,r as f,t as p}from"./photo-input.B2aPvohU.js?v=2.0.1";import{t as m}from"./photo-signals.Cot3PtuE.js?v=2.0.1";import{t as h}from"./photo-cropper.CK9xMzVp.js?v=2.0.1";import{t as g}from"./style-next-steps.CIfcAC0j.js?v=2.0.1";var _=(e,t=0,n=100)=>Math.min(n,Math.max(t,e)),v=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:0,y=(e,t=1)=>{let n=10**t;return Math.round(e*n)/n},b=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),x=(e,t,n)=>{let r=Math.atan2(e.y-t.y,e.x-t.x),i=Math.atan2(n.y-t.y,n.x-t.x),a=Math.abs((r-i)*180/Math.PI);return a>180&&(a=360-a),a},S=(e,t,n)=>{let r=n.x-t.x,i=n.y-t.y,a=Math.hypot(r,i)||1;return((e.x-t.x)*i-(e.y-t.y)*r)/a};function C(e,t,n,r,i){let a=t<n?`Below band`:t>r?`Above band`:`In band`;return{label:e,value:y(t),display:`${y(t)}°`,reference:`Commonly cited range ${n}–${r}°`,inBand:a===`In band`,position:a,note:i}}function ee(e){return e>=78?`Profile`:e>=60?`Near profile`:e>=42?`Three-quarter`:e>=22?`Slight turn`:`Frontal`}function te(e){return e>=.85?`Consistent with references`:e>=.6?`Mostly in range`:e>=.35?`Mixed`:`Outside references`}function ne(e,t){if(e.length<468)throw Error(`A complete face landmark set is required.`);let n=e.map(e=>({x:e.x*t.width,y:e.y*t.height,z:e.z})),r=e=>n[e],i=r(1),a=r(168),o=r(9),s=r(2),c=r(0),l=r(17),u=r(152),d=r(10),f=Math.max(b(r(234),r(454)),1),p=Math.max(b(d,u),1),m=b(r(33),r(133)),h=b(r(362),r(263)),g=(r(234).x+r(454).x)/2,ne=Math.abs(i.x-g)/f,w=Math.abs(m-h)/Math.max(m,h,1),T=Math.round(_(v([ne*265,w*185]))),E=i.x>=g?`Right`:`Left`,D=Math.abs(r(454).x-i.x)>=Math.abs(r(234).x-i.x),O=r(D?454:234),k=r(D?397:172),A=x(O,k,u),j=x(o,a,i),re=x(i,s,c),M=x(o,s,u),N=[C(`Gonial angle`,A,115,130,`The visible turn from the ear region through the jaw angle to the chin.`),C(`Nasofrontal angle`,j,115,135,`The transition from the brow ridge through the nasion into the nose bridge.`),C(`Nasolabial angle`,re,90,110,`The angle between the nose base and the upper lip.`),C(`Facial convexity`,M,165,175,`Glabella to subnasale to chin — how straight or convex the profile reads.`)],ie=Math.max(b(i,u),1),P=S(c,i,u)/ie*100,F=S(l,i,u)/ie*100,I=E===`Right`?1:-1,ae=b(O,k),oe=b(k,u),se=[{label:`Upper lip vs E-line`,value:y(P*I,1),display:`${y(Math.abs(P),1)}% ${P*I>0?`ahead of`:`behind`} the line`,reference:`Soft-tissue reference: slightly behind the nose-to-chin line`},{label:`Lower lip vs E-line`,value:y(F*I,1),display:`${y(Math.abs(F),1)}% ${F*I>0?`ahead of`:`behind`} the line`,reference:`Soft-tissue reference: close to, or slightly behind, the line`},{label:`Ramus / mandible length`,value:ae/Math.max(oe,1),display:`${y(ae/Math.max(oe,1),2)} : 1`,reference:`Visible jaw segments in this photo only`},{label:`Lower-face height share`,value:Math.abs(u.y-s.y)/p*100,display:`${Math.round(Math.abs(u.y-s.y)/p*100)}%`,reference:`Subnasale to chin as a share of visible face length`},{label:`Visible head turn`,value:T,display:`${T}/100`,score:T}],L=_(100-Math.abs(t.brightness-54)*2.25),R=_(t.contrast*1.65),z=_(t.sharpness),B=_(Math.min(t.width,t.height)/7.2),ce=_(T*1.35),V=Math.round(ce*.34+z*.24+L*.2+R*.14+B*.08),H=[];T<45&&H.push(`Turn further to the side; a near-frontal photo cannot show the profile outline.`),z<55&&H.push(`Hold the camera steady and focus on the eye closest to the lens.`),L<58&&H.push(`Light the face from the front-side so the profile edge stays separated from the background.`),R<50&&H.push(`Use a background that contrasts with your profile outline.`),H.length||H.push(`This photo is suitable for a visible-profile estimate.`);let U=[];T<35&&U.push(`The head is too close to frontal for a profile reading. Turn about 80–90° from the camera.`),z<32&&U.push(`The profile edge is too soft to place landmarks reliably.`);let le=U.length===0,W=N.filter(e=>e.inBand).length,G=Math.round(_(v(N.map(e=>e.inBand?88:58))-(100-ce)*.12));return{turn:T,poseLabel:ee(T),facing:E,usable:le,gateNotes:U,quality:{score:V,label:V>=78?`High`:V>=58?`Moderate`:`Low`,notes:H},balance:{score:G,band:te(W/N.length),inBandCount:W,totalBands:N.length},angles:N,projection:se}}var w=class extends Error{},T=e=>e>=78?`bg-sage-soft text-sage-dark`:e>=58?`bg-amber-100 text-amber-800`:`bg-coral-soft text-coral-dark`,E=(e,t=`bg-coral`)=>`
  <div class="h-2 overflow-hidden rounded-full bg-ink/8">
    <div class="h-full rounded-full ${t}" style="width:${Math.max(2,Math.min(100,e))}%"></div>
  </div>
`,D=e=>`
  <div class="mt-5 grid gap-2 sm:grid-cols-2">
    ${e.map(e=>`
      <div class="rounded-2xl border border-ink/10 bg-paper p-3.5">
        <p class="text-xs font-extrabold text-ink-muted ">${f(e.label)}</p>
        <p class="mt-1.5 text-lg font-bold tracking-[-.035em]">${f(e.display)}</p>
        ${e.reference?`<p class="mt-1 text-xs leading-5 text-ink-muted">${f(e.reference)}</p>`:``}
        ${typeof e.score==`number`?`<div class="mt-2">${E(e.score,`bg-sage`)}</div>`:``}
      </div>
    `).join(``)}
  </div>
`,O=e=>`
  <div class="mt-4 flex items-center justify-between gap-3 rounded-xl border border-ink/10 px-3 py-2.5">
    <span class="text-xs font-bold text-ink-muted">Photo confidence</span>
    <span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${T(e.quality.score)}">${e.quality.label} · ${e.quality.score}/100</span>
  </div>
`;function k(e,t,n,r=`bg-coral-soft text-coral-dark`){return`
    <div class="rounded-2xl ${r} p-5">
      <p class="text-xs font-extrabold opacity-70">${f(e)}</p>
      <p class="mt-2 text-4xl font-bold tracking-[-.06em]">${f(t)}</p>
      <p class="mt-2 text-xs leading-5 opacity-75">${f(n)}</p>
    </div>
  `}var A=e=>e===`High`?`bg-coral-soft text-coral-dark`:e===`Medium`?`bg-amber-100 text-amber-800`:`bg-sage-soft text-sage-dark`;function j(e){let{faceGeometry:t,photoPresentation:n,gap:r}=e.split;return`
    <div class="mt-5 rounded-2xl border border-ink/10 bg-paper p-4">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-sm font-bold">Face score vs photo score</h3>
        <a class="text-xs font-bold text-coral-dark" href="/face-score-consistency-test">Test more photos →</a>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-2">
        <div class="rounded-xl bg-sage-soft p-3 text-sage-dark">
          <p class="text-xs font-extrabold opacity-70">Face geometry</p>
          <p class="mt-1 text-3xl font-bold tracking-[-.05em]">${t}</p>
        </div>
        <div class="rounded-xl bg-coral-soft p-3 text-coral-dark">
          <p class="text-xs font-extrabold opacity-70">Photo presentation</p>
          <p class="mt-1 text-3xl font-bold tracking-[-.05em]">${n}</p>
        </div>
      </div>
      <p class="mt-3 text-xs leading-5 font-bold">${f(r>=10?`This photo is holding the score back by about ${r} points.`:r<=-10?`The photo is presenting about ${Math.abs(r)} points better than the measured geometry.`:`Face geometry and photo presentation are scoring closely.`)}</p>
    </div>
  `}function re(e,t=3){return`
    <div class="mt-4 rounded-2xl border border-ink/10 p-4">
      <h3 class="text-sm font-bold">Your ${t} highest-impact changes</h3>
      <ol class="mt-3 grid gap-2">
        ${e.slice(0,t).map((e,t)=>`
          <li class="rounded-xl bg-paper p-3">
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-bold">#${t+1} ${f(e.label)} · ${e.score}/100</span>
              <span class="rounded-full px-2 py-1 text-xs font-extrabold ${A(e.impact)}">${e.impact} impact</span>
            </div>
            <p class="mt-1.5 text-xs leading-5 text-ink-muted">${f(e.detail)}</p>
            <p class="mt-1 text-xs leading-5 text-ink-soft">${f(e.action)}</p>
          </li>
        `).join(``)}
      </ol>
    </div>
  `}function M(e){return`
    <div class="mt-4 grid gap-3">
      ${e.map(e=>`
        <div>
          <div class="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
            <span class="font-bold">${f(e.label)}</span>
            <span class="text-ink-muted">${e.score}/100 · weight ${Math.round(e.weight*100)}%</span>
          </div>
          ${E(e.score,`bg-sage`)}
          <p class="mt-1.5 text-xs leading-5 text-ink-muted">${f(e.note)}</p>
        </div>
      `).join(``)}
    </div>
  `}function N(e,t,n,r){return`
    <div class="rounded-2xl border border-ink/10 p-4">
      <h3 class="text-xs font-extrabold ${n}">${f(e)}</h3>
      <ul class="mt-2 grid gap-1.5 text-xs leading-5 text-ink-muted">
        ${t.length?t.map(e=>`<li>• ${f(e)}</li>`).join(``):`<li>${f(r)}</li>`}
      </ul>
    </div>
  `}function ie(e){if(!e.usable)return`
      ${k(`Head turn`,`${e.turn}/100`,`${e.poseLabel} — not side-on enough for a profile reading.`,`bg-coral-soft text-coral-dark`)}
      <div class="mt-5 rounded-2xl border border-coral/20 bg-paper p-4">
        <h3 class="text-sm font-bold">Retake before measuring</h3>
        <ul class="mt-3 grid gap-1.5 text-xs leading-5 text-ink-muted">${e.gateNotes.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
      </div>
    `;let t=e=>e.inBand?`bg-sage-soft text-sage-dark`:`bg-amber-100 text-amber-800`;return`
    ${k(`Profile reference agreement`,`${e.balance.inBandCount}/${e.balance.totalBands}`,`${e.balance.band} · ${e.poseLabel} facing ${e.facing.toLowerCase()} · head turn ${e.turn}/100`,`bg-violet-100 text-violet-900`)}
    <h3 class="mt-5 text-sm font-bold">Profile angles</h3>
    <div class="mt-3 grid gap-2">
      ${e.angles.map(e=>`
        <div class="rounded-2xl border border-ink/10 bg-paper p-3.5">
          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-bold">${f(e.label)}</span>
            <span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${t(e)}">${f(e.position)}</span>
          </div>
          <p class="mt-1.5 text-2xl font-bold tracking-[-.04em]">${f(e.display)}</p>
          <p class="mt-1 text-xs leading-5 text-ink-muted">${f(e.reference)} · ${f(e.note)}</p>
        </div>
      `).join(``)}
    </div>
    ${D(e.projection)}
    <div class="mt-4 flex items-center justify-between gap-3 rounded-xl border border-ink/10 px-3 py-2.5">
      <span class="text-xs font-bold text-ink-muted">Profile photo confidence</span>
      <span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${T(e.quality.score)}">${e.quality.label} · ${e.quality.score}/100</span>
    </div>
    <ul class="mt-3 grid gap-1.5 text-xs leading-5 text-ink-muted">${e.quality.notes.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
    <p class="mt-4 text-xs leading-5 text-ink-muted">A 2D visible-profile estimate from soft-tissue landmarks. It is not a cephalometric measurement and must not be used to plan treatment.</p>
  `}function P(e,t){let n=O(t);if(e===`symmetry`)return`
      ${k(`Visible symmetry`,`${t.symmetry.score}/100`,`A pose-aware comparison of paired photo landmarks.`)}
      <h3 class="mt-5 text-sm font-bold">Regional comparison</h3>
      <div class="mt-3 grid gap-3">
        ${t.symmetry.regions.map(e=>`
          <div class="grid grid-cols-[4rem_1fr_3rem] items-center gap-3 text-xs">
            <span class="font-bold">${e.label}</span>
            ${E(e.value,`bg-sage`)}
            <span class="text-right font-bold text-ink-muted">${e.value}</span>
          </div>
        `).join(``)}
      </div>
      ${j(t)}
      ${n}
      <p class="mt-4 text-xs leading-5 text-ink-muted">Natural asymmetry is normal. This is a measurement of one image, not a beauty or health grade.</p>
    `;if(e===`shape`){let[e,r]=t.shape.ranking,i=e.score-r.score<10,[a,o,s,c,l]=t.shape.metrics,u=o.value>s.value+.07?`The visible forehead is wider than the jaw, so the contour tapers toward the chin.`:s.value>o.value+.07?`The visible jaw is wider than the forehead, so the lower contour carries more width.`:`The visible forehead and jaw widths stay relatively close to each other.`;return`
      ${k(`Closest contour match`,e.name,`${e.score}% of the match weight · ${t.shape.confidence}% result confidence`,`bg-sage-soft text-sage-dark`)}
      <div class="mt-4 rounded-2xl border border-ink/10 bg-paper p-4">
        <h3 class="text-sm font-bold">Why this result</h3>
        <ul class="mt-3 grid gap-2 text-xs leading-5 text-ink-soft">
          <li>• Face length measures ${f(a.display)} relative to cheek width.</li>
          <li>• ${f(u)}</li>
          <li>• The ${f(c.display)} jaw corner and ${f(l.display)} chin taper help distinguish ${f(e.name)} from ${f(r.name)}.</li>
        </ul>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <section class="rounded-2xl bg-sage-soft/65 p-4">
          <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-sage-dark">Hairstyle directions</h3><a class="text-xs font-bold text-sage-dark" href="/hairstyle-finder" data-next-tool="hairstyle-finder">More →</a></div>
          <ul class="mt-3 grid gap-2 text-xs leading-5 text-ink-soft">${t.recommendations.hairstyles.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
        </section>
        <section class="rounded-2xl bg-coral-soft/55 p-4">
          <div class="flex items-center justify-between gap-2"><h3 class="text-sm font-bold text-coral-dark">Eyewear directions</h3><a class="text-xs font-bold text-coral-dark" href="/glasses-for-face-shape" data-next-tool="glasses-for-face-shape">More →</a></div>
          <ul class="mt-3 grid gap-2 text-xs leading-5 text-ink-soft">${t.recommendations.glasses.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
        </section>
      </div>
      <div class="mt-4 rounded-2xl border border-ink/10 p-4">
        <h3 class="text-sm font-bold">Photo tips for a cleaner retake</h3>
        <ul class="mt-3 grid gap-2 text-xs leading-5 text-ink-muted">${t.split.drivers.slice(0,3).map(e=>`<li>• ${f(e.action)}</li>`).join(``)}</ul>
      </div>
      <div class="mt-5 rounded-2xl border border-ink/10 p-4">
        <h3 class="text-sm font-bold">All seven profiles</h3>
        <p class="mt-1 text-xs leading-5 text-ink-muted">Face shape is continuous, so the full distribution is shown rather than a single label.</p>
        <div class="mt-3 grid gap-2.5">
          ${t.shape.ranking.map((e,t)=>`
            <div class="grid grid-cols-[4.6rem_1fr_2.6rem] items-center gap-3 text-xs">
              <span class="${t===0?`font-bold`:`text-ink-muted`}">${f(e.name)}</span>
              ${E(e.score,t===0?`bg-sage`:`bg-ink/25`)}
              <span class="text-right font-bold ${t===0?``:`text-ink-muted`}">${e.score}%</span>
            </div>
          `).join(``)}
        </div>
        ${i?`<p class="mt-3 rounded-xl bg-cream p-3 text-xs leading-5 text-ink-soft"><strong>${f(e.name)}</strong> and <strong>${f(r.name)}</strong> are within ${e.score-r.score} points of each other in this photo. Treat both as plausible and use whichever styling direction you prefer.</p>`:``}
      </div>
      <div class="mt-4 grid gap-2 sm:grid-cols-2">
        ${[e,r].map((e,t)=>`
          <a class="flex flex-col rounded-2xl border border-ink/10 bg-paper p-3.5 transition hover:border-coral/40" href="/face-shape/${e.name.toLowerCase()}">
            <span class="text-xs font-extrabold text-ink-muted ">${t===0?`Your closest match`:`Worth reading too`}</span>
            <span class="mt-2 text-sm font-bold">${f(e.name)} face shape guide →</span>
            <span class="mt-1 text-xs leading-5 text-ink-muted">Hairstyles, glasses, beard, contour and accessories.</span>
          </a>
        `).join(``)}
      </div>
      ${D(t.shape.metrics)}
      <div class="mt-4 rounded-2xl bg-paper p-3.5 text-xs leading-5 text-ink-muted">
        The jaw corner angle separates square from round contours, and the chin taper angle separates pointed lower faces from broad ones. Width ratios alone cannot make either distinction.
      </div>
      ${n}
    `}if(e===`golden`)return`
      ${k(`Reference proximity`,`${t.golden.score}/100`,`Numerical closeness to the listed references—not an attractiveness score.`,`bg-amber-100 text-amber-900`)}
      ${D(t.golden.metrics)}
      ${n}
      <p class="mt-4 rounded-xl bg-paper p-3 text-xs leading-5 text-ink-muted">Phi is one mathematical reference among many. It is not a universal or scientific definition of beauty.</p>
    `;if(e===`ratios`)return`
      <div class="rounded-2xl bg-sage-soft p-5 text-sage-dark">
        <p class="text-xs font-extrabold opacity-70">Visible facial thirds</p>
        <div class="mt-4 grid grid-cols-3 gap-2 text-center">
          ${t.ratios.thirds.map(e=>`<div><strong class="block text-xl">${e.display}</strong><span class="text-xs">${e.label.replace(` third`,``)}</span></div>`).join(``)}
        </div>
      </div>
      ${D([...t.ratios.thirds,...t.ratios.metrics])}
      ${n}
    `;if(e===`harmony`)return`
      ${k(`Facial harmony`,`${t.harmony.score}/100`,`${t.harmony.band} · six weighted visible relationships.`,`bg-sage-soft text-sage-dark`)}
      ${M(t.harmony.components)}
      <div class="mt-5 grid gap-2">
        ${N(`What helps your harmony`,t.harmony.helps,`text-sage-dark`,`No component measured clearly above the reference in this photo.`)}
        ${N(`What reduces your harmony`,t.harmony.reduces,`text-coral-dark`,`No component measured clearly below the reference in this photo.`)}
        ${N(`What is mostly photo-related`,t.harmony.photoRelated,`text-ink-muted`,`No photo-quality issue was detected in this image.`)}
      </div>
      ${j(t)}
      ${n}
      <p class="mt-4 text-xs leading-5 text-ink-muted">Harmony here means measured proximity to this tool's stated references. It is not a judgment of attractiveness or worth.</p>
    `;if(e===`midface`)return`
      ${k(`Midface ratio`,`${t.midface.ratio.toFixed(2)} : 1`,`${t.midface.label} · compared with this tool’s selected 1.00 reference.`,`bg-amber-100 text-amber-900`)}
      ${D(t.midface.metrics)}
      <div class="mt-4 rounded-2xl bg-paper p-3.5 text-xs leading-5 text-ink-muted">
        Definition used here: the vertical distance from the interpupillary line to the top of the upper lip, divided by the distance between the pupils. Other calculators use different landmarks and will report a different number.
      </div>
      ${n}
    `;if(e===`fwhr`)return`
      ${k(`Facial width-to-height ratio`,`${t.fwhr.value.toFixed(2)}`,`${t.fwhr.band} · this tool uses a selected 1.7–2.1 guide range, not a clinical norm.`,`bg-amber-100 text-amber-900`)}
      ${D(t.fwhr.metrics)}
      <div class="mt-4 rounded-2xl bg-paper p-3.5 text-xs leading-5 text-ink-muted">
        fWHR is bizygomatic width divided by brow-line-to-upper-lip height. Claims linking it to personality or behaviour have not replicated reliably, so this page reports the geometry only.
      </div>
      ${n}
    `;if(e===`thirds`){let e=t.harmony.components.find(e=>e.label===`Facial thirds`),r=t.ratios.thirds.map(e=>({label:`${e.label} deviation`,value:e.value-100/3,display:`${e.value-100/3>=0?`+`:``}${(e.value-100/3).toFixed(1)} pts`,reference:`Difference from the 33.3% even-thirds convention`}));return`
      <div class="rounded-2xl bg-sage-soft p-5 text-sage-dark">
        <p class="text-xs font-extrabold opacity-70">Visible facial thirds</p>
        <div class="mt-4 grid grid-cols-3 gap-2 text-center">
          ${t.ratios.thirds.map(e=>`<div><strong class="block text-2xl">${e.display}</strong><span class="text-xs">${f(e.label.replace(` third`,``))}</span></div>`).join(``)}
        </div>
        <p class="mt-4 text-center text-xs opacity-80">Thirds-balance score ${e?.score??0}/100 against the even-thirds convention.</p>
      </div>
      ${D(r)}
      <div class="mt-4 rounded-2xl bg-paper p-3.5 text-xs leading-5 text-ink-muted">
        The upper third is bounded by an estimated hairline and is the least reliable of the three. Equal thirds is a drawing convention, not a biological norm.
      </div>
      ${n}
    `}if(e===`fifths`){let e=t.fifths.segments.map(e=>({label:`${e.label} deviation`,value:e.value-20,display:`${e.value-20>=0?`+`:``}${(e.value-20).toFixed(1)} pts`,reference:`Difference from the 20% equal-fifths reference`}));return`
      <div class="rounded-2xl bg-sage-soft p-5 text-sage-dark">
        <p class="text-xs font-extrabold opacity-70">Visible facial fifths</p>
        <div class="mt-4 grid grid-cols-5 gap-1.5 text-center">
          ${t.fifths.segments.map(e=>`<div><strong class="block text-lg">${e.display}</strong><span class="text-xs leading-4">${f(e.label.replace(` fifth`,``))}</span></div>`).join(``)}
        </div>
        <p class="mt-4 text-center text-xs opacity-80">Fifths-balance score ${t.fifths.score}/100 against the equal-fifths convention.</p>
      </div>
      ${D([...e,...t.fifths.metrics])}
      <div class="mt-4 rounded-2xl bg-paper p-3.5 text-xs leading-5 text-ink-muted">
        Width is measured across the visible face contour rather than ear to ear, so the two outer fifths read narrower than the convention assumes. Compare them with each other before comparing either with 20%.
      </div>
      ${n}
    `}if(e===`mask`)return`
      ${k(`Phi grid overlay`,`${t.golden.score}/100`,`How close the measured ratios sit to their phi references. The grid itself is a fixed construction.`,`bg-amber-100 text-amber-900`)}
      ${D(t.golden.metrics)}
      ${n}
      <p class="mt-4 rounded-xl bg-paper p-3 text-xs leading-5 text-ink-muted">The overlay is a plain golden-section construction of your face box, not a commercial or clinical mask template. Fade it with the opacity slider, then download the composed image.</p>
    `;if(e===`jawline`)return`
      ${k(`Contour balance`,`${t.jaw.score}/100`,`Summarises side agreement and visible lower-face proportions.`)}
      ${D(t.jaw.metrics)}
      ${n}
      <p class="mt-4 text-xs leading-5 text-ink-muted">This index does not measure skeletal anatomy, health, gender or attractiveness.</p>
    `;if(e===`eyes`)return`
      ${k(`Visible eye geometry`,t.eyes.shape,`${t.eyes.symmetry}/100 side-to-side geometry agreement`,`bg-sage-soft text-sage-dark`)}
      ${D(t.eyes.metrics)}
      ${n}
      <p class="mt-4 text-xs leading-5 text-ink-muted">Landmarks cannot reliably determine hooding, monolid or deep-set anatomy, so this result stays limited to width and opening geometry.</p>
    `;if(e===`canthal`)return`
      ${k(`Average visible tilt`,`${t.eyes.averageTilt>=0?`+`:``}${t.eyes.averageTilt}°`,`${t.eyes.tiltLabel} direction · direction is not a rating.`,`bg-violet-100 text-violet-900`)}
      ${D(t.eyes.metrics.slice(1))}
      ${n}
    `;if(e===`quality`){let e=[{label:`Brightness`,value:t.quality.brightness,display:`${t.quality.brightness}/100`},{label:`Contrast`,value:t.quality.contrast,display:`${t.quality.contrast}/100`},{label:`Sharpness`,value:t.quality.sharpness,display:`${t.quality.sharpness}/100`},{label:`Face coverage`,value:t.quality.faceCoverage,display:`${t.quality.faceCoverage}%`},{label:`Eye-line roll`,value:t.quality.roll,display:`${t.quality.roll}°`},{label:`Yaw proxy`,value:t.quality.yaw,display:`${t.quality.yaw}%`}];return`
      ${k(`Photo confidence`,`${t.quality.score}/100`,`${t.quality.label} suitability for repeatable photo geometry.`,T(t.quality.score))}
      ${D(e)}
      ${re(t.split.drivers)}
      ${j(t)}
      <div class="mt-4 rounded-2xl border border-ink/10 p-4">
        <h3 class="text-xs font-bold">Retake guidance</h3>
        <ul class="mt-2 grid gap-1.5 text-xs leading-5 text-ink-muted">${t.quality.notes.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
      </div>
    `}let r=e===`hairstyle`,i=r?t.recommendations.hairstyles:t.recommendations.glasses;return`
    ${k(`Closest contour match`,t.shape.primary.name,`Alternate: ${t.shape.alternate.name} · ${t.shape.confidence}% confidence`,`bg-violet-100 text-violet-900`)}
    <div class="mt-5">
      <h3 class="text-sm font-bold">${r?`Hairstyle`:`Frame`} starting points</h3>
      <ol class="mt-3 grid gap-2">
        ${i.map((e,t)=>`
          <li class="grid grid-cols-[1.75rem_1fr] gap-2 rounded-2xl bg-paper p-3 text-xs leading-5 text-ink-soft">
            <span class="grid size-7 place-content-center rounded-full bg-cream font-bold text-coral-dark">${t+1}</span>
            <span>${f(e)}</span>
          </li>
        `).join(``)}
      </ol>
    </div>
    ${n}
    <p class="mt-4 text-xs leading-5 text-ink-muted">${r?`Texture, density, maintenance and personal style matter more than a shape label.`:`Prescription needs, bridge fit, pupil alignment and comfort come before face-shape advice.`}</p>
  `}function F(e,t){return e!==`quality`&&t.quality.score<45?`Photo confidence: ${t.quality.score}/100 (${t.quality.label})\nGeometry result withheld. Retake the photo before interpreting measurements.`:[{symmetry:`Visible symmetry: ${t.symmetry.score}/100`,shape:`Face-shape ranking: ${t.shape.ranking.map(e=>`${e.name} ${e.score}%`).join(`, `)}`,golden:`Listed-ratio proximity: ${t.golden.score}/100`,ratios:`Facial thirds: ${t.ratios.thirds.map(e=>e.display).join(` / `)}`,jawline:`Jaw contour balance: ${t.jaw.score}/100`,eyes:`Visible eye geometry: ${t.eyes.shape}`,canthal:`Average visible canthal tilt: ${t.eyes.averageTilt}° (${t.eyes.tiltLabel})`,quality:`Photo confidence: ${t.quality.score}/100 (${t.quality.label})`,hairstyle:`Hairstyle profile: ${t.shape.primary.name} (alternate ${t.shape.alternate.name})`,glasses:`Glasses profile: ${t.shape.primary.name} (alternate ${t.shape.alternate.name})`,harmony:`Facial harmony: ${t.harmony.score}/100 (${t.harmony.band})`,midface:`Midface ratio: ${t.midface.ratio.toFixed(2)} : 1 (${t.midface.label})`,fwhr:`fWHR: ${t.fwhr.value.toFixed(2)} (${t.fwhr.band})`,thirds:`Facial thirds: ${t.ratios.thirds.map(e=>e.display).join(` / `)}`,fifths:`Facial fifths: ${t.fifths.segments.map(e=>e.display).join(` / `)} (balance ${t.fifths.score}/100)`,mask:`Phi grid proximity: ${t.golden.score}/100`,profile:`Side profile analysis`}[e],`Face geometry: ${t.split.faceGeometry}/100 · Photo presentation: ${t.split.photoPresentation}/100`,`Photo-based estimate from Tool Genie; not a medical or objective beauty judgment.`].join(`
`)}function I(e){return[`Side profile: ${e.balance.inBandCount}/${e.balance.totalBands} angles inside their reference range`,...e.angles.map(e=>`${e.label}: ${e.display} (${e.position})`),`Head turn: ${e.turn}/100 · photo confidence ${e.quality.score}/100`,`2D visible-profile estimate from Tool Genie; not a cephalometric or medical measurement.`].join(`
`)}function ae(e){return`
    ${k(`Photo confidence`,`${e.quality.score}/100`,`This image is not suitable for a stable geometry result.`,`bg-coral-soft text-coral-dark`)}
    <div class="mt-5 rounded-2xl border border-coral/20 bg-paper p-4">
      <h3 class="text-sm font-bold">Retake before measuring</h3>
      <p class="mt-2 text-xs leading-6 text-ink-muted">No geometry score was generated because the image-quality signal is below the release gate.</p>
      <ul class="mt-3 grid gap-1.5 text-xs leading-5 text-ink-muted">${e.quality.notes.map(e=>`<li>• ${f(e)}</li>`).join(``)}</ul>
    </div>
  `}function oe(e,n,r,i,a=1){let o=e.getContext(`2d`);if(!o)return;e.width=n.width,e.height=n.height,o.drawImage(n,0,0),o.lineCap=`round`,o.lineJoin=`round`;let s=t=>({x:r[t].x*e.width,y:r[t].y*e.height}),c=(t,n,r=3,i=!1)=>{o.beginPath(),t.forEach((e,t)=>{let n=s(e);t===0?o.moveTo(n.x,n.y):o.lineTo(n.x,n.y)}),i&&o.closePath(),o.strokeStyle=n,o.lineWidth=Math.max(r,e.width/520),o.stroke()},l=(t,n=`#f8c09a`)=>{let r=s(t);o.beginPath(),o.arc(r.x,r.y,Math.max(3,e.width/280),0,Math.PI*2),o.fillStyle=n,o.fill()};if(o.save(),o.shadowColor=`rgba(0,0,0,.28)`,o.shadowBlur=Math.max(3,e.width/300),i===`symmetry`)c([10,168,1,2,152],`#f4b783`,3),t.symmetryPairs.forEach(([t,n])=>{let r=s(t),i=s(n);o.beginPath(),o.moveTo(r.x,r.y),o.lineTo(i.x,n.y),o.strokeStyle=`rgba(220,229,216,.72)`,o.lineWidth=Math.max(1.5,e.width/800),o.stroke(),l(t),l(n)});else if(i===`shape`||i===`hairstyle`||i===`glasses`)c(t.faceOval,`#f4b783`,4,!0),[54,284,234,454,172,397].forEach(e=>l(e,`#dce5d8`));else if(i===`golden`)[[10,152],[234,454],[61,291],[98,327],[33,133],[133,362]].forEach(([e,t],n)=>{c([e,t],n%2?`#dce5d8`:`#f4b783`,3),l(e),l(t)});else if(i===`ratios`||i===`thirds`){let n=s(234).x,r=s(454).x;[s(10).y,(s(105).y+s(334).y)/2,s(2).y,s(152).y].forEach(t=>{o.beginPath(),o.moveTo(n,t),o.lineTo(r,t),o.strokeStyle=`#f4b783`,o.lineWidth=Math.max(2,e.width/650),o.stroke()}),c(t.faceOval,`rgba(220,229,216,.82)`,2,!0)}else if(i===`fifths`){let n=s(10).y,r=s(152).y,i=t.fifths.map(e=>s(e).x).sort((e,t)=>e-t);i.slice(0,-1).forEach((e,t)=>{o.fillStyle=t%2?`rgba(220,229,216,.20)`:`rgba(244,183,131,.22)`,o.fillRect(e,n,i[t+1]-e,r-n)}),i.forEach(t=>{o.beginPath(),o.moveTo(t,n),o.lineTo(t,r),o.strokeStyle=`#f4b783`,o.lineWidth=Math.max(2.5,e.width/480),o.stroke()}),c(t.leftEye,`rgba(220,229,216,.9)`,2.5,!0),c(t.rightEye,`rgba(220,229,216,.9)`,2.5,!0),c(t.faceOval,`rgba(220,229,216,.45)`,2,!0)}else if(i===`mask`){o.globalAlpha=a;let n=t.faceOval.map(e=>s(e)),r=Math.min(...n.map(e=>e.x)),i=Math.max(...n.map(e=>e.x)),c=Math.min(...n.map(e=>e.y)),l=Math.max(...n.map(e=>e.y)),u=i-r,d=l-c,f=2/(1+Math.sqrt(5)),p=(e,t,n,r,i)=>{o.beginPath(),o.moveTo(e,t),o.lineTo(n,r),o.strokeStyle=i,o.stroke()},m=Math.max(11,e.width/46),h=(e,t,n,r)=>{o.save(),o.shadowColor=`transparent`,o.fillStyle=`rgba(24,26,24,.62)`,o.beginPath(),o.roundRect(e,t,n,r,r/2.6),o.fill(),o.restore()},g=(t,n,r,i=`#fdfaf4`)=>{o.save(),o.font=`600 ${m}px ui-sans-serif, system-ui, -apple-system, sans-serif`,o.textBaseline=`middle`;let a=m*.42,s=o.measureText(t).width+a*2,c=m*1.56,l=m*.3,u=n+s>e.width-l?Math.max(l,Math.min(n-s-l,e.width-s-l)):Math.max(l,n),d=Math.min(Math.max(r-c/2,l),e.height-c-l);h(u,d,s,c),o.shadowColor=`transparent`,o.fillStyle=i,o.fillText(t,u+a,d+c/2),o.restore()},_=t=>{o.save(),o.font=`600 ${m}px ui-sans-serif, system-ui, -apple-system, sans-serif`,o.textBaseline=`middle`;let n=m*2.4,r=m*.55,i=m*1.7,a=n+r*2+Math.max(...t.map(e=>o.measureText(e[2]).width))+r*2,s=i*t.length+r,c=m*.8,l=e.height-s-m*.8;h(c,l,a,s),o.shadowColor=`transparent`,t.forEach(([e,t,a],s)=>{let u=l+r/2+i*(s+.5);o.setLineDash(t?[m*.42,m*.32]:[]),o.lineWidth=Math.max(2,m*.19),o.strokeStyle=e,o.beginPath(),o.moveTo(c+r,u),o.lineTo(c+r+n,u),o.stroke(),o.setLineDash([]),o.fillStyle=`#fdfaf4`,o.fillText(a,c+r*2+n,u)}),o.restore()};o.lineWidth=Math.max(2,e.width/640),o.strokeStyle=`#f4b783`,o.strokeRect(r,c,u,d),o.setLineDash([Math.max(7,e.width/110),Math.max(5,e.width/160)]),o.lineWidth=Math.max(1.6,e.width/820),[f,1-f].forEach(e=>{p(r+u*e,c,r+u*e,l,`#f4b783`),p(r,c+d*e,i,c+d*e,`#f4b783`),g(`φ`,r+u*e+m*.3,c-m*.2),g(`φ`,r-m*1.5,c+d*e)}),o.setLineDash([]);let v=(s(33).y+s(133).y+s(362).y+s(263).y)/4;o.lineWidth=Math.max(3,e.width/420),[[`Brow`,(s(105).y+s(334).y)/2],[`Eyes`,v],[`Nose`,s(2).y],[`Mouth`,s(13).y]].forEach(([e,t])=>{p(r,t,i,t,`#dce5d8`),g(e,i+m*.4,t)}),o.lineWidth=Math.max(2,e.width/640),o.setLineDash([Math.max(7,e.width/110),Math.max(5,e.width/160)]),p(r+u/2,c,r+u/2,l,`rgba(220,229,216,.8)`),o.setLineDash([]),_([[`#f4b783`,!0,`Golden section (φ)`],[`#dce5d8`,!1,`Your measured line`]])}else if(i===`midface`){let t=(s(33).y+s(133).y+s(362).y+s(263).y)/4;o.beginPath(),o.moveTo(s(234).x,t),o.lineTo(s(454).x,t),o.strokeStyle=`#f4b783`,o.lineWidth=Math.max(2,e.width/650),o.stroke(),c([33,263],`rgba(220,229,216,.8)`,2);let n=s(0);o.beginPath(),o.moveTo(s(234).x,n.y),o.lineTo(s(454).x,n.y),o.stroke(),o.beginPath(),o.moveTo(n.x,t),o.lineTo(n.x,n.y),o.strokeStyle=`#dce5d8`,o.stroke(),[33,133,362,263,0].forEach(e=>l(e))}else if(i===`fwhr`){let t=(s(105).y+s(334).y)/2,n=s(0).y,r=s(234).x,i=s(454).x;o.strokeStyle=`#f4b783`,o.lineWidth=Math.max(2,e.width/620),o.strokeRect(r,t,i-r,n-t),c([234,454],`#dce5d8`,3),[234,454,105,334,0].forEach(e=>l(e))}else if(i===`harmony`)c(t.faceOval,`#f4b783`,3,!0),c([10,168,1,2,152],`rgba(220,229,216,.85)`,2),t.symmetryPairs.forEach(([e,t])=>{c([e,t],`rgba(220,229,216,.45)`,1.5)}),[234,454,172,397,0].forEach(e=>l(e,`#dce5d8`));else if(i===`profile`)c([10,9,168,6,1,2,0,13,14,17,152],`#f4b783`,3),c([1,152],`rgba(220,229,216,.85)`,2),[172,397].forEach(e=>l(e,`#dce5d8`)),[1,152,0,17,168].forEach(e=>l(e));else if(i===`jawline`)c(t.jaw,`#f4b783`,5),t.jaw.forEach(e=>l(e,`#dce5d8`));else if(i===`eyes`||i===`canthal`)c(t.leftEye,`#f4b783`,4,!0),c(t.rightEye,`#f4b783`,4,!0),c([33,133],`#dce5d8`,2),c([362,263],`#dce5d8`,2),[33,133,362,263].forEach(e=>l(e));else{let n=t.faceOval.map(e=>s(e)),r=Math.min(...n.map(e=>e.x)),i=Math.max(...n.map(e=>e.x)),a=Math.min(...n.map(e=>e.y)),l=Math.max(...n.map(e=>e.y));o.strokeStyle=`#f4b783`,o.lineWidth=Math.max(3,e.width/520),o.strokeRect(r,a,i-r,l-a),c([33,263],`#dce5d8`,2)}o.restore()}function se(t){if(t.dataset.initialized===`true`)return;t.dataset.initialized=`true`;let f=t.dataset.toolKind,_=t.querySelector(`[data-photo-input]`),v=t.querySelector(`[data-drop-zone]`),y=t.querySelector(`[data-photo-canvas]`),b=t.querySelector(`[data-photo-shade]`),x=t.querySelector(`[data-upload-empty]`),S=t.querySelector(`[data-file-meta]`),C=t.querySelector(`[data-file-name]`),ee=t.querySelector(`[data-file-size]`),te=t.querySelector(`[data-adjust-face]`),T=t.querySelector(`[data-adult-consent]`),E=t.querySelector(`[data-analyze-button]`),D=t.querySelector(`[data-example-button]`),O=t.querySelector(`[data-tool-controls]`),k=t.querySelector(`[data-tool-loading]`),A=t.querySelector(`[data-loading-title]`),j=t.querySelector(`[data-loading-copy]`),re=t.querySelector(`[data-tool-error]`),M=t.querySelector(`[data-error-copy]`),N=t.querySelector(`[data-error-crop]`),se=t.querySelector(`[data-error-reset]`),L=t.querySelector(`[data-tool-results]`),R=t.querySelector(`[data-result-content]`),z=t.querySelector(`[data-download-button]`),B=t.querySelector(`[data-copy-button]`),ce=t.querySelector(`[data-reset-button]`),V=t.querySelector(`[data-mask-opacity]`),H=t.querySelector(`[data-mask-opacity-value]`),U=document.createElement(`canvas`),le=new h,W=(e,t={})=>{window.arfTrack?.(e,{tool:f,...t})},G=e=>e<8e3?`under_8s`:e<18e3?`8_to_18s`:`over_18s`,ue=e=>e.includes(`More than one face`)?`multiple_faces`:e.includes(`No clear face`)?`no_face`:e.includes(`profile`)||e.includes(`front-facing`)?`pose`:`runtime`,K=null,currentImage=null,de=`photo`,q=null,J=null,Y=null,X=null,fe=!1,modelLoaded=!1,Z=null;async function initModel(){try{let ml=t.querySelector(`#model-loading`)||document.getElementById(`model-loading`),ua=t.querySelector(`#upload-area`)||document.getElementById(`upload-area`);if(ml)ml.style.display=`block`;if(ua)ua.style.display=`none`;let start=performance.now();W(`model_download_start`);let mod=await import(`./face-landmarker.Oxpj_t18.js?v=2.0.1`).then(e=>e.n||e);let loader=mod.loadFaceLandmarker||mod.prepareFaceLandmarker;await loader(progress=>{let pct=Math.round((typeof progress===`number`?progress:1)*100),pt=t.querySelector(`#model-progress`)||document.getElementById(`model-progress`),pb=t.querySelector(`#model-progress-bar`)||document.getElementById(`model-progress-bar`);if(pt)pt.textContent=pct+`%`;if(pb)pb.value=pct});modelLoaded=!0,fe=!0;if(ml)ml.style.display=`none`;if(ua)ua.style.display=`block`;W(`model_download_complete`,{session_state:`ready`,duration_band:G(Math.round(performance.now()-start))})}catch(e){fe=!1;let ml=t.querySelector(`#model-loading`)||document.getElementById(`model-loading`);if(ml)ml.innerHTML=`<p>Model failed to load: ${e?.message||`Network error`} <button onclick="initModel()">Retry</button></p>`;W(`model_download_failed`)}}window.initModel=initModel;let pe=()=>{if(!modelLoaded)return initModel();return Promise.resolve()};initModel();let Q=e=>{O.classList.toggle(`hidden`,e!==`controls`),k.classList.toggle(`hidden`,e!==`loading`),re.classList.toggle(`hidden`,e!==`error`),L.classList.toggle(`hidden`,e!==`results`)},$=()=>{E.disabled=!(K&&T.checked)},me=()=>V?Number(V.value)/100:1,he=()=>p(y,U),ge=()=>{Y&&(u(U,Y),he())},ve=e=>{N.classList.toggle(`hidden`,!e),N.classList.toggle(`inline-flex`,e)},ye=(e,t=!1)=>{M.textContent=e,ve(t&&!!Y),Q(`error`)},runAnalysis=async()=>{if(!K)return;if(T&&!T.checked){T.checked=!0;$()}Q(`loading`);let t=performance.now();W(`analysis_start`),A.textContent=`Loading local face model…`,j.textContent=`The first run can take a moment. Your photo remains on this device.`;try{let{detectFaceLandmarks:r}=await l(async()=>{let{detectFaceLandmarks:e}=await import(`./face-landmarker.Oxpj_t18.js?v=2.0.1`).then(e=>e.n||e);return{detectFaceLandmarks:e}},__vite__mapDeps([0,1]));A.textContent=`Mapping visible landmarks…`,j.textContent=`Checking face count, pose, contour and photo quality.`,await new Promise(e=>requestAnimationFrame(()=>e()));let o=await r(U);if(!o||!o.faces||o.faces.length===0)throw new w(`No clear face was detected. Crop around one full face using the guide, or try a brighter, front-facing portrait.`);if(o.faces.length>1)throw new w(`More than one face was detected. Crop the photo to one consenting adult and try again.`);let s=m(U);if(!s)s={brightness:55,contrast:45,sharpness:80,width:U.width||640,height:U.height||480};if(Z=o.faces[0],oe(y,U,Z,f,me()),f===`profile`)J=ne(o.faces[0],s),R.innerHTML=ie(J);else if(q=e(o.faces[0],s),R.innerHTML=f!==`quality`&&q.quality.score<45?ae(q):P(f,q),q.quality.score>=45&&[`shape`,`hairstyle`,`glasses`].includes(f)){let e=i(a(q.shape.ranking,n(q),de));f===`shape`&&(R.insertAdjacentHTML(`beforeend`,`${de===`example`?`<p class="mt-4 text-sm font-semibold">This is the example portrait result.</p>`:``}${g(window.location.search)}`),e||R.insertAdjacentHTML(`beforeend`,`<p class="mt-3 text-sm">This browser blocked session storage. You can view this result here, but another tool will need a new analysis.</p>`))}Q(`results`),W(`analysis_success`,{duration_band:G(performance.now()-t),result_status:f!==`profile`&&q&&f!==`quality`&&q.quality.score<45?`withheld`:`complete`}),W(`result_view`),(f===`hairstyle`&&q&&q.quality.score>=45?document.querySelector(`[data-hairstyle-finder]`):f===`glasses`&&q&&q.quality.score>=45?document.querySelector(`[data-shared-glasses]`):L)?.scrollIntoView({behavior:`smooth`,block:`nearest`})}catch(e){let n=e instanceof Error?e.message:`The local model could not analyze this image. Please try another photo.`;M.textContent=n,ve(e instanceof w),Q(`error`),W(`analysis_failed`,{reason:ue(n),duration_band:G(performance.now()-t)})}},_e=async(e,rSrc)=>{if(!modelLoaded){let prog=(t.querySelector(`#model-progress`)||document.getElementById(`model-progress`))?.textContent||`0%`;window.arfToast?.(`Model still loading, please wait... `+prog);await initModel()}de=rSrc===`example`?`example`:`photo`,[`shape`,`hairstyle`,`glasses`].includes(f)&&r();let n=o(e);n&&W(`image_conversion_start`,{source:rSrc});let i=await d(e,{onStatus:()=>{A.textContent=`Converting HEIC/HEIF locally…`,j.textContent=`The decoder runs in this browser. Your original photo is not uploaded.`,Q(`loading`)}}).catch(e=>{throw n&&W(`image_conversion_failed`,{source:rSrc}),e});if(currentImage?.revoke)currentImage.revoke();if(currentImage?.objectUrl)URL.revokeObjectURL(currentImage.objectUrl);currentImage=i;s(Y),Y=i?.image;let a=i?.dimensions||(Y?{width:Y.naturalWidth||Y.width||640,height:Y.naturalHeight||Y.height||480}:{width:640,height:480});let aw=a?.width||640,ah=a?.height||480;K=i?.file||e,q=null,J=null,X=null,ge(),C.textContent=e.name,ee.textContent=`${i?.convertedFromHeic?`HEIC converted locally · `:``}${(e.size/1024/1024).toFixed(1)} MB · ${aw} × ${ah}`,x.classList.add(`hidden`),y.classList.remove(`hidden`),b.classList.remove(`hidden`),S.classList.remove(`hidden`),S.classList.add(`flex`);if(T&&!T.checked)T.checked=!0;Q(`controls`),$(),W(`image_selected`,{source:rSrc,input_format:i.convertedFromHeic?`heic_converted`:`browser_native`}),i.convertedFromHeic&&W(`image_conversion_complete`,{source:rSrc});await runAnalysis()},be=async()=>{if(!Y)return;let e=(typeof c==="function"?c(Y):null)||{width:Y?.naturalWidth||Y?.width||640,height:Y?.naturalHeight||Y?.height||480};let ew=e?.width||Y?.naturalWidth||Y?.width||640,eh=e?.height||Y?.naturalHeight||Y?.height||480;let t=await le.open({source:Y,sourceWidth:ew,sourceHeight:eh,initialState:X});if(!t)return;U.width=t.canvas?.width||ew,U.height=t.canvas?.height||eh;let n=U.getContext(`2d`);if(!n){ye(`This browser could not prepare the cropped photo.`);return}n.drawImage(t.canvas,0,0),X=t.state,q=null,J=null,he(),ee.textContent=`Custom face crop · ${t.sourceWidth} × ${t.sourceHeight}`,R.replaceChildren(),N.classList.add(`hidden`),N.classList.remove(`inline-flex`),Q(`controls`),$(),W(`image_cropped`);await runAnalysis()};_.addEventListener(`change`,async()=>{let e=_.files?.[0];if(e)try{await _e(e,`picker`)}catch(e){ye(e instanceof Error?e.message:`Choose a different image.`),W(`image_validation_failed`,{source:`picker`})}}),T.addEventListener(`change`,$),te.addEventListener(`click`,be),N.addEventListener(`click`,be),[`dragenter`,`dragover`].forEach(e=>{v.addEventListener(e,e=>{e.preventDefault(),v.classList.add(`border-coral`,`bg-coral-soft/30`)})}),[`dragleave`,`drop`].forEach(e=>{v.addEventListener(e,e=>{e.preventDefault(),v.classList.remove(`border-coral`,`bg-coral-soft/30`)})}),v.addEventListener(`drop`,async e=>{let t=e.dataTransfer?.files?.[0];if(t)try{await _e(t,`drop`)}catch(e){ye(e instanceof Error?e.message:`Choose a different image.`),W(`image_validation_failed`,{source:`drop`})}}),D.addEventListener(`click`,async()=>{D.disabled=!0;try{let e=await fetch(`/assets/example-portrait.jpg`);if(!e.ok)throw Error(`The example image could not be loaded.`);let t=await e.blob();await _e(new File([t],`example-adult-portrait.jpg`,{type:`image/jpeg`}),`example`)}catch(e){ye(e instanceof Error?e.message:`The example image could not be loaded.`)}finally{D.disabled=!1}}),E.addEventListener(`click`,runAnalysis);let xe=()=>{[`shape`,`hairstyle`,`glasses`].includes(f)&&r();if(currentImage?.revoke)currentImage.revoke();if(currentImage?.objectUrl)URL.revokeObjectURL(currentImage.objectUrl);currentImage=null;s(Y),Y=null,K=null,q=null,Z=null,J=null,X=null,_.value=``,T.checked=!1,y.width=0,y.height=0,y.classList.add(`hidden`),b.classList.add(`hidden`),S.classList.add(`hidden`),S.classList.remove(`flex`),x.classList.remove(`hidden`),R.replaceChildren(),Q(`controls`),$(),t.scrollIntoView({behavior:`smooth`,block:`start`})};window.addEventListener(`arf:reset-local-photo`,xe),ce.addEventListener(`click`,xe),se.addEventListener(`click`,xe),V?.addEventListener(`input`,()=>{H&&(H.textContent=`${V.value}%`),!(!Z||!y.width)&&oe(y,U,Z,f,me())}),z.addEventListener(`click`,()=>{!(q||J)||!y.width||y.toBlob(e=>{if(!e)return;let t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`tool-genie-${f}-overlay.png`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3),W(`result_download`,{format:`overlay`})},`image/png`)}),B.addEventListener(`click`,async()=>{let e=J?I(J):q&&F(f,q);if(e)try{await navigator.clipboard.writeText(e);let t=B.textContent;B.textContent=`Copied`,setTimeout(()=>{B.textContent=t},1500),W(`result_share`,{method:`clipboard`})}catch{B.textContent=`Copy unavailable`}})}document.querySelectorAll(`[data-local-face-tool]`).forEach(se);