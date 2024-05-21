// var myId = '1447023';
// console.log('myid ' + myId);
var myEvents = [];
var events = [];
const server = 'https://eventline.accreditation.ru';

//genTimeline();

/*function onA5000Login() {
	document.getElementById('schedule-main').classList.toggle('disable');
	myId = window.a5000_platform.translation.store.getState().currentFormRecord.data.value.id.value;
	console.log(myId);
	getEvents();
}

function onA5000AuthChecked() {
	document.getElementById('schedule-main').classList.toggle('disable');
	myId = window.a5000_platform.translation.store.getState().currentFormRecord.data.value.id.value;
	console.log(myId);
	getEvents();
}*/

function genSchedule() {
	$.getJSON(server + "/json/events.json", function (json) {
		events = json;
		console.log('до сортировки');
		console.log(events.map((a) => a.time_start));
		events.sort(function(a, b) {
			return parseFloat(a.time_start.replace(':','')) - parseFloat(b.time_start.replace(':',''));
		});
		events.sort(function(a, b) {
			return parseFloat(a.date) - parseFloat(b.date);
		});
		console.log('genSchedule');
		console.log(events);
		events.forEach(function(obj) { 
			genEventCardDate(obj); 
			genEventCardTrek(obj);
			genEventPopup(obj);
			genEventCardAll(obj);
		});
		initSlider();
	})
};


function getEvents() {
	console.log(server + '/api/getevents?id=' + myId);
	console.log(myId);
	var xhr = new XMLHttpRequest();
    xhr.open("GET", server + '/api/getevents?id=' + myId, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        Result = JSON.parse(this.responseText);
		console.log(Result);
		
        if (!!Result[0].id) {
			if (!!Result[0].events) {
				myEvents = Result[0].events;
			} else {
				myEvents = [];
			}
			console.log('myEvents');
			console.log(myEvents);

		  addMyEvents();
			genMyEvents();
		  initSlider();
        } 
    }

    xhr.send()

}

function changeEvent(eventId) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", server + '/api/changeevent?id=' + myId + '&eventid=' + eventId, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        Result = JSON.parse(this.responseText);
        console.log(Result);
				console.log('changeEvent');
        if (!!Result[0].id) {
			myEvents = Result[0].events;
			document.getElementById('card-date-' + eventId).classList.toggle('on');
			document.querySelector(`.card-all-${eventId}`).classList.toggle('on');
			// document.getElementById('card-trek-' + eventId).classList.toggle('on');
			document.getElementById('event-popup-' + eventId).classList.toggle('on');
			document.getElementById('add-' + eventId).classList.toggle('on');
			// document.getElementById('add-' + eventId).classList.toggle('disable');
			// document.getElementById('drop-' + eventId).classList.toggle('disable');
			document.getElementById('cards-on').innerHTML = '';
			genMyEvents();
			initSlider();
        } 
    }

    xhr.send()
}

function genEventCardDate(obj) {

	if (!!$('#card-date-' + obj.id)) {
		$('#card-date-' + obj.id).remove();
	}
	
	$('#cards-' + obj.date.replace(/[.]/gi,'-')).append('<div id=\"card-date-' + obj.id + '\" class=\"programm-card\" style="border-left-color: ' + obj.trek_color + ';" onclick=\"changeEvent(' + obj.id + ')\"><div class="programm-card__favorite"><svg width="16" height="17" class="ico-svg"><use xlink:href="../img/svg/ico-star.svg#ico-star"></use></svg><span class="favorite-on">В избранном</span><span class="favorite-off">В избранноe</span></div><div class="programm-card__time"><img src="../img/clock.svg" width="16" height="16" alt=""><div>' + obj.time_start + ' - ' + obj.time_end + '<div class="programm-card__date">' + obj.test_time + '</div></div></div><div class="programm-card__body"><div><div class="programm-card__category" style="color:' + obj.trek_color + ';">' + obj.trek + '</div><a class="programm-card__title modal-toggle-' + obj.id + '\" onclick=\"event.stopPropagation(); showHideModal(' + obj.id + '); window.scrollTo(0,0);\">' + obj.title + '</a><div class="programm-card__address"><i class="fa fa-map-marker'+ `${obj.hall!=''? '':'disabled'}` + '" aria-hidden="true"></i>' + `${obj.hall!=''? ''+ obj.hall:''}` + '</div></div><div class=\"programm-card__logo\"><div class=\"swiper swiper-container-horizontal\"><div class=\"swiper-wrapper\">' + obj.partner_logo.replace(/;/g,'') + '</div><div class=\"swiper-pagination\"></div></div></div></div></div>');

}

function genEventCardAll(obj) {
	// if (!!$('#card-date-' + obj.id)) {
	// 	$('#card-date-' + obj.id).remove();
	// }

	$('#cards-00').append('<div id=\"card-date-' + obj.id +'\" class=\"programm-card'+ ` card-all-${obj.id}`+ '\" style="border-left-color: ' + obj.trek_color + ';" onclick=\"changeEvent(' + obj.id + ')\"><div class="programm-card__favorite"><svg width="16" height="17" class="ico-svg"><use xlink:href="../img/svg/ico-star.svg#ico-star"></use></svg><span class="favorite-on">В избранном</span><span class="favorite-off">В избранноe</span></div><div class="programm-card__time"><img src="../img/clock.svg" width="16" height="16" alt=""><div>' + obj.time_start + ' - ' + obj.time_end + '<div class="programm-card__date">' + obj.test_time + '</div></div></div><div class="programm-card__body"><div><div class="programm-card__category" style="color:' + obj.trek_color + ';">' + obj.trek + '</div><a class="programm-card__title modal-toggle-' + obj.id + '\" onclick=\"event.stopPropagation(); showHideModal(' + obj.id + '); window.scrollTo(0,0);\">' + obj.title + '</a><div class="programm-card__address"><i class="fa fa-map-marker'+ `${obj.hall!=''? '':'disabled'}` + '" aria-hidden="true"></i>' + `${obj.hall!=''? ''+ obj.hall:''}` + '</div></div><div class=\"programm-card__logo\"><div class=\"swiper swiper-container-horizontal\"><div class=\"swiper-wrapper\">' + obj.partner_logo.replace(/;/g,'') + '</div><div class=\"swiper-pagination\"></div></div></div></div></div>');

}



function genEventCardTrek(obj) {
		
	if (!!$('#card-trek-' + obj.id)) {
		$('#card-trek-' + obj.id).remove();
	}
	
	$('#cards-trek-' + obj.trek_id).append('<div id=\"card-trek-' + obj.id + '\" class=\"programm-card\" style="border-left-color: ' + obj.trek_color + ';" onclick=\"changeEvent(' + obj.id + ')\"><div class="programm-card__favorite"><svg width="16" height="17" class="ico-svg"><use xlink:href="../img/svg/ico-star.svg#ico-star"></use></svg><span class="favorite-on">В избранном</span><span class="favorite-off">В избранноe</span></div><div class="programm-card__time"><img src="../img/clock.svg" width="16" height="16" alt=""><div>' + obj.time_start + ' - ' + obj.time_end + '<div class="programm-card__date">' + obj.test_time + '</div></div></div><div class="programm-card__body"><div><div class="programm-card__category" style="color:' + obj.trek_color + ';">' + obj.trek + '</div><a class="programm-card__title modal-toggle-' + obj.id + '\" onclick=\"event.stopPropagation(); showHideModal(' + obj.id + '); window.scrollTo(0,0);\">' + obj.title + '</a><div class="programm-card__address"><i class="fa fa-map-marker'+ `${obj.hall!=''? '':'disabled'}` + '" aria-hidden="true"></i>' + `${obj.hall!=''? ''+ obj.hall:''}` + '</div></div><div class=\"programm-card__logo\"><div class=\"swiper swiper-container-horizontal\"><div class=\"swiper-wrapper\">' + obj.partner_logo.replace(/;/g,'') + '</div><div class=\"swiper-pagination\"></div></div></div></div></div>');

}

function genEventCardMy(obj) {
		
	if (!!$('#card-my-' + obj.id)) {
		$('#card-my-' + obj.id).remove();
	}
	
	$('#cards-on').append('<div id=\"card-my-' + obj.id + '\" class=\"programm-card on\" style="border-left-color: ' + obj.trek_color + ';" onclick=\"changeEvent(' + obj.id + ')\"><div class="programm-card__favorite"><svg width="16" height="17" class="ico-svg"><use xlink:href="../img/svg/ico-star.svg#ico-star"></use></svg><span class="favorite-on">В избранном</span><span class="favorite-off">В избранноe</span></div><div class="programm-card__time"><img src="../img/clock.svg" width="16" height="16" alt=""><div>' + obj.time_start + ' - ' + obj.time_end + '<div class="programm-card__date">' + obj.test_time + '</div></div></div><div class="programm-card__body"><div><div class="programm-card__category" style="color:' + obj.trek_color + ';">' + obj.trek + '</div><a class="programm-card__title modal-toggle-' + obj.id + '\" onclick=\"event.stopPropagation(); showHideModal(' + obj.id + '); window.scrollTo(0,0);\">' + obj.title + '</a><div class="programm-card__address"><i class="fa fa-map-marker'+ `${obj.hall!=''? '':'disabled'}` + '" aria-hidden="true"></i>' + `${obj.hall!=''? ''+ obj.hall:''}` + '</div></div><div class=\"programm-card__logo\"><div class=\"swiper swiper-container-horizontal\"><div class=\"swiper-wrapper\">' + obj.partner_logo.replace(/;/g,'') + '</div><div class=\"swiper-pagination\"></div></div></div></div></div>');

}

function genEventPopup(obj) {
	if (!!$('#event-popup-' + obj.id)) {
		$('#event-popup-' + obj.id).remove();
	}
	$('.page').append('<div id=\"event-popup-' + obj.id + '\" class=\"modal\"><div class=\"modal-overlay modal-toggle-' + obj.id + '\" onclick=\"showHideModal(' + obj.id + ')\"></div><div class=\"modal-wrapper modal-transition\"><div class=\"modal-inner\"><button class=\"modal-close modal-toggle-' + obj.id + '\"  onclick=\"showHideModal(' + obj.id + ')\"><img src=\"../img/close.svg\" alt=\"\"></button><div class=\"modal-body\"><div class=\"event-modal\"><div id=\"add-' + obj.id + '\" onclick=\"changeEvent(' + obj.id + ')\" class=\"event-modal__add-favorite\"><svg width="16" height="17" class="ico-svg"><use xlink:href="../img/svg/ico-star.svg#ico-star"></use></svg><span class="favorite-on">В избранном</span><span class="favorite-off">В избранноe</span></div><div class=\"event-modal__title\">' + obj.title + '</div><div class=\"event-modal__body\"><div><div class=\"event-modal__category\"style="display:none;">Тематический трек</div><div class=\"event-modal__subtitle\" style=\"color:' + obj.trek_color + ';\">' + obj.trek + '</div><div class=\"event-modal__info\"><div class=\"event-modal__time\"><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i><div>' + obj.test_time + '<br>' + obj.time_start + ' - ' + obj.time_end + '</div></div><div class=\"event-modal__address\"><i class="fa fa-map-marker'+ `${obj.hall!=''? '':'disabled'}` + '" aria-hidden="true"></i>' + `${obj.hall!=''? ''+ obj.hall:''}` + '</div></div>' + obj.description + '</div><div class=\"event-modal__partner\"><div class=\"event-modal__partner__title'+`${obj.partner_img!=''? '':' disable'}`+ '\">Партнер мероприятия</div><div class=\"event-modal__partner__list\">' + obj.partner_img.replace(/;/g,'') + '</div></div></div></div></div></div></div></div>');
}

function addMyEvents() {
	console.log('addMyEvents');
	console.log(myEvents);
	for (let i = 0; i < myEvents.length; i++) {
		if (!!document.getElementById('card-date-' + myEvents[i])) {
			console.log('card-trek-' + myEvents[i]);
			document.getElementById('card-date-' + myEvents[i]).classList.toggle('on');
			document.querySelector('.card-all-' + myEvents[i]).classList.toggle('on');
			// document.getElementById('card-trek-' + myEvents[i]).classList.toggle('on');			
			document.getElementById('event-popup-' + myEvents[i]).classList.toggle('on');
			// document.getElementById('add-' + myEvents[i]).classList.toggle('on');
			document.getElementById('add-' + myEvents[i]).classList.toggle('disable');
			// document.getElementById('drop-' + myEvents[i]).classList.toggle('disable');
		}
	}
}

function genMyEvents() {
	events.forEach(function(obj) { 
		if (myEvents.includes(Number(obj.id))) {
			genEventCardMy(obj); 
		}
	});
	
}

function showHideModal(eventId) {
	document.getElementById('event-popup-' + eventId).classList.toggle('is-visible');
}

function initSlider() {
	var swiper = new Swiper(".swiper", {
		spaceBetween: 0,
		centeredSlides: true,
		watchOverflow: true,
		loop: false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
});
}
