window.onload=function(){



    // init controller
  var controller = new ScrollMagic.Controller();

  // create a scene
  const sceneA = new ScrollMagic.Scene({
    triggerElement: "#section1",
    tweenChanges: true,
    duration: window.innerHeight * 3, // 持续多久,这个页面不会滚动
    offset: window.innerHeight / 2,
  })
    .setPin("#section1") 
    .addTo(controller); 


  sceneA.on('progress',(e)=>{
      const p = e.progress
      // P代表滚动的进程
      // 0 - 1

      const blueCircle = document.querySelector('#bgBefore')
      const cell = document.querySelector('#cell')

      blueCircle.style.clipPath = `circle(${p*800+50}px)`
      
      let cellIndex = Math.floor(p*10)
      cell.src= `./cell/${cellIndex+1}.png`
      
  })


  const sceneB = new ScrollMagic.Scene({
    triggerElement: "#section2",
    tweenChanges: true,
    duration: window.innerHeight * 1.5, // 持续多久,这个页面不会滚动
    offset: window.innerHeight / 2,
  })
    .setPin("#section2") 
    .addTo(controller); 


  sceneB.on('progress',(e)=>{
      const p = e.progress
      document.querySelectorAll('.machine').forEach(machine=>{
        gsap.to(machine,{x:p*1000*Math.random()})
      })
      
  })


    var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "#5C16C1";
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
  }
}, false);


    function makeCell(){
        let img = document.createElement('img')
        img.src= './细胞.png'
        img.classList.add('ele')
        img.style.left = Math.random() * 2000 - 1000 + 'px'
        img.style.top = Math.random() * 2000 -1000 + 'px'
        img.style.transform = `scale(${Math.random()})`
        img

        document.body.appendChild(img)
    }   
    

    for(let i=0;i<20;i++){
        makeCell()
      
    }

    for(let i=0;i<4;i++){      
      makeMachine()
  }


    function makeMachine(){
      let img = document.createElement('img')
      img.src= './machine.gif'
      img.classList.add('ele')
      img.classList.add('machine')
      img.style.left = Math.random() * 2000 - 1000 + 'px'
      img.style.bottom = Math.random()*100 +'px'
      img.style.transform = `scale(${Math.random()*2+2}) scaleX(${Math.random()>0.5?1:-1})`
      

      document.querySelector('#section2').appendChild(img)
  }




}
