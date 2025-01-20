export class Pledge {
  private actionCallbacks: ((res) => any)[]
  private errorCallback: (err) => void

  private onResolve(res) {
    let storedRes = res
    try {
      this.actionCallbacks.forEach(action => {
        storedRes = action(storedRes)
      })
    } catch (err) {
      this.actionCallbacks = []
      this.onReject(err)
    }
  }
  private onReject(err) {
    this.errorCallback(err)
  }

  constructor(action: (
    resolve: (res) => any,
    reject: (err) => void
  ) => void) {
    this.actionCallbacks = [];
    this.errorCallback = () => { }
    action(this.onResolve.bind(this), this.onReject.bind(this))
  }

  then(thenHandler) {
    this.actionCallbacks.push(thenHandler)
    return this
  }
  catch(errorHandler) {
    this.errorCallback = errorHandler
    return this
  }
}
