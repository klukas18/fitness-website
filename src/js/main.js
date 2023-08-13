const loginBtn = document.querySelector('.nav-button')
const startBtn = document.querySelector('.intro-button')
const closeBtn = document.querySelector('.close-btn')
const introPage = document.querySelector('.container__intro')
const cardPage = document.querySelector('.container__cards')
const multiStepForm = document.querySelector('[data-multi-step]')
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')]
const cardFirst = document.querySelector('.card1')
const cardSecond = document.querySelector('.card2')
const cardThird = document.querySelector('.card3')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const dialog = document.querySelector('.dialog')
const circles = document.querySelectorAll('.circle')
const progressBar = document.querySelector('.indicator')
const progressButtons = document.querySelectorAll('.progress-btn')
const footerYear = document.querySelector('.footer-year')

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

// nextBtn.addEventListener('click', () => {
// 	cardFirst.style.setProperty('display', 'none')
// 	cardSecond.style.setProperty('display', 'flex')
// })

function getGoalValue() {
	let selectedValue = document.querySelector('#goal-select').value
	console.log(selectedValue)
}

function getStartDate() {
	let selectedValue = document.querySelector('#start-date').value
	console.log(selectedValue)
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
