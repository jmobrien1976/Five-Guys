
async function addToCart(event,name,price){
    //TO DO, ACTAULLY DO THE THING
    console.log(name+" is "+price);
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
    let split = item.textContent.split("$");
    item.addEventListener('click', function(event){addToCart(event,item.parentNode.parentNode.childNodes[1].textContent,split[1])});
}

