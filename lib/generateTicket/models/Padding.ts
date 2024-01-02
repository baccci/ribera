
export class Padding {
  public top: number
  public right: number
  public bottom: number
  public left: number

  constructor(
    top: number,
    right?: number,
    bottom?: number,
    left?: number
  ) {
    if (!top) throw new Error('At least one padding value is required')
    this.top = top
    this.right = right || top
    this.bottom = bottom || top
    this.left = left || right || top
  }
}