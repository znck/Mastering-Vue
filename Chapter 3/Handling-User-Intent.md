# Handling User Intent

A web application provides a set of functionality to perform well-defined tasks for the user. These functionalities are often disconnected, and they require user interaction, e.g., clicking a link, typing in an input field or submitting a form. For example, on a webpage rendering list of article titles, the user wants to open details of an article, so she clicks on the title. The intent to open the article is captured as a click event on the article title. The application requires listening to the click events to perform the intended tasks, here, opening the article. To summarize it all, user intent in web applications is captured as events, and we bind the JavaScript logic to the events to handle user intent.

## Listening to events

Vue provides `v-on` directive to register event handlers in the template syntax. The `v-on` directive takes event name as an argument, and in expression, it accepts a method name or a JavaScript expression.

For example:

``` html
<template>
  <div>
    Counter: {{ counter }} <button v-on:click="counter += 1">Add 1</button>
  </div>
</template>

<script>
export default {
  data() {
    return { counter: 0 }
  }
}
</script>
```

In above example, the expression `counter += 1` is executed whenever a user clicks on the "Add 1" button, which would in turn increment the `counter` by 1.

The logic handling user intents are often a bit more complex than the above example, or a JavaScript expression is not sufficient. It is better to keep the logic in the `<script>` section. As `v-on` also accepts a method name as expression, we can extract the logic to a method. The above example can be written as follows:

``` html
<template>
  <div>
    Counter: {{ counter }} <button v-on:click="increment">Add 1</button>
  </div>
</template>

<script>
export default {
  data() {
    return { counter: 0 }
  },
  methods: {
    increment() {
      this.counter += 1
    }
  }
}
</script>
```

The event handler can accept parameters too. For example, we have two increment buttons, "Add 1" and "Add 2". We can use the method call as `v-on` expression in such cases.

``` html
<template>
  <div>
    Counter: {{ counter }}
    <button v-on:click="incrementBy(1)">Add 1</button>
    <button v-on:click="incrementBy(2)">Add 2</button>
  </div>
</template>

<script>
export default {
  data() {
    return { counter: 0 }
  },
  methods: {
    incrementBy(unit) {
      this.counter += unit
    }
  }
}
</script>
```

Sometimes, we need the original DOM event fired in the `v-on` expression, and it is available as `$event` variable in the expression context. 

For example:

``` html
<template>
  <button v-on:click="notify('I am clicked.', $event)">Click me!</button>
</template>

<script>
export default {
  methods: {
    notify(message, event) {
      event.preventDefault()

      console.log(message)
    }
  }
}
</script>
```

In above example, we pass the original DOM event to the `notify` method which in turn prevents the default action.

It is very common to call `event.preventDefault()` or `event.stopPropagation()` in the event handler. Vue offer modifier on `v-on` directive to handle such needs. Although, we can call `event.preventDefault()` in the event handler, but it's better if the event handler focuses on the business logic rather than dealing with DOM events.

The above example can be rewritten using modifiers as follows:

``` html
<template>
  <button v-on:click.prevent="notify('I am clicked.')">Click me!</button>
</template>

<script>
export default {
  methods: {
    notify(message) {
      console.log(message)
    }
  }
}
</script>
```

The `.prevent` modifier in above example tells Vue to call `.preventDefault()` on the click event. Other than `.prevent`, Vue offers following modifiers on `v-on` directive:

- `.stop` - stops the event propagation, equivalent to calling `event.stopPropagation()`.
- `.prevent` - prevents the default action, equivalent to calling `event.preventDefault()`.
- `.capture` - registers the event in capture mode. The event targeting an inner element is handled here before being handled by the inner element.
- `.self` - only trigger when the event target is the element itself.
- `.once` - only triggered once.
- `.passive` - registers the event in passive mode. The passive mode is a way of telling the browser that this handler does not call `.preventDefault()`. We cannot use `.passive` and `.prevent` together as they contradict each other.

We can chain multiple modifiers too. For example: `v-on:click.stop.prevent` would call both `.stopPropagation()` and `.preventDefault()` on the event.

<p class="packt_infobox">

The order of modifiers is important as the code generated to handle modifiers is in the same order, so for `v-on:click.prevent.self`, Vue would call `.preventDefault()` on all events but the handler would be called when the element using `v-on` is the event target and for `v-on:click.self.prevent`, Vue would call handler and `.preventDefault()` only when the element using `v-on` is the event target.

</p>

## Form input bindings

At very high level, a web application is a collection of forms to collect information from user and views to present the received information back to the user. Using form input, we can request required information to server user intents.

We can use `v-on` to listen form input events. For example:

``` html
<template>
  <input type="text" v-bind:value="name" v-on:input="name = $event.target.value" />
</template>

<script>
export default {
  data() {
    return { name: '' }
  }
}
</script>
```

In above example, we bind the `<input>` value to `name` data property and on any `input` event, we update the `name` with `<input>` element's value. It looks a little verbose, and we may need to handle it differently for different input types. Vue provides another directive, `v-model` to simplify this. The `v-model` directive is syntax sugar for binding value, and it's change event. The above example can be written using `v-model` as follows:

``` html
<template>
  <input type="text" v-model="name" />
</template>

<script>
export default {
  data() {
    return { name: '' }
  }
}
</script>
```

We can use `v-model` on all kinds of form input elements. 

For example:

- With textarea:

  ``` html
  <textarea v-model="message"></textarea>
  ```

- With checkbox:

  ``` html
  <input type="checkbox" v-model="checked">
  ```

- With radio buttons:

  ``` html
  <input type="radio" value="One" v-model="picked">
  <input type="radio" value="Two" v-model="picked">
  ```

- With select:

  ``` html
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  ```

### 2-way data binding

The `v-model` directive provides two-way data binding. But it is different from conventional two-way data binding as the values bound to elements or components are immutable and the value is updated via events.

For example:

``` html
<div id="#app">
  <input type="text" v-model"name" />
</div>

<script>
const app = new Vue({
  el: '#app',
  data() {
    return { name: '' }
  }
})
</script>
```

In above example, if we type something in the input field, the `name` data property would be updated accordingly. And if we update `name` value in JavaScript, the value rendered in the input field would be updated accordingly.

Vue allows similar two-way binding for any component props too. The `v-bind` directive accepts `.sync` modifier for this purpose.

For example:

``` html
<template>
  <my-component v-bind:name.sync="name" />
</template>

<script>
export default {
  data() {
    return { name: '' }
  }
}
```

The `v-bind` usage in above can also be written as following:

``` html
<my-component v-bind:name="name" v-on:update:name="name = $event" />
```

The `v-bind.sync` is syntax sugar for the prop binding and the corresponding update event handler.

## Handling custom events

Vue provides an events API similar to native DOM events API. A component may send events using `$event` method on the component instance, and we can register handlers for these events using the same `v-on` directive.

For example:

``` html
<template>
  <my-component v-on:custom-event="doSomething"></my-component>
</template>

<script>
export default {
  methods: {
    doSomething () {
      console.log('Got a custom event.')
    }
  }
}
</script>
```

Following is an example implementation of `<my-component>`:

``` html
<template>
  <button v-on:click.prevent="sendEvent">Click me</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$event('custom-event')
    }
  }
}
</script>
```

<p class="packt_infobox">

Vue does not provide any case transformation for event names, and due to HTML's case insensitivity, we cannot use camelCase or PascalCase for event names. So, if we write `v-on:CustomEvent` or `v-on:customEvent`, it would be always treated as `v-on:customevent`.

For these reasons, kebab-case is recommended for event names.

</p>

We can send any value with component events. For example:

``` html
<template>
  <button v-on:click.prevent="sendEvent">Click me</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$event('custom-event', Math.random())
    }
  }
}
</script>
```

And the value sent with the event is accessible in the handler function as an argument. For example:

``` html
<template>
  <my-component v-on:custom-event="doSomething"></my-component>
</template>

<script>
export default {
  methods: {
    doSomething (value) {
      console.log('Got a custom event with:', value)
    }
  }
}
</script>
```

We may send more than one value when using `$emit`. For example:

``` html
<template>
  <button v-on:click.prevent="sendEvent">Click me</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$event('custom-event', Math.random(), 'another-arg')
    }
  }
}
</script>
```

And the values are accessible in the handler function as arguments. For example:

``` html
<template>
  <my-component v-on:custom-event="doSomething"></my-component>
</template>

<script>
export default {
  methods: {
    doSomething (value1, value2) {
      console.log('Got a custom event with:', value1, value2)
    }
  }
}
</script>
```

If we use `v-on` with inline expression, only the first value is accessible as `$event` hence it is recommended to send only one value with custom component events.

## Input components

As the component and DOM elements have similar event API, we can use `v-model` with both of them. The component which allows using `v-model` is called input component. Input components can be used to create complex input elements like date selector or color picker.

As we know `v-model` is syntactic sugar for `v-bind:value` and `v-on:input`, so a component which accepts `value` prop and emits `input` event is input component and we may use `v-model` with any such component. 

For example, following is implementation of `<toggle-button>` component:

``` html
<template>
  <button v-on:click="$emit('input', !value)">{{ value ? 'on' : 'off' }}</button>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true }
  }
}
</script>
```

We can use `v-model` with `<toggle-button>` component. For example:

``` html
<toggle-button v-model="value">
```

By default, `v-model` on a component uses `value` as the prop and `input` as the event, but some input types such as checkboxes and radio buttons may want to use the `value` attribute/prop for a different purpose. The input component can explicitly specify the prop and event for `v-model` in such scenarios. For example, the above `<toggle-button>` component can be written as follows:

``` html
<template>
  <button v-on:click="$emit('toggle', !enabled)">{{ enabled ? value + 'on' : value + ' off' }}</button>
</template>

<script>
export default {
  props: {
    value: { type: String },
    enabled: { type: Boolean, required: true }
  },
  model: {
    prop: 'enabled',
    event: 'toggle'
  }
}
</script>
```

And we may use it as following:

``` html
<toggle-button v-model="value" value="lamp" >
```

The button rendered in above example would have "lamp on" or "lamp off" text depending upon the value of `value` data property.

## Validating user input

## Handling file uploads

## Create review (comment & rating) component

## Create cart component

## Animating cart items (list transitions)

## Animating state transitions
