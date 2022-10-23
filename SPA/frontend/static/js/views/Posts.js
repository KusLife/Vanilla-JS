import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('Posts');
  }

  async getHTML() {
    return `
            <h1>All posts</h1>
            <p> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consequuntur sequi fugit nam eius totam reprehenderit nobis id commodi mollitia?
            </p>
            
            `;
  }
}
