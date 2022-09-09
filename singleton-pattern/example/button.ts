class Button {
  private onClick?: Function;
  constructor(onClick?: Function) {
    this.onClick = onClick;
  }

  click() {
    if (!this.onClick) {
      throw new Error("no onClick function is set!");
    }
    return this.onClick();
  }

  public set setOnClick(cb: Function) {
    this.onClick = cb;
  }
}

export default Button;
