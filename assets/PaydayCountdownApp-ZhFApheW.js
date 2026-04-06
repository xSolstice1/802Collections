import{c as f,j as e,D}from"./index-fPyjbNJy.js";import{r as i}from"./vendor-DJG0Mpis.js";import"./zustand-DJP8-8FP.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=f("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=f("PartyPopper",[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"hbicv8"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",key:"1i94pl"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",key:"1cofks"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]]),x=(t,l)=>{const n=new Date(t,l,27),o=n.getDay();return o===6&&n.setDate(26),o===0&&n.setDate(25),n},y=t=>{let l=x(t.getFullYear(),t.getMonth());if(t>l){const n=t.getMonth()+1;l=x(n>11?t.getFullYear()+1:t.getFullYear(),n>11?0:n)}return l},g=t=>t.toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"}),F=()=>{const[t,l]=i.useState(()=>new Date),[n,o]=i.useState(!1);i.useEffect(()=>{const a=setInterval(()=>l(new Date),1e3);return()=>clearInterval(a)},[]);const r=y(t),m=t.getFullYear()===r.getFullYear()&&t.getMonth()===r.getMonth()&&t.getDate()===r.getDate();i.useEffect(()=>{o(m)},[m]);const u=r.getTime()-t.getTime(),c=Math.max(0,Math.floor(u/1e3)),j=Math.floor(c/86400),b=Math.floor(c%86400/3600),N=Math.floor(c%3600/60),k=c%60,h=[];let d=new Date(t);for(let a=0;a<3;a++){const s=y(d);h.push(s),d=new Date(s),d.setDate(d.getDate()+1)}return e.jsxs("div",{className:"max-w-2xl mx-auto space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2 bg-802/10 rounded-lg",children:e.jsx(D,{className:"w-6 h-6 text-802"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-white",children:"Payday Countdown"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Counting down to the 27th (or nearest Friday)"})]})]}),e.jsxs("div",{className:"card p-8 relative overflow-hidden",children:[n&&e.jsx("div",{className:"absolute inset-0 pointer-events-none",children:[...Array(24)].map((a,s)=>e.jsx("div",{className:"absolute w-1.5 h-1.5 rounded-full",style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,backgroundColor:["#44D62C","#fbbf24","#60a5fa","#f472b6"][s%4],animation:`confetti-fall ${2+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite`}},s))}),e.jsx("div",{className:"text-center",children:n?e.jsxs(e.Fragment,{children:[e.jsx(S,{className:"w-12 h-12 text-802 mx-auto mb-4 animate-bounce"}),e.jsx("h2",{className:"payday-text text-4xl sm:text-5xl font-black mb-3",children:"IT'S PAYDAY!"}),e.jsx("p",{className:"text-gray-400 text-lg",children:"Time to treat yourself"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-gray-500 mb-6 uppercase tracking-wider",children:"Next payday in"}),e.jsxs("div",{className:"flex items-center justify-center gap-3 sm:gap-4",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums",children:j.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500 mt-2 uppercase tracking-wider",children:"Days"})]}),e.jsx("span",{className:"text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6",children:":"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums",children:b.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500 mt-2 uppercase tracking-wider",children:"Hours"})]}),e.jsx("span",{className:"text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6",children:":"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums",children:N.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500 mt-2 uppercase tracking-wider",children:"Mins"})]}),e.jsx("span",{className:"text-4xl sm:text-5xl font-mono font-bold text-802/40 -mt-6",children:":"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-5xl sm:text-6xl font-mono font-bold text-802 text-glow tabular-nums",children:k.toString().padStart(2,"0")}),e.jsx("span",{className:"text-xs text-gray-500 mt-2 uppercase tracking-wider",children:"Secs"})]})]}),e.jsxs("div",{className:"mt-6 pt-4 border-t border-gray-800",children:[e.jsxs("p",{className:"text-gray-400",children:[e.jsx(p,{className:"w-4 h-4 inline-block mr-1.5 -mt-0.5 text-802"}),g(r)]}),r.getDate()!==27&&e.jsx("p",{className:"text-xs text-gray-600 mt-1",children:"27th falls on a weekend — adjusted to Friday"})]})]})})]}),!n&&e.jsxs("div",{className:"card p-5",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-500 mb-2",children:[e.jsx("span",{children:"Last payday"}),e.jsx("span",{children:"Next payday"})]}),(()=>{const a=new Date(r);a.setDate(a.getDate()-1);const s=x(a.getMonth()===0?a.getFullYear()-1:a.getFullYear(),a.getMonth()===0?11:a.getMonth()-1),w=r.getTime()-s.getTime(),v=t.getTime()-s.getTime(),M=Math.min(100,Math.max(0,v/w*100));return e.jsx("div",{className:"w-full bg-gray-800 rounded-full h-3 overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full transition-all duration-1000 ease-out",style:{width:`${M}%`,background:"linear-gradient(90deg, #44D62C, #6ae04a)",boxShadow:"0 0 12px rgba(68, 214, 44, 0.5)"}})})})()]}),e.jsxs("div",{className:"card p-5",children:[e.jsx("h2",{className:"text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider",children:"Upcoming Paydays"}),e.jsx("div",{className:"space-y-3",children:h.map((a,s)=>e.jsxs("div",{className:`flex items-center justify-between py-2 px-3 rounded-lg ${s===0?"bg-802/10 border border-802/20":"bg-gray-900/50"}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(p,{className:`w-4 h-4 ${s===0?"text-802":"text-gray-600"}`}),e.jsx("span",{className:s===0?"text-white font-medium":"text-gray-400",children:g(a)})]}),a.getDate()!==27&&e.jsx("span",{className:"text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded",children:"Adjusted"}),s===0&&e.jsx("span",{className:"text-xs text-802 font-medium",children:"Next"})]},s))})]}),e.jsx("p",{className:"text-center text-xs text-gray-600",children:"Based on your local time. Payday is the 27th, adjusted to Friday if it falls on a weekend."}),e.jsx("style",{children:`
        @keyframes confetti-fall {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.8;
          }
          25% {
            transform: translateY(-20px) rotate(90deg) scale(1.5);
            opacity: 1;
          }
          50% {
            transform: translateY(10px) rotate(180deg) scale(1);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) rotate(270deg) scale(1.3);
            opacity: 1;
          }
        }
        .payday-text {
          background: linear-gradient(135deg, #44D62C, #6ae04a, #fbbf24, #6ae04a, #44D62C);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: paydayShimmer 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(68, 214, 44, 0.6));
        }
        @keyframes paydayShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `})]})};export{F as default};
//# sourceMappingURL=PaydayCountdownApp-ZhFApheW.js.map
