
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);

  /*!
  * Theia Sticky Sidebar v1.7.0
  * https://github.com/WeCodePixels/theia-sticky-sidebar
  *
  * Glues your website's sidebars, making them permanently visible while scrolling.
  *
  * Copyright 2013-2016 WeCodePixels and other contributors
  * Released under the MIT license
  */
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){var a=o(t,e);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)),i(window).on("resize."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)))}function o(t,e){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,e),!0)}function a(t,e){t.initialized=!0;var o=i("#theia-sticky-sidebar-stylesheet-"+t.namespace);0===o.length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){function e(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function o(t){var e=t.height();return t.children().each(function(){e=Math.max(e,i(this).height())}),e}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:a.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(s)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var r=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),r-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-r,0==r?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,e(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void e();if(a.options.disableOnResponsiveLayouts){var s=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(s+50>a.container.width())return void e()}var r=i(document).scrollTop(),d="static";if(r>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+o(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-r+a.paddingTop,S=f-r-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-r,m=a.previousScrollTop-r;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();d=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?r+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==d){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(r+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==d&&e();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=r}},a.onScroll(a),i(document).on("scroll."+a.options.namespace,function(i){return function(){i.onScroll(i)}}(a)),i(window).on("resize."+a.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var s={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"};return t=i.extend(s,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,e(t,this),this}}(jQuery);

  // Sticky Plugin v1.0.4 for jQuery
  // =============
  // Author: Anthony Garand
  // Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
  // Improvements by Leonardo C. Daronco (daronco)
  // Created: 02/14/2011
  // Date: 07/20/2015
  // Website: http://stickyjs.com/
  // Description: Makes an element on the page stick on the screen as you scroll
  //              It will only set the 'top' and 'position' of your element, you
  //              might need to adjust the width in some cases.
  !function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(d){function t(){for(var t=l.scrollTop(),e=h.height(),i=e-g,n=i<t?i-t:0,r=0,s=u.length;r<s;r++){var o,c,p=u[r],a=p.stickyWrapper.offset().top-p.topSpacing-n;p.stickyWrapper.css("height",p.stickyElement.outerHeight()),t<=a?null!==p.currentTop&&(p.stickyElement.css({width:"",position:"",top:"","z-index":""}),p.stickyElement.parent().removeClass(p.className),p.stickyElement.trigger("sticky-end",[p]),p.currentTop=null):((o=e-p.stickyElement.outerHeight()-p.topSpacing-p.bottomSpacing-t-n)<0?o+=p.topSpacing:o=p.topSpacing,p.currentTop!==o&&(p.getWidthFrom?(padding=p.stickyElement.innerWidth()-p.stickyElement.width(),c=d(p.getWidthFrom).width()-padding||null):p.widthFromWrapper&&(c=p.stickyWrapper.width()),null==c&&(c=p.stickyElement.width()),p.stickyElement.css("width",c).css("position","fixed").css("top",o).css("z-index",p.zIndex),p.stickyElement.parent().addClass(p.className),null===p.currentTop?p.stickyElement.trigger("sticky-start",[p]):p.stickyElement.trigger("sticky-update",[p]),p.currentTop===p.topSpacing&&p.currentTop>o||null===p.currentTop&&o<p.topSpacing?p.stickyElement.trigger("sticky-bottom-reached",[p]):null!==p.currentTop&&o===p.topSpacing&&p.currentTop<o&&p.stickyElement.trigger("sticky-bottom-unreached",[p]),p.currentTop=o),a=p.stickyWrapper.parent(),p.stickyElement.offset().top+p.stickyElement.outerHeight()>=a.offset().top+a.outerHeight()&&p.stickyElement.offset().top<=p.topSpacing?p.stickyElement.css("position","absolute").css("top","").css("bottom",0).css("z-index",""):p.stickyElement.css("position","fixed").css("top",o).css("bottom","").css("z-index",p.zIndex))}}function e(){g=l.height();for(var t=0,e=u.length;t<e;t++){var i=u[t],n=null;i.getWidthFrom?i.responsiveWidth&&(n=d(i.getWidthFrom).width()):i.widthFromWrapper&&(n=i.stickyWrapper.width()),null!=n&&i.stickyElement.css("width",n)}}var i=Array.prototype.slice,n=Array.prototype.splice,o={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",widthFromWrapper:!0,responsiveWidth:!1,zIndex:"inherit"},l=d(window),h=d(document),u=[],g=l.height(),c={init:function(s){return this.each(function(){var t=d.extend({},o,s),e=d(this),i=e.attr("id"),n=i?i+"-"+o.wrapperClassName:o.wrapperClassName,r=d("<div></div>").attr("id",n).addClass(t.wrapperClassName);e.wrapAll(function(){if(0==d(this).parent("#"+n).length)return r});i=e.parent();t.center&&i.css({width:e.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"===e.css("float")&&e.css({float:"none"}).parent().css({float:"right"}),t.stickyElement=e,t.stickyWrapper=i,t.currentTop=null,u.push(t),c.setWrapperHeight(this),c.setupChangeListeners(this)})},setWrapperHeight:function(t){var e=d(t),t=e.parent();t&&t.css("height",e.outerHeight())},setupChangeListeners:function(e){window.MutationObserver?new window.MutationObserver(function(t){(t[0].addedNodes.length||t[0].removedNodes.length)&&c.setWrapperHeight(e)}).observe(e,{subtree:!0,childList:!0}):window.addEventListener?(e.addEventListener("DOMNodeInserted",function(){c.setWrapperHeight(e)},!1),e.addEventListener("DOMNodeRemoved",function(){c.setWrapperHeight(e)},!1)):window.attachEvent&&(e.attachEvent("onDOMNodeInserted",function(){c.setWrapperHeight(e)}),e.attachEvent("onDOMNodeRemoved",function(){c.setWrapperHeight(e)}))},update:t,unstick:function(t){return this.each(function(){for(var t=d(this),e=-1,i=u.length;0<i--;)u[i].stickyElement.get(0)===this&&(n.call(u,i,1),e=i);-1!==e&&(t.unwrap(),t.css({width:"",position:"",top:"",float:"","z-index":""}))})}};window.addEventListener?(window.addEventListener("scroll",t,!1),window.addEventListener("resize",e,!1)):window.attachEvent&&(window.attachEvent("onscroll",t),window.attachEvent("onresize",e)),d.fn.sticky=function(t){return c[t]?c[t].apply(this,i.call(arguments,1)):"object"!=typeof t&&t?void d.error("Method "+t+" does not exist on jQuery.sticky"):c.init.apply(this,arguments)},d.fn.unstick=function(t){return c[t]?c[t].apply(this,i.call(arguments,1)):"object"!=typeof t&&t?void d.error("Method "+t+" does not exist on jQuery.sticky"):c.unstick.apply(this,arguments)},d(function(){setTimeout(t,0)})});

/*! Lazy Load 2.0.0-rc.2 - MIT license - Copyright 2007-2019 Mika Tuupola */
!function(t,e){"object"==typeof exports?module.exports=e(t):"function"==typeof define&&define.amd?define([],e):t.LazyLoad=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";function e(t,e){this.settings=s(r,e||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}"function"==typeof define&&define.amd&&(t=window);const r={src:"data-src",srcset:"data-srcset",selector:".lazyload",root:null,rootMargin:"0px",threshold:0},s=function(){let t={},e=!1,r=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],r++);for(;r<o;r++)!function(r){for(let o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e&&"[object Object]"===Object.prototype.toString.call(r[o])?t[o]=s(!0,t[o],r[o]):t[o]=r[o])}(arguments[r]);return t};if(e.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,r={root:this.settings.root,rootMargin:this.settings.rootMargin,threshold:[this.settings.threshold]};this.observer=new IntersectionObserver(function(t){Array.prototype.forEach.call(t,function(t){if(t.isIntersecting){e.observer.unobserve(t.target);let r=t.target.getAttribute(e.settings.src),s=t.target.getAttribute(e.settings.srcset);"img"===t.target.tagName.toLowerCase()?(r&&(t.target.src=r),s&&(t.target.srcset=s)):t.target.style.backgroundImage="url("+r+")"}})},r),Array.prototype.forEach.call(this.images,function(t){e.observer.observe(t)})},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;Array.prototype.forEach.call(this.images,function(e){let r=e.getAttribute(t.settings.src),s=e.getAttribute(t.settings.srcset);"img"===e.tagName.toLowerCase()?(r&&(e.src=r),s&&(e.srcset=s)):e.style.backgroundImage="url('"+r+"')"})},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,r){return new e(t,r)},t.jQuery){const r=t.jQuery;r.fn.lazyload=function(t){return t=t||{},t.attribute=t.attribute||"data-src",new e(r.makeArray(this),t),this}}return e});

// News Ticker by Osama Orabi
!function(n){n.fn.list_ticker=function(o){o=n.extend({speed:4e3,effect:"slide",run_once:!1,random:!1,pauseOnHover:!0},o);return this.each(function(){var t=n(this),r=t.children(),a=r.length-1;function e(){(r=t.children()).not(":first").hide();var e=r.eq(0),n=o.random?r.eq(Math.floor(Math.random()*r.length)):r.eq(1);e.get(0)===n.get(0)&&o.random&&(n=r.eq(Math.floor(Math.random()*r.length))),"slide"==o.effect?(e.slideUp(),n.slideDown(function(){e.remove().appendTo(t)})):"fade"==o.effect&&e.fadeOut(function(){t.css("height",n.height()),n.fadeIn(),e.remove().appendTo(t)}),0==--a&&o.run_once&&clearInterval(interval)}r.not(":first").hide(),interval=setInterval(e,o.speed),o.pauseOnHover&&n(t).hover(function(){clearInterval(interval)},function(){interval=setInterval(e,o.speed,jQuery)})})}}(jQuery);

/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!function(e,t,n){function a(t,n){this.element=t,this.settings=e.extend({},i,n),this.settings.duplicate||n.hasOwnProperty("removeIds")||(this.settings.removeIds=!1),this._defaults=i,this._name=s,this.init()}var i={label:"MENU",duplicate:!0,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",appendTo:"",parentTag:"a",closeOnClick:!1,allowParentLinks:!1,nestedParentLinks:!0,showChildren:!1,removeIds:!0,removeClasses:!1,removeStyles:!1,brand:"",animations:"jquery",init:function(){},beforeOpen:function(){},beforeClose:function(){},afterOpen:function(){},afterClose:function(){}},s="slicknav",o="slicknav",l={DOWN:40,ENTER:13,ESCAPE:27,LEFT:37,RIGHT:39,SPACE:32,TAB:9,UP:38};a.prototype.init=function(){var n,a,i=this,s=e(this.element),r=this.settings;if(r.duplicate?i.mobileNav=s.clone():i.mobileNav=s,r.removeIds&&(i.mobileNav.removeAttr("id"),i.mobileNav.find("*").each(function(t,n){e(n).removeAttr("id")})),r.removeClasses&&(i.mobileNav.removeAttr("class"),i.mobileNav.find("*").each(function(t,n){e(n).removeAttr("class")})),r.removeStyles&&(i.mobileNav.removeAttr("style"),i.mobileNav.find("*").each(function(t,n){e(n).removeAttr("style")})),n=o+"_icon",""===r.label&&(n+=" "+o+"_no-text"),"a"==r.parentTag&&(r.parentTag='a href="#"'),i.mobileNav.attr("class",o+"_nav"),a=e('<div class="'+o+'_menu"></div>'),""!==r.brand){var c=e('<div class="'+o+'_brand">'+r.brand+"</div>");e(a).append(c)}i.btn=e(["<"+r.parentTag+' aria-haspopup="true" role="button" tabindex="0" class="'+o+"_btn "+o+'_collapsed">','<span class="'+o+'_menutxt">'+r.label+"</span>",'<span class="'+n+'">','<span class="'+o+'_icon-bar"></span>','<span class="'+o+'_icon-bar"></span>','<span class="'+o+'_icon-bar"></span>',"</span>","</"+r.parentTag+">"].join("")),e(a).append(i.btn),""!==r.appendTo?e(r.appendTo).append(a):e(r.prependTo).prepend(a),a.append(i.mobileNav);var p=i.mobileNav.find("li");e(p).each(function(){var t=e(this),n={};if(n.children=t.children("ul").attr("role","menu"),t.data("menu",n),n.children.length>0){var a=t.contents(),s=!1,l=[];e(a).each(function(){return e(this).is("ul")?!1:(l.push(this),void(e(this).is("a")&&(s=!0)))});var c=e("<"+r.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+o+'_item"/>');if(r.allowParentLinks&&!r.nestedParentLinks&&s)e(l).wrapAll('<span class="'+o+"_parent-link "+o+'_row"/>').parent();else{var p=e(l).wrapAll(c).parent();p.addClass(o+"_row")}r.showChildren?t.addClass(o+"_open"):t.addClass(o+"_collapsed"),t.addClass(o+"_parent");var d=e('<span class="'+o+'_arrow">'+(r.showChildren?r.openedSymbol:r.closedSymbol)+"</span>");r.allowParentLinks&&!r.nestedParentLinks&&s&&(d=d.wrap(c).parent()),e(l).last().after(d)}else 0===t.children().length&&t.addClass(o+"_txtnode");t.children("a").attr("role","menuitem").click(function(t){r.closeOnClick&&!e(t.target).parent().closest("li").hasClass(o+"_parent")&&e(i.btn).click()}),r.closeOnClick&&r.allowParentLinks&&(t.children("a").children("a").click(function(t){e(i.btn).click()}),t.find("."+o+"_parent-link a:not(."+o+"_item)").click(function(t){e(i.btn).click()}))}),e(p).each(function(){var t=e(this).data("menu");r.showChildren||i._visibilityToggle(t.children,null,!1,null,!0)}),i._visibilityToggle(i.mobileNav,null,!1,"init",!0),i.mobileNav.attr("role","menu"),e(t).mousedown(function(){i._outlines(!1)}),e(t).keyup(function(){i._outlines(!0)}),e(i.btn).click(function(e){e.preventDefault(),i._menuToggle()}),i.mobileNav.on("click","."+o+"_item",function(t){t.preventDefault(),i._itemClick(e(this))}),e(i.btn).keydown(function(t){var n=t||event;switch(n.keyCode){case l.ENTER:case l.SPACE:case l.DOWN:t.preventDefault(),n.keyCode===l.DOWN&&e(i.btn).hasClass(o+"_open")||i._menuToggle(),e(i.btn).next().find('[role="menuitem"]').first().focus()}}),i.mobileNav.on("keydown","."+o+"_item",function(t){var n=t||event;switch(n.keyCode){case l.ENTER:t.preventDefault(),i._itemClick(e(t.target));break;case l.RIGHT:t.preventDefault(),e(t.target).parent().hasClass(o+"_collapsed")&&i._itemClick(e(t.target)),e(t.target).next().find('[role="menuitem"]').first().focus()}}),i.mobileNav.on("keydown",'[role="menuitem"]',function(t){var n=t||event;switch(n.keyCode){case l.DOWN:t.preventDefault();var a=e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),s=a.index(t.target),r=s+1;a.length<=r&&(r=0);var c=a.eq(r);c.focus();break;case l.UP:t.preventDefault();var a=e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),s=a.index(t.target),c=a.eq(s-1);c.focus();break;case l.LEFT:if(t.preventDefault(),e(t.target).parent().parent().parent().hasClass(o+"_open")){var p=e(t.target).parent().parent().prev();p.focus(),i._itemClick(p)}else e(t.target).parent().parent().hasClass(o+"_nav")&&(i._menuToggle(),e(i.btn).focus());break;case l.ESCAPE:t.preventDefault(),i._menuToggle(),e(i.btn).focus()}}),r.allowParentLinks&&r.nestedParentLinks&&e("."+o+"_item a").click(function(e){e.stopImmediatePropagation()})},a.prototype._menuToggle=function(e){var t=this,n=t.btn,a=t.mobileNav;n.hasClass(o+"_collapsed")?(n.removeClass(o+"_collapsed"),n.addClass(o+"_open")):(n.removeClass(o+"_open"),n.addClass(o+"_collapsed")),n.addClass(o+"_animating"),t._visibilityToggle(a,n.parent(),!0,n)},a.prototype._itemClick=function(e){var t=this,n=t.settings,a=e.data("menu");a||(a={},a.arrow=e.children("."+o+"_arrow"),a.ul=e.next("ul"),a.parent=e.parent(),a.parent.hasClass(o+"_parent-link")&&(a.parent=e.parent().parent(),a.ul=e.parent().next("ul")),e.data("menu",a)),a.parent.hasClass(o+"_collapsed")?(a.arrow.html(n.openedSymbol),a.parent.removeClass(o+"_collapsed"),a.parent.addClass(o+"_open"),a.parent.addClass(o+"_animating"),t._visibilityToggle(a.ul,a.parent,!0,e)):(a.arrow.html(n.closedSymbol),a.parent.addClass(o+"_collapsed"),a.parent.removeClass(o+"_open"),a.parent.addClass(o+"_animating"),t._visibilityToggle(a.ul,a.parent,!0,e))},a.prototype._visibilityToggle=function(t,n,a,i,s){function l(t,n){e(t).removeClass(o+"_animating"),e(n).removeClass(o+"_animating"),s||p.afterOpen(t)}function r(n,a){t.attr("aria-hidden","true"),d.attr("tabindex","-1"),c._setVisAttr(t,!0),t.hide(),e(n).removeClass(o+"_animating"),e(a).removeClass(o+"_animating"),s?"init"==n&&p.init():p.afterClose(n)}var c=this,p=c.settings,d=c._getActionItems(t),u=0;a&&(u=p.duration),t.hasClass(o+"_hidden")?(t.removeClass(o+"_hidden"),s||p.beforeOpen(i),"jquery"===p.animations?t.stop(!0,!0).slideDown(u,p.easingOpen,function(){l(i,n)}):"velocity"===p.animations&&t.velocity("finish").velocity("slideDown",{duration:u,easing:p.easingOpen,complete:function(){l(i,n)}}),t.attr("aria-hidden","false"),d.attr("tabindex","0"),c._setVisAttr(t,!1)):(t.addClass(o+"_hidden"),s||p.beforeClose(i),"jquery"===p.animations?t.stop(!0,!0).slideUp(u,this.settings.easingClose,function(){r(i,n)}):"velocity"===p.animations&&t.velocity("finish").velocity("slideUp",{duration:u,easing:p.easingClose,complete:function(){r(i,n)}}))},a.prototype._setVisAttr=function(t,n){var a=this,i=t.children("li").children("ul").not("."+o+"_hidden");n?i.each(function(){var t=e(this);t.attr("aria-hidden","true");var i=a._getActionItems(t);i.attr("tabindex","-1"),a._setVisAttr(t,n)}):i.each(function(){var t=e(this);t.attr("aria-hidden","false");var i=a._getActionItems(t);i.attr("tabindex","0"),a._setVisAttr(t,n)})},a.prototype._getActionItems=function(e){var t=e.data("menu");if(!t){t={};var n=e.children("li"),a=n.find("a");t.links=a.add(n.find("."+o+"_item")),e.data("menu",t)}return t.links},a.prototype._outlines=function(t){t?e("."+o+"_item, ."+o+"_btn").css("outline",""):e("."+o+"_item, ."+o+"_btn").css("outline","none")},a.prototype.toggle=function(){var e=this;e._menuToggle()},a.prototype.open=function(){var e=this;e.btn.hasClass(o+"_collapsed")&&e._menuToggle()},a.prototype.close=function(){var e=this;e.btn.hasClass(o+"_open")&&e._menuToggle()},e.fn[s]=function(t){var n=arguments;if(void 0===t||"object"==typeof t)return this.each(function(){e.data(this,"plugin_"+s)||e.data(this,"plugin_"+s,new a(this,t))});if("string"==typeof t&&"_"!==t[0]&&"init"!==t){var i;return this.each(function(){var o=e.data(this,"plugin_"+s);o instanceof a&&"function"==typeof o[t]&&(i=o[t].apply(o,Array.prototype.slice.call(n,1)))}),void 0!==i?i:this}}}(jQuery,document,window);

// jquery replacetext plugin https://github.com/cowboy/jquery-replacetext
!function(u){u.fn.replaceText=function(r,o,f){return this.each(function(){var e,n,t=this.firstChild,i=[];if(t)for(;3===t.nodeType&&(n=(e=t.nodeValue).replace(r,o))!==e&&(!f&&/</.test(n)?(u(t).before(n),i.push(t)):t.nodeValue=n),t=t.nextSibling;);i.length&&u(i).remove()})}}(jQuery);

//Main Scripts


      $("#bigmag-ticker-news .bigmag-widget,.bigmag-full-wid .bigmag-widget,.bigmag-main-wid .bigmag-widget,.bigmag-slider .bigmag-widget,.bigmag-widetize .bigmag-widget,.featured-inner .bigmag-widget").map(function () {
        var e, u = "",
            v = $(this),
            a = v.attr("data-label"),
            y = v.attr("layout-type"),
            t = v.attr("data-no"),
            u = v.attr("data-type"),
            i = Math.floor(Math.random() * t + 1);
            vv= v.find(".widget-content").text()
        u.match("recentpost") == u && v.closest(".widget-content").parent(".widget").children("h3.title").append('<a class="posts-link" href="/search?&max-results=' + perPage + '">إظهار المزيد</a>') ? e = "/feeds/posts/default?alt=json-in-script&max-results=" + t : u.match("randompost") == u && v.closest(".widget-content").parent(".widget").children("h3.title").append('<a class="posts-link" href="/search?&max-results=' + perPage + '">إظهار المزيد</a>') ? e = "/feeds/posts/default?alt=json-in-script&orderby=updated&start-index=" + i + "&max-results=" + t : u.match("label") == u && v.closest(".widget-content").parent(".widget").children("h3.title").append('<a class="posts-link" href="/search/label/' + a + "?&max-results=" + perPage + '">إظهار المزيد</a>') && (e = "/feeds/posts/default/-/" + a + "?alt=json-in-script&max-results=" + t);
        u = v.find(".widget-content").text();
        $(".bigmag-ticker-news .posts-link,.bigmag-main-slider .posts-link,.bigmag-slider-blocks .posts-link,.bigmag-grid-slider .posts-link,.bigmag-widetize .posts-link").remove(), 
        $.ajax({
            url: e,
            async: !0,
            type: "get",
            dataType: "jsonp",
            success: function (e) {
                var a = "";
                switch (y) {
                    case "BigMagRecent":
                        u += '<div class="bigmag-recent bigmag-widget">';
                        break;
                    case "MainSlider":
                        u += '<div class="bigmag-main-slider bigmag-widget owl-carousel">', v.closest(".widget-content").parent(".widget").addClass("main-slider fade-up");
                        break;
                    case "SliderBlocks":
                        u += '<div class="bigmag-slider-blocks bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("slider-blocks fade-up");
                        break;    
                     case "GridSlider":
                        u += '<div class="bigmag-grid-slider bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("grid-slider fade-up");
                    case "BigMagBig":
                        u += '<ul class="bigmag-grid bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("grid-widget fade-up");
                        break;
                    case "BigMagCol":
                        u += '<ul class="bigmag-col bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("bigmagcol fade-up");
                        break;
                    case "BigMagVideos":
                        u += '<ul class="bigmag-videos bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("bigmagvideos fade-up");
                        break;
                    case "BigMagGallery":
                        u += '<ul class="bigmag-gallery bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("gallery fade-up");
                        break;    
                    case "BigMagPosts":
                        u += '<ul class="bigmag-posts bigmag-widget owl-carousel">', v.closest(".widget-content").parent(".widget").addClass("bigmagposts fade-up");
                        break;
                    case "SingleSlider":
                        u += '<ul class="single-car bigmag-widget owl-carousel">', v.closest(".widget-content").parent(".widget").addClass("singleslider fade-up");
                          break;
                    case "HeaderSlider":
                        u += '<ul class="scroll-inner bigmag-widget owl-carousel">';
                        break;
                    case "BigMagTicker":
                        u += '<ul class="bigmag-ticker bigmag-widget">', v.closest(".widget-content").parent(".widget").addClass("ticker");
                }
                if (e.feed.entry)
                    for (var t = 0; t < e.feed.entry.length; t++) {
                        for (var i = 0; i < e.feed.entry[t].link.length; i++)
                            if ("alternate" == e.feed.entry[t].link[i].rel) {
                                a = e.feed.entry[t].link[i].href;
                                break
                            }
                        var s = e.feed.entry[t].title.$t,
                            l = e.feed.entry[t].category[0].term,
                            r = e.feed.entry[t].author[0].name.$t,
                            n = e.feed.entry[t].published.$t,
                            g = n.substring(0, 4),
                            o = n.substring(5, 7),
                            d = n.substring(8, 10),
                            c = n.substring(8, 10) + " " + month_format[parseInt(o) - 1] + " " + g;
                            m = e.feed.entry[t].content.$t,
                            b = $("<div>").html(m),
                            p = "content" in e.feed.entry[t] ? e.feed.entry[t].content.$t : "summary" in e.feed.entry[t] && e.feed.entry[t].summary.$t ? e.feed.entry[t].summary.$t : "",
                            f = 70 < (p = p.replace(/<\S[^>]*>/g, "")).length && (p = p.substring(0, 90) + "...");
                            if (-1 < m.indexOf("<img")) h = b.find("img").first().attr("src");
                            else if (-1 < m.indexOf("//www.youtube.com/embed/")) h = e.feed.entry[t].media$thumbnail.url.replace("/default.jpg", "/mqdefault.jpg");
                          else var h = no_image;
                        switch (73 < s.length && (s = s.substring(0, 73) + "..."), y) {
                            case "BigMagRecent":
                                u = u + '<div class="bigmag-recent-item"><a class="lazyload bigmag-recent-thumb" href="' + a + '" data-src=' + h + '></a><div class="bigmag-recent-content"><h2 class="bigmag-recent-title"><a href="' + a + '">' + s + '</a></h2> <span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></div>";
                                break;
                            case "GridSlider":
                                u = u + '<div class="bigmag-grid-slider-item"><a class="lazyload bigmag-grid-slider-thumb" href="' + a + '" data-src=' + h + '><span class="bigmag-slider-overlay"/></a><a class="slider-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><div class="bigmag-slider-content"><div class="slider-meta"><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + '</span></div><h2 class="bigmag-grid-slider-title"><a href="' + a + '">' + s + "</a></h2><p>" + f + "</p></div></div>";
                                break;
                              case "MainSlider":
                                u = u + '<div class="bigmag-slider-item"><a class="lazyload bigmag-slider-thumb" href="' + a + '" data-src=' + h + '><span class="bigmag-slider-overlay"/></a><a class="slider-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><div class="bigmag-slider-content"><div class="slider-meta"><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + '</span></div><h2 class="bigmag-slider-title"><a href="' + a + '">' + s + "</a></h2><p>" + f + "</p></div></div>";
                                break;    
                              case "SliderBlocks":
                                u = u + '<div class="bigmag-slider-block"><a class="lazyload bigmag-slider-block-thumb" href="' + a + '" data-src=' + h + '><span class="bigmag-slider-overlay"/></a><a class="slider-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><div class="bigmag-slider-block-content"><div class="slider-meta"><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + '</span></div><h2 class="bigmag-slider-block-title"><a href="' + a + '">' + s + "</a></h2><p>" + f + "</p></div></div>";
                                break;
                            case "BigMagBig":
                            u = u + '<li class="bigmag-big-item"><a class="lazyload bigmag-big-thumb" href="' + a + '" data-src=' + h + '><span class="bigmag-slider-overlay"/></a><div class="bigmag-big-content"><a class="grid-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><h2 class="bigmag-big-title"><a href="' + a + '">' + s + '</a></h2><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></li>";
                                break;
                            case "BigMagCol":
                                u = u + '<li class="bigmag-col-item"><a class="lazyload bigmag-col-thumb" href="' + a + '" data-src=' + h + '></a><div class="bigmag-col-content"><a class="grid-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><h2 class="bigmag-col-title"><a href="' + a + '">' + s + '</a></h2><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></li>";
                                break;
                            case "BigMagVideos":
                                u = u + '<li class="bigmag-videos-item"><a class="lazyload bigmag-videos-thumb" href="' + a + '" data-src=' + h + '><span class="bigmag-videos-icon"/></a><div class="bigmag-videos-content"><a class="grid-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><h2 class="bigmag-videos-title"><a href="' + a + '">' + s + '</a></h2><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></li>";
                                break;
                             case "BigMagGallery":
                                  u = u + '<li class="bigmag-gallery-item"><a class="lazyload bigmag-gallery-thumb" href="' + a + '" data-src=' + h + '></a><div class="bigmag-gallery-content"><h2 class="bigmag-gallery-title"><a href="' + a + '">' + s + '</a></h2><span class="bigmag-author">' + r + '</span></div></li>';
                                break;                          
                            case "BigMagPosts":
                                u = u + '<li class="bigmag-posts-item"><a class="lazyload bigmag-posts-thumb" href="' + a + '" data-src=' + h + '><span class="thumb-overlay"></span></a><div class="bigmag-posts-content"><a class="grid-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><h2 class="bigmag-posts-title"><a href="' + a + '">' + s + '</a></h2><span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></li>";
                                break;
                            case "SingleSlider":
                                u = u + "<li class='bm-soverlay'><a class='lazyload featured-thumb' href='" + a + "' data-src='" + h + "'></a></div><div class='recent-carousel-meta'><a class='recentLabel' href='/search/label/" + l + '?&max-results=' + perPage + "'>" + l + "</a><div class='slider-meta'><span class='bigmag-author'>" + r + "</span><span class='bigmag-time'>" + c + "</span></div><h2><a href='" + a + "'>" + s + "</a></h2><p>" + f + "</p></div></div></li>";
                                break;
                            case "HeaderSlider":
                                u = u + '<li class="header-slider-item"><div class="header-slider-img"><a class="lazyload layer" href="' + a + '" data-src=' + h + '><span class="thumb-overlay"></span></a><div class="layer-headline"><h2><a href="' + a + '">' + s + '</a></h2> <span class="bigmag-author">' + r + '</span><span class="bigmag-time">'+ c + "</span></div></div></li>";
                                break;
                            case "BigMagTicker":
                                u = u + '<li class="bigmag-ticker-item"><a class="lazyload bigmag-ticker-thumb" href="' + a + '" data-src=' + h + '></a><div class="bigmag-ticker-content"><a class="ticker-tag" href="/search/label/' + l + "?&max-results=" + perPage + '">' + l + '</a><h2 class="bigmag-ticker-title"><a href="' + a + '">' + s + "</a></h2></div></li>"
                        }
      
      
                    }
                switch (y) {
                    case "BigMagRecent":
                    case "MainSlider":
                    case "GridSlider":
                    case "SliderBlocks":
                        u += "</div>";
                        break;
                    case "BigMagBig":
                    case "BigMagVideos":
                    case "BigMagGallery":              
                    case "BigMagCol":
                    case "BigMagPosts":
                    case "SingleSlider":
                    case "HeaderSlider":
                        u += "</ul>";
                        break;
                    case "BigMagTicker":
                        u += "</ul>"
                }
      
            },
            complete: function () {
                switch (v.append(u), y) {
                  case "MainSlider":
                        t = v.find(".bigmag-main-slider").owlCarousel({
                            items: 1,
                            autoplay: true,
                            autoplayHoverPause: true,
                            autoplayTimeout: 3000,
                            loop:true,
                            margin:4,
                            nav:true,
                            rtl: true,
                            navText: ['',''],
                            dots:false
                        });
                        break;
                    case "BigMagPosts":
                        t = v.find(".bigmag-posts").owlCarousel({
                            items: 4,
                            autoplay: true,
                            autoplayHoverPause: true,
                            autoplayTimeout: 3000,
        
            loop:true,
            margin:10,
            nav:true,
            rtl: true,
            navText: ['',''],
            dots:true,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                980:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        
                        });
                        break;
                    case "SingleSlider":
                        t = v.find(".single-car").owlCarousel({
                            items: 1,
                            margin:5,
                            dots:false,
                            autoplay: true,
                            autoplayHoverPause: true,
                            autoplayTimeout: 3000,
            loop:true,
            nav:true,
            rtl: true,
            navText: ['',''],
        
                        });
                        break;
                    case "HeaderSlider":
                        t = v.find(".scroll-inner").owlCarousel({
                            items: 4,
                            autoplay: true,
                            autoplayHoverPause: true,
                            autoplayTimeout: 3000,
            loop:true,
            nav:true,
            margin:10,
            rtl: true,
            navText: ['',''],
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                980:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
                        });
                        break;
                    case "BigMagTicker":
                    t = v.find(".bigmag-ticker").list_ticker({
                      speed:2500,
                      effect:'slide',
                      pauseOnHover: true
                    });	
                }
            }
        }), 
        
        v.append(u)
        
        });


      $(".bigmag-slider").append('<div class="home-spinner"><svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg></div>');

        $('.home-spinner').css({
          display: 'none'
      });


$(".bigmag-widetize .HTML .widget-content span.bigmag-cmnt").each(function () {
    var o = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/comments/default?alt=json-in-script&max-results=" + o,
        type: "get",
  async: true,
        dataType: "jsonp",
        success: function (e) {
            var t = "",
                a = '<div class="bigmag-comments">';
            if (e.feed.entry)
                for (var s = 0; s < e.feed.entry.length && s != e.feed.entry.length; s++) {
                    for (var i = 0; i < e.feed.entry[s].link.length; i++)
                        if ("alternate" == e.feed.entry[s].link[i].rel) {
                            t = e.feed.entry[s].link[i].href;
                            break
                        }
                    if ("content" in e.feed.entry[s]) n = e.feed.entry[s].content.$t;
                    else if ("summary" in b_rc) n = e.feed.entry[s].summary.$t;
                    else var n = "";
                    70 < (n = n.replace(/<\S[^>]*>/g, "")).length && (n = n.substring(0, 50) + "...");
                    var r = e.feed.entry[s].author[0].name.$t,
                        l = e.feed.entry[s].author[0].gd$image.src;
                    if (l.match("https://img1.blogblog.com/img/b16-rounded.gif")) c = "https://1.bp.blogspot.com/-u4byJCU2k2I/XnYliN-FmLI/AAAAAAAAF-I/MIpmmnQsUxQ35zlfjZ_FW9rIjbZ4tC9mgCLcBGAsYHQ/s320/user.png";
                    else if (l.match("https://1.bp.blogspot.com/-u4byJCU2k2I/XnYliN-FmLI/AAAAAAAAF-I/MIpmmnQsUxQ35zlfjZ_FW9rIjbZ4tC9mgCLcBGAsYHQ/s320/user.png")) c = "https://1.bp.blogspot.com/-u4byJCU2k2I/XnYliN-FmLI/AAAAAAAAF-I/MIpmmnQsUxQ35zlfjZ_FW9rIjbZ4tC9mgCLcBGAsYHQ/s320/user.png";
                    else var c = l;
                    a += '<div class="bigmag-comment"><div class="bigmag-comment-profile"><img class="lazyload bigmag-comment-thumb" data-src="' + c + '"/></div><a class="comment-author" href="' + t + '">' + r + '</a><span>"' + n + '"</span><a class="leavecmnt" href="' + t + '">أترك رداً</a></div>'
                }
            a += '</div><div class="clear"/>', $(".bigmag-widetize .HTML .widget-content span.bigmag-cmnt").each(function () {
                $(this).attr("data-no") == o && $(this).parent().html(a)
            })
        }
    })
});


$(document).ready(function () {
var e = $("#bigmag-sidebar-tabs #tabside1 .widget h3").text();
$(".bigmag-sidebar-tab .item-1 a").text(e);
var t = $("#bigmag-sidebar-tabs #tabside2 .widget h3").text();
$(".bigmag-sidebar-tab .item-2 a").text(t);
var a = $("#bigmag-sidebar-tabs #tabside3 .widget h3").text();
$(".bigmag-sidebar-tab .item-3 a").text(a), $("#tabside1 .widget h3,#tabside2 .widget h3,#tabside3 .widget h3,#tabside1 .widget-title,#tabside3 .widget-title").remove(), 

$('.bigmag-sidebar-tab a').click(function(){

$('#tabside1,#tabside2,#tabside3').hide();
$('.bigmag-sidebar-tab a.active').removeClass('active');
$(this).addClass('active');

var panel = $(this).attr('href');
$(panel).fadeIn(500);

return false;  // prevents link action

});  // end click 

$('.bigmag-sidebar-tab li:first a').click();

0 === $(".bigmag-sidebar-tabs .widget").length && $(".bigmag-sidebar-tabs").remove()
});


$(document).ready(function (v) {
  var i = -1,
  n = "";
  v("#bigmag-menu").find("ul").find("li").each(function () {
  for (var e = v(this).text(), t = v(this).find("a").attr("href"), a = 0, s = 0; s < e.length && -1 != (a = e.indexOf("_", a)); s++) a++;
  if (level = s, level > i && (n += "<ul>"), level < i)
  for (offset = i - level, s = 0; s < offset; s++) n += "</ul></li>";
  for (e = e.replace(/_/gi, ""), n += "<li><a href='" + t + "'>", s = 0; s < level; s++) n += "";
  n += e + "</a>", i = level
  });
  
  for (var e = 0; e <= i; e++) n += "</ul>", 0 != e && (n += "</li>");
  
  v("#bigmag-menu .widget-content").html(n), v("#bigmag-menu > .widget > .widget-content > ul").attr("id", "bigmag_menu"), v("#bigmag-menu ul > li:first-child > a").parent("li").addClass("home"), v("#bigmag-menu ul > li > ul > li").removeClass("home"),
  v("#bigmag-menu ul > li > ul").map(function () {
    v(this).attr("class", "sub-menu dropdown-menu")
  })
  
  v("#bigmag_menu a").each(function () {
    var e = v(this).text().split("/"),
    s = e[0],
    a = e[1];
    e && v(this).html('<i class="menu-icon ' + a + '"></i>' + s)
    }),

  v("#bigmag_menu a").map(function () {
  var e = v(this).attr("href"); - 1 != (e = e.toLowerCase()).indexOf("[mega menu]") && (v(this).addClass("mega-link"), v(this).attr("href", "/search/label/" + v(this).text() + "?&max-results=" + perPage))
  v("a.mega-link").parent("li").addClass("isMega hasSubmenu")

  }),
  
  v("#bigmag-menu ul > li > ul").parent("li").addClass("hasSubmenu"), v("#bigmag-menu .widget").attr("style", "display:block;"),

  v("#bigmag_menu a.mega-link").map(function () {
  var g = v(this),
  e = g.attr("href");
  if (e = e.toLowerCase(), g.hasClass("mega-link")) {
  var b = g.text();
  v.ajax({
  url: "/feeds/posts/default/-/" + b + "?alt=json-in-script&max-results=4",
  type: "get",
  dataType: "jsonp",
  success: function (e) {
  for (d = 0; d < e.feed.link.length; d++) {
  var t = e.feed.link[d],
  a = t.rel,
  s = t.type;
  if ("alternate" == a && "text/html" == s) {
  var i = t.href + "?&max-results=" + perPage;
  g.attr("href", i)
  }
  }
  var n = e.feed.openSearch$totalResults.$t,
  r = e.feed.openSearch$startIndex.$t,
  l = e.feed.openSearch$itemsPerPage.$t,
  c = Math.ceil(n / l);
  if (e.feed.entry) {
  var o = "<ul";
  o = o + ' data-itemnums="' + l + '" data-label="' + b + '" data-start="' + r + '" data-stages="' + c + '" data-cstage="1" data-tpst="' + n + '"', o += '><div class="mega-nav"><a class="mega-prev disable" href="javascript:;"></a><a class="mega-next" href="javascript:;"></a></div><div class="bigmag-mega-loading" style="display:none"><svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg></div><div class="mega-inner row-megamenu">';
  for (var d = 0; d < e.feed.entry.length; d++) {
  var f = e.feed.entry[d];
                          z = e.feed.entry[d].content.$t,
                          x = $("<div>").html(z);
                            if (-1 < z.indexOf("<img")) q = x.find("img").first().attr("src");
                            else if (-1 < z.indexOf("//www.youtube.com/embed/")) q = e.feed.entry[d].media$thumbnail.url.replace("/default.jpg", "/mqdefault.jpg");
                          else var q = no_image;
  for (var u = f.title.$t, p = 0; p < f.link.length; p++)
  if ("alternate" == f.link[p].rel) var h = f.link[p].href;
   o = o + '<div class="bigmag-mega-item col-megamenu"><div class="bigmag-m-thumb bmrp-thumb" style="background:url(\'' + q + '\')"><a class="linkcover" href="' + h + '"><span class="thumb-overlay"></span></a></div><div class="bigmag-text"><a href="' + h + '">' + u + "</a></div></div>"
  }
  o += "</div></ul>", g.after(function () {
  v(this).after(o);
  var e = v(this).closest(".isMega");
  e.find(".mega-prev").click(function () {
  var l = v(this).closest("ul");
  l.find(".bigmag-mega-loading").fadeIn(0);
  var e = l.attr("data-label"),
  c = Number(l.attr("data-start")),
  o = Number(l.attr("data-cstage")),
  t = (Number(l.attr("data-stages")), Number(l.attr("data-itemnums")));
  if (c -= t, o - 1 <= 1 ? v(this).addClass("disable") : v(this).removeClass("disable"), l.find(".mega-next").removeClass("disable"), 1 < o) {
  var d = "",
  a = "/feeds/posts/default/-/" + e + "?alt=json-in-script&start-index=" + c + "&max-results=" + t;
  v.ajax({
  url: a,
  type: "get",
  dataType: "jsonp",
  success: function (e) {
  if (l.attr("data-start", c), l.attr("data-cstage", o - 1), e.feed.entry) {
  for (var t = 0; t < e.feed.entry.length; t++) {
  var a = e.feed.entry[t];
      h = e.feed.entry[t].content.$t,
      w = $("<div>").html(h);
        if (-1 < h.indexOf("<img")) af = w.find("img").first().attr("src");
        else  if (-1 < h.indexOf("//www.youtube.com/embed/")) af = e.feed.entry[d].media$thumbnail.url.replace("/default.jpg", "/mqdefault.jpg");
      else var af = no_image;
  for (var i = a.title.$t, n = 0; n < a.link.length; n++)
  if ("alternate" == a.link[n].rel) var r = a.link[n].href;
  d = d + '<div class="bigmag-mega-item col-megamenu"><div class="bigmag-m-thumb bmrp-thumb" style="background:url(\'' + af + '\')"><a class="linkcover" href="' + r + '"><span class="thumb-overlay"></span></a></div><div class="bigmag-text"><a href="' + r + '">' + i + "</a></div></div>"
  }
  l.find(".mega-inner").html(d), setTimeout(function () {
  l.find(".bigmag-mega-loading").fadeOut()
  }, 1e3)
  }
  },
  error: function (e) {
  setTimeout(function () {
  l.find(".bigmag-mega-loading").fadeOut()
  }, 1e3)
  }
  })
  }
  }), e.find(".mega-next").click(function () {
  var l = v(this).closest("ul");
  l.find(".bigmag-mega-loading").fadeIn(0);
  var e = l.attr("data-label"),
  c = Number(l.attr("data-start")),
  o = Number(l.attr("data-cstage")),
  t = Number(l.attr("data-stages")),
  a = Number(l.attr("data-itemnums"));
  if (c += a, o + 1 == t ? v(this).addClass("disable") : v(this).removeClass("disable"), 1 <= o ? l.find(".mega-prev").removeClass("disable") : l.find(".mega-prev").addClass("disable"), o < t) {
  var d = "",
  s = "/feeds/posts/default/-/" + e + "?alt=json-in-script&start-index=" + c + "&max-results=" + a;
  v.ajax({
  url: s,
  type: "get",
  dataType: "jsonp",
  success: function (e) {
  if (l.attr("data-start", c), l.attr("data-cstage", o + 1), e.feed.entry) {
  for (var t = 0; t < e.feed.entry.length; t++) {
  var a = e.feed.entry[t];
                                                  h = e.feed.entry[t].content.$t,
                                                  w = $("<div>").html(h);
                                                    if (-1 < h.indexOf("<img")) af = w.find("img").first().attr("src");
                                                    else  if (-1 < h.indexOf("//www.youtube.com/embed/")) af = e.feed.entry[d].media$thumbnail.url.replace("/default.jpg", "/mqdefault.jpg");
                                                  else var af = no_image;
  for (var i = a.title.$t, n = 0; n < a.link.length; n++)
  if ("alternate" == a.link[n].rel) var r = a.link[n].href;
  d = d + '<div class="bigmag-mega-item col-megamenu"><div class="bigmag-m-thumb bmrp-thumb" style="background:url(\'' + af + '\')"><a class="linkcover" href="' + r + '"><span class="thumb-overlay"></span></a></div><div class="bigmag-text"><a href="' + r + '">' + i + "</a></div></div>"
  }
  l.find(".mega-inner").html(d), setTimeout(function () {
  l.find(".bigmag-mega-loading").fadeOut()
  }, 1e3)
  }
  },
  error: function (e) {
  setTimeout(function () {
  l.find(".bigmag-mega-loading").fadeOut()
  }, 1e3)
  }
  })
  }
  })
  })
  }
  },
  error: function (e) {}
  })
  }
  })
  });

  
  $(function () {
    $(".panel-icon").click(function () {
        setTimeout(function () {
            $(".poverlay").fadeIn(300)
        }, 300), setTimeout(function () {
            $(".panel").addClass("active")
        }, 600), $(".panel-icon").addClass("active")
    }), $(".poverlay,.close-panel").click(function () {
        setTimeout(function () {
            $(".poverlay").fadeOut(300)
        }, 300), setTimeout(function () {
            $(".panel-icon").removeClass("active")
        }, 600), $(".panel").removeClass("active")
    })
})

$( document ).ajaxComplete(function() {
          $(".lazyload").lazyload();
         });

  $(".postags a,.label-name,.post-label,.bread-label").each(function() {
    var $this = $(this);       
    var _href = $this.attr("href"); 
    $this.attr("href", _href + "?&max-results=" + perPage);
 });

jQuery('.list-label-widget-content ul li span:contains(")")').each(function () {
  jQuery(this).html(jQuery(this).html().split(")").join(""))
}), jQuery('.list-label-widget-content ul li span:contains("(")').each(function () {
  jQuery(this).html(jQuery(this).html().split("(").join(""))
});


$(function(){
  if(localStorage.darkMode=="true") {
  document.body.classList.toggle('dark');
  document.getElementById("chk").checked=true;
  }
  else {
  document.body.classList.remove("dark");
  }
});
  document.getElementById("chk").addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.darkMode=(localStorage.darkMode=="true")?"false":"true";
  });

$(function(){

  $(document).on( 'scroll', function(){

      if ($(window).scrollTop() > 300) {
          $('a#to-BigMag').addClass('to-bm-visible');
      } else {
          $('a#to-BigMag').removeClass('to-bm-visible');
      }
  });

  $('a#to-BigMag').on('click', scrollToTop);
});

function scrollToTop() {
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('body');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({scrollTop: offsetTop}, 300, 'linear');
}

      $(function(){
        $('#bigmag_menu').slicknav({
            prependTo:'#bigmag-menu', label: 'القائمة', openedSymbol: '', closedSymbol: ''
        });
        $('#nav').slicknav({
            prependTo:'.bigmag-bigmag-top-menu', label: 'الصفحات' 
        });
          $(".mobile-menu").appendTo("#bigmag-menu .slicknav_nav");
          });

          $("#LinkList56").each(function () {
            var e = $(this);
            var t = $(this).find(".social-item a");
            if (t.length === 0) {
              e.remove()
            }
                    var n = "[";
            var r = "]";
            $("#LinkList56 *").replaceText(n, '<span class="item-count">');
            $("#LinkList56 *").replaceText(r, "</span>");
            $(".social-item a").each(function () {
              var e = $(this).find(".remove-count");
              var t = $(this).find(".item-count");
              $(e).before($(t));
              $(e).remove()
            })
            $(this).find(".widget").removeClass("LinkList");
            $("#LinkList56 .social-item .facebook").find(".item-text").text("معجب");
            $("#LinkList56 .social-item .youtube").find(".item-text").text("مشترك");
          });
