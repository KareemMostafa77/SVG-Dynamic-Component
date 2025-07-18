# SVG Icon Web Component

A lightweight, framework-agnostic SVG icon web component that provides dynamic SVG rendering with customizable properties. This component allows you to easily integrate SVG icons into any web application with support for color customization, sizing, and dynamic loading.

## 📁 Files Overview

This distribution includes two essential files:

- **`icons.js`** - Icon configuration and mapping
- **`svg-icon.js`** - The main web component implementation

## 🚀 Quick Start

### 1. Include the Scripts

Add both JavaScript files to your HTML document:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include the SVG Icon Web Component scripts -->
  <script src="path/to/dist/icons.js"></script>
  <script src="path/to/dist/svg-icon.js"></script>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

### 2. Basic Usage

```html
<!-- Simple icon -->
<svg-icon name="home"></svg-icon>

<!-- Customized icon -->
<svg-icon 
  name="user" 
  color="#ff5722" 
  container_width="32px" 
  container_height="32px">
</svg-icon>
```

## 🎯 Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | string | `''` | The name of the icon (must match a key in ICON_Files) |
| `color` | string | `#000` or `window.SVG_ICON_DEFAULT_COLOR` | Fill color for the SVG paths |
| `view` | string | `''` | Custom viewBox attribute (auto-detected if not provided) |
| `container_width` | string | `'20px'` | Width of the icon container |
| `container_height` | string | `'20px'` | Height of the icon container |
| `container_classes` | string | `''` | Additional CSS classes for the container |

## 🔧 Configuration

### Icon Mapping (`icons.js`)

The `icons.js` file contains the configuration for available icons:

```javascript
const ICON_Files_BasePath = '/assets/icons/'; // Base path for icons

const ICON_Files = {
  home: 'home.svg',
  user: 'user.svg',
  settings: 'settings.svg',
  alert: 'alert.svg',
  menu: 'menu.svg',
  search: 'search.svg',
  heart: 'heart.svg',
  star: 'star.svg',
  // Add more mappings as needed
};
```

### Global Default Color

You can set a global default color by defining it before including the scripts:

```html
<script>
  window.SVG_ICON_DEFAULT_COLOR = '#333333';
</script>
<script src="path/to/dist/icons.js"></script>
<script src="path/to/dist/svg-icon.js"></script>
```

## 🌐 Framework Integration

### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script src="dist/icons.js"></script>
  <script src="dist/svg-icon.js"></script>
</head>
<body>
  <svg-icon name="home" color="#007bff"></svg-icon>
</body>
</html>
```

### Angular

#### Method 1: Using NgModule

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows custom elements
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Method 2: Standalone Component

```typescript
// component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <svg-icon name="home" color="#007bff"></svg-icon>
  `
})
export class ExampleComponent { }
```

#### Include Scripts in angular.json

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "scripts": [
              "src/assets/dist/icons.js",
              "src/assets/dist/svg-icon.js"
            ]
          }
        }
      }
    }
  }
}
```

### React

```jsx
// Import the scripts (in index.js or App.js)
import './path/to/dist/icons.js';
import './path/to/dist/svg-icon.js';

// Component usage
function IconExample() {
  return (
    <div>
      <svg-icon name="home" color="#007bff"></svg-icon>
    </div>
  );
}

export default IconExample;
```

#### TypeScript Support

Add this to your type definitions file (e.g., `custom-elements.d.ts`):

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'svg-icon': {
      name?: string;
      color?: string;
      view?: string;
      container_width?: string;
      container_height?: string;
      container_classes?: string;
    };
  }
}
```

### Vue.js

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

// Import the web component scripts
import './path/to/dist/icons.js';
import './path/to/dist/svg-icon.js';

const app = createApp(App);

// Configure Vue to recognize custom elements
app.config.compilerOptions.isCustomElement = tag => tag.includes('-');

app.mount('#app');
```

```vue
<!-- Component template -->
<template>
  <div>
    <svg-icon name="home" color="#007bff"></svg-icon>
  </div>
</template>
```

## 📂 Adding New Icons

### Step 1: Prepare Your SVG

Ensure your SVG file follows these guidelines:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 12h3v8h14v-8h3L12 2z" fill="currentColor"/>
</svg>
```

- Include proper `xmlns` and `viewBox` attributes
- Use `fill="currentColor"` or remove fill attributes for color customization
- Keep the SVG optimized and clean

### Step 2: Add SVG to Icons Directory

Place your SVG file in the icons directory:

```
assets/
  icons/
    ├── home.svg
    ├── user.svg
    ├── settings.svg
    └── your-new-icon.svg  ← Add here
```

### Step 3: Update Icon Mapping

Edit the `icons.js` file to include your new icon:

```javascript
const ICON_Files = {
  home: 'home.svg',
  user: 'user.svg',
  settings: 'settings.svg',
  yourNewIcon: 'your-new-icon.svg'  // Add this line
};
```

### Step 4: Use Your New Icon

```html
<svg-icon name="yourNewIcon" color="#ff5722"></svg-icon>
```

## 🎨 Styling Tips

### CSS Customization

```css
/* Style the icon container */
svg-icon {
  display: inline-block;
  transition: transform 0.2s ease;
}

svg-icon:hover {
  transform: scale(1.1);
}

/* Style specific icons */
svg-icon[name="home"] {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
}
```

### Dynamic Color Changes

```javascript
// Change icon color dynamically
const icon = document.querySelector('svg-icon[name="home"]');
icon.setAttribute('color', '#ff5722');
```

## 🔍 Advanced Usage

### Responsive Icons

```html
<svg-icon 
  name="menu" 
  container_width="clamp(16px, 4vw, 32px)"
  container_height="clamp(16px, 4vw, 32px)">
</svg-icon>
```

### Custom ViewBox

```html
<svg-icon 
  name="custom-icon" 
  view="0 0 100 100"
  color="#007bff">
</svg-icon>
```

### Icon with CSS Classes

```html
<svg-icon 
  name="star" 
  container_classes="favorite-icon pulse-animation">
</svg-icon>
```

## 🐛 Troubleshooting

### Common Issues

1. **Icon not showing**: Check if the icon name exists in `ICON_FILES` and the SVG file path is correct.

2. **Color not changing**: Ensure your SVG uses `fill="currentColor"` or has removable fill attributes.

3. **Size issues**: Verify that your SVG has a proper `viewBox` attribute.

4. **Console errors**: Check the browser console for specific error messages about missing files or network issues.

### Debug Mode

Add this to check available icons:

```javascript
console.log('Available icons:', Object.keys(ICON_Files));
```

## 📊 Browser Support

- ✅ Chrome 67+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Edge 79+
- ✅ Opera 54+

## 📝 Best Practices

1. **Icon Naming**: Use descriptive, kebab-case names for icons
2. **SVG Optimization**: Use tools like SVGO to optimize SVG files
3. **Consistent ViewBox**: Use consistent viewBox dimensions (e.g., 0 0 24 24)
4. **Accessibility**: Consider adding `aria-label` attributes for screen readers
5. **Performance**: Limit the number of icons loaded simultaneously

---