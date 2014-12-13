var images = new Array()
var covers_loading = false;
var covers;
var search_text = "";
var drinks = false;
var limit = 0;
var searching = false;
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}
preload(
	"img/splash.png",
	"img/popup1.png",
	"img/menu/botonesmenuactiv01.png",
	"img/menu/botonesmenuactiv02.png",
	"img/menu/botonesmenuactiv03.png",
	"img/menu/botonesmenuactiv4.png",
	"img/menu/botonesmenuactiv5.png",
	"img/menu/botonesmenuactiv6.png",
	"img/menu/botonesmenuactiv7.png",
	"img/menu/botonesmenuactiv8.png",
	"img/menu/botonesmenuactiv9.png",
	"img/menu/botonesmenuactiv10.png",
	"img/menu/botonesmenuactiv11.png",
	"img/menu/botonesmenuactiv12.png",
	"img/menu/botonesmenuactiv13.png",
	"img/menu/botonesmenuactiv14.png",
	"img/menu/botonesmenuactiv15.png"
)

var promos;
var slides;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
//        document.addEventListener('deviceready',this.onDeviceReady, false);
		document.addEventListener('deviceready',this.start, false);
//        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    start: function() {		
		navigator.splashscreen.hide(); navigator.notification.vibrate(1000);
		updateMyApp("inicio");
		setup_all();
		setTimeout(function(){
			$('#splash').fadeOut(function(){
				StatusBar.overlaysWebView(true);
				StatusBar.show();
				//$('#showMenu').noClickDelay();
			});
		},3000);
		$("#swiper").swipe( {
			//Generic swipe handler for all directions
			swipeRight:function(event, direction, distance, duration, fingerCount) {
			  menuu();
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
		  });
		slides = $('#slides').bxSlider({
			controls: false,
			snap:true,
			onSliderLoad: function(){
			  setTimeout(function(){
					$('.bx-wrapper:nth-child(1),#slides').animate({opacity:1},'slow');
			  },800);
			}
		});
		promos = $('#promos').bxSlider({
		  snap: true,
		  controls:false,
		  onSliderLoad: function(){
			  setTimeout(function(){
					$('.bx-wrapper:nth-child(2),#promos').animate({opacity:1},'slow');
			  },800);
			}
		});
		current = "inicio";
		function updateMyApp(page) {
			containerEvent($('.container').trigger(clickevent));
			if(page=="") page="inicio";
			$('nav a').removeClass('active');
		  	$('#nav_'+page).addClass('active');
			if(typeof current == "undefined" || current != page){
				current = page;
				$('.page.active').fadeOut('10',function(){
					$('.page.active').removeClass('active');
					$('#page_'+page).addClass('active');
					$('#page_'+page).fadeIn('10',function(){
						switch(page){
							case 'inicio':
								setup_inicio();
							break;
							case 'menu':
								setup_menu();
							break;
							case 'cancionero':
							break;
							case 'info':
								setup_info();
							break;
							case 'fotos':
								setup_fotos();
							break;
						}
					});
				});
			}else{
				$('.page.active').removeClass('active');
					$('#page_'+page).addClass('active');
					$('#page_'+page).fadeIn('10',function(){
						switch(page){
							case 'inicio':
								setup_inicio();
							break;
							case 'menu':
								setup_menu();
							break;
							case 'cancionero':
							break;
							case 'info':
								setup_info();
							break;
							case 'fotos':
								setup_fotos();
							break;
						}
					});
			}
			//setLocationHash(page);
		}
		function setup_all(){
			setup_inicio();
			setup_fotos();
			setup_info();
			document.addEventListener("backbutton", function(e){
				if(getLocationHash()=='#inicio'){
					/* 
					 Event preventDefault/stopPropagation not required as adding backbutton
					  listener itself override the default behaviour. Refer below PhoneGap link.
					*/
					//e.preventDefault();
					navigator.app.exitApp();
				}
			}, false);
		}
		function search_all(){}
		function setup_menu(){
			if(typeof carta == "undefined")
				carta = new IScroll('#menu',{click: true,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
			if(typeof carta_bebida == "undefined")
				carta_bebida = new IScroll('#menu_target_list',{click: true,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
			searching_drinks = false;
			$('#menu_target .title').on(clickevent,function(){
				goBack();
			});
			if(getHash2()){
				$('#div').fadeOut('fast',function(){
					$('#menu_target').fadeIn('fast');
				});
			}else{
				$('#menu_target').fadeOut('fast',function(){
					$('#div').fadeIn('fast');
				});
			}
			$('.category').click(function(){
				if(!searching_drinks){
					drinks = true;
					searching_drinks=true;
					$('.category').removeClass('active');
					$(this).addClass('active');
					//Search on server
					result = "<li><span>NOMBRE</span><span>BOTELLA</span><span>COPA</span></li>";
					$("#menu_target_list .scroller").html(result);
					search_drink=$(this).attr('id');
					$.ajax({
						url: "http://www.tuquinielita.com/lacantadabar/getProductsByType.php",
						dataType: "jsonp",
						data: {type:search_drink},
						success: function (response) {
							if(response.success){
								searching_drinks=false;
								count = response.items.length;
								$.each(response.items,function (i,item) {
									result+="<li><span>"+item.name+"</span><span>"+item.price+"</span><span>"+item.drink+"</span></li>";
									if (!--count) {
											setLocationHash("#menu&"+search_drink);
											$("#menu_target_list .scroller").html(result);
											$('#menu_target .title').html(search_drink);
											if(carta_bebida){carta_bebida.refresh();carta_bebida.scrollTo(0,0,1500);}
									}
								});
							}else{
								searching_drinks=false;
							}
						},
						error: function(){
							searching_drinks=false;
						}
					});
				}
            });
		}
		function setup_inicio(){
			checarSlides("slides");
			checarSlides("promos");
			if(!$("#slides li").length){
				checarSlides("slides");
			}
			if(!$("#promos li").length){
				checarSlides("promos");
			}
			$('#facebook').on(clickevent,function(){
				var ref = window.open('https://www.facebook.com/GalleryPuebla', '_blank', 'location=no','closebuttoncaption=Cerrar');
				//ref.addEventListener('loadstart',function(event) { alert(event.url); });
			});
			$('#twitter').on(clickevent,function(){
				var ref = window.open('http://www.twitter.com/lacantadabar', '_blank', 'location=no','closebuttoncaption=Cerrar');
				//ref.addEventListener('loadstart',function(event) { alert(event.url); });
			});
			$('#location').on(clickevent,function(){
				var ref = window.open('https://www.google.com.mx/maps/@19.0173872,-98.2522782,20z?hl=en', '_blank', 'location=no','closebuttoncaption=Cerrar');
				//ref.addEventListener('loadstart',function(event) { alert(event.url); });
			});
		}
		function checarSlides(target){
			var prepend="";
			if(target=="slides"){
				type="1";
			}else{
				type="2";
			}
			$.ajax({
				url: "http://www.tuquinielita.com/lacantadabar/getAds.php",
				dataType: "jsonp",
				data: {type:type},
				timeout:3000,
				success: function (response) {
					count = response.items.length;
					$.each(response.items,function (i,item) {
						prepend+="<li><img src='http://www.tuquinielita.com/lacantadabar/" + item.path+ "'></img></li>";
						if (!--count) {
							//Si no se tiene previamente guardado en localStorage || locaStorage es diferente a lo obtenido o está vacío || no hay nada (ocurre al refresh)
							if(!localStorage.getItem(target)||localStorage.getItem(target)!=prepend||!$("#"+target+" li").length){
								localStorage.setItem(target,prepend);
								$("#"+target).html(prepend);
								setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},500);							
							}
						}
					});
				},
				error: function(objRequest,errortype){
					if(errortype == 'timeout'){
						$('#noconnection').fadeIn('fast');
						setTimeout(function(){$('#noconnection').fadeOut('fast');},1000);
					}
					console.log("entro ahorita");
					$("#"+target).html("<li><img src='img/"+target+"1.jpg'></img></li><li><img src='img/"+target+"2.jpg'></img></li>");
					setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},100);
				}
			});
		}
		function check_refresh(variable){}
		function setup_fotos(){
			if(typeof photolist == "undefined")
				photolist = new IScroll('#photo_list',{click: true,probeType:3,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
			result ="";
			$.ajax({
				url: "http://www.tuquinielita.com/lacantadabar/getPics.php",
				dataType: "jsonp",
				success: function (response) {
					count = response.items.length;
					$.each(response.items,function (i,item) {
						result+="<img src='"+item.path+"'></img>";
						if (!--count) {
							$("#photo_list .scroller").append(result);
							$("#photo_list .scroller img").click(function(e) {
								$("#photo_list .scroller img").removeClass('active');
								$(this).addClass('active');
							});
							photolist.refresh();
							//Onload load first image by clicking on it
							$('#photo_list .scroller img:first-child').click();
						}
					});
				},
				error: function(){
					alert("error");
					setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},100);
				}
			});
			//Setup lazyload on img.lazy and photo list container
			/*$("img.lazy").lazyload({
				effect : "fadeIn",
				container: $('#photo_list')
			});
			*/
			//Setup click action on img.lazy
			
			
			//Setup Photo List iScroll
			loading = false;
			/*photolist.on('scroll', function(){
				if(!loading&&this.y<this.maxScrollY){
					loading = true;
					result="";
					$.ajax({
						url: "http://www.tuquinielita.com/lacantadabar/getPics.php",
						dataType: "jsonp",
						success: function (response) {
							count = response.items.length;
							$.each(response.items,function (i,item) {
								result+="<li><img src='"+item.path+"'></img></li>";
								if (!--count) {
										$("#photo_list .scroller").append(result);
										photolist.refresh();
								}
							});
						},
						error: function(){
							alert("error");
							setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},100);
						}
					});
					setTimeout(function(){
						loading = false;
						//Setup click action on img.lazy
						$("img.lazy").click(function(e) {
							var data = $(this).attr('data-original');
							$('#photo_show').animate({opacity:0},'10',function(){
								$('#photo_show').css('background-image','url('+data+')');
								$('#photo_show').animate({opacity:1},'10');
							});
						});
					},2500);
				}
			});
			photolist.on('scrollEnd', function(){
				if (this.y == this.maxScrollY){
				}
			});*/
			
		}
		function setup_info(){
			if (typeof info == 'undefined') {
				info = new IScroll('#info_container',{click: true,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
			}
			$.ajax({
				url: "http://www.tuquinielita.com/lacantadabar/getInfo.php",
				dataType: "jsonp",
				data:{branch:1},
				success: function (response) {
					if(response.success){
						if($('#branch_description').html()!=response.description)
							$('#branch_description').html(response.description);
						if($('#branch_location').html()!=response.location)
							$('#branch_location').html(response.location);
						if($('#branch_schedule').html()!=response.schedule)
							$('#branch_schedule').html(response.schedule);
						if($('#branch_phones').html()!=response.phones)
							$('#branch_phones').html(response.phones);
						if($('#branch_image').attr('src')!="http://tuquinielita.com/lacantadabar/"+response.image_path)
							$('#branch_image').attr('src',"http://tuquinielita.com/lacantadabar/"+response.image_path);
						info.refresh();
					}
				},
				error: function(){
					alert("error");
					setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},100);
				}
			});
		}
		function getLocationHash () {
		  return window.location.hash.substring(1).split("&")[0];
		}
		function getHash2(){
			if(typeof window.location.hash.substring(1).split("&")[1] == "undefined")
				return false;
			return true;
		}
		function setLocationHash(str) {
		  window.location.hash = str;
		}
		
		window.onhashchange = function(e) {
		  updateMyApp(getLocationHash());
		};
		
		window.onload = function(e){
			updateMyApp(getLocationHash());
		};
    }
};

function imgError(image){
	//image.onerror = "";
	source = image.src;
	if(source==null){
		image.src = "img/cover.jpg"; //Reemplazar con imagen del hashtag
		//$(image).attr("src","http://www.hashtagalbum.com/images/no_image.jpg");
	}else if(source.substr(source.length-3,source.length)=="234"){
		image.src = "img/cover.jpg"; //Reemplazar con imagen del hashtag
		//$(image).attr("src","http://www.hashtagalbum.com/images/no_image.jpg");
	}else{
		image.src = source+"?1234";
		//$(image).attr("src",source+"?234");			
	}
	return true;
}
function goBack(){
    if (typeof (navigator.app) !== "undefined") {
        navigator.app.backHistory();
    } else {
        window.history.back();
    }
}