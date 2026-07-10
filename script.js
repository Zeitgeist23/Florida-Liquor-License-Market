const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelectorAll('[data-intent]').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById('intent').value=button.dataset.intent;
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}));

document.getElementById('leadForm').addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const subject=`FLLM Inquiry: ${data.get('intent') || 'General inquiry'}`;
  const body=[
    'Florida Liquor License Market Inquiry','',
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Inquiry type: ${data.get('intent')}`,
    `County: ${data.get('county') || 'Not specified'}`,
    `License type: ${data.get('licenseType') || 'Not specified'}`,'',
    'Details:',data.get('message')
  ].join('\n');
  const mailto=`mailto:JWigg023@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('formStatus').textContent='Your email application is opening. Review the message and press Send.';
  window.location.href=mailto;
});
