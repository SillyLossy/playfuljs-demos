export class Globals {
  static readonly CIRCLE = Math.PI * 2;
  static readonly MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );
}
