const header = document.querySelector('.page-header');
const headerContent = document.querySelector('.menu__content');
const headerToggle = document.querySelector('.header__toggle');
const headerMenu = document.querySelector('.header__menu');
const form = document.querySelector('.form__container');
const formButton = document.querySelector('.header__button');
const formClosed = document.querySelector('.form__close');
const catalog = document.querySelector('.catalog');
const screenHeight = window.screen.height;
const video = document.querySelector('.header__video');
const title = document.querySelector('.header__content');
const formContainer = document.querySelector('.form__container');
const inputs = document.querySelectorAll('input[data-rule]');


const containerClicked = function () {
    if (event.target === formContainer) {
        formClose();
    }
}

const esc = function () {
    
    if (event.keyCode == 27) {
        formClose();
    }
}

const formClose = function () {
    form.classList.remove('open-flex');
    headerContent.classList.remove('menu__content--active');
    document.body.classList.remove('no-scroll');

    formClosed.removeEventListener('click', formClose);
    formButton.addEventListener('click', formOpen);
    formContainer.removeEventListener('click', containerClicked);
    removeEventListener('keydown', esc);
}

const formOpen = function () {
    form.classList.add('open-flex');
    headerContent.classList.add('menu__content--active');
    document.body.classList.add('no-scroll');

    

    formButton.removeEventListener('click', formOpen);
    formClosed.addEventListener('click', formClose);
    formContainer.addEventListener('click', containerClicked);
    addEventListener('keydown', esc);
}

const validateForm = function (inputs) {
    
    for (let input of inputs) {
        
        input.addEventListener('blur', function () {
            let rule = this.dataset.rule;
            let value = this.value;
            let check;

            switch (rule) {
                case 'phone':
                    check = /([0-9]{1,3})(\([0-9]{2,3}\))-([0-9]{3})-([0-9]{2})-([0-9]{2})/.test(value);
                    break;
                case 'name':
                    check = /^[А-Яа-яЁёa-zA-Z\s]+$/.test(value);
                    break
                case 'email':
                     check = /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/.test(value);
                    break                 
            }

            if (value.length < 1) { return };

            if (check) {
                this.parentElement.classList.remove('label-invalid');
                this.parentElement.classList.add('label-valid');
            } else {
                this.parentElement.classList.remove('label-valid');
                this.parentElement.classList.add('label-invalid');
            }
        })
    }
}

const scrolled = function (item, opacityItem, percentOpacity) {
    
    let yOpacity;
    if (percentOpacity < 1) {
        yOpacity = 1 / percentOpacity;
    } else if (percentOpacity > 1) {
        yOpacity = 100 / percentOpacity;
    }

    window.onscroll = function () {
        let box = item.getBoundingClientRect();
        let percent = box.y / item.offsetTop;
        let opacity = 1- ((1 - percent) * yOpacity);
        opacityItem.style.opacity = opacity;
        if (opacity < 0) {
            headerContent.classList.add('menu__content--bg-white');
        }else if (opacity > 0 && headerContent.classList.contains('menu__content--bg-white')){
            headerContent.classList.remove('menu__content--bg-white');
        }
    }
    
}

const catalogScrolled = function () {

    let margin = video.offsetHeight - video.offsetHeight * 0.325;

    if (margin !== 0) {
        catalog.style.marginTop = margin + 'px';
        title.style.marginTop = ((margin - headerMenu.offsetHeight) / 2 - title.offsetHeight / 2) + headerMenu.offsetHeight + 'px';
    } else {
        catalog.style.marginTop = null;
        title.style.marginTop = null;
    }
    
}

headerToggle.addEventListener('click', function () {
    if (headerMenu.classList.contains('header__menu--open')) {
        headerMenu.classList.remove('header__menu--open');
        document.body.classList.remove('no-scroll')
    } else {
        headerMenu.classList.add('header__menu--open');
        document.body.classList.add('no-scroll');
    }
});



formButton.addEventListener('click', formOpen);

scrolled(catalog, header, 75);
catalogScrolled();
window.onresize = catalogScrolled;

$("#phone").mask("+7(999)-999-99-99");

validateForm(inputs);





