import template from './../templates/urlCard.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.form = document.querySelector('.js-form');
    this.refs.input = this.refs.form.querySelector('input');
    this.refs.cards = document.querySelector('.cards-list');
  }

  init(urls) {
    const markup = urls.reverse().reduce((acc, url) => {
      return acc + this.createUrl(url);
    }, '');
    this.refs.cards.innerHTML = markup;
  }

  createUrl(url) {
    const markup = template(url);
    return markup;
  }

  createUrlMarkup(url) {
    const markup = template(url);
    this.refs.cards.insertAdjacentHTML('afterbegin', markup);
  }

  deleteUrl(id) {
    const el = this.refs.cards.querySelector(`.card[data-id-item="${id}"]`);
    el.remove();
  }
}
