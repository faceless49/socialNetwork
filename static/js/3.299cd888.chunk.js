(this.webpackJsonpsocialnetwork=this.webpackJsonpsocialnetwork||[]).push([[3],{290:function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var n=s(3),r=s(68),o=s(11),i=(s(0),s(23)),c=s(1),a=function(t){return{isAuth:t.auth.isAuth}},u=function(t){return Object(i.b)(a)((function(e){var s=e.isAuth,i=Object(r.a)(e,["isAuth"]);return s?Object(c.jsx)(t,Object(n.a)({},i)):Object(c.jsx)(o.a,{to:"/login"})}))}},291:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var n=s(94);function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var s=[],n=!0,r=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done)&&(s.push(i.value),!e||s.length!==e);n=!0);}catch(a){r=!0,o=a}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return s}}(t,e)||Object(n.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},292:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__14JLS"}},293:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__3_b6W",posts:"MyPosts_posts__3cmmO"}},294:function(t,e,s){t.exports={item:"Post_item__xjgp4"}},298:function(t,e,s){"use strict";s.r(e);var n=s(3),r=s(52),o=s(53),i=s(63),c=s(62),a=s(0),u=s.n(a),j=s(292),l=s.n(j),p=s(64),b=s(291),d=s(1),f=function(t){var e=Object(a.useState)(!1),s=Object(b.a)(e,2),n=s[0],r=s[1],o=Object(a.useState)(t.status),i=Object(b.a)(o,2),c=i[0],u=i[1];Object(a.useEffect)((function(){u(t.status)}),[t.status]);return console.log("render profilestatus"),Object(d.jsxs)(d.Fragment,{children:[!n&&Object(d.jsx)("div",{children:Object(d.jsx)("span",{onDoubleClick:function(){r(!n)},children:t.status||"----"})})," ",n&&Object(d.jsx)("div",{children:Object(d.jsx)("input",{onBlur:function(){r(!1),t.updateStatus(c)},autoFocus:!0,value:c,onChange:function(t){u(t.currentTarget.value)}})})]})},h=function(t){var e=t.profile,s=t.status,n=t.updateStatus;return e?Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("img",{src:"https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350"})}),Object(d.jsxs)("div",{className:l.a.descriptionBlock,children:[Object(d.jsx)("img",{src:e.photos.small}),Object(d.jsx)(f,{status:s,updateStatus:n})]})]}):Object(d.jsx)(p.a,{})},O=s(93),m=s(293),x=s.n(m),v=s(294),g=s.n(v),y=function(t){return Object(d.jsxs)("div",{className:g.a.item,children:[Object(d.jsx)("img",{src:"https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg"}),t.message,Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"like"})," ",t.likesCount]})]})},S=s(87),k=s(127),P=s(66),_=s(34),w=u.a.memo((function(t){console.log("render Mypost PC");var e=t.posts.map((function(t){return Object(d.jsx)(y,{id:t.id,message:t.message,likesCount:t.likesCount})})).reverse();return Object(d.jsxs)("div",{className:x.a.postsBlock,children:[Object(d.jsx)("h3",{children:"My posts"}),Object(d.jsx)("div",{children:Object(d.jsx)(B,{onSubmit:function(e){t.addPost(e.newPostText)}})}),Object(d.jsx)("div",{className:x.a.posts,children:e})]})})),A=Object(P.a)(10),B=Object(k.a)({form:"ProfileAddNewPostForm"})((function(t){return Object(d.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(d.jsx)(S.a,{component:_.c,name:"newPostText",placeholder:"it-kamasutra",validate:[P.c,A]}),Object(d.jsx)("button",{children:"Add post"})]})})),C=w,I=s(23),M=Object(I.b)((function(t){return{posts:t.profilePage.posts}}),(function(t){return{addPost:function(e){t(Object(O.a)(e))}}}))(C),N=function(t){return Object(d.jsxs)("div",{children:[Object(d.jsx)(h,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),Object(d.jsx)(M,{})]})},T=s(11),U=s(290),D=s(10),F=function(t){Object(i.a)(s,t);var e=Object(c.a)(s);function s(){return Object(r.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userID;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"render",value:function(){return Object(d.jsx)("div",{children:Object(d.jsx)(N,Object(n.a)(Object(n.a)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))})}}]),s}(u.a.Component);e.default=Object(D.d)(Object(I.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:O.c,getStatus:O.b,updateStatus:O.e}),T.f,U.a)(F)}}]);
//# sourceMappingURL=3.299cd888.chunk.js.map