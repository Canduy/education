

// testimonial slide

function testimonialSlider() {
    const carouselOne = document.getElementById('carouselOne');
    if(carouselOne) {
        carouselOne.addEventListener('slid.bs.carousel', function () {
            const activeItem = this.querySelector('.active');
            document.querySelector('.js-testimonial-img').src= activeItem.getAttribute('data-js-testimonial-img');

        })
    }
}
testimonialSlider()

// header menu
function headerMenu() {
    const menu = document.querySelector(".js-header-menu")
    const backDrop = document.querySelector('.js-header-backdrop');
    const menuCollapseBreakpoin = 991;
    function toggleMenu() {
        menu.classList.toggle('open');
        backDrop.classList.toggle('active')
        document.body.classList.toggle('overflow-hiden')
    }
    document.querySelectorAll('.js-header-menu-toggler').forEach((item) => {
        item.addEventListener("click",toggleMenu)
    })

    // close the menu by clicking outside of it

    backDrop.addEventListener('click',toggleMenu)

    function collapse() {
        menu.querySelector(".active .js-sub-menu").removeAttribute('style')
        menu.querySelector('.active').classList.remove('active')
    }
    menu.addEventListener('click',(event) => {
        const { target } = event;
        // console.log(target)
        if(target.classList.contains('js-toggle-sub-menu') && window.innerWidth <= menuCollapseBreakpoin) {
            // prevent default anchor click behavior
            event.preventDefault();



            if(target.parentElement.classList.contains('active')) {
                collapse()
                return;
            }

            // 
            if(menu.querySelector(".active")){
                collapse()
            }
            // expan new menu-item
            target.parentElement.classList.add('active');
            target.nextElementSibling.style.maxHeight = 
            target.nextElementSibling.scrollHeight + "px"
        }
    })

    // when resizing window 
    window.addEventListener('resize',function() {
        if(this.innerWidth > menuCollapseBreakpoin && menu.classList.contains('open')) {
            toggleMenu()
        }

        if(this.innerWidth > menuCollapseBreakpoin && menu.querySelector(".active")) {
            collapse()
        }
    })
}
 headerMenu()
// style switcher
function styleSwitcherToggler() {
    const styleSwitcher = document.querySelector('.js-style-switcher');
    const styleSwitcherToggler = document.querySelector('.js-style-switcher-toggler');
    styleSwitcherToggler.addEventListener("click",function() {
        styleSwitcher.classList.toggle('open');
        this.querySelector("i").classList.toggle('fa-times')
        this.querySelector("i").classList.toggle('fa-cog')
    })
  
}   
styleSwitcherToggler();

// theme colors
function  themeColors() {
    const colorStyle = document.querySelector('.js-color-style');
    const themeColorContainer = document.querySelector('.js-theme-colors');
    themeColorContainer.addEventListener("click",({target}) => {
        if(target.classList.contains('js-theme-color-item')){
            // console.log(target.getAttribute("data-js-theme-color"))
            localStorage.setItem('color',target.getAttribute('data-js-theme-color'));
            setColor();
        }
    })
    function setColor() {
        let path = colorStyle.getAttribute('href').split('/');
        path = path.slice(0,path.length - 1)
        colorStyle.setAttribute("href",path.join('/') + '/' +localStorage.getItem('color') + '.css')
        if(document.querySelector('.js-theme-color-item.active')){
            document.querySelector('.js-theme-color-item.active').classList.remove('active');
        }
        document.querySelector("[data-js-theme-color=" + localStorage.getItem('color') + ']').classList.add('active');
    }
    if(localStorage.getItem('color') !== null){
        setColor();
    }else {
        const defaultColor = colorStyle.getAttribute('href').split('/').pop().split(".").shift();
        document.querySelector("[data-js-theme-color=" +defaultColor + ']').classList.add('active')

    }
}
 themeColors()
// theme light and dark mode
function themeLightDark() {
    const darkModeCheckbox = document.querySelector('.js-dark-mode')
    darkModeCheckbox.addEventListener('click',function() {
        if(this.checked){
            localStorage.setItem('theme-dark',"true")
        }else{
            localStorage.setItem('theme-dark',"false")
        }
        themeMode()
    })

    function themeMode() {
        if(localStorage.getItem("theme-dark") === "false"){
            document.body.classList.remove('t-dark');
        }else {
            document.body.classList.add('t-dark');
        }
    }

    if(localStorage.getItem("theme-dark") !== null) {
        themeMode()
    }
    if(document.body.classList.contains('t-dark')){
        darkModeCheckbox.checked = true;
    }
}
themeLightDark()
// preview video course
function coursePreview() {
    const coursePreviewModal = document.querySelector('.js-course-preview-modal');
    if(coursePreview) {
        coursePreviewModal.addEventListener("shown.bs.modal",function(){
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;  
        })
        coursePreviewModal.addEventListener("hide.bs.modal",function() {
            this.querySelector(".js-course-preview-video").pause();
        })
    }
}
coursePreview();

