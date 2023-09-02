export class ErrorNotFound extends Error {
  constructor() {
    super()
    this.message = 'Not found'
  }
}
