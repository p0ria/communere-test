/// <reference path="file.utils.d.ts" />

File.prototype.convertToBase64 = function (): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = function (e) {
      if (e.target.error) {
        reject(e.target.error);
      } else {
        resolve(e.target.result as string);
      }
    };
    reader.readAsDataURL(this);
  });
};
