function remSize(){
    var deviceWidth = document.documentElement.clientWidth

   

    //若为375设备宽度，则1rem ==> 100px  若为750设备宽度,则1rem ==> 200px
    document.documentElement.style.fontSize = deviceWidth*16/375+'px'

    document.querySelector('body').style.fontSize = 1 + 'rem'
    // console.log(document.querySelector('body'));
}

remSize()
window.onresize = function(){
    remSize()
}





