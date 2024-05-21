// const server = 'https://eventline.accredcenter.ru';
const days = [{"date":"21.04.2024","day":"воскресенье"},
			  {"date":"22.04.2024","day":"понедельник"},
			  {"date":"23.04.2024","day":"вторник"},
			  {"date":"24.04.2024","day":"среда"},
			  {"date":"00","day":"Все мероприятия"}];
var treks = [];
var trekTab = '';

function genTabsSchedule() {
	
	for (let i = 0; i < days.length; i++) {
		genDayTab(days[i],i); 
		genDayContent(days[i],i);
	}
	
}

function genTrekTab(obj,i) {
	if (i) {
		$('.programm__subtabs-track').append('<div class=\"programm__subtabs__item-track\" onclick=\"toTrekTab(\'' + obj.id + '\');\"><a id=\"subtab-trek-' + obj.id + '\" class=\"\" style=\"\"><svg width="14" height="20" class="ico-svg" style="fill:' + obj.color + '"><use xlink:href="./img/svg/ico-track.svg#ico-track"></use></svg>' + obj.name + '</a></div>');
	} else {
		$('.programm__subtabs-track').append('<div class=\"programm__subtabs__item-track\" onclick=\"toTrekTab(\'' + obj.id + '\');\"><a id=\"subtab-trek-' + obj.id + '\" class=\"active\" style=\"\"><svg width="14" height="20" class="ico-svg" style="fill:' + obj.color + '"><use xlink:href="./img/svg/ico-track.svg#ico-track"></use></svg>' + obj.name + '</a></div>');
	}
};

function genTrekContent(obj,i) {
	if (i) {
		$('#treks-programm').append('<div class=\"subtab-content disable\" id=\"subtab-content2-' + obj.id + '\"><div id=\"cards-trek-' + obj.id + '\" class=\"programm-list\"></div></div>');
	} else {
		$('#treks-programm').append('<div class=\"subtab-content\" id=\"subtab-content2-' + obj.id + '\"><div id=\"cards-trek-' + obj.id + '\" class=\"programm-list\"></div></div>');
	}
};

function genDayTab(obj,i) {
	if (i) {
		$('#tabs-dates').append('<div class=\"programm__subtabs__item-date\" onclick=\"toDateTab(\'' + obj.date.replace(/[.]/gi,'-') + '\');\"><a id=\"tabs-dates-' + obj.date.replace(/[.]/gi,'-') + '\" class=\"\">'+`${obj.date=='00'? '':obj.date + ' – '}`+ obj.day + '</a></div>');
	} else {
		$('#tabs-dates').append('<div class=\"programm__subtabs__item-date\" onclick=\"toDateTab(\'' + obj.date.replace(/[.]/gi,'-') + '\');\"><a id=\"tabs-dates-' + obj.date.replace(/[.]/gi,'-') + '\" class=\"active\">' + obj.date + ' – ' + obj.day + '</a></div>');
	}
};

function genDayContent(obj,i) {
	if (i) {
		$('#dates-programm').append('<div class=\"subtab-content disable\" id=\"subtab-content1-' + obj.date.replace(/[.]/gi,'-') + '\"><div id=\"cards-' + obj.date.replace(/[.]/gi,'-') + '\" class=\"programm-list\"></div></div>');
	} else {
		$('#dates-programm').append('<div class=\"subtab-content\" id=\"subtab-content1-' + obj.date.replace(/[.]/gi,'-') + '\"><div id=\"cards-' + obj.date.replace(/[.]/gi,'-') + '\" class=\"programm-list\"></div></div>');
	}
};

$.getJSON(server + "/json/treks.json", function (json) {
    treks = json;
	treks.sort(function(a, b) {
		return parseFloat(a.id) - parseFloat(b.id);
	});
	console.log(treks);
	trekTab = treks[0].id;
	for (let i = 0; i < treks.length; i++) {
		genTrekTab(treks[i],i); 
		genTrekContent(treks[i],i);
	}
	genSchedule();
});

genTabsSchedule();
var mainTab = 'tab-date';
var dateTab = days[0].date.replace(/[.]/gi,'-');


function toMainTab(tabid) {
	document.getElementById(mainTab).classList.toggle('active');
	document.getElementById(tabid).classList.toggle('active');
	document.getElementById(mainTab + '-content').classList.toggle('disable');
	document.getElementById(tabid + '-content').classList.toggle('disable');
	mainTab = tabid;
	initSlider();
}

function toDateTab(tabid) {
	document.getElementById('tabs-dates-' + dateTab).classList.toggle('active');
	document.getElementById('tabs-dates-' + tabid).classList.toggle('active');
	document.getElementById('subtab-content1-' + dateTab).classList.toggle('disable');
	document.getElementById('subtab-content1-' + tabid).classList.toggle('disable');
	dateTab = tabid;
	initSlider();
}

function toTrekTab(tabid) {
	document.getElementById('subtab-trek-' + trekTab).classList.toggle('active');
	document.getElementById('subtab-trek-' + tabid).classList.toggle('active');
	document.getElementById('subtab-content2-' + trekTab).classList.toggle('disable');
	document.getElementById('subtab-content2-' + tabid).classList.toggle('disable');
	trekTab = tabid;
	initSlider();
}

