function el(id){ return document.getElementById(id); }

window.addEventListener('DOMContentLoaded', ()=>{
  // Chat widget
  const launcher = el('chat-launcher');
  const chat = el('chatbox');
  const closeBtn = el('chat-close');
  const form = el('chat-form');
  const field = el('chat-field');
  const messages = el('chat-messages');

  function addMsg(text, who){
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  launcher?.addEventListener('click', ()=>{
    chat.classList.toggle('hidden');
    if(!chat.classList.contains('hidden')){
      messages.innerHTML = '';
      addMsg('Hi! I can help with calories, macros, supplements, or training tips. Try asking: "How many calories to lose fat?"','bot');
      field.focus();
    }
  });
  closeBtn?.addEventListener('click', ()=> chat.classList.add('hidden'));

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = field.value.trim();
    if(!q) return;
    addMsg(q,'user');
    field.value = '';

    // Very simple scripted replies
    const lower = q.toLowerCase();
    if(lower.includes('calorie') || lower.includes('deficit')){
      addMsg('A sustainable fat‑loss target is ~20% below your TDEE. Use the calculator above, then aim for ≥1.8 g/kg protein and 8–10k steps/day.','bot');
    } else if(lower.includes('protein')){
      addMsg('Aim 1.6–2.2 g/kg/day, split across 3–5 meals (20–40 g each). Post‑workout protein helps, total per day matters most.','bot');
    } else if(lower.includes('creatine')){
      addMsg('Use 3–5 g/day creatine monohydrate. No cycling required. Small water gain is normal; strength benefits in ~2–4 weeks.','bot');
    } else if(lower.includes('sleep')){
      addMsg('Protect 7–9 h, fixed wake time, morning light, cool dark room, and limit late caffeine/alcohol for better recovery.','bot');
    } else if(lower.includes('supplement')){
      addMsg('Core stack for most: whey/casein, creatine, vitamin D if deficient, omega‑3. Tailor around your body type section below.','bot');
    } else {
      addMsg('Got it! For a personalized plan, use the tools above and tell me your goal (lose, maintain, or gain).','bot');
    }
  });
});