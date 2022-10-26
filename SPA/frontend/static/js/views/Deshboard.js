import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Deshboard');
  }

  async getHTML() {
    return `
            <h1>Welcome back, DOM</h1>
            <p> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consequuntur sequi fugit nam eius totam reprehenderit nobis id commodi mollitia? Dolore at, tempora illum inventore reprehenderit sapiente sed porro assumenda.
            </p>
            <p>
                <a href='/posts' data-link>View recent posts</a>
            </p>
            `;
  }
}
