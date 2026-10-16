
document.addEventListener('DOMContentLoaded',function(){
  // mobile nav
  var b=document.querySelector('.burger'),n=document.querySelector('.nav-links');
  if(b&&n){b.addEventListener('click',function(){n.classList.toggle('open')});
    n.addEventListener('click',function(e){if(e.target.tagName==='A')n.classList.remove('open')});}
  // scroll reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  // faq
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){q.parentElement.classList.toggle('open')})});
  // counters
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){animCount(e.target);cio.unobserve(e.target)}})},{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el)});
  function animCount(el){var t=+el.dataset.count,d=1200,s=null;
    function f(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1);
      el.textContent=Math.round(t*(1-Math.pow(1-p,3))).toLocaleString()+(el.dataset.suffix||'');
      if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
});
