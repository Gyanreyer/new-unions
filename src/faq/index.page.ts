import { html, type YetiPageComponent } from 'yeti-js';
import { PageBorderLayout } from '../_layout/PageBorderLayout.component.ts';

const IndexPage: YetiPageComponent = () => html`<${PageBorderLayout}>
  <header>
    <h1>What to expect at New Unions.</h1>
  </header>
  <main>

  </main>
</${PageBorderLayout}>`;

export default IndexPage;