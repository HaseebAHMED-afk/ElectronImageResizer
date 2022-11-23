const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput  = document.querySelector('#height');
const widthInput  = document.querySelector('#width');


img.addEventListener('change' , (e) =>{

    let file = e?.target?.files[0]

    let image = new Image()
    image.src = URL.createObjectURL(file)
    form.style.display = 'block'
    filename.innerText = file.name
    image.onload = function(){
        heightInput.value = this.height
        widthInput.value = this.width
    }
    outputPath.innerText = path.join(os.homedir() , 'imageresizer')
    // showToast('Success' , 'green')

})




const submitImage = (e) =>{
    e?.preventDefault()

    let width = widthInput.value
    let height = heightInput.value
    let imgPath = img.files[0].path

    console.log(imgPath);

    if(!img.files[0]){
        showToast('No image selected','red')
        return
    }
    
    if( height == '' || width == '' ){
        showToast('Enter width and height', 'red')
        return
    }
    
    ipcRenderer.send('image:resize',{
        imgPath,
        width,
        height
    })

}

const showToast = (message , color) =>{
    toastify.toast({
        text:message,
        duration:5000,
        close:false,
        style:{
            background:color,
            color:'white',
            textAlign:'center'
        }
    })
}


form.addEventListener('submit' , submitImage)