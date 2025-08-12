function clampNumber(value, min, max){ if(isNaN(value)) return NaN; return Math.min(Math.max(value, min), max); }

function calculateBmrMifflin({sex, weightKg, heightCm, age}){
  if(sex === 'male') return 10*weightKg + 6.25*heightCm - 5*age + 5;
  return 10*weightKg + 6.25*heightCm - 5*age - 161;
}

function adjustCaloriesForGoal(tdee, goal){
  if(goal === 'lose') return Math.round(tdee * 0.8);
  if(goal === 'gain') return Math.round(tdee * 1.1);
  return Math.round(tdee);
}

function macroSplitPercentages(split){
  switch(split){
    case 'highProtein': return {p:0.35, c:0.35, f:0.30};
    case 'lowCarb': return {p:0.35, c:0.25, f:0.40};
    case 'highCarb': return {p:0.25, c:0.50, f:0.25};
    default: return {p:0.30, c:0.40, f:0.30};
  }
}

function gramsFromCalories(calories, percents){
  const protein = Math.round((calories * percents.p) / 4);
  const carbs = Math.round((calories * percents.c) / 4);
  const fats = Math.round((calories * percents.f) / 9);
  return {protein, carbs, fats};
}

function formatKcals(kcals){ return kcals.toLocaleString(); }

function calculateBmi(weightKg, heightCm){
  const h = heightCm/100; if(h<=0) return NaN; return +(weightKg/(h*h)).toFixed(1);
}

function classifyBmi(bmi){
  if(isNaN(bmi)) return '—';
  if(bmi < 18.5) return 'Underweight';
  if(bmi < 25) return 'Normal';
  if(bmi < 30) return 'Overweight';
  return 'Obese';
}

function calculateBodyFat({sex, heightCm, neckCm, waistCm, hipCm}){
  // US Navy Method
  const log10 = (n)=>Math.log(n)/Math.log(10);
  const h = heightCm;
  if(sex === 'male'){
    const bf = 495/(1.0324 - 0.19077*log10(waistCm - neckCm) + 0.15456*log10(h)) - 450;
    return +bf.toFixed(1);
  } else {
    if(!hipCm || hipCm <= 0) return NaN;
    const bf = 495/(1.29579 - 0.35004*log10(waistCm + hipCm - neckCm) + 0.22100*log10(h)) - 450;
    return +bf.toFixed(1);
  }
}

function bodyFatCategory(sex, bf){
  if(isNaN(bf)) return '—';
  const table = sex === 'male'
    ? [{max:5,cat:'Essential'},{max:13,cat:'Athletes'},{max:17,cat:'Fitness'},{max:24,cat:'Average'},{max:100,cat:'Obese'}]
    : [{max:13,cat:'Essential'},{max:20,cat:'Athletes'},{max:24,cat:'Fitness'},{max:31,cat:'Average'},{max:100,cat:'Obese'}];
  return table.find(x=>bf<=x.max)?.cat || '—';
}

function waistToHeight(waistCm, heightCm){
  if(!waistCm || !heightCm) return NaN;
  return +((waistCm/heightCm)).toFixed(2);
}

function cooperVo2FromDistance(meters){ // 12-min Cooper test estimate (ml/kg/min)
  if(!meters) return NaN;
  return +(((meters - 504.9) / 44.73)).toFixed(1);
}

function assessRhr(rhr){
  if(!rhr) return '—';
  if(rhr < 55) return 'Excellent';
  if(rhr <= 65) return 'Good';
  if(rhr <= 75) return 'Average';
  return 'Below average';
}

function assessPushups(count){
  if(count>=50) return 'Excellent';
  if(count>=35) return 'Good';
  if(count>=20) return 'Average';
  return 'Needs work';
}

function assessPlank(seconds){
  if(seconds>=150) return 'Excellent';
  if(seconds>=90) return 'Good';
  if(seconds>=45) return 'Average';
  return 'Needs work';
}

function renderTdeeResult(outEl, data){
  const {bmr, tdee, targetCalories, macros, goal, somatotype} = data;
  outEl.innerHTML = `
    <div class="grid three">
      <div><strong>BMR</strong><div>${formatKcals(Math.round(bmr))} kcal</div></div>
      <div><strong>TDEE</strong><div>${formatKcals(Math.round(tdee))} kcal</div></div>
      <div><strong>Target</strong><div>${formatKcals(targetCalories)} kcal (${goal})</div></div>
    </div>
    <div class="grid three mt">
      <div><strong>Protein</strong><div>${macros.protein} g</div></div>
      <div><strong>Carbs</strong><div>${macros.carbs} g</div></div>
      <div><strong>Fats</strong><div>${macros.fats} g</div></div>
    </div>
    <p class="muted mt">Tip for ${somatotype === 'ecto' ? 'ectomorphs: add calorie-dense snacks' : somatotype === 'endo' ? 'endomorphs: prioritize protein and fiber for satiety' : 'mesomorphs: aim for consistency across the week'}.</p>
  `;
  outEl.classList.remove('hidden');
}

function renderCompositionResult(outEl, data){
  const {bmi, bmiClass, bf, bfCat, wthr} = data;
  outEl.innerHTML = `
    <div class="grid three">
      <div><strong>BMI</strong><div>${isNaN(bmi)?'—':bmi} (${bmiClass})</div></div>
      <div><strong>Body Fat %</strong><div>${isNaN(bf)?'—':bf}% (${bfCat})</div></div>
      <div><strong>Waist/Height</strong><div>${isNaN(wthr)?'—':wthr}</div></div>
    </div>
    <p class="muted mt">General ranges only; body composition beats BMI for trained individuals.</p>
  `;
  outEl.classList.remove('hidden');
}

function renderMarkersResult(outEl, data){
  const {rhrGrade, wthr, vo2, pushupsGrade, plankGrade} = data;
  outEl.innerHTML = `
    <div class="grid three">
      <div><strong>Resting HR</strong><div>${rhrGrade}</div></div>
      <div><strong>Waist/Height</strong><div>${isNaN(wthr)?'—':wthr}</div></div>
      <div><strong>VO₂max (est)</strong><div>${isNaN(vo2)?'—':vo2}</div></div>
    </div>
    <div class="grid three mt">
      <div><strong>Push‑ups</strong><div>${pushupsGrade}</div></div>
      <div><strong>Plank</strong><div>${plankGrade}</div></div>
      <div><strong>Tip</strong><div>${(pushupsGrade==='Needs work'||plankGrade==='Needs work')?'Start with 2×/week full‑body strength and progressive overload.':'Keep going – consider periodization for continued gains.'}</div></div>
    </div>
  `;
  outEl.classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', ()=>{
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  const tdeeForm = document.getElementById('tdee-form');
  const tdeeOut = document.getElementById('tdee-result');
  tdeeForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const age = +document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const heightCm = +document.getElementById('heightCm').value;
    const weightKg = +document.getElementById('weightKg').value;
    const activity = +document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const somatotype = document.getElementById('somatotype').value;
    const macroSplit = document.getElementById('macroSplit').value;

    const bmr = calculateBmrMifflin({sex, weightKg, heightCm, age});
    const tdee = bmr * activity;
    let targetCalories = adjustCaloriesForGoal(tdee, goal);

    // Gentle tweak based on body type
    if(somatotype==='ecto' && goal==='gain') targetCalories += 150;
    if(somatotype==='endo' && goal==='lose') targetCalories -= 150;

    const macros = gramsFromCalories(targetCalories, macroSplitPercentages(macroSplit));
    renderTdeeResult(tdeeOut, {bmr, tdee, targetCalories, macros, goal, somatotype});
  });

  const compForm = document.getElementById('composition-form');
  const compOut = document.getElementById('composition-result');
  compForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const sex = document.getElementById('cSex').value;
    const heightCm = +document.getElementById('cHeightCm').value;
    const weightKg = +document.getElementById('cWeightKg').value;
    const neckCm = +document.getElementById('neckCm').value;
    const waistCm = +document.getElementById('waistCm').value;
    const hipInput = document.getElementById('hipCm').value;
    const hipCm = hipInput? +hipInput : 0;

    const bmi = calculateBmi(weightKg, heightCm);
    const bmiClass = classifyBmi(bmi);
    const bf = calculateBodyFat({sex, heightCm, neckCm, waistCm, hipCm});
    const bfCat = bodyFatCategory(sex, bf);
    const wthr = waistToHeight(waistCm, heightCm);

    renderCompositionResult(compOut, {bmi, bmiClass, bf, bfCat, wthr});
  });

  const markersForm = document.getElementById('markers-form');
  const markersOut = document.getElementById('markers-result');
  markersForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const rhr = +document.getElementById('rhr').value;
    const wthrInput = document.getElementById('wthr').value;
    const vo2Input = document.getElementById('vo2').value;
    const pushups = +document.getElementById('pushups').value;
    const plank = +document.getElementById('plank').value;
    const cooper = document.getElementById('cooper').value ? +document.getElementById('cooper').value : 0;

    const rhrGrade = assessRhr(rhr);
    const vo2 = vo2Input? +vo2Input : cooper ? cooperVo2FromDistance(cooper) : NaN;
    const pushupsGrade = assessPushups(pushups);
    const plankGrade = assessPlank(plank);
    const wthr = wthrInput? +wthrInput : NaN;

    renderMarkersResult(markersOut, {rhrGrade, wthr, vo2, pushupsGrade, plankGrade});
  });
});