import { Pledge } from './pledge';

new Pledge((resolve, reject) => {
  console.log("top of action callback")

  setTimeout(() => {
    console.log("call resolve callback")
    resolve(0)
  }, 0)
}).then((res) => {
  console.log(`first then callback, res: ${res}`)
  return res + 1
}).then((res) => {
  console.log(`second then callback, res: ${res}`)
  return res + 1
}).then((res) => {
  console.log(`third then callback, res: ${res}`)
  console.log("throw error")
  throw Error("this is error from third then callback")
}).catch((err) => {
  console.log("catch error", err)
})
