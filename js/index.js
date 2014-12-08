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
	"img/splash.jpg",
	"img/popup.png",
	"img/popup1.png",
	"img/inicio-inactivo.jpg",
	"img/cancionero-activo.jpg",
	"img/menu-activo.jpg",
	"img/fotos-activo.jpg",
	"img/info-activo.jpg",
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
		navigator.splashscreen.hide();
		//menu2 = new IScroll('#menu2',{click: true,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
		updateMyApp("inicio");
		setTimeout(function(){
			$('#splash').fadeOut(function(){
				StatusBar.overlaysWebView(true);
				StatusBar.show();
				//$('.outer-nav a').noClickDelay();
			});
		},3000);
		
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
		function updateMyApp(page) {
			$('.container').click();
			if(page=="") page="inicio";
			$('nav a').removeClass('active');
		  	$('#nav_'+page).addClass('active');
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
						break;
						case 'fotos':
						break;
					}
				});
			});
			setLocationHash(page);
		}

		function search_all(){}
		function setup_menu(){
			menu = new IScroll('#menu',{click: true,scrollbars: true,interactiveScrollbars: true,shrinkScrollbars: 'scale',fadeScrollbars: true});
			menu.on('scroll', function(){
				y=this.y;
				console.log(y);
			});
			setTimeout(function(){
				menu.scrollTo(0,100,500);
			},1000);
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
								setTimeout(function(){if(target=="slides"){slides.reloadSlider();}else{promos.reloadSlider();}},100);
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
		function setup_fotos(){}
		function setup_info(){}
		function getLocationHash () {
		  return window.location.hash.substring(1);
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