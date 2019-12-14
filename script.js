const doc = document

const canvas = doc.querySelector ('#canv')
const ctx = canvas.getContext ('2d')
const xBlock = doc.querySelector ('#x-coord')
const yBlock = doc.querySelector ('#y-coord')


let editor = {
    width: canvas.getAttribute ('width'),
    height: canvas.getAttribute ('height'),
    currentTool: null,
    currentColor: '#000',
    brushSize: 5,
    x: 0,
    y: 0,

    _init () {
        doc.addEventListener ('input', this.inputHandler)
        doc.addEventListener ('click', this.clickHandler)
        canvas.addEventListener ('mousemove', this.getCoordinates)
        canvas.addEventListener ('mousedown', this.startDraw)
        canvas.addEventListener ('mouseup', this.endDraw)
    },

    inputHandler (evt) {
        let id = evt.target.id
        let val = evt.target.value
        if (id === 'select-color' || id === 'select-size') {
            id === 'select-color' ? editor.currentColor = val : editor.brushSize = val
            if (id === 'select-color') ctx.fillStyle = editor.currentColor
        }
    },
    clickHandler (evt) {
        let el = evt.target
        if (el.name === 'tool-button' || el.parentNode.name ==="tool-button") {
            (el.name === "tool-button") ? editor.currentTool = el.dataset.name : editor.currentTool = el.parentNode.dataset.name
            if (editor.currentTool === "clearall"){
                ctx.clearRect(0,0,canvas.width,canvas.height)
            }
        }
    },
    getCoordinates (evt) {
        editor.x = evt.offsetX
        editor.y = evt.offsetY
        xBlock.innerText = editor.x
        yBlock.innerText = editor.y
    },
    startDraw (evt) {
        if (editor.currentTool === 'brush') editor._drawBrush ()
        if (editor.currentTool === 'line') editor._drawLine ()
        if (editor.currentTool === 'circle') editor._drawCircle ()
        

    },
    endDraw () {
        canvas.onmousemove = null
        
    },
    _drawBrush () {
        canvas.onmousemove = () => {
            ctx.fillRect (editor.x, editor.y, editor.brushSize, editor.brushSize)
        }
    },
    _drawLine () {
        ctx.lineWidth = editor.brushSize
        let temp_x = editor.x
        let temp_y = editor.y
        canvas.onmouseup = () => {
            ctx.beginPath()
            ctx.moveTo(temp_x, temp_y)
            ctx.lineTo(editor.x, editor.y)
            ctx.closePath()           
            ctx.stroke()
            canvas.onmouseup = null
        }
    },
    _drawCircle(){
        let temp_x = editor.x
        let temp_y = editor.y
        canvas.onmouseup = () => {
            ctx.beginPath()
            ctx.arc(temp_x, temp_y, Math.sqrt(Math.pow(editor.x - temp_x,2) + Math.pow(editor.y - temp_y, 2)), 0, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
            canvas.onmouseup = null

        }

    },
    
}

editor._init ()

// 1) Допиливаем магазин
// 2) Допиливаем Фотошоп
// 3) Допиливаем интерфейсные решения для старых примеров (камень-ножницы, быки...)
