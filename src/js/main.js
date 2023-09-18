const loginBtn = document.querySelector('.nav-button')
const startBtn = document.querySelector('.intro-button')
const closeBtn = document.querySelector('.close-btn')
const introPage = document.querySelector('.container__intro')
const cardPage = document.querySelector('.container__cards')
const multiStepForm = document.querySelector('[data-multi-step]')
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')]
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const dialog = document.querySelector('.dialog')
const circles = document.querySelectorAll('.circle')
const progressBar = document.querySelector('.indicator')
const progressButtons = document.querySelectorAll('.progress-btn')
const footerYear = document.querySelector('.footer-year')

const radioBtns = document.querySelectorAll("input[name='sex']")

let findSelectedRadio = () => {
	let selected = document.querySelector("input[name='sex']:checked").value
	console.log(selected)
}
radioBtns.forEach((radioBtn) => {
	radioBtn.addEventListener('change', findSelectedRadio)
})

function getAgeValue() {
	let selectedValue = document.querySelector('#age').value
	document.querySelector('.age-insert').innerHTML = `${selectedValue}`
	console.log(selectedValue)
}
function getHeightValue() {
	let selectedValue = document.querySelector('#height').value
	document.querySelector('.height-insert').innerHTML = `${selectedValue}`
	console.log(selectedValue)
}
function getWeightValue() {
	let selectedValue = document.querySelector('#weight').value
	document.querySelector('.weight-insert').innerHTML = `${selectedValue}`
	console.log(selectedValue)
}


let currentStep = formSteps.findIndex((step) => {
	return step.classList.contains('active')
})

if (currentStep < 0) {
	currentStep = 0
	showCurrentStep()
}

multiStepForm.addEventListener('click', (e) => {
	if (e.target.matches('[data-next]')) {
		currentStep += 1
	} else if (e.target.matches('[data-previous]')) {
		currentStep -= 1
	}
	showCurrentStep()
})

function showCurrentStep() {
	formSteps.forEach((step, index) => {
		step.classList.toggle('active', index === currentStep)
	})
}

let currentProgressStep = 1

function getGoalValue() {
	let selectedValue = document.querySelector('#goal-select').value
	console.log(selectedValue)
}

function getStartDate() {
	let selectedValue = document.querySelector('#start-date').value
	document.querySelector('.date-insert').innerHTML = `${selectedValue}`
}

function getActivityValue() {
	let selectedValue = document.querySelector('#activity-select').value
	console.log(selectedValue)
}

loginBtn.addEventListener('click', () => {
	dialog.showModal()
})
closeBtn.addEventListener('click', () => {
	dialog.close()
})

dialog.addEventListener('click', (e) => {
	const dialogDimensions = dialog.getBoundingClientRect()
	if (
		e.clientX < dialogDimensions.left ||
		e.clientX > dialogDimensions.right ||
		e.clientY < dialogDimensions.top ||
		e.clientY > dialogDimensions.bottom
	) {
		dialog.close()
	}
})

startBtn.addEventListener('click', () => {
	introPage.classList.add('invisible')
	cardPage.classList.add('visible')
})

const updateSteps = (e) => {
	currentProgressStep =
		e.target.id === 'next' ? ++currentProgressStep : --currentProgressStep

	circles.forEach((circle, index) => {
		circle.classList[`${index < currentProgressStep ? 'add' : 'remove'}`](
			'active'
		)
	})

	progressBar.style.width = `${
		((currentProgressStep - 1) / (circles.length - 1)) * 100
	}%`

	if (currentProgressStep === circles.length) {
		progressButtons[1].disabled = true
	} else if (currentProgressStep === 1) {
		progressButtons[0].disabled = true
	} else {
		progressButtons.forEach((button) => {
			button.disabled = false
		})
	}
}

progressButtons.forEach((button) => {
	button.addEventListener('click', updateSteps)
})

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()
