window.onload = () =>{
    
    //number of balloons
    let numberOfBalloon = 5;
    //getting container div
    let container = 
    document.getElementById("con")
    
    //stating animation
    startAnim(numberOfBalloon,true)
    //set flag false to next iteration
    flg = false;
   
   //set interval to generate balloons 
   //every seconds
    setInterval(()=>{
    startAnim(numberOfBalloon,flg);
    
    },2000);
    

}

//start animation methods for start the 
//animation
function startAnim(n,flg)
{
    let container = 
    document.getElementById("con");
    
     for(let i=0;i<n;i++)
    {
    let balloon = createDiv(); 
    container.appendChild(balloon);
    startFloating(balloon,flg);
    
    if(flg)
    flg = false;
    else
    flg = true;
}
}
    

//create balloon element method and assign color and random size
function createDiv()
{

  const balloon =
  document.createElement("div");
  
  //assign class
  balloon.className = "balloon";
  
  const randomValue = 
  Math.floor(Math.random()*90);
  
  //assign ramdom height and width 
  balloon.style.height = randomValue+"px";
  balloon.style.width = 
  randomValue/1.4+"px";
  
  balloon.style.transition = 
  "all 100s linear"
  
  //creating inner circle which head of
 //balloon
  const innerCircle =
  document.createElement("div");
  innerCircle.className = "innerCircle";
  
  //generate random color and assign to
 //balloon
  const color = generateColor();
  innerCircle.style.backgroundColor=color; 
       
/*  innerCircle.style.
  setProperty('--innercircle-bg-color', 
  color);*/
  
  
  //creating rope element 
  const rope = 
  document.createElement("div");
  //adding class
  rope.className = "rope";
  
  //append innerCircle and rope element 
  //in the balloon element;
  balloon.appendChild(innerCircle);
  balloon.appendChild(rope);
  
  return balloon;
  
}
   
//remove balloon element 
function removeElement(element)
{
 element.remove();
}


//floating method
function startFloating(element,flg)
{
   //random value under screen width for x-axis
   let widthOfscreen = window.innerWidth;
   let x = Math.floor(Math.random()*widthOfscreen);
 
   //y axis
   let y = 100;
   // random Value 
   let r = Math.random();
   
   //set balloon element initially
   element.style.transform = 
   "translate("+x+"vw"+","+y+"vh)";
   let flag = flg;
    
   //adding transition
  element.style.transition =
   "all linear";
 
 //set interval to move balloon 
  const interval = setInterval(()=>{
  
    element.style.transform = 
    "translate("+x+"px"+","+y+"px)";
        if(flag)
        x = x-r; 
        else
        x=x+r; 
        y=y-0.8;
         
        
    //check, Is balloon within visible area 
   if(isBalloonOutFromArea(x,y,element))
   {
    
       
        //stop moving balloon
        clearInterval(interval);
        
        //remove balloon
        removeElement(element);
   }
   
    
    },1000/120)
    
  
   
}

//random color method
function generateColor()
{
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    
    const color = "rgb("+r+","+g+","+b+")";
    return color;
}

//method checks, is balloon in within 
//visible area

function isBalloonOutFromArea(x,y,balloon)
{
    
    const container = 
    document.getElementById("con");
    
    //get visiable area height and width 
    const width  = container.offsetWidth;
    const height = container.offsetHeight;
    
    //get balloon height and width 
    const balloonWidth = 
    balloon.offsetWidth;
    const balloonHeight = 
    balloon.offsetHeight;
    
    //check balloon, is out from x axis
    //(horizontal area)
    if( x < -50- balloonWidth || x > width 
    + balloonWidth + 50 )
    {
        
        return true;
    }
    
    //check balloon, is out from Y axis 
    //(vertical) area

    /*<summary> 
    I used abs method because I used bottom 
    property in css file so when I decrease 
    Y-axis it gives value from less than 
    zero therefore I just convert in 
    positive value and check from area 
    height and add extra height so balloon 
    should not vanish after goes out from 
    area
    </summary>
    */

    if(Math.abs(y) > height + 
    balloonHeight )
      return true ;
    
    
    return false ;

    
}

