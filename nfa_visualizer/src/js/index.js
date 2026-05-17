import DraggableCanvas from './canvas/draggable_canvas.js'
import VisualFSA from './fsa/visual_fsa.js'
import * as utils from './util/util.js'
import FSADescription from './elements/fsa_description.js'

const nfa = {
    visual: new VisualFSA(new DraggableCanvas('#nfa'), false),
    desc: new FSADescription('#nfa-delta-transitions')
}

nfa.visual.addEventListener('change', () => {
    if (nfa.visual.fsa.states.length > 0) {
        setEditButtonsState(true)
        nfa.desc.update(nfa.visual.fsa, true)
    } else {
        setEditButtonsState(false)
        nfa.desc.reset()
    }
})

/**
 * Test String Feature
 */
const nfaTestInput = document.querySelector('#nfa-test-input')
const nfaTestResult = document.querySelector('#nfa-test-result')

function updateTestStringResult () {
    const traceContainer = document.querySelector('#nfa-test-trace')

    if (!nfa.visual.fsa.startState) {
        nfaTestResult.innerText = 'No start state'
        nfaTestResult.className = 'button'
        traceContainer.style.display = 'none'
        return
    }

    const val = nfaTestInput.value
    const trace = nfa.visual.fsa.traceString(val)

    if (!trace) {
        traceContainer.style.display = 'none'
        return
    }

    // Generate trace HTML
    let traceHtml = '<div class="tags" style="margin-bottom: 0;">'
    trace.forEach((step, index) => {
        const stateText = step.states.includes('Ø') ? 'Ø' : `{${step.states.join(', ')}}`
        traceHtml += `<span class="tag is-info is-light" style="font-family: monospace;">`
        if (index > 0) traceHtml += `<strong>${step.char}</strong> ➔ `
        else traceHtml += `<strong>Start</strong> ➔ `
        traceHtml += `${stateText}</span>`

        if (index < trace.length - 1) {
            traceHtml += `<span class="icon is-small" style="margin: 0 5px;"><i class="mdi mdi-arrow-right"></i></span>`
        }
    })
    traceHtml += '</div>'

    traceContainer.innerHTML = traceHtml
    traceContainer.style.display = 'block'

    const lastStep = trace[trace.length - 1]

    if (lastStep.states.includes('Invalid Symbol')) {
        nfaTestResult.innerText = 'Invalid Symbols'
        nfaTestResult.className = 'button is-warning'
        return
    }

    const isAccepted = lastStep.states.some(state => nfa.visual.fsa.acceptStates.includes(state))

    if (isAccepted) {
        nfaTestResult.innerText = val.length === 0 ? 'Accepted (ε)' : 'Accepted'
        nfaTestResult.className = 'button is-success'
    } else {
        nfaTestResult.innerText = 'Rejected'
        nfaTestResult.className = 'button is-danger'
    }
}

nfaTestInput.addEventListener('input', updateTestStringResult)
nfa.visual.addEventListener('change', updateTestStringResult)

/**
 * Draw the canvas any time there is a change to its elements
 */
draw()
function draw () {
    nfa.visual.draggableCanvas.draw()
    window.requestAnimationFrame(draw)
}

/**
 * Update the edit buttons enabled state
 *
 * @param {Boolean} enabled True to enable the buttons, false to disable the buttons
 */
function setEditButtonsState (enabled) {
    document.querySelector('#nfa-reset').disabled = !enabled
}



/**
 * Clear the NFA with the reset button
 */
document.querySelector('#nfa-reset').addEventListener('click', () => {
    nfa.visual.reset()
})





/**
 * Show dropdowns when the dropdown trigger is clicked
 */
document.querySelectorAll('.dropdown-trigger button').forEach(e => e.addEventListener('click', e => {
    e.stopPropagation()
    e.target.parentElement.parentElement.classList.toggle('is-active')
}))

/**
 * Remove all dropdowns when the user clicks elsewhere on the page
 */
window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(e => e.classList.remove('is-active'))
})

/**
 * Open the NFA help modal on help button click
 */
document.querySelector('#nfa-help-button').addEventListener('click', () => {
    document.querySelector('#nfa-help-modal').classList.add('is-active')
    document.querySelectorAll('.modal-card-head').forEach(e => {
        e.style.display = 'flex'
    })
    utils.playVideo('#nfa-help-video')
})

/**
 * Close modals when the background is pressed
 */
document.querySelectorAll('.modal-close-background').forEach(e => e.addEventListener('click', e => {
    e.target.parentElement.classList.toggle('is-active')
    utils.pauseAllVideos()
}))

/**
 * Close modals when the close button is pressed
 */
document.querySelectorAll('.modal-close-button').forEach(e => e.addEventListener('click', e => {
    e.preventDefault()
    e.target.parentElement.parentElement.parentElement.classList.toggle('is-active')
    utils.pauseAllVideos()
}))

/**
 * Set the NFA to a preset configuration with the preset button
 */
document.querySelector('#preset-1').addEventListener('click', () => {
    nfa.visual.fromJSON('{"nodes":[{"label":"1","loc":{"x":200,"y":100},"transitionText":{"2":["b"],"3":["ε"]},"acceptState":true},{"label":"2","loc":{"x":600,"y":100},"transitionText":{"2":["a"],"3":["a","b"]}},{"label":"3","loc":{"x":400,"y":400},"transitionText":{"1":["a"]}}],"fsa":{"states":["1","2","3"],"alphabet":["a","b"],"transitions":{"1":{"b":["2"],"ε":["3"]},"2":{"a":["2","3"],"b":["3"]},"3":{"a":["1"]}},"startState":"1","acceptStates":["1"]}}')
})

/**
 * Set the NFA to a preset configuration with the preset button
 */
document.querySelector('#preset-2').addEventListener('click', () => {
    nfa.visual.fromJSON('{"nodes":[{"label":"1","loc":{"x":154,"y":108},"transitionText":{"2":["ε"],"3":["a"]}},{"label":"2","loc":{"x":535,"y":106},"transitionText":{},"acceptState":true},{"label":"3","loc":{"x":334,"y":362},"transitionText":{"2":["a","b"]}}],"fsa":{"states":["1","2","3"],"alphabet":["a","b"],"transitions":{"1":{"ε":["2"],"a":["3"]},"3":{"a":["2"],"b":["2"]}},"startState":"1","acceptStates":["2"]}}')
})

/**
 * Set the NFA to a preset configuration with the preset button
 */
document.querySelector('#preset-3').addEventListener('click', () => {
    nfa.visual.fromJSON('{"nodes":[{"label":"1","loc":{"x":206,"y":119},"transitionText":{"2":["b"],"3":["ε"]}},{"label":"2","loc":{"x":560,"y":119},"transitionText":{"1":["a"],"2":["b"]},"acceptState":true},{"label":"3","loc":{"x":375,"y":388},"transitionText":{"2":["a"],"3":["a","b"]}}],"fsa":{"states":["1","2","3"],"alphabet":["a","b"],"transitions":{"1":{"ε":["3"],"b":["2"]},"2":{"b":["2"],"a":["1"]},"3":{"a":["2","3"],"b":["3"]}},"startState":"1","acceptStates":["2"]}}')
})
