
const addToCart = async (event) => {
    //TO DO, ACTAULLY DO THE THING
    console.log("It works");
}


let btnList = document.querySelectorAll('.menu-btn')
for(const item of btnList){
    item.addEventListener('click', addToCart);
}

