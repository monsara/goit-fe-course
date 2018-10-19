import Model from './../js/model';

describe('Model', () => {

  it('Should init an arr of class', () => {
    const model = new Model();

    model.getUrl();
    expect(model._urlInfo).toEqual([]);
  });

  it('Should remove item from arr', () => {
    const model = new Model();
    const arr = model._urlInfo;
    const item = {
      id: "1538125750874-wyeqlwxcx",
      description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
      image: "http://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png",
      title: "Google",
      url: "http://www.google.com/"
     };

    arr.push(item);
    expect(model._urlInfo.length).toBe(1);
    model.removeUrl("1538125750874-wyeqlwxcx");
    expect(model._urlInfo.length).toBe(0);
  });

});
