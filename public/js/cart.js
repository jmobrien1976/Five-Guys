
const addToCart = async (event) => {
    //TO DO, ACTAULLY DO THE THING
    console.log("It works");
    const response = await fetch('/api/cart/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    if(response.ok){
        const resolved = await response.json();
        console.log(resolved);
    }
}


let btnList = document.querySelectorAll('.menu-btn')
for(const item of btnList){
    item.addEventListener('click', addToCart);
}

