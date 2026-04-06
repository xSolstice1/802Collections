import{c as G,j as e,d as L}from"./index-7mpmORwh.js";import{r as a}from"./vendor-DJG0Mpis.js";import{P as F}from"./play-2GKn8ooP.js";import{R as H}from"./rotate-ccw-BqQLvNp8.js";import"./zustand-DJP8-8FP.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=G("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),Y=3e3,w=50,V=()=>{const[m,M]=a.useState("16:00"),[x,T]=a.useState("18:00"),[r,g]=a.useState(null),[s,p]=a.useState(!1),[j,d]=a.useState(["--","--"]),[$,u]=a.useState(!1),[N,f]=a.useState(null),[R,h]=a.useState(!1),l=a.useRef(null),o=a.useRef(null);a.useEffect(()=>()=>{l.current&&clearInterval(l.current),o.current&&clearTimeout(o.current)},[]);const v=t=>{const[n,i]=t.split(":").map(Number);return n*60+i},I=t=>{const n=Math.floor(t/60)%24,i=t%60;return`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},C=t=>{const[n,i]=t.split(":").map(Number),c=n>=12?"PM":"AM";return`${n%12||12}:${i.toString().padStart(2,"0")} ${c}`},A=a.useCallback(()=>{f(null);const t=v(m),n=v(x);if(t>=n){f("Start time must be before end time!");return}p(!0),u(!1),h(!1),g(null);const i=t+Math.floor(Math.random()*(n-t+1)),c=I(i),y=c.split(":")[0],P=c.split(":")[1];let S=0;l.current=setInterval(()=>{S+=w;const k=S/Y;if(k<.7){const b=Math.floor(Math.random()*24).toString().padStart(2,"0"),E=Math.floor(Math.random()*60).toString().padStart(2,"0");d([b,E])}else if(k<.9){const b=Math.floor(Math.random()*60).toString().padStart(2,"0");d([y,b])}else d([y,P]),l.current&&clearInterval(l.current),o.current=setTimeout(()=>{p(!1),g(c),u(!0),h(!0)},200)},w)},[m,x]),D=()=>{l.current&&clearInterval(l.current),o.current&&clearTimeout(o.current),g(null),p(!1),d(["--","--"]),u(!1),h(!1),f(null)};return e.jsxs("div",{className:"max-w-2xl mx-auto space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2 bg-802/10 rounded-lg",children:e.jsx(L,{className:"w-6 h-6 text-802"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-white",children:"When Panggang?"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Find out when you can finally leave the office"})]})]}),e.jsxs("div",{className:"card p-6",children:[e.jsx("h2",{className:"text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider",children:"Set Your Range"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Earliest"}),e.jsx("input",{type:"time",value:m,onChange:t=>M(t.target.value),className:"input w-full text-center text-lg",disabled:s})]}),e.jsx("span",{className:"text-gray-500 mt-5 text-lg font-bold",children:"to"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Latest"}),e.jsx("input",{type:"time",value:x,onChange:t=>T(t.target.value),className:"input w-full text-center text-lg",disabled:s})]})]}),N&&e.jsx("div",{className:"mt-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm",children:N})]}),e.jsxs("div",{className:"card p-8 relative overflow-hidden",children:[$&&e.jsx("div",{className:"absolute inset-0 pointer-events-none",children:[...Array(20)].map((t,n)=>e.jsx("div",{className:"absolute w-1 h-1 rounded-full bg-802",style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animation:`firework-particle ${.8+Math.random()*1.2}s ease-out ${Math.random()*.5}s both`}},n))}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-500 mb-4",children:s?"Generating...":r?"You panggang at:":"Ready to find out?"}),e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("div",{className:`
                text-7xl font-mono font-bold tracking-wider px-4 py-2 rounded-xl
                transition-all duration-200
                ${s?"text-802/60 bg-802/5 scale-105":""}
                ${r?"text-802 text-glow":"text-gray-500"}
                ${!s&&!r?"text-gray-600":""}
              `,children:j[0]}),e.jsx("span",{className:`text-7xl font-mono font-bold ${s?"text-802/60 animate-pulse":r?"text-802 text-glow":"text-gray-600"}`,children:":"}),e.jsx("div",{className:`
                text-7xl font-mono font-bold tracking-wider px-4 py-2 rounded-xl
                transition-all duration-200
                ${s?"text-802/60 bg-802/5 scale-105":""}
                ${r?"text-802 text-glow":"text-gray-500"}
                ${!s&&!r?"text-gray-600":""}
              `,children:j[1]})]}),r&&e.jsxs("p",{className:"mt-4 text-lg text-gray-300 animate-fadeIn",children:["That's ",e.jsx("span",{className:"text-802 font-semibold",children:C(r)})]}),R&&e.jsx("div",{className:"mt-6 panggang-banner",children:e.jsx("span",{className:"panggang-text text-4xl sm:text-5xl font-black tracking-tight",children:"PANGGANG LO!"})})]})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs("button",{onClick:A,disabled:s,className:"btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50",children:[s?e.jsx(O,{className:"w-5 h-5 animate-spin"}):e.jsx(F,{className:"w-5 h-5"}),s?"Generating...":r?"Try Again":"Generate!"]}),r&&e.jsxs("button",{onClick:D,className:"btn-secondary flex items-center justify-center gap-2 px-5 py-3",children:[e.jsx(H,{className:"w-5 h-5"}),"Reset"]})]}),e.jsx("p",{className:"text-center text-xs text-gray-600",children:"Disclaimer: Not responsible for any consequences of leaving work at the generated time."}),e.jsx("style",{children:`
        @keyframes firework-particle {
          0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(3) translate(
              ${Math.random()>.5?"":"-"}${20+Math.random()*40}px,
              ${Math.random()>.5?"":"-"}${20+Math.random()*40}px
            );
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out both;
        }
        .panggang-banner {
          animation: panggangSlam 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .panggang-text {
          background: linear-gradient(135deg, #44D62C, #6ae04a, #fff, #6ae04a, #44D62C);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: panggangShimmer 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(68, 214, 44, 0.6)) drop-shadow(0 0 40px rgba(68, 214, 44, 0.3));
        }
        @keyframes panggangSlam {
          0% {
            transform: scale(3) rotate(-5deg);
            opacity: 0;
          }
          60% {
            transform: scale(0.9) rotate(1deg);
            opacity: 1;
          }
          80% {
            transform: scale(1.05) rotate(-0.5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes panggangShimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `})]})};export{V as default};
//# sourceMappingURL=WhenPanggangApp-BO9NCqR4.js.map
