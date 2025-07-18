class SvgIconComponent extends HTMLElement {
  constructor() {
    super();
    this.name = '';
    this.color = window.SVG_ICON_DEFAULT_COLOR || '#000';
    this.view = '';
    this.container_width = '20px';
    this.container_height = '20px';
  }

  static get observedAttributes() {
    return ['name', 'color', 'view', 'container_width', 'container_height', 'container_classes'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue || (name === 'color' ? window.SVG_ICON_DEFAULT_COLOR : '');
      this.render();
    }
  }

  async render() {
    const path = ICON_Files_BasePath + ICON_Files[this.name];

    this.innerHTML = `
      <div class="icon-container" style="width: ${this.container_width}; height: ${this.container_height}; display: flex; justify-content: center; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg"></svg>
      </div>`;

    const svgTag = this.querySelector('svg');

    if (!path) {
      console.warn(`Icon "${this.name}" not found in ICON_Files.`);
      return;
    }

    try {
      const response = await fetch(path);
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml').documentElement;

      // Extract viewBox if not provided
      if (!this.view && svgDoc.hasAttribute('viewBox')) {
        this.view = svgDoc.getAttribute('viewBox');
      }

      if (this.view) {
        svgTag.setAttribute('viewBox', this.view);
      }

      svgTag.innerHTML = svgDoc.innerHTML;
      svgTag.style.width = '100%';
      svgTag.style.height = '100%';

      // Apply color
      const paths = svgTag.querySelectorAll('path, g path, defs clipPath *');
      paths.forEach(el => el.setAttribute('fill', this.color));
    } catch (error) {
      console.error(`Error loading icon "${this.name}":`, error);
    }
  }
}

customElements.define('svg-icon', SvgIconComponent);
