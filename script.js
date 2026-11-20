/* Налаштування: вставте справжнє платіжне посилання замість порожнього рядка. */
const VIP_PAYMENT_URL = "";
const TIMER_KEY = 'b1_december_2026_countdown_end';
const TIMER_DURATION = 5 * 60 * 1000;

function getEndTime(){
  let saved;
  try { saved = Number(localStorage.getItem(TIMER_KEY)); } catch(e) {}
  if (Number.isFinite(saved) && saved > 0) return saved;
  const end = Date.now() + TIMER_DURATION;
  try { localStorage.setItem(TIMER_KEY, String(end)); } catch(e) {}
  return end;
}
const endTime = getEndTime();
function updateCountdown(){
  const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
  const mins = String(Math.floor(remaining/60)).padStart(2,'0');
  const secs = String(remaining%60).padStart(2,'0');
  document.querySelectorAll('[data-timer]').forEach(el=>{el.textContent=`${mins}:${secs}`});
  if (remaining === 0) {
    document.querySelectorAll('.countdown-label,.timer-caption').forEach(el=>{el.textContent='Відлік завершено'});
    clearInterval(interval);
  }
}
const interval = setInterval(updateCountdown, 500);
updateCountdown();

const free = document.querySelector('#free-register');
if(free) free.addEventListener('click', ()=>{
  if (typeof fbq === 'function') fbq('track','Lead',{content_name:'B1 December free registration'});
});
const vip = document.querySelector('#vip-register');
if(vip){
  if(VIP_PAYMENT_URL && /^https:\/\//i.test(VIP_PAYMENT_URL)){
    vip.href = VIP_PAYMENT_URL;
    document.querySelector('#vip-hint').textContent='Безпечний перехід на сторінку оплати';
    vip.addEventListener('click',()=>{
      if(typeof fbq === 'function') fbq('track','InitiateCheckout',{value:19,currency:'PLN',content_name:'B1 December VIP'});
    });
  } else {
    vip.addEventListener('click',(e)=>{
      e.preventDefault();
      alert('VIP-оплата ще не підключена. Додайте посилання на оплату в script.js перед запуском реклами.');
    });
  }
}
