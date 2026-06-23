let menu = document.querySelector('.navbar .nav-menu');
let btn = document.querySelector('.navbar .toggle_btn');

btn.addEventListener('click', function(){
    if(menu.style.display === 'none'){
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

let media = window.matchMedia('(min-width: 800px)');

function modifyMenu(event){
    if(event.matches){
        menu.style.display= 'none';
    }else{return ;}
}
modifyMenu(media);
media.addEventListener('change', modifyMenu)
