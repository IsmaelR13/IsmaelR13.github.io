let eventList = [];
let selectionTimeout = null;
let timoutBool = null;
getUMEventsWithImages(eList => {  

    eventList = eList;
    

    const thumbs = document.querySelector('#thumbnails');
    for (let i = 0; i < eventList.length; i++) {
        const event = eventList[i];
        const img = document.createElement('img');
        img.setAttribute('id',`thumb-${event['id']}`);
        img.src = event['styled_images']['event_thumb'];
        thumbs.appendChild(img);
        
        if (i === 0) {
            setSelectedIndex(i);
        }

    }

});

let priorIndex = null;
function setSelectedIndex(index) {
    const s = document.querySelector('#selected');
    const selected = eventList[index];
    selectionTimeout && clearTimeout(selectionTimeout);
    selectionTimeout = setTimeout(() => {
        timoutBool = true;
        setSelectedIndex((index + 1)%eventList.length);
    
    }, 10000);

    
    inImg = document.querySelector(`#thumb-${selected['id']}`);
    inImg.classList.add('selected');

    sImg = document.querySelector('#selected-image');
    sImg.setAttribute('src', selected['image_url']);
    document.getElementById('selected-title').href = selected['permalink'];
    document.getElementById('selected-title').innerHTML = selected['event_title'];
    document.getElementById('selected-date').innerHTML = getReadableTime(selected['datetime_start']);
    document.getElementById('selected-description').innerHTML = selected['description'];

    const els = document.querySelectorAll('.selected');
    for(element of els) {
        if (element.id !== `thumb-${selected['id']}`) {
            element.classList.remove('selected');
        }
    }
    
    

}
window.addEventListener('click', (ev) =>{

        const index = eventList.findIndex(obj => {
            return `thumb-${obj.id}` === ev.target.id;
        })
    
        setSelectedIndex(index);
    
});