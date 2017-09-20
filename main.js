document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const autoComplete = new AutoComplete(root);
});

class AutoComplete {
  constructor(el) {
    this.el = el;
    this.generateContainer();
    this.generateInput();
    this.generateList();
    this.elements = [];
  }

  generateContainer() {
    const container = document.createElement('div');

    this.container = this.el.appendChild(container);
  }

  generateInput() {
    this.input = document.createElement('input');
    this.input.addEventListener('keyup', () => {
      this.requestAndUpdateElements(this.input.value);
    });

    this.container.appendChild(this.input);
  }

  requestAndUpdateElements(val) {
    this.requestElements(val).then(res => {
      this.elements = res;
      this.render();
    });
  }

  requestElements(val) {
    return fetch(`/elements?value=${val}`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('There was a problem');
    });
  }

  generateList() {
    this.list = document.createElement('ul');
    this.container.appendChild(this.list);
  }

  render() {
    this.list.innerHTML = '';
    this.elements.forEach((el) => {
      const li = document.createElement('li');
      li.innerHTML = el;
      this.list.appendChild(li);
    });
  }
}
