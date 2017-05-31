$(document).ready(function () {
	window.cookieconsent.initialise({
		palette: {
	    popup: {
	      background: "#252e39"
    	},
    	button: {
      	background: "transparent",
      	text: "#14a7d0",
      	border: "#14a7d0"
    	}
	  }
	});

	particlesJS.load('sintro', 'assets/particles.json', function () {
		console.log('particles.js config loaded');
	});

	new Konami('https://www.youtube.com/watch?v=fJ9rUzIMcZQ');

	setCookie('first-part', '0', 1);
	setCookie('second-part', '0', 1);

	var s1Modal = false;
	var s2Modal = false;
	var s3Modal = false;

	$('#s1Modal').on('hidden.bs.modal', function () {
		if (!s1Modal) {
			$.fn.fullpage.silentMoveTo('humans', 0);
		}
	});

	$('#s2Modal').on('hidden.bs.modal', function () {
		if (!s2Modal) {
			$.fn.fullpage.silentMoveTo('humancomputers', 0);
		}
	});

	$('#s3Modal').on('hidden.bs.modal', function () {
		if (!s3Modal) {
			$.fn.fullpage.silentMoveTo('computers', 0);
		}
	});

	$('#fullpage').fullpage({
		menu: '#menu',
		slidesNavigation: true,
		scrollingSpeed: 350,
		loopHorizontal: false,
		onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
			try {
				if (slideIndex === 0 && direction === 'right') {
					if (index === 2 && !s1Modal) {
						$('#s1Modal').modal('show');
						return false;
					} else if (index === 3 && !s2Modal) {
						$('#s2Modal').modal('show');
						return false;
					} else if (index === 4 && !s3Modal) {
						var firstPart = getCookie('first-part');
						var secondPart = getCookie('second-part');

						if (firstPart === '1') {
							$('#first-part').text('yes');
						}
						if (secondPart === '1') {
							$('#second-part').text('yes');
						}
						$('#s3ModalBtn').prop('disabled', firstPart !== '1' || secondPart !== '1');
						$('#s3Modal').modal('show');
						return false;
					}
				}
			} catch (e) {
				console.error(e);
			}
		}
	});

	$('#s1ModalBtn').on('click', function () {
		s1Modal = true;
		$('#s1Modal').modal('hide');
		setCookie('first-part', '1', 1);
		$.fn.fullpage.moveSlideRight();
	});

	$('#s2ModalBtn').on('click', function () {
		s2Modal = true;
		$('#s2Modal').modal('hide');
		setCookie('second-part', '1', 1);
		$.fn.fullpage.moveSlideRight();
	});

	$('#s3ModalBtn').on('click', function () {
		s3Modal = true
		$('#s3Modal').modal('hide');
		$.fn.fullpage.moveSlideRight();
	});


	$('#s3ModalBtnCancel').on('click', function () {
		$('#s3Modal').modal('hide');
	});

	$('#login').on('input', checkLoginForm);
	$('#password').on('input', checkLoginForm);
});

function imNotARobot() {
	$('#s1ModalBtn').prop('disabled', false);
}

function checkLoginForm() {
	var login = $('#login');
	var password = $('#password');

	if (login.val() !== 'alan' || password.val() !== 'turing42') {
		login.closest('.form-group').removeClass('has-success');
		login.closest('.form-group').addClass('has-danger');
		password.closest('.form-group').removeClass('has-success');
		password.closest('.form-group').addClass('has-danger');
		$('#s2ModalBtn').prop('disabled', true);
	} else {
		login.closest('.form-group').addClass('has-success');
		login.closest('.form-group').removeClass('has-danger');
		password.closest('.form-group').addClass('has-success');
		password.closest('.form-group').removeClass('has-danger');
		$('#s2ModalBtn').prop('disabled', false);
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
  	while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
