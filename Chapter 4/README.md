# Advanced Components

Components let us split the UI into independent and reusable pieces. Conceptually, components are like HTML elements. They accept attributes (called `props`), emit events and can have other components or HTML elements as children. In this chapter, we will see different kind of components and component patterns.

<!-- TODO: Check whether it is truly required.
## Review Component API

The key parts of a component are `props`, `data` and `template`. 
-->

## Component Registration

Registered components can be used in template similar to HTML elements. We can register components locally or globally.

### Global Registration

Globally registered components can be used anywhere in the application.

```js
Vue.component('MyComponent', { /* options */ })
```

### Local Registration

Locally registered components are available only to the component where they are registered.

```js
import MyComponent from './MyComponent.vue'

export default {
  /* options */
  components: { MyComponent }
}
```

### Name Casing

A component name can be kebab-cased or PascalCased.

#### With kebab-case

```js
Vue.component('my-component', { /* options */ })
```

When defining a component with kebab-case, we must use kebab-case when referencing it in template e.g. `<my-component>`.

#### With PascalCase

```js
Vue.component('MyComponent', { /* options */ })
```

When defining a component with PascalCase, we can either use kebab-case or PascalCase when referencing it in template e.g. `<my-component>` or `<MyComponent>`.

## Single File Component

<!-- TODO: What is SFC? What are benefits? May be write about co-location.  -->

## Types of component

### Simple Component

### Input Component

### Functional Component

### Recursive Component

### Dynamic Component

### Async Component

### Async Component with Fallback

### Component with inline template

### Component as computed property

### Abstract Component

### Renderless Component

## Content Distribution

### Slots

### Named Slots

#### Scoped Slots
