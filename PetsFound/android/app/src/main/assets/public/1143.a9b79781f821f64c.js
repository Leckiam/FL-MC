"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1143],{1143:(C,u,s)=>{s.r(u),s.d(u,{HomePageModule:()=>b});var p=s(6814),n=s(1024),g=s(95),d=s(6958),e=s(6689),h=s(6401);const _=["animar1"];let f=(()=>{var o;class r{constructor(t,a,i){this.appComponent=t,this.animationController=a,this.router=i,this.appComponent.transfer(this.data),this.data=this.appComponent.returnData()}changePage(t){this.appComponent.ingresar(t)}ngAfterViewInit(){const t=this.animationController.create().addElement(this.cardElements.get(1).nativeElement).duration(1250).iterations(1/0).direction("alternate").fromTo("background","#11a070","var(--background)"),a=this.animationController.create().addElement(this.cardElements.get(2).nativeElement).duration(1e3).iterations(1/0).direction("alternate").fromTo("background","#11a070","var(--background)");this.animation=this.animationController.create().duration(3e3).iterations(1/0).addAnimation([t,a]),this.animation.play()}irAgregarmascota(){this.router.navigate(["agregar-mascota"])}}return(o=r).\u0275fac=function(t){return new(t||o)(e.Y36(h.y),e.Y36(n.vB),e.Y36(d.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-home"]],viewQuery:function(t,a){if(1&t&&(e.Gf(_,7,e.SBq),e.Gf(n.PM,5,e.SBq)),2&t){let i;e.iGM(i=e.CRH())&&(a.animar1=i.first),e.iGM(i=e.CRH())&&(a.cardElements=i)}},decls:36,vars:2,consts:[[3,"translucent"],[1,"color-title"],[3,"fullscreen"],[2,"background-color","aquamarine"],["src","https://static.vecteezy.com/system/resources/previews/010/821/564/original/cute-pets-isolated-poster-banner-dog-cat-rabbit-hare-doodle-welcome-line-hello-vector.jpg","alt","Descripci\xf3n de la imagen",2,"width","100%","max-width","300px","height","auto"],[2,"display","flex","align-items","center"],[1,"Agregarmas"],["src","https://i.pinimg.com/736x/80/0a/c9/800ac981c916bcb6e5e9b0cd969f1d9d.jpg"],[1,"Agregarmas",3,"click"],["slot","bottom"],[3,"click"],["name","home"],["src","https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png",2,"width","30px","height","30px"],["name","person",2,"height","30px","width","30px"]],template:function(t,a){1&t&&(e.TgZ(0,"ion-header",0)(1,"div",1),e._UZ(2,"br"),e.TgZ(3,"ion-title"),e._uU(4,"Inicio"),e.qZA(),e._UZ(5,"br"),e.qZA()(),e.TgZ(6,"ion-content",2)(7,"ion-card",3)(8,"ion-card-header")(9,"ion-card-title"),e._uU(10,"Presentamos"),e.qZA()(),e.TgZ(11,"ion-card-content"),e._uU(12," PetsFound una aplicaci\xf3n donde podras escanear los codigos qr de los collares de tus mascotas para cuidarlas y poder ver la infromaci\xf3n del due\xf1o por si se pierde. "),e.qZA()(),e.TgZ(13,"ion-card"),e._UZ(14,"ion-card-header"),e.TgZ(15,"ion-card-content"),e._UZ(16,"img",4),e.TgZ(17,"p"),e._uU(18,"PETSFOUND"),e.qZA()()(),e.TgZ(19,"div",5)(20,"ion-card",6)(21,"ion-card-content"),e._UZ(22,"img",7),e.qZA()(),e.TgZ(23,"ion-button",8),e.NdJ("click",function(){return a.changePage("agregar-mascota")}),e._uU(24," Agregar mascota + "),e.qZA()(),e.TgZ(25,"ion-tabs")(26,"ion-tab-bar",9)(27,"ion-tab-button",10),e.NdJ("click",function(){return a.changePage("home")}),e._UZ(28,"ion-icon",11),e._uU(29," Home "),e.qZA(),e.TgZ(30,"ion-tab-button",10),e.NdJ("click",function(){return a.changePage("message")}),e._UZ(31,"ion-img",12),e._uU(32," QR "),e.qZA(),e.TgZ(33,"ion-tab-button",10),e.NdJ("click",function(){return a.changePage("account")}),e._UZ(34,"ion-icon",13),e._uU(35," Cuenta "),e.qZA()()()()),2&t&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0))},dependencies:[n.YG,n.PM,n.FN,n.Zi,n.Dq,n.W2,n.Gu,n.gu,n.Xz,n.yq,n.ZU,n.wd,n.UN],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}.headercolor[_ngcontent-%COMP%]{background-color:#7fffd4}.color-title[_ngcontent-%COMP%]{background-color:#0dd4ba}.Agregarmas[_ngcontent-%COMP%]{width:150px;height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid #000;border-radius:10px;text-align:center;font-weight:700;font-size:18px;cursor:pointer;transition:background-color .3s ease}.Agregarmas[_ngcontent-%COMP%]:hover{background-color:#f0f0f0}.Agregarmas[_ngcontent-%COMP%]:active{background-color:#ccc}"]}),r})();class m{constructor(){this.nombre="",this.tipo="",this.edad=0,this.descripcion=""}}const M=[{path:"",component:f,children:[{path:"agregar-mascota",component:(()=>{var o;class r{constructor(){this.mascota=new m}agregarMascota(){this.validarMascota(this.mascota)?(console.log("Nueva mascota:",this.mascota),this.mascota=new m):console.log("Los datos de la mascota no son v\xe1lidos. Verifica los campos.")}validarMascota(t){return!!(t.nombre&&t.nombre.length>=1&&t.tipo&&t.tipo.length>=1&&t.edad&&t.edad>0&&t.descripcion)}}return(o=r).\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-agregar-mascota"]],decls:28,vars:6,consts:[[3,"translucent"],[3,"fullscreen"],["lines","full"],["position","stacked"],["type","text",3,"ngModel","ngModelChange"],["type","number",3,"ngModel","ngModelChange"],[3,"ngModel","ngModelChange"],["expand","full",3,"click"]],template:function(t,a){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Agregar Mascota"),e.qZA()()(),e.TgZ(4,"ion-content",1)(5,"ion-card")(6,"ion-card-header"),e._uU(7," Detalles de la Mascota "),e.qZA(),e.TgZ(8,"ion-card-content")(9,"ion-list",2)(10,"ion-item")(11,"ion-label",3),e._uU(12,"Nombre"),e.qZA(),e.TgZ(13,"ion-input",4),e.NdJ("ngModelChange",function(l){return a.mascota.nombre=l}),e.qZA()(),e.TgZ(14,"ion-item")(15,"ion-label",3),e._uU(16,"Tipo"),e.qZA(),e.TgZ(17,"ion-input",4),e.NdJ("ngModelChange",function(l){return a.mascota.tipo=l}),e.qZA()(),e.TgZ(18,"ion-item")(19,"ion-label",3),e._uU(20,"Edad"),e.qZA(),e.TgZ(21,"ion-input",5),e.NdJ("ngModelChange",function(l){return a.mascota.edad=l}),e.qZA()(),e.TgZ(22,"ion-item")(23,"ion-label",3),e._uU(24,"Descripci\xf3n"),e.qZA(),e.TgZ(25,"ion-textarea",6),e.NdJ("ngModelChange",function(l){return a.mascota.descripcion=l}),e.qZA()()()()(),e.TgZ(26,"ion-button",7),e.NdJ("click",function(){return a.agregarMascota()}),e._uU(27,"Agregar Mascota"),e.qZA()()),2&t&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("fullscreen",!0),e.xp6(9),e.Q6J("ngModel",a.mascota.nombre),e.xp6(4),e.Q6J("ngModel",a.mascota.tipo),e.xp6(4),e.Q6J("ngModel",a.mascota.edad),e.xp6(4),e.Q6J("ngModel",a.mascota.descripcion))},dependencies:[g.JJ,g.On,n.YG,n.PM,n.FN,n.Zi,n.W2,n.Gu,n.pK,n.Ie,n.Q$,n.q_,n.g2,n.wd,n.sr,n.as,n.j9]}),r})()}]}];let Z=(()=>{var o;class r{}return(o=r).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.Bz.forChild(M),d.Bz]}),r})(),b=(()=>{var o;class r{}return(o=r).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.ez,g.u5,n.Pc,Z]}),r})()}}]);