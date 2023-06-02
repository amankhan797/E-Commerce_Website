const carousel = document.querySelector(".carousel"), 
firstImg=carousel.querySelectorAll("img")[0];
arroicons = document.querySelectorAll(".wrapper i");

let isDragStart=false, isDragging=false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arroicons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arroicons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arroicons.forEach(icon=>{
    icon.addEventListener("click",()=>{
let firstImgWidth = firstImg.clientWidth + 10;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth :firstImgWidth;
        setTimeout(()=> showHideIcons(), 60);
    });
});

const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))return;
    positionDiff=Math.abs(positionDiff);
    let firstImgWidth=firstImg.clientWidth +10;
    let valiDifference = firstImgWidth-positionDiff;
    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth /4 ? valiDifference : positionDiff;
    }
    return carousel.scrollLeft -= positionDiff > firstImgWidth /4 ? valiDifference : positionDiff;
}

const dragStart=(e)=>{
    isDragStart=true;
    prevPageX=e.pageX || e.touches[0].pageX;
    prevScrollLeft=carousel.scrollLeft;
}
const dragging=(e)=>{
    if(!isDragStart)return;
    e.preventDefault();
    isDragging=true;
    carousel.classList.add("dragging");
    positionDiff= ( e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft= prevScrollLeft-positionDiff;
    showHideIcons();

}
const dragStop=()=>{
    isDragStart=false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging=false;
    autoSlide();
}
carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("touchstart",dragStart);

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);

carousel.addEventListener("mouseup",dragStop);

carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchend",dragStop);
