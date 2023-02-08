const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', (event)=>{
	mouse.x = event.clientX
	mouse.y = event.clientY

	//console.log(mouse)
})

const gravity = 0.01
const friction = 0.99

class Particle{
	constructor(x, y, radius, color, velocity){
		this.x = x 
		this.y = y 
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.alpha = 1 
		this.ttl = 200
		
	}

	draw(){
		c.save()
		c.beginPath()
		c.globalAlpha = this.alpha
		c.fillStyle = this.color
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
		c.fill()
		c.restore()
	}

	update(){
		this.draw()

		//adding friction to all axes
		this.velocity.x *= friction
		this.velocity.y *= friction
		

		//adding gravity to y axis
		this.velocity.y += gravity

		this.x += this.velocity.x 
		this.y += this.velocity.y 

		this.alpha -= 0.004
		this.ttl--

	}
}

let particles = []

function animate () {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.1)'
	c.fillRect(0, 0, canvas.width, canvas.height)

	particles.forEach((particle, index) =>{
		particle.update()
		if(particle.ttl < 0){
			particles.splice(index, 1)
		}
	})
	
}

animate()

console.log(particles)
let particleCount = 30
let globalVelocity = 5


function generateFireFall (argument) {
 

	setTimeout(generateFireFall, 500)

	for (var i = 0; i < particleCount; i++) {	
	let readianIncrement = Math.PI * 2 / particleCount
	let radius = Math.random() * 5 + 3
	let x = mouse.x 
	let y = mouse.y 
	
	let color = `hsl(${Math.random() * 360}, 50%, 50%)`

	particles.push(new Particle(x, y, radius, color,{
		x: Math.cos(readianIncrement * i) * Math.random() * globalVelocity,
		y: Math.sin(readianIncrement * i) * Math.random() * globalVelocity
	}))
	}
}

generateFireFall()

window.addEventListener('click', function (event) {
	//generateFireFall()
	
})