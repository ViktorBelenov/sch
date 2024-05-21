
const FIELDS = {
	'concent' : {
		'field': 12968,
		'yes': 1442728
	},
	'categories' : {
		'field': 13140,
		'vip': 1442995,
		'staff': 1442998
	},
	'sources': {
		'field': 13279,
		'vip_uzb_ru': 1443917,
		'vip_uzb_en': 1443916
	},

	'registrationLink' : 37221,
};

const blocks={
	"#profile":"5630",
	"#participants":"5631",
	"#pay":"5633",
	"#invitations":"5635"
};


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
	return window.a5000_platform.translation.store.getState()      .currentFormRecord.data.value.entity.getFormFieldValue({value: field})
	.filter(v => (
		v.value.id
		&& v.value.id[0]
		&& v.value.id.some(childId => childId.value == valueExpected)
	)).nonEmpty();
};
//функция проверки ссылки, id поля ссылки сохранено в FIELDS.registrationLink
function isRegistrationLinkExpected (link) {
	return window.a5000_platform.blockSwitch.store.getState().currentFormRecord.data.map(d => d.entity.values).collect(v => v["FIELDS.registrationLink"] ? v["FIELDS.registrationLink"].value.toString() : null).getOrElse(() => "") == link;
}



function onA5000Login() {
	togClass('#exit','disable');
	togClass('#exit-mob','disable');
	  //Проверка на массовое согласие 
	if (isFieldValueExpected(FIELDS.concent.field, FIELDS.concent.yes)) {	
		//Проверка на випа, показывать оплату или нет
		if (!isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.vip) || 
			isFieldValueExpected(FIELDS.sources.field, FIELDS.sources.vip_uzb_en) || 
			isFieldValueExpected(FIELDS.sources.field, FIELDS.sources.vip_uzb_ru)) {
			// Если не вип скрываем оплату
			togClass('#pay','disable');
			togClass('#pay-mob','disable');
		};

	//Проверка на staff, показывать приглашения или нет
	if (isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.staff)) {
			// Если staff скрываем приглашения
			togClass('#invitations','disable');
			togClass('#invitations-mob','disable');
		};
	// показываем меню т.к массовое согласие - да
		togClass('.toggle-menu','disable');
		togClass('.header-menu','disable');
		window.location.reload();
	}
	togClass('#profile','active');
	togClass('#profile-mob','active');
	localStorage.setItem("active_tab",'#profile');
	window.location.hash = '#profile';
}

function onA5000AuthChecked() {
	

	togClass('#exit','disable');
	togClass('#exit-mob','disable');
	// console.log(!isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.vip));

	if (isFieldValueExpected(FIELDS.concent.field, FIELDS.concent.yes)) {
		if (!isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.vip) || 
			isFieldValueExpected(FIELDS.sources.field, FIELDS.sources.vip_uzb_en) || 
			isFieldValueExpected(FIELDS.sources.field, FIELDS.sources.vip_uzb_ru)) {
			// Если не вип скрываем оплату
			togClass('#pay','disable');
			togClass('#pay-mob','disable');
		};
	}

	//Проверка на staff, показывать приглашения или нет
	if (isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.staff)) {
			// Если staff скрываем приглашения
			togClass('#invitations','disable');
			togClass('#invitations-mob','disable');
		};

		togClass('.toggle-menu','disable');
		togClass('.header-menu','disable');
		
	if (window.location.hash == '#pay' && isFieldValueExpected(FIELDS.categories.field, FIELDS.categories.vip)) {
		toMenuTab('#pay');
    } else {
		toMenuTab(localStorage.getItem('active_tab'));
		};
  

}

function toMenuTab(MenuTab) {
	window.location.hash = MenuTab;
	window.a5000_platform.blockSwitch.changeBlock(blocks[MenuTab]); 
	if (!!localStorage.getItem("active_tab") && (localStorage.getItem("active_tab") != '')) {
	  removeClass(localStorage.getItem("active_tab"),'active')
	  removeClass(localStorage.getItem("active_tab") + '-mob','active');
	  
	  togClass(MenuTab,'active');
	  togClass(MenuTab, + '-mob','active');
	}
	localStorage.setItem("active_tab",MenuTab);
  }

function removeClass(selector, classToRemove) {
	document.querySelector(selector).classList.remove(classToRemove);
}

function exit() {
	localStorage.clear(); 
	window.location.reload();
}

function togClass(selector, classToToggle) {
	document.querySelector(selector).classList.toggle(classToToggle)
}