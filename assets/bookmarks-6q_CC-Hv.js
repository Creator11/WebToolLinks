import{a as i,u as a}from"./index-xe7PXsye.js";import{u as o,C as m,a as c,g as u}from"./Cards-WnuaWkCC.js";const l="_bookmarks_1x73k_1",b={bookmarks:l},g=()=>{const{user:r}=i(),{data:s=[]}=o({queryKey:["bookmarks",r==null?void 0:r.id],queryFn:()=>r?c(r.id):[],enabled:!!r}),{data:e=[],isLoading:d,error:t}=o({queryKey:["cards"],queryFn:u,staleTime:1e3*60*5});if(d)return a("p",{children:"Loading..."});if(t)return a("p",{children:"Failed to load cards"});const k=e.filter(n=>s.includes(n.id.toString()));return a("div",{className:b.bookmarks,children:a(m,{arr:k,bookmarks:!0})})};export{g as default};
