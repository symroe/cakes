units_per_egg = 31.41

// Volume
function getArea(r) {
    return ( Math.PI * r * r );
}

function getVolume(r, h) {
    area = getArea(r);
    return area*h
}


function eggs_for_cake(r, h) {
    vol = getVolume(r,h)
    eggs_raw = vol/units_per_egg
    eggs = Math.round(eggs_raw*Math.pow(10,1))/Math.pow(10,1)
    return eggs
}






// console.debug(eggs_for_cake(4,5))
// console.debug(eggs_for_cake(5,5))
// console.debug(eggs_for_cake(6,5))
// console.debug(getVolume(4, 5))