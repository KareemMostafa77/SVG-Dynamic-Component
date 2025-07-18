# SVG Icon Web Component

A lightweight, framework-agnostic SVG icon system built as a Web Component that works seamlessly across all modern JavaScript frameworks and vanilla HTML.

## ✨ Features

- 🚀 **Framework Agnostic** - Works with Angular, React, Vue, or vanilla JavaScript
- 📦 **Dynamic Loading** - Load SVG icons by name from a centralized registry
- 🎨 **Highly Customizable** - Control color, size, viewBox, and container styles
- 💡 **Lightweight** - Zero dependencies, minimal footprint (~2KB gzipped)
- 🔧 **Developer Friendly** - Simple API with TypeScript support
- 🌙 **Theme Support** - Built-in dark/light mode compatibility
- ⚡ **Performance Optimized** - Efficient SVG rendering and caching

## 🚀 Quick Start

### 1. Include the Scripts

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include the SVG Icon Web Component -->
  <script src="dist/icons.js"></script>
  <script src="dist/svg-icon.js"></script>
</head>
<body>
  <!-- Use the component -->
  <svg-icon name="home" color="#64b5f6"></svg-icon>
</body>
</html>
```

### 2. Basic Usage

```html
<!-- Simple icon -->
<svg-icon name="home"></svg-icon>

<!-- Customized icon -->
<svg-icon 
  name="star" 
  color="#FFC107" 
  container_width="32px" 
  container_height="32px">
</svg-icon>
```

## 📁 Project Structure

```
SVG-Dynamic-Component/
├── index.html              # Demo & documentation page
├── dist/
│   ├── icons.js            # Icon registry and configuration
│   └── svg-icon.js         # Web Component implementation
├── assets/
│   ├── css/
│   │   └── styles.css      # Documentation site styles
│   ├── js/
│   │   └── script.js       # Documentation site functionality
│   └── icons/              # SVG icon files
│       ├── home.svg
│       ├── user.svg
│       ├── settings.svg
│       ├── alert.svg
│       ├── menu.svg
│       ├── search.svg
│       ├── heart.svg
│       └── star.svg
└── README.md
```

## 🛠️ Component Properties

| Property | Description | Type | Required | Default |
|----------|-------------|------|----------|---------|
| `name` | Icon name from the registry | `string` | ✅ | `''` |
| `color` | Fill color for SVG paths | `string` | ❌ | `'#000'` |
| `view` | Custom viewBox value | `string` | ❌ | `''` (auto-detected) |
| `container_width` | Width of icon container | `string` | ❌ | `'20px'` |
| `container_height` | Height of icon container | `string` | ❌ | `'20px'` |
| `container_classes` | Additional CSS classes | `string` | ❌ | `''` |

## 🔧 Framework Integration

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  // ... other config
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- In your template -->
<svg-icon name="home" color="#1976d2"></svg-icon>
```

### React

```jsx
// Import the scripts in your main file
import 'path/to/icons.js';
import 'path/to/svg-icon.js';

function MyComponent() {
  return (
    <div>
      <svg-icon name="home" color="#ff5722"></svg-icon>
    </div>
  );
}
```

### Vue.js

```javascript
// main.js
import 'path/to/icons.js';
import 'path/to/svg-icon.js';

// Configure Vue to recognize custom elements
app.config.compilerOptions.isCustomElement = tag => tag.includes('-');
```

```vue
<template>
  <svg-icon name="home" color="#4CAF50"></svg-icon>
</template>
```

## 📝 Adding New Icons

### 1. Prepare Your SVG

Create or export your icon as an optimized SVG file:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 12h3v8h14v-8h3L12 2z" fill="currentColor"/>
</svg>
```

### 2. Add to Icons Folder

Place your SVG file in the `assets/icons/` directory:

```
assets/icons/
├── existing-icons.svg
└── your-new-icon.svg  ← Add here
```

### 3. Register the Icon

Update the `ICON_Files` object in `dist/icons.js`:

```javascript
const ICON_Files = {
  home: 'home.svg',
  user: 'user.svg',
  settings: 'settings.svg',
  yourNewIcon: 'your-new-icon.svg'  // ← Add this line
};
```

### 4. Use Your Icon

```html
<svg-icon name="yourNewIcon" color="#64b5f6"></svg-icon>
```

## 🎨 Styling and Theming

The component supports CSS custom properties for theming:

```css
:root {
  --icon-default-color: #333;
  --icon-hover-color: #64b5f6;
}

/* Dark mode support */
body.dark-mode {
  --icon-default-color: #fff;
  --icon-hover-color: #90caf9;
}
```

## 🔍 Available Icons

The project includes the following pre-built icons:

- `home` - Home/house icon
- `user` - User profile icon
- `settings` - Settings/gear icon
- `alert` - Alert/warning icon
- `menu` - Hamburger menu icon
- `search` - Search/magnifying glass icon
- `heart` - Heart icon
- `star` - Star icon

## 💡 Best Practices

- ✅ Use consistent viewBox sizes (e.g., 24x24) for all icons
- ✅ Optimize SVG files with tools like [SVGOMG](https://jakearchibald.github.io/svgomg/)
- ✅ Use semantic, meaningful names for your icons
- ✅ Keep SVG paths simple for better performance
- ✅ Use `currentColor` in SVG fill attributes for easier theming
- ✅ Test icons across different frameworks and screen sizes

## 🌐 Browser Support

- ✅ Chrome 54+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+
- ✅ Opera 41+

## 📖 API Reference

### SvgIconComponent Class

The Web Component extends `HTMLElement` and provides:

#### Observed Attributes
- `name` - Icon identifier
- `color` - Fill color
- `view` - ViewBox override
- `container_width` - Container width
- `container_height` - Container height
- `container_classes` - Additional CSS classes

#### Methods
- `render()` - Triggers icon re-rendering
- `connectedCallback()` - Lifecycle method called when element is added to DOM
- `attributeChangedCallback()` - Handles attribute changes

## 🚀 Performance Tips

1. **Preload Critical Icons**: Include essential icons in your main bundle
2. **Use Icon Sprites**: For many icons, consider creating SVG sprites
3. **Optimize SVGs**: Remove unnecessary metadata and simplify paths
4. **Cache Strategy**: Implement proper caching for icon files
5. **Lazy Loading**: Load non-critical icons on demand

## 👨‍💻 Author

**Karim M. Mansour**

- GitHub: [@KareemMostafa77](https://github.com/KareemMostafa77)
- Email: kareemmostafa77@hotmail.com

---

⭐ If you find this project useful, please consider giving it a star on GitHub!