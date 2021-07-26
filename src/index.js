import _ from 'lodash'
import {BottomButton} from 'ts-demo-banxia'

function component() {
  console.log(BottomButton)
  const element = document.createElement('div')
  const btn = document.createElement('BottomButton')
  // const btn = document.createElement('button')
  element.innerHTML = 'Hello'
  btn.innerHTML = 'button'
  element.appendChild(btn)
  return element
}

document.body.appendChild(component())