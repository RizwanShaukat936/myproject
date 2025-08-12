const SUPPS = {
  ecto: {
    title: 'Ectomorph supplement & diet tips',
    bullets: [
      'Whey protein isolate or concentrate (20–30 g post‑workout)',
      'Creatine monohydrate (3–5 g daily, no cycling needed)',
      'Mass gainer only if appetite is low; prefer real food first',
      'Omega‑3 fish oil (1–2 g EPA+DHA/day) for recovery',
      'Spread calories across 4–6 meals; add liquids like smoothies'
    ],
    links: [
      {label:'Whey Protein', href:'https://www.amazon.com/s?k=whey+protein&tag=YOURTAG-20'},
      {label:'Creatine Monohydrate', href:'https://www.amazon.com/s?k=creatine+monohydrate&tag=YOURTAG-20'},
      {label:'Omega‑3 Fish Oil', href:'https://www.amazon.com/s?k=omega+3+fish+oil&tag=YOURTAG-20'}
    ]
  },
  meso: {
    title: 'Mesomorph supplement & diet tips',
    bullets: [
      'Whey or casein (20–30 g); casein before bed if desired',
      'Creatine monohydrate (3–5 g daily)',
      'Electrolytes for high‑volume training (sodium/potassium)',
      'Caffeine/pre‑workout as needed; prioritize sleep first',
      'Aim 1.6–2.2 g/kg protein; periodize carbs with training days'
    ],
    links: [
      {label:'Micellar Casein', href:'https://www.amazon.com/s?k=micellar+casein&tag=YOURTAG-20'},
      {label:'Electrolyte Powder', href:'https://www.amazon.com/s?k=electrolyte+powder&tag=YOURTAG-20'}
    ]
  },
  endo: {
    title: 'Endomorph supplement & diet tips',
    bullets: [
      'Whey protein or low‑calorie protein shakes to boost satiety',
      'Fiber supplement (psyllium husk) if fiber is below 25–35 g/day',
      'Green tea or coffee for mild thermogenic support',
      'Creatine for strength; manage water weight expectations',
      'High‑protein, high‑produce diet; daily step goal > 8,000'
    ],
    links: [
      {label:'Psyllium Husk', href:'https://www.amazon.com/s?k=psyllium+husk&tag=YOURTAG-20'},
      {label:'Whey Protein (Low Cal)', href:'https://www.amazon.com/s?k=low+calorie+whey+protein&tag=YOURTAG-20'}
    ]
  }
};

const ASK_TOPICS = [
  {key:'bmi', label:'Is my BMI healthy?', answer:'BMI is a rough screen. If you train, use body fat %, waist‑to‑height, and performance instead.'},
  {key:'protein', label:'How much protein?', answer:'Aim ~1.6–2.2 g/kg body weight daily. Distribute across 3–5 meals of 20–40 g each.'},
  {key:'cardio', label:'Cardio for fat loss?', answer:'Combine 2–3×/week resistance training with 6–10k steps/day and add 2× Zone 2 or intervals as needed.'},
  {key:'creatine', label:'Is creatine safe?', answer:'Creatine monohydrate is well‑studied and safe for healthy adults at 3–5 g/day. Stay hydrated.'},
  {key:'sleep', label:'Optimize sleep', answer:'Fixed wake time, morning light, 7–9 h, cool dark room, avoid late caffeine, and wind‑down routine.'},
  {key:'recomp', label:'Lose fat & gain muscle?', answer:'Possible for beginners/returners with high protein, progressive overload, and slight calorie deficit.'}
];

window.addEventListener('DOMContentLoaded', ()=>{
  // Body type suggestion buttons
  document.querySelectorAll('.card.bodytype button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.dataset.type;
      const conf = SUPPS[type];
      const out = document.getElementById(`out-${type}`);
      if(!conf || !out) return;
      out.innerHTML = `
        <div><strong>${conf.title}</strong></div>
        <ul>${conf.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
        <div class="chips mt">${conf.links.map(l=>`<a class="chip" target="_blank" rel="nofollow sponsored" href="${l.href}">${l.label}</a>`).join('')}</div>
      `;
    });
  });

  // Ask assistant chips
  const chipsEl = document.getElementById('ask-chips');
  const outputEl = document.getElementById('ask-output');
  if(chipsEl && outputEl){
    ASK_TOPICS.forEach(t=>{
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = t.label;
      btn.addEventListener('click', ()=>{
        outputEl.innerHTML = `<strong>${t.label}</strong><p>${t.answer}</p>`;
      });
      chipsEl.appendChild(btn);
    });
  }
});