import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Settings');
  }

  async getHTML() {
    return `
            <h1>Manage your settings</h1>
            <p> 
            New preferances
            </p>
            `;
  }
}
