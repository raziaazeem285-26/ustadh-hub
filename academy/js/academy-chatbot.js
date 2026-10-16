
(function(){
var WA='923440325566';
var msgs=document.getElementById('ac-chat-msgs');
function add(t,who){var d=document.createElement('div');d.className='msg '+who;d.innerHTML=t;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function waLink(text){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(text)}
var BRAIN=[
 {k:['fee','price','cost','pricing','charges','kitni','paisay'],
  a:'Our plans (per month):<br>• 2 classes/week — affordable starter<br>• 3 classes/week — <b>most popular</b><br>• 5 classes/week — fastest progress<br>Plus <b>10% sibling discount</b> and a <b>3-day FREE trial</b>! Exact prices are on our <a href="pricing.html">Pricing page</a>.<br><br><a href="'+waLink('Assalamualaikum! I want to know the fee details for Quran classes.')+'">Chat on WhatsApp →</a>'},
 {k:['trial','free','demo'],
  a:'Yes! We offer a <b>3-day FREE trial</b> — no card needed. <a href="free-trial.html">Book your free trial here</a> or <a href="'+waLink('Assalamualaikum! I want to book a FREE trial class.')+'">WhatsApp us →</a>'},
 {k:['course','quran','qaida','hifz','tajweed','nazra','namaz','dua','islamic studies','arabic'],
  a:'We offer 7 courses:<br>1. Noorani Qaida<br>2. Nazra Quran<br>3. Hifz-ul-Quran<br>4. Tajweed-ul-Quran<br>5. Islamic Studies for Kids<br>6. Namaz & Masnoon Duas<br>7. Quran Translation<br><a href="courses.html">See all courses →</a>'},
 {k:['teacher','tutor','male','female','lady','qaria'],
  a:'We have <b>both male and female</b> qualified teachers — many parents choose a female teacher for their daughters. <a href="teachers.html">Meet our teachers →</a> or <a href="'+waLink('Assalamualaikum! I want a female Quran teacher for my daughter.')+'">request on WhatsApp →</a>'},
 {k:['time','schedule','timing','slot','when'],
  a:'Classes run <b>7 days a week</b> with flexible slots — UK/USA evenings and Australia afternoons. We will match a time that suits your family. <a href="'+waLink('Assalamualaikum! I want to discuss class timings.')+'">Discuss on WhatsApp →</a>'},
 {k:['salam','assalam','hello','hi','hey'],
  a:'Walaikum Assalam! Welcome to Razia Azeem Academy. How can I help — <b>courses</b>, <b>fees</b>, <b>free trial</b>, or <b>teachers</b>?'},
 {k:['discount','offer','sibling'],
  a:'Yes! <b>10% sibling discount</b> on every additional child, plus a <b>3-day FREE trial</b> for every new student. <a href="pricing.html">See pricing →</a>'},
 {k:['where','country','uk','usa','australia','location'],
  a:'We teach students in the <b>UK, USA and Australia</b> — live one-on-one online. <a href="uk.html">UK</a> · <a href="usa.html">USA</a> · <a href="australia.html">Australia</a>'},
];
function reply(q){
  q=q.toLowerCase();
  for(var i=0;i<BRAIN.length;i++){
    for(var j=0;j<BRAIN[i].k.length;j++){
      if(q.indexOf(BRAIN[i].k[j])!==-1){add(BRAIN[i].a,'bot');return}
    }
  }
  add('I can help with <b>courses</b>, <b>fees</b>, <b>free trial</b> or <b>teachers</b>. Or <a href="'+waLink('Assalamualaikum! I have a question about Razia Azeem Academy.')+'">ask us on WhatsApp →</a>','bot');
}
document.addEventListener('DOMContentLoaded',function(){
  var fab=document.getElementById('ac-chat-fab'),box=document.getElementById('ac-chat-box');
  if(!fab)return;
  fab.addEventListener('click',function(){box.classList.toggle('open');
    if(box.classList.contains('open')&&!msgs.children.length)
      add('Assalamualaikum! Welcome to <b>Razia Azeem Academy</b>. Ask me about courses, fees, free trial or teachers.','bot')});
  document.querySelectorAll('#ac-chat-quick button').forEach(function(btn){
    btn.addEventListener('click',function(){add(btn.textContent,'user');reply(btn.textContent)})});
  var inp=document.getElementById('ac-chat-in');
  function send(){var v=inp.value.trim();if(!v)return;add(v.replace(/</g,'&lt;'),'user');inp.value='';reply(v)}
  document.getElementById('ac-chat-send').addEventListener('click',send);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')send()});
});
})();
