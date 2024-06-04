// const link_vip_kz_ru = "https://expo.russiaqazaqstan.ru/registration/vip-kz-swaikl"
// const link_vip_kz_en = "https://expo.russiaqazaqstan.com/vip-kz-qhjmsz";

const id = '1443945';


const FIELDS = {
	'concent' : {
		'field': 37178,
		'yes': 9481706
	},
	'categories' : {
		'field': 13017,
		'vip': 1442995,
		'volunteer': 1442999
	},

	'registrationLink' : 37221,
};

const blocks={
	"#profile":"5450",
	"#programm":"5583",
	"#invitations":"5589"
};

localStorage.setItem("active_tab",'');

!(function($) {
    "use strict";


    $(document).on('click', '.js-toggle', function(e) {
    	e.preventDefault();
		$('.js-toggle-nav').addClass('show');
		$('body').addClass('toggle-on');
		
    });

    $(document).on('click', '.js-toggle-close', function(e) {
    	e.preventDefault();
		$('.js-toggle-nav').removeClass('show');
		$('body').removeClass('toggle-on');
		
    });


})(jQuery);

//функция проверки значения поля
function isFieldValueExpected(field, valueExpected) {
  return window.a5000_platform.translation.store.getState().currentFormRecord.data.value.entity.getFormFieldValue({value: field}).filter(v => v.value.id && v.value.id[0] && v.value.id[0].value == valueExpected).nonEmpty();
};
//функция проверки ссылки, id поля ссылки сохранено в FIELDS.registrationLink
function isRegistrationLinkExpected (link) {
	return window.a5000_platform.blockSwitch.store.getState().currentFormRecord.data.map(d => d.entity.values).collect(v => v["FIELDS.registrationLink"] ? v["FIELDS.registrationLink"].value.toString() : null).getOrElse(() => "") == link;
}

function isCorrectId(id) {
	return window.a5000_platform.translation.store.getState().currentFormRecord.data.value.id.value === id;

}

function onA5000Login() {
	togClass('#exit','disable');
	togClass('#exit-mob','disable');
		
		

		//Проверка на волонтера, показывать приглашения или нет
		if (isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.volunteer)) {
			// Если волонтер скрываем приглашения
			togClass('#invitations','disable');
			togClass('#invitations-mob','disable');
		};

		// //Проверка на тестовый id
		// if (!isCorrectId(id)) {
		// 	// Если не тестовый id, скрываем расписание
		// 	togClass('#programm','disable');
		// 	togClass('#programm-mob','disable');
		// };

		// показываем меню т.к массовое согласие - да
		togClass('.toggle-menu','disable');
		togClass('.header-menu','disable');
		
	
	togClass('#profile','active');
	togClass('#profile-mob','active');
	localStorage.setItem("active_tab",'#profile');

	myId = window.a5000_platform.translation.store.getState().currentFormRecord.data.value.id.value;
	console.log(myId);
	getEvents();
}

function onA5000AuthChecked() {
	togClass('#exit','disable');
	togClass('#exit-mob','disable');
	
		

		//Проверка на волонтера, показывать приглашения или нет
		if (isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.volunteer)) {
			// Если волонтер скрываем приглашения
			togClass('#invitations','disable');
			togClass('#invitations-mob','disable');
		};

		// //Проверка на тестовый id
		// if (!isCorrectId(id)) {
		// 	// Если не тестовый id, скрываем расписание
		// 	togClass('#programm','disable');
		// 	togClass('#programm-mob','disable');
		// };

		togClass('.toggle-menu','disable');
		togClass('.header-menu','disable');
		
	
	togClass('#profile','active');
	togClass('#profile-mob','active');
	localStorage.setItem("active_tab",'#profile');
		
	// if (window.location.hash == '#pay' && isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.vip)) {
	// 	toMenuTab('#pay');
  //   } else {
	// 		toMenuTab(localStorage.getItem("active_tab"));
	// 	};

	// myId = window.a5000_platform.translation.store.getState().currentFormRecord.data.value.id.value;
	// console.log(myId);
	getEvents();
  
}

function toMenuTab(MenuTab) {
	window.location.hash = MenuTab;
	window.a5000_platform.blockSwitch.changeBlock(blocks[MenuTab]); 
	if (MenuTab == '#programm') {
		document.querySelector('#schedule-main').classList.remove('disable');
	} else {
		document.querySelector('#schedule-main').classList.add('disable');
	}
	if (!!localStorage.getItem("active_tab") && (localStorage.getItem("active_tab") != '')) {
        removeClass(localStorage.getItem("active_tab"),'active');
		removeClass(localStorage.getItem("active_tab") + '-mob','active');
		
		togClass(MenuTab,'active');
		togClass(MenuTab, + '-mob','active');
	}
	localStorage.setItem("active_tab",MenuTab);
}


document.querySelector('#schedule-main').classList.remove('disable');

function removeClass(selector, classToRemove) {
	document.querySelector(selector).classList.remove(classToRemove);
}

function exit() {
	localStorage.clear(); 
	window.location.reload();
}

function togClass(selector, classToToggle) {
	console.log(selector + ' ' + classToToggle);
	document.querySelector(selector).classList.toggle(classToToggle);
}

