!function(t){var e={};function i(s){if(e[s])return e[s].exports;var h=e[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,i),h.l=!0,h.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var h in t)i.d(s,h,function(e){return t[e]}.bind(null,h));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var s=class{constructor(){this.listeners={}}on(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}once(t,e){let i=s=>{e(s),this.off(t,i)};this.on(t,i)}off(t,e){t||(this.listeners={}),this.listeners[t]&&(e||(this.listeners[t]=[]),this.listeners[t].splice(this.listeners[t].indexOf(e),1))}emit(t,e){this.listeners[t]&&this.listeners[t].forEach(t=>{t(e)})}};var h=class extends s{init(){}update(t,e){}postRender(t,e,i){}shutdown(){this.off()}};var o=class extends h{init(){let t=this.scene.engine.canvas;this.mouseDownHandler=this.onMouseDown.bind(this),t.addEventListener("mousedown",this.mouseDownHandler),this.touchStartHandler=this.onTouchStart.bind(this),t.addEventListener("touchstart",this.touchStartHandler),this.mouseMoveHandler=this.onMouseMove.bind(this),t.addEventListener("mousemove",this.mouseMoveHandler),this.touchMoveHandler=this.onTouchMove.bind(this),t.addEventListener("touchmove",this.touchMoveHandler),this.mouseUpHandler=this.onMouseUp.bind(this),t.addEventListener("mouseup",this.mouseUpHandler),this.touchEndHandler=this.onTouchEnd.bind(this),t.addEventListener("touchend",this.touchEndHandler),this.isDown=!1}onMouseDown(t){this.isDown=!0;let e=t.clientX,i=t.clientY;this.emitPointerEvent({name:"pointerdown",clientX:e,clientY:i})}onTouchStart(t){this.isDown=!0,t.preventDefault();let e=t.changedTouches[0].clientX,i=t.changedTouches[0].clientY;this.emitPointerEvent({name:"pointerdown",clientX:e,clientY:i})}onMouseMove(t){let e=t.clientX,i=t.clientY;this.emitPointerEvent({name:"pointermove",clientX:e,clientY:i})}onTouchMove(t){t.preventDefault();let e=t.changedTouches[0].clientX,i=t.changedTouches[0].clientY;this.emitPointerEvent({name:"pointermove",clientX:e,clientY:i})}onMouseUp(t){this.isDown=!1;let e=t.clientX,i=t.clientY;this.emitPointerEvent({clientX:e,clientY:i})}onTouchEnd(t){this.isDown=!1,t.preventDefault();let e=t.changedTouches[0].clientX,i=t.changedTouches[0].clientY;this.emitPointerEvent({clientX:e,clientY:i})}emitPointerEvent({name:t="pointerup",clientX:e=0,clientY:i=0}={}){let s=this.scene.engine.canvas.getBoundingClientRect(),h=e-s.left,o=i-s.top,n=h/this.scene.viewport.zoom,a=o/this.scene.viewport.zoom,r=n+this.scene.offset.x,d=a+this.scene.offset.y;this.emit(t,{viewportX:n,viewportY:a,worldX:r,worldY:d})}shutdown(){super.shutdown();let t=this.scene.engine.canvas;t.removeEventListener("mousedown",this.mouseDownHandler),t.removeEventListener("touchstart",this.touchStartHandler),t.removeEventListener("mousemove",this.mouseMoveHandler),t.removeEventListener("touchmove",this.touchMoveHandler),t.removeEventListener("mouseup",this.mouseUpHandler),t.removeEventListener("touchend",this.touchEndHandler),this.isDown=!1}};const n=window.AudioContext||window.webkitAudioContext;var a=class extends s{constructor(){super(),this.cache={},this.blobs={},this.audioBuffers={},this.queueLength=0,this.progress=0,this.queueMax=0,n&&(this.audioCtx=new n)}load(t){t.length&&(this.progress=0,t.forEach(t=>{if(!this.cache[t.name])switch(this.queueLength++,t.type){case"image":this.loadImage(t);break;case"audio":this.loadAudio(t)}}),this.queueMax=this.queueLength)}loadImage(t){let e=new Image;e.onload=i=>{this.cache[t.name]=e,this.updateProgress()},e.src=t.src}loadAudio(t){this.audioCtx?fetch(t.src).then(t=>t.arrayBuffer()).then(e=>{this.audioCtx.decodeAudioData(e,e=>{t.chunks&&(e.chunks=t.chunks,e.chunkIndex=-1),this.audioBuffers[t.name]=e,this.updateProgress()})}):fetch(t.src).then(t=>t.blob()).then(e=>{let i=URL.createObjectURL(e),s=new Audio(i);t.chunks&&(s.chunks=t.chunks,s.chunkIndex=-1),this.cache[t.name]=s,this.blobs[t.name]=i,this.updateProgress()})}updateProgress(){this.queueLength--,this.progress=1-this.queueLength/this.queueMax,0===this.queueLength&&this.emit("queuedone")}getByName(t){if(this.cache[t])return this.cache[t]}getBlobByName(t){if(this.blobs[t])return this.blobs[t]}getAudioBufferByName(t){if(this.audioBuffers[t])return this.audioBuffers[t]}};var r=class extends s{constructor(){super(),this.active=!1,this.viewport={width:320,height:180,zoom:1},this.plugins=[],this.offset={x:0,y:0}}setup(){this.plugins.forEach(t=>{t.init()}),this.children=[],this.init(),this.active=!0}add(t){return t.scene=this,this.children.push(t),this.emit("addedchild",t),t}remove(t){this.emit("removedchild",t),t.scene=void 0,this.children.splice(this.children.indexOf(t),1)}init(){}update(t,e){}resize(t,e){}render(t,e,i){let s=[];this.children.forEach(e=>{void 0!==e.lifespan&&(e.lifespan-=i,e.lifespan<0)?s.push(e):(e.body&&(e.x=e.body.midX+e.offsetX,e.y=e.body.midY+e.offsetY),e.x-e.width/2+e.width<this.offset.x*e.scrollFactorX||e.x-e.width/2>this.offset.x*e.scrollFactorX+this.viewport.width||e.y-e.height/2+e.height<this.offset.y*e.scrollFactorY||e.y-e.height/2>this.offset.y*e.scrollFactorY+this.viewport.height||e.render(t,this.offset))}),s.forEach(t=>{this.remove(t)})}restart(){this.shutdown(),this.setup()}shutdown(){this.children.forEach(t=>{t.destroy(),t.scene=void 0}),this.children=[],this.plugins.forEach(t=>{t.shutdown()}),this.active=!1,this.off()}};var d=class extends s{constructor({x:t=0,y:e=0,width:i=32,height:s=32}={}){super(),this.x=t,this.y=e,this.width=i,this.height=s,this.scrollFactorX=1,this.scrollFactorY=1,this.fillStyle="#000000",this.scene=void 0,this.visible=!0,this.body=void 0,this.offsetX=0,this.offsetY=0,this.lifespan=void 0}get width(){return this._width}set width(t){this._width=t}get height(){return this._height}set height(t){this._height=t}addBody(t){return t.width=this.width,t.height=this.height,t.x=this.x-t.halfWidth,t.y=this.y-t.halfHeight,this.body=t,this}render(t,e){this.visible&&(t.save(),t.translate(Math.round(this.x-e.x*this.scrollFactorX),Math.round(this.y-e.y*this.scrollFactorY)),this.draw(t),t.restore())}draw(t){t.fillStyle=this.fillStyle,t.fillRect(-this.width/2,-this.height/2,this.width,this.height)}destroy(){this.body=void 0,this.off()}};var l=class extends d{constructor({x:t=0,y:e=0,width:i=128,height:s=32}={}){super({x:t,y:e,width:i,height:s}),this.progress=0}draw(t){t.strokeStyle=this.fillStyle,t.lineWidth=2,t.strokeRect(-this.width/2,-this.height/2,this.width,this.height),t.fillStyle=this.fillStyle,t.fillRect(-this.width/2+4,-this.height/2+4,Math.floor((this.width-8)*this.progress),this.height-8)}};var c=class extends r{init(){this.assets.once("queuedone",()=>{this.options.nextScene&&this.engine.switchScene(this.options.nextScene)}),this.assets.load(this.options.assets),this.bar=new l({x:this.viewport.width/2,y:this.viewport.height/2}),this.bar.fillStyle=this.engine.foreground,this.add(this.bar)}update(t,e){this.bar.progress=this.assets.progress}shutdown(){super.shutdown(),this.bar=void 0}};var u=class extends h{constructor(){super(),this.x=0,this.y=0,this.followTarget=void 0,this.lerpX=1,this.lerpY=1,this.bounds=void 0,this.shakeTimer=0,this.shakeIntensity=.02,this.fadeTimer=0,this.fadeDuration=0,this.fadeColor="#000000",this.flashTimer=0,this.flashDuration=0,this.flashColor="#000000"}init(){this.x=this.scene.viewport.width/2,this.y=this.scene.viewport.height/2}update(t,e){this.followTarget&&(this.x+=(this.followTarget.x-this.x)*this.lerpX,this.y+=(this.followTarget.y-this.y)*this.lerpY);let i=this.scene.viewport.width/2,s=this.scene.viewport.height/2;this.bounds&&(this.x=Math.max(this.x,this.bounds.x+i),this.x=Math.min(this.x,this.bounds.x+this.bounds.width-i),this.y=Math.max(this.y,this.bounds.y+s),this.y=Math.min(this.y,this.bounds.y+this.bounds.height-s));let h=this.x-i,o=this.y-s;this.shakeTimer>0&&(this.shakeTimer-=e,h+=this.scene.viewport.width*(1-2*Math.random())*this.shakeIntensity,o+=this.scene.viewport.height*(1-2*Math.random())*this.shakeIntensity),this.scene.offset={x:h,y:o}}postRender(t,e,i){this.fadeTimer>0&&(this.fadeTimer-=i,t.save(),t.globalAlpha=Math.min(1,1-this.fadeTimer/this.fadeDuration),t.fillStyle=this.fadeColor,t.fillRect(0,0,this.scene.viewport.width,this.scene.viewport.height),t.restore(),this.fadeTimer<=0&&this.emit("fadecomplete")),this.flashTimer>0&&(t.save(),t.globalAlpha=Math.max(0,this.flashTimer/this.flashDuration),t.fillStyle=this.flashColor,t.fillRect(0,0,this.scene.viewport.width,this.scene.viewport.height),t.restore(),this.flashTimer-=i,this.flashTimer<=0&&this.emit("flashcomplete"))}setBounds(t,e,i,s){this.bounds={x:t,y:e,width:i,height:s}}shake({duration:t=300,intensity:e=.02}={}){this.shakeTimer=t,this.shakeIntensity=e}fade({duration:t=750,color:e="#000000"}={}){this.fadeTimer=t,this.fadeDuration=t,this.fadeColor=e}flash({duration:t=750,color:e="#000000"}={}){this.flashTimer=t,this.flashDuration=t,this.flashColor=e}};var m=class{constructor(t,e,i,s,h,o){this.canvas=e,this.context=e.getContext("2d"),o.push({name:"assets",type:"global",class:a}),o.push({name:"camera",type:"scene",class:u}),this.plugins=[],o.forEach(t=>{if("global"==t.type){let e=new t.class(t.options);e.name=t.name,this[t.name]=e,e.engine=this,this.plugins.push(e)}}),h&&t.unshift({name:"verfdefaultpreloader",class:c,options:{assets:h,nextScene:t[0]?t[0].name:void 0}}),this.scenes=[],t.forEach(t=>{let e=new t.class;e.name=t.name,t.options&&(e.options=t.options),e.engine=this,this.plugins.forEach(t=>{e[t.name]=t}),o.forEach(t=>{if("scene"==t.type){let i=new t.class(t.options);i.name=t.name,i.engine=this,i.scene=e,e[t.name]=i,e.plugins.push(i)}}),this.scenes.push(e)}),this.time=0,this.delta=17,this.background=i,this.foreground=s,this.timeouts=[],window.addEventListener("load",()=>{window.focus(),document.body.addEventListener("click",t=>{window.focus()},!1)}),this.gamepads={free:[],occupied:[]}}start(){this.scenes[0]&&this.scenes[0].setup(),window.requestAnimationFrame(this.onFrame.bind(this))}onFrame(t){let e=t-this.time;this.time=t,e>200&&(e=200),this.delta=e;for(let t=this.timeouts.length-1;t>=0;t--)this.timeouts[t].end<=this.time&&(this.timeouts[t].callback(),this.clearTimeout(this.timeouts[t]));"transparent"==this.background?this.context.clearRect(0,0,this.canvas.width,this.canvas.height):(this.context.save(),this.context.fillStyle=this.background,this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.restore()),this.scenes.forEach(i=>{i.active&&(i.plugins.forEach(i=>{i.update(t,e)}),i.update(t,e))}),this.scenes.forEach(i=>{i.active&&(i.render(this.context,t,e),i.plugins.forEach(i=>{i.postRender(this.context,t,e)}))}),window.requestAnimationFrame(this.onFrame.bind(this))}switchScene(t){this.scenes.forEach(e=>{if(e.name==t){if(e.active)return;e.setup()}else e.active&&e.shutdown()})}setTimeout(t,e){let i={callback:t,end:this.time+e};return this.timeouts.push(i),i}clearTimeout(t){this.timeouts.splice(this.timeouts.indexOf(t),1)}};var f=class{constructor({parent:t="body",width:e=320,height:i=180,resizable:s=!0,zoom:h="auto",pixelArt:o=!0,overlay:n=!1,background:a="transparent",foreground:r="#000000",scenes:d=[],assets:l,plugins:c=[]}={}){this.parent=document.querySelector(t),this.canvas=document.createElement("canvas"),o&&(this.canvas.style.imageRendering="pixelated"),n&&(this.canvas.style.position="fixed",this.canvas.style.top=0,this.canvas.style.left=0,this.canvas.style.zIndex=2147483647),this.canvas.style.display="block",this.parent.appendChild(this.canvas),this.engine=new m(d,this.canvas,a,r,l,c),this.zoom=h,s?("auto"==h&&(e&&(this.targetWidth=e),i&&(this.targetHeight=i)),this.resizeTOID=0,window.addEventListener("resize",()=>{clearTimeout(this.resizeTOID),this.resizeTOID=setTimeout(this.onWindowResize.bind(this),500)}),this.onWindowResize(),document.body.style.margin="0",document.body.style.overflow="hidden"):("auto"==this.zoom&&(this.zoom=1),this.setSize(e,i,this.zoom)),this.engine.start()}onWindowResize(){let t=this.zoom;if("auto"==t){let e=Math.max(1,Math.floor(window.innerWidth/(this.targetWidth?this.targetWidth:window.innerWidth))),i=Math.max(1,Math.floor(window.innerHeight/(this.targetHeight?this.targetHeight:window.innerHeight)));t=Math.min(e,i)}let e=Math.ceil(window.innerWidth/t),i=Math.ceil(window.innerHeight/t);this.setSize(e,i,t)}setSize(t,e,i){this.canvas.width=t,this.canvas.height=e,this.canvas.style.width=t*i+"px",this.canvas.style.height=e*i+"px",this.engine.scenes.forEach(s=>{s.viewport.width=t,s.viewport.height=e,s.viewport.zoom=i,s.active&&s.resize(t,e)})}};var g=class extends d{constructor({x:t=0,y:e=0,name:i,frame:s=0,width:h=32,height:o=32}={}){super({x:t,y:e,width:h,height:o}),this.name=i,this.frame=s,this.frames=[],this.animations={}}draw(t){if(this.animation&&this.tickAnimation(),!this.img){if(this.img=this.scene.assets.getByName(this.name),!this.img)return;let t=0,e=0;for(this.frames=[];e<this.img.height;){for(t=0;t<this.img.width;)this.frames.push({x:t,y:e}),t+=this.width;e+=this.height}}this.frames[this.frame]&&t.drawImage(this.img,this.frames[this.frame].x,this.frames[this.frame].y,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height)}get name(){return this._name}set name(t){this._name=t,this.img=void 0}get animation(){return this._animation}set animation(t){t!=this._animation&&(this._animation=t,this._animation&&this.animations[this._animation]&&(this.animations[this._animation].time=0))}addAnimation({name:t,frames:e=[0],fps:i=12,loop:s=-1}={}){if(!t)return;let h=1e3/i*e.length,o=h*(s+1);this.animations[t]={frames:e,fps:i,loop:s,time:0,maxTime:o,loopLength:h}}tickAnimation(){let t=this.animations[this.animation],e=Math.floor(t.time%t.loopLength/t.loopLength*t.frames.length);this.frame=t.frames[e],t.time+=this.scene.engine.delta,t.maxTime>0&&t.time>t.maxTime&&(this.animation=void 0,this.emit("animationstopped"))}destroy(){this.img=void 0,super.destroy()}};var p=class{constructor(){this.x=0,this.y=0,this.width=32,this.height=32,this.vx=0,this.vy=0,this.allowGravity=!1,this.immovable=!0,this.restitution=0,this.collideWorldBounds=!1,this.frictionX=0,this.frictionY=0,this.blocked={none:!0,top:!1,right:!1,bottom:!1,left:!1},this.touching={none:!0,top:!1,right:!1,bottom:!1,left:!1}}get width(){return this._width}set width(t){this._width=t,this.halfWidth=t/2}get height(){return this._height}set height(t){this._height=t,this.halfHeight=t/2}get midX(){return this.halfWidth+this.x}get midY(){return this.halfHeight+this.y}get top(){return this.y}get left(){return this.x}get right(){return this.x+this.width}get bottom(){return this.y+this.height}};var v=class extends h{constructor({gravityX:t=0,gravityY:e=0,worldBoundsRestitution:i=1}={}){super(),this.gravityX=t,this.gravityY=e,this.worldBoundsRestitution=i}init(){this.bodies=[],this.colliders=[],this.scene.on("addedchild",t=>{t.body&&this.addBody(t.body)}),this.scene.on("removedchild",t=>{t.body&&this.removeBody(t.body)})}addBody(t){this.bodies.push(t)}removeBody(t){this.getCollidersOfBody(t).forEach(t=>{this.removeCollider(t)}),this.bodies.splice(this.bodies.indexOf(t),1)}getCollidersOfBody(t){let e=[];return this.colliders.forEach(i=>{i.a!=t&&i.b!=t||e.push(i)}),e}addCollider({a:t,b:e,callback:i,seperate:s=!0}={}){if(!(t&&e&&t.body&&e.body))return;let h={a:t.body,b:e.body,callback:i,seperate:s};return this.colliders.push(h),h}removeCollider(t){this.colliders.splice(this.colliders.indexOf(t),1)}collideRect(t,e){return!(t.bottom<e.top||t.top>e.bottom||t.right<e.left||t.left>e.right)}seperateAFromB(t,e,i){let s=(e.midX-t.midX)/e.halfWidth,h=(e.midY-t.midY)/e.halfHeight,o=Math.abs(s),n=Math.abs(h);Math.abs(o-n)<.1?(s<0?(t.x=e.right,t.blocked.left=!0):(t.x=e.left-t.width,t.blocked.right=!0),h<0?(t.y=e.bottom,t.blocked.top=!0):(t.y=e.top-t.height,t.blocked.bottom=!0),Math.random()<.5?(t.vx=-t.vx*e.restitution,Math.abs(t.vx)<4e-4&&(t.vx=0),t.x+=e.vx*e.frictionX*i):(t.vy=-t.vy*e.restitution,Math.abs(t.vy)<4e-4&&(t.vy=0),t.y+=e.vy*e.frictionY*i)):o>n?(s<0?(t.x=e.right,t.blocked.left=!0):(t.x=e.left-t.width,t.blocked.right=!0),t.vx=-t.vx*e.restitution,t.x+=e.vx*e.frictionX*i,Math.abs(t.vx)<4e-4&&(t.vx=0)):(h<0?(t.y=e.bottom,t.blocked.top=!0):(t.y=e.top-t.height,t.blocked.bottom=!0),t.vy=-t.vy*e.restitution,t.y+=e.vy*e.frictionY*i,Math.abs(t.vy)<4e-4&&(t.vy=0)),t.blocked.none=!1}seperateBoth(t,e,i){let s=(e.midX-t.midX)/e.halfWidth,h=(e.midY-t.midY)/e.halfHeight,o=Math.abs(s),n=Math.abs(h);if(Math.abs(o-n)<.1){if(s<0){let i=(e.right-t.left)/2;t.x+=i,e.x-=i,t.touching.left=!0,e.touching.right=!0}else{let i=(t.right-e.left)/2;t.x-=i,e.x+=i,t.touching.right=!0,e.touching.left=!0}if(h<0){let i=(e.bottom-t.top)/2;t.y+=i,e.y-=i,t.touching.top=!0,e.touching.bottom=!0}else{let i=(t.bottom-e.top)/2;t.y-=i,e.y+=i,t.touching.bottom=!0,e.touching.top=!0}}else if(o>n)if(s<0){let s=(e.right-t.left)/2;t.x+=s,e.x-=s,t.touching.left=!0,e.touching.right=!0,this.gravityX>0?(e.vy=0,e.y+=t.vy*t.frictionY*i):this.gravityX<0&&(t.vy=0,t.y+=e.vy*e.frictionY*i)}else{let s=(t.right-e.left)/2;t.x-=s,e.x+=s,t.touching.right=!0,e.touching.left=!0,this.gravityX>0?(t.vy=0,t.y+=e.vy*e.frictionY*i):this.gravityX<0&&(e.vy=0,e.y+=t.vy*t.frictionY*i)}else if(h<0){let s=(e.bottom-t.top)/2;t.y+=s,e.y-=s,t.touching.top=!0,e.touching.bottom=!0,this.gravityY>0?(e.vy=0,e.x+=t.vx*t.frictionX*i):this.gravityY<0&&(t.vy=0,t.x+=e.vx*e.frictionX*i)}else{let s=(t.bottom-e.top)/2;t.y-=s,e.y+=s,t.touching.bottom=!0,e.touching.top=!0,this.gravityY>0?(t.vy=0,t.x+=e.vx*e.frictionX*i):this.gravityY<0&&(e.vy=0,e.x+=t.vx*t.frictionX*i)}}update(t,e){e/=1e3;let i=this.gravityX*e,s=this.gravityY*e;this.bodies.forEach(t=>{t.allowGravity&&(t.vx+=i,t.vy+=s),t.x+=t.vx*e,t.y+=t.vy*e,t.blocked.none=!0,t.blocked.top=!1,t.blocked.right=!1,t.blocked.bottom=!1,t.blocked.left=!1,t.touching.none=!0,t.touching.top=!1,t.touching.right=!1,t.touching.bottom=!1,t.touching.left=!1}),this.colliders.forEach(t=>{this.collideRect(t.a,t.b)&&(t.seperate&&(!t.a.immovable&&t.b.immovable?this.seperateAFromB(t.a,t.b,e):t.a.immovable&&!t.b.immovable?this.seperateAFromB(t.b,t.a,e):t.a.immovable||t.b.immovable||this.seperateBoth(t.a,t.b,e)),t.callback&&t.callback(t.a,t.b))}),this.bounds&&this.bodies.forEach(t=>{t.collideWorldBounds&&(t.left<this.bounds.x&&(t.x=this.bounds.x,t.vx=-t.vx*this.worldBoundsRestitution,t.blocked.left=!0),t.top<this.bounds.y&&(t.y=this.bounds.y,t.vy=-t.vy*this.worldBoundsRestitution,t.blocked.top=!0),t.right>this.bounds.x+this.bounds.width&&(t.x=this.bounds.x+this.bounds.width-t.width,t.vx=-t.vx*this.worldBoundsRestitution,t.blocked.right=!0),t.bottom>this.bounds.y+this.bounds.height&&(t.y=this.bounds.y+this.bounds.height-t.height,t.vy=-t.vy*this.worldBoundsRestitution,t.blocked.bottom=!0))})}setBounds(t,e,i,s){this.bounds={x:t,y:e,width:i,height:s}}shutdown(){super.shutdown(),this.bodies=[],this.colliders=[]}};class y extends g{draw(t){t.rotate(Math.PI),super.draw(t)}}new f({background:"#639fab",foreground:"#fcfff7",width:160,height:200,assets:[{name:"rps",type:"image",src:"rps.png"}],scenes:[{name:"start",class:class extends r{init(){this.camera.x=80,this.camera.y=100,this.rps=this.add(new g({name:"rps",x:80,y:150,width:16,height:16})),this.rps.addAnimation({name:"s",frames:[0,1,2],fps:8}),this.rps.animation="s",this.pointer.once("pointerdown",()=>{this.engine.rps=this.rps.frame,this.engine.switchScene("level")})}}},{name:"level",class:class extends r{init(){this.camera.x=80,this.camera.y=100,this.player=this.add(new g({name:"rps",x:80,y:150,width:16,height:16,frame:this.engine.rps}).addBody(new p)),this.player.homeX=this.player.x,this.camera.flash({color:this.engine.foreground}),this.pointer.on("pointerdown",t=>{t.worldX>0&&t.worldX<160&&(this.player.homeX=t.worldX)}),this.npcs=[],this.startY=-50;for(let t=0;t<6;t++){let t=this.add(new y({name:"rps",x:16+128*Math.random(),y:this.startY,width:16,height:16,frame:this.getRF()}).addBody(new p));t.body.vy=100,this.world.addCollider({a:this.player,b:t,callback:()=>{if(!t.visible||!this.player.visible)return;let e=!1;switch(this.player.frame){case 0:e=2==t.frame;break;case 1:e=0==t.frame;break;case 2:e=1==t.frame}e?t.visible=!1:(this.player.visible=!1,this.engine.setTimeout(()=>{this.engine.switchScene("start")},2e3)),this.camera.shake()},seperate:!1}),this.npcs.push(t),this.startY-=50}}update(t,e){this.active&&(this.player.body.vx=(this.player.homeX-this.player.x)/2*30,this.npcs.forEach(t=>{t.body.top>200&&(t.body.y-=300,t.body.x=this.player.body.x,t.frame=this.getRF(),t.visible=!0)}))}getRF(){return[0,1,2].filter(t=>t!==this.engine.rps)[Math.floor(2*Math.random())]}}}],plugins:[{name:"clip",class:class extends h{postRender(t,e,i){t.save(),t.globalCompositeOperation="destination-in",t.fillRect(Math.round(-this.scene.offset.x),Math.round(-this.scene.offset.y),160,200),t.restore()}},type:"scene"},{name:"world",class:v,type:"scene"},{name:"pointer",class:o,type:"scene"}]})}]);