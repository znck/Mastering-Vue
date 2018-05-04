# Integrating UI Frameworks

UI frameworks are collection of reusable components. Vue ecosystem has dozens of well maintained and stable UI frameworks e.g. vuetify, vue-material, quasar, etc. In the following sections, we would see, how to use these frameworks and how to create your own UI framework.

## Using Component Libraries

In theory, the UI frameworks are collection of components but they come baked in with design decisions, well set conventions, components, directives, filters and styles too. Knowing these details upfront can be overwhelming that is why the component libraries ship a Vue plugin hide away the nifty details.

### Anatomy of a Vue plugin

A Vue plugin is a function or an object with a method named `install` on it. Let's create a simple plugin.

``` js
// my-plugin.js
export default function MyPlugin(Vue) {
  console.log('This is a Vue plugin.')
  Vue.component('MyComponent', { template: '<div>Hello</div>' })
}
```

The above function is a Vue plugin which registers the `MyComponent` component as a global component. The plugin can also be an object, for example:

``` js
// my-plugin.js
export default {
  version: '3.1.4',
  install (Vue) {
    console.log('This is a Vue plugin.')
    Vue.component('MyComponent', { template: '<div>Hello</div>' })
  }
}
```

### Using a Vue plugin

We can use the above created plugin as demonstrated in following snippet.

``` js
import Vue from 'vue'
import MyPlugin from 'my-plugin'

Vue.use(MyPlugin)
```

A plugin can accept some options too, for example:

```js
...
Vue.use(MyPlugin, { componentName: 'MySuperbComponent' })
```

### Using a UI framework

Most UI frameworks ship in two parts, a Vue plugin and a CSS file. We have to include both in our application code. In following snippet, we use a hypothetical UI framework.

```js
// main.js
import Vue from 'vue'
import SomeFrameworkPlugin from 'some-framework'

import 'some-framework/style.css'

Vue.use(SomeFrameworkPlugin)
```

### Using selected component from a framework

The UI frameworks bundle dozens of components and sometimes we don't need them all. In such scenarios, instead of using the plugin, we can pick selected components and register them ourself. For example:

``` js
import Vue from 'vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'

Vue.component('b-modal', bModal)
```

The example above demonstrates global component registration but we can register is locally too.

``` html
<template>
 ...
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'

export default {
  name: 'MyComponent',
  
  components: { bModal }
}
</script>
```

## Using CSS Libraries

Styles are first class citizen of Vue single file components. It's inherently very convenient to use existing CSS files or any CSS library with Vue.

### Creating components with external styles

The style blocks in a single file component can be written in any language that can be pre-processed to CSS. This grants us flexibility to use external styles in couple of ways. For example, using `src` attribute on `<style>` block.

``` html
...
<style src="../style.css"></style>
```

As each style block is processed with postcss, we can use CSS imports.

``` html
...
<style>
@import '../style.css';
...
</style>
```

And obviously, we can use CSS dialects too.

``` html
...
<style lang="stylus">
@require "../style.css";
...
</style>
```

### Creating a Vue plugin

Primary way of code sharing in Vue ecosystem is components. But, we can share code with mixins, directives and filters too. Vue plugins bundles all sharable components, mixins, directives and filters into an installable package.

The plugin architecture is very straight forward. The plugin can be either of following:

* An object with install method on it.

  ``` js
  export default {
    install() {
      // ...
    }
  }
  ```

  ``` js
  export default class MyPlugin {
    static install() {
      // ...
    }
  }
  ```

* A function, in which case it is treated as install method.

  ``` js
  export default function MyVuePlugin() {
    // ...
  }
  ```

The plugin `install` method receives the Vue module as first parameter. We use it to register our shared components, mixins, filters and directives.

``` js
export default function MyVuePlugin(Vue) {
  Vue.component('MyComponent', ...)
  Vue.filter('myFilter', ...)
  Vue.directive('my-directive', ...)
  Vue.mixin(...)
}
```

Other than these shareable instances of code, we can provide features on Vue instance using instance properties. For example, following plugin adds a method `$awesome` on the Vue instance, so any component can have code like `this.$awesome()`.

``` js
export default function MyVuePlugin(Vue) {
  Vue.prototype.$awesome = function () {
    // ...
  }
}
```

We have to take extra care while using instance properties, we don't want to override existing Vue properties or properties set by other plugins. The guidelines for name instance properties are:

* **Prefix with dollar sign (`$`):** Unprefixed properties are reserved for the end application. As underscore is reserved for Vue's internal API and also the internal API can change any time, makes underscore unusable. Vue uses `$` for it's public API, which does not changes much over time, so it's safe to use that.
* **Prefix plugin name:** It's better to prefix instance properties with plugin name. In theory, it prevents cross plugin name collisions.

Other than instance properties, a plugin can extend the component API too. Let's create a new life-cycle hook named `sayHello`.

``` js
export default function MyVuePlugin(Vue) {
  Vue.mixin({
    created() {
      if (this.$options.sayHello) {
        this.$options.sayHello.call(this)
      }
    }
  })
}
```

The above plugin extends the component API with a new life-cycle hook named `sayHello`. The `sayHello` hook is called just after the component instance is created. The `vue-router` plugin adds hooks like `beforeRouteEnter` et. el. in similar fashion.

Lets summarize the above discussed features a plugin can provide:

* Global methods and properties, e.g. `Vue.myFunction()` or `Vue.someProperty`
* Instance properties by attaching them to `Vue.prototype`, e.g. `Vue.$awesome()`
* Provide assets like components, filters, directives, etc.
* Global mixin to add some component options.
* Extend component API.

### Publishing a Vue plugin

Vue plugins can be published as normal NPM packages but there is a convention of auto installing the plugin when used directly in a browser.

``` js
export default function MyPlugin(Vue, options) {
  ...
}

// Auto install in browser.
if (typeof window !== 'undefined' && 'Vue' in window) {
  Vue.install(MyPlugin, {})
}
```
