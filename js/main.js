

window.addEventListener('load', ready)
function ready() {

	(function(){

		var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		w = canvas.width = innerWidth,
		h = canvas.height = innerHeight,
		particles = [],
		properties = {
			bgColor             : 'rgba(255, 255, 255, 1)',
			particleColor       : 'rgba(121, 151, 158, 1)',
			particleRadius      : 3,
			particleCount       : 35,
			particleMaxVelocity : 0.5,
			lineLength          : 150,
			particleLife        : 6,
		};
	
		document.querySelector('.pageBg').appendChild(canvas);
	
		window.onresize = function(){
			w = canvas.width = innerWidth,
			h = canvas.height = innerHeight;        
		}
	
		class Particle{
			constructor(){
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.life = Math.random()*properties.particleLife*60;
			}
			position(){
				this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
				this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
				this.x += this.velocityX;
				this.y += this.velocityY;
			}
			reDraw(){
				ctx.beginPath();
				ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
				ctx.closePath();
				ctx.fillStyle = properties.particleColor;
				ctx.fill();
			}
			reCalculateLife(){
				if(this.life < 1){
					this.x = Math.random()*w;
					this.y = Math.random()*h;
					this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
					this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
					this.life = Math.random()*properties.particleLife*60;
				}
				this.life--;
			}
		}
	
		function reDrawBackground(){
			ctx.fillStyle = properties.bgColor;
			ctx.fillRect(0, 0, w, h);
		}
	
		function drawLines(){
			var x1, y1, x2, y2, length, opacity;
			for(var i in particles){
				for(var j in particles){
					x1 = particles[i].x;
					y1 = particles[i].y;
					x2 = particles[j].x;
					y2 = particles[j].y;
					length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
					if(length < properties.lineLength){
						opacity = 1-length/properties.lineLength;
						ctx.lineWidth = '0.5';
						ctx.strokeStyle = 'rgba(121, 151, 158, '+opacity+')';
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		}
	
		function reDrawParticles(){
			for(var i in particles){
				particles[i].reCalculateLife();
				particles[i].position();
				particles[i].reDraw();
			}
		}
	
		function loop(){
			reDrawBackground();
			reDrawParticles();
			drawLines();
			requestAnimationFrame(loop);
		}
	
		function init(){
			for(var i = 0 ; i < properties.particleCount ; i++){
				particles.push(new Particle);
			}
			loop();
		}
	
		init();
	
	}())
	
	if (document.documentElement.clientWidth > 700 && document.documentElement.clientHeight > 700) {
		$("#sections").fullpage({
			anchors:['home1', 'foreword1', 'about1', 'news1', 'comments1', 'contact1'],
		});
		$('.slider').slick({
			arrows:false,
			speed:1000,
			infinite: true,
			initialSlide: 0,
			autoplay:true,
			autoplaySpeed: 1000,
			pauseOnHover: false,
			pauseOnFocus: false,
			variableWidth: true,
			touchMove: true
		});

		document.querySelector('.preloader').classList.add('_active')

		{
			let menuStat = 0;
			pages()
		
			
			let menuOpenStat = 0;
	
			window.addEventListener('keyup', closeKey);
			function closeKey(event) {
				if (menuStat === 1 && event.code == 'Escape'){
					menuStat = 0;
					closeMenuDel();
				}
			}

			document.querySelector('.menu__fullpage').addEventListener('click', function (e) {
				if (String(e.srcElement.className) == 'menu__fullpage _active') {
					menuStat = 0;
					closeMenuDel();
				}	
			})
	
			document.querySelector('.header__menu').addEventListener('click', function() {
				if (menuOpenStat === 0) {
					this.style.transform = 'rotateX(-90deg)';
					document.querySelector('.header__menu').style.color = '#fff';
					menuOpenStat = 1;
					openMenu();
				}
				else {
					document.querySelector('.header__menu').style.color = 'rgb(1, 52, 133)';
					closeMenuDel();
				}
				
			});
		
			function closeMenuDel() {
				setTimeout(() => {
					document.querySelector('.header__menu').style.transform = 'rotateX(0)';
					document.querySelector('.header__menu').style.color = 'rgb(1, 52, 133)';
					menuOpenStat = 0;
				}, 500);
				let menuItems = document.querySelectorAll('.menu__link');
						let i = 0
				
						let open = setInterval(function() {
							if (i<menuItems.length) {
								menuItems[i].classList.remove('_active');
								i++;
							}
							else {
								clearInterval(open);
							}
						}, 100)
						setTimeout(() => {
							document.querySelector('.menu__list').classList.remove('_active');
						}, 300);
						
						setTimeout(() => {
							closeMenu();
						}, 800);
			}
		
			function openMenu() {
				document.querySelector('.menu__fullpage').classList.add('_active');
				setTimeout(() => {
					document.querySelector('.menu__list').classList.add('_active');
				}, 700);
				let pageName = document.querySelector('.section.active').getAttribute('ID');
						document.querySelector('.' + pageName).classList.remove('_active');
						$(function()
								{
									$('#fullpage').fullpage({
									});
		
									$.fn.fullpage.setMouseWheelScrolling(false);
									$.fn.fullpage.setAllowScrolling(false);
								});
						switch (pageName) {
							case 'home':
								document.querySelector('.home__title').classList.remove('_active')
								document.querySelector('.home__subtitle').classList.remove('_active')
								document.querySelector('.home__bgImg').classList.add('_off')
								break;
				
							case 'foreword':
								document.querySelector('.foreword__title').classList.remove('_active')
								document.querySelector('.foreword__text').classList.remove('_active')
									document.querySelector('.foreword__imgBg').classList.remove('_active')
								break;
						
							case 'about':
								
								break;
				
							case 'news':
								
								break;
				
							case 'contact':
								
								break;
						}
		
						let menuItems = document.querySelectorAll('.menu__link');
						let i = 0
				
		
						setTimeout(() => {
							let open = setInterval(function() {
								if (i<menuItems.length) {
									menuItems[i].classList.add('_active');
									i++;
								}
								else {
									clearInterval(open);
								}
							}, 100)
						}, 600);
						
						menuStat = 1
			}
			function closeMenu() {
				
		
				
				document.querySelector('.menu__fullpage').classList.remove('_active')
				let pageName = document.querySelector('.section.active').getAttribute('ID');
						document.querySelector('.' + pageName).classList.add('_active');
						$(function()
								{
									$('#fullpage').fullpage({
									});
		
									$.fn.fullpage.setMouseWheelScrolling(true);
									$.fn.fullpage.setAllowScrolling(true);
								});
						menuStat = 0
						pages();
		
						
			}
		
			document.querySelectorAll('.menu__item').forEach(function (e) {
				e.addEventListener('click', closeMenuDel);
			})
		
			document.querySelector('.preloader').classList.add('_active')
			window.addEventListener('load', pages);
			window.addEventListener('wheel', pages);
			window.addEventListener('keydown', pages);
			document.querySelector('.header__navigation').addEventListener('click', pages);
			
			function pages() {
				if (menuStat == 0) {
					setTimeout(() => {
						document.querySelectorAll('._section').forEach(function (e) {
							e.classList.remove('_active');
						})
						let pageName = document.querySelector('.section.active').getAttribute('ID');
							document.querySelector('.' + pageName).classList.add('_active');
				
						document.querySelectorAll('.navigation__link').forEach(function (e) {
							e.classList.remove('_active');
						})
							document.querySelector('.navigation__link._' + pageName).classList.add('_active');
						
						if (pageName === 'foreword') {
							document.querySelector('.navigation__link._active').classList.add('_F');
						}
						else{
						}
				
				
						switch (pageName) {
							case 'home':
								document.querySelector('.foreword__title').classList.remove('_active')
								document.querySelector('.foreword__text').classList.remove('_active')
								document.querySelector('.foreword__img').classList.remove('_active')
								document.querySelector('.foreword__imgBg').classList.remove('_active')
								document.querySelector('.home__title').classList.add('_active')
								document.querySelector('.home__subtitle').classList.add('_active')
								document.querySelector('.home__bgImg').classList.remove('_off')
								break;
				
							case 'foreword':
								document.querySelector('.foreword__title').classList.add('_active')
								document.querySelector('.foreword__text').classList.add('_active')
								document.querySelector('.foreword__img').classList.add('_active')
								setTimeout(() => {
									document.querySelector('.foreword__imgBg').classList.add('_active')
								}, 1000);
								document.querySelector('.home__title').classList.remove('_active')
								document.querySelector('.home__subtitle').classList.remove('_active')
								break;
						
							case 'about':
								document.querySelector('.foreword__title').classList.remove('_active')
								document.querySelector('.foreword__text').classList.remove('_active')
								document.querySelector('.foreword__img').classList.remove('_active')
								document.querySelector('.foreword__imgBg').classList.remove('_active')
								document.querySelector('.home__title').classList.remove('_active')
								document.querySelector('.home__subtitle').classList.remove('_active')
								
								break;
				
							case 'news':
								document.querySelector('.foreword__title').classList.remove('_active')
								document.querySelector('.foreword__text').classList.remove('_active')
								document.querySelector('.foreword__img').classList.remove('_active')
								document.querySelector('.foreword__imgBg').classList.remove('_active')
								document.querySelector('.home__title').classList.remove('_active')
								document.querySelector('.home__subtitle').classList.remove('_active')
								
								break;
				
							case 'contact':
								document.querySelector('.foreword__title').classList.remove('_active')
								document.querySelector('.foreword__text').classList.remove('_active')
								document.querySelector('.foreword__img').classList.remove('_active')
								document.querySelector('.foreword__imgBg').classList.remove('_active')
								document.querySelector('.home__title').classList.remove('_active')
								document.querySelector('.home__subtitle').classList.remove('_active')
								
								break;
						}
					}, 500);
				}
				
			}
			
			  document.querySelectorAll('.tab__link').forEach(function (e) {
				  e.addEventListener('click', function tab() {
		
					document.querySelectorAll('.tab__link').forEach(function (element) {
						element.classList.remove('_open');
					})
					e.classList.add('_open')
		
					switch (e.getAttribute('id')) {
						case 'Singapore-open':
							document.querySelectorAll('.tab__item').forEach(function (e) {
								e.classList.remove('_active')
							})
							document.querySelector('#Singapore').classList.add('_active');
							break;
					
						case 'Uzbekistan-open':
							document.querySelectorAll('.tab__item').forEach(function (e) {
								e.classList.remove('_active')
							})
							document.querySelector('#Uzbekistan').classList.add('_active');
							break;
					}
				});
			  })
		  };	
	}
	else {
		document.querySelector('.preloader').classList.add('_active')
		document.querySelector('.foreword__title').classList.add('_active')
		document.querySelector('.foreword__text').classList.add('_active')
		document.querySelector('.foreword__img').classList.add('_active')
		document.querySelector('.foreword__imgBg').classList.add('_active')
		document.querySelector('.home__title').classList.add('_active')
		document.querySelector('.home__subtitle').classList.add('_active')
		document.querySelectorAll('._section').forEach(function (e) {
			e.classList.add('_active');
		})

		let menuStat = 0;
		let menuOpenStat = 0;
		document.querySelector('.header__menu').addEventListener('click', function() {
			if (menuOpenStat === 0) {
				this.style.transform = 'rotateX(-90deg)';
				document.querySelector('.header__menu').style.color = '#fff';
				menuOpenStat = 1;
				openMenu();
			}
			else {
				document.querySelector('.header__menu').style.color = 'rgb(1, 52, 133)';
				closeMenuDel();
			}
		});

		function openMenu() {
			document.querySelector('.menu__fullpage').classList.add('_active');
			document.querySelector('.menu__list').classList.add('_active');
			let menuItems = document.querySelectorAll('.menu__link');
			let i = 0
			
			setTimeout(() => {
				let open = setInterval(function() {
					if (i<menuItems.length) {
						menuItems[i].classList.add('_active');
						i++;
					}
					else {
						clearInterval(open);
					}
				}, 100)
			}, 400);

			menuStat = 1
		}

		function closeMenuDel() {
			setTimeout(() => {
				document.querySelector('.header__menu').style.transform = 'rotateX(0)';
				menuOpenStat = 0;
			}, 500);
			let menuItems = document.querySelectorAll('.menu__link');
			let i = 0
			
			let open = setInterval(function() {
				if (i<menuItems.length) {
					menuItems[i].classList.remove('_active');
					i++;
				}
				else {
					clearInterval(open);
				}
			}, 100)
	
			setTimeout(() => {
				closeMenu();
			}, 500);
		}

		function closeMenu() {
			document.querySelector('.menu__list').classList.remove('_active');
			document.querySelector('.menu__fullpage').classList.remove('_active')
			menuStat = 0		
		}

		document.querySelectorAll('.menu__link').forEach(function(e) {
			let linkName = e.textContent;
			e.href = String('#' + linkName);
		})

		document.querySelectorAll('.menu__item').forEach(function (e) {
			e.addEventListener('click', closeMenuDel);
		})

		document.querySelectorAll('.tab__link').forEach(function (e) {
			e.addEventListener('click', function tab() {
  
			  document.querySelectorAll('.tab__link').forEach(function (element) {
				  element.classList.remove('_open');
			  })
			  e.classList.add('_open')
  
			  switch (e.getAttribute('id')) {
				  case 'Singapore-open':
					  document.querySelectorAll('.tab__item').forEach(function (e) {
						  e.classList.remove('_active')
					  })
					  document.querySelector('#Singapore').classList.add('_active');
					  break;
			  
				  case 'Uzbekistan-open':
					  document.querySelectorAll('.tab__item').forEach(function (e) {
						  e.classList.remove('_active')
					  })
					  document.querySelector('#Uzbekistan').classList.add('_active');
					  break;
			  }
		  });
		})
	}

	//отправка формы 

const form = document.querySelector('form');
form.addEventListener('submit', formSend);

async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('qwerty',Date());

    if (error === 0) {
        document.querySelector('.header__callback').classList.add('__sending');
        let response = await fetch('mail.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            let result = await response.json();
            form.reset();
            document.querySelector('.header__callback').classList.remove('__sending');
        }
        else {
            alert('Ошибка');
            document.querySelector('.header__callback').classList.remove('__sending');
        }
    }
    else {
        alert('Заполни поля');
    }

}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input)

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        }
        if (input.value === '') {
            formAddError(input);
                error++;
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value)
}

}


