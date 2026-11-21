/* Посилання на VIP-оплату Softbook. */
const VIP_PAYMENT_URL = "https://iramelnyk91gmailcom.lms.softbook.app/shop/item/13858";
// Новий відлік 5 хвилин при кожному відкритті або оновленні сторінки.
// Нічого не записуємо у localStorage чи cookies.
const TIMER_DURATION = 5 * 60 * 1000;
const endTime = Date.now() + TIMER_DURATION;

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
