export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this._view.refs.form.addEventListener(
      'submit',
      this.handleFormSubmit.bind(this),
    );

    this._view.refs.cards.addEventListener(
      'click',
      this.handleDeleteCard.bind(this),
    );

    this.init();
  }

  init() {
    this._view.init(this._model.getUrl());
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const input = this._view.refs.input;
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

    if(!pattern.test(input.value)) {
      return alert('Your url adress is not valid!');
    } else {
      this._model.setUrl(input.value).then(createdItem => {
        if(createdItem === undefined) return;
        this._view.createUrlMarkup(createdItem);
      });
    }
    input.value = '';
  }

  handleDeleteCard({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    const item = target.parentNode;
    const itemId = item.dataset.idItem;

    this._view.deleteUrl(itemId);
    this._model.removeUrl(itemId);
  }
}
