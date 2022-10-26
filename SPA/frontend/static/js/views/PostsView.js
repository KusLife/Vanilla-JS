import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Post id');
  }

  async getHTML() {
    console.log(this.params.id)
    return `
            <h1>A post with an id </h1>
            <p> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consequuntur sequi fugit nam eius totam reprehenderit nobis id commodi mollitia?
            </p>
            
            `;
  }
}
