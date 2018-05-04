# Mastering Vue

Building apps with the progressive framework

## Audience

This book is focused on developers who understand JavaScript and CSS, seasoned backend developers who want to migrate their knowledge from classical server rendered applications to modern single page progressive web applications and web developers who understand react or angular and looking for a switch to Vue.

## Mission

* To provide a comprehensive guide for building large web applications.
* Bridge the gap between getting started guide and building real world application.
* To take readers on a journey to build a real world web application.

## Detailed outline

### Part 1- Getting Started

#### [1. Introduction](./Chapter 1) - 40-50 pages

This chapter scratches the surface of vue and discusses about MVVM architecture. Understanding application life-cycle in browser.
Declarative rendering, data binding, event handling, components, composition, mixins, async components.

* **Level:** BASIC
* **Topics:**
  MVVM architecture, What is vue? Writing vue components and building simple reactive interfaces. Application boot, mount point and mounting, vue instance, initial render and hydration.
* **Skills:**
  Writing a simple vue snippet app on jsfiddle. High level understanding of working of vue. Understanding application flow in browser.

### Part 2 - Building the Application

#### [2. Creating an online hat store](./Chapter 2) - 25-30 pages

This chapter covers the process of creating/scaffolding new project, development environment and project structure, components and composition. Along with above concepts, it focuses on building two pages of the application — a product list page (to display list of all items) and a category page (to display list of all items of a category).

* **Summary:**

  * Scaffolding a project
  * Configuring development environment
    * Configuring IDE
    * Configuring Browser
  * Configuring test environment
    * Choosing a test runner
    * Setting up test environment
    * Crash course: Test Driven Development
  * Overview of the development process
  * Application structure overview
  * Creating the hat store

    * Create UI mocks
    * Create sitemap
    * Creating pages
      * The product list page
      * The category page

* **Level:** BASIC
* **Topics:**
  Vue CLI, poi, Editor/IDE setup, DevTools setup, Declarative rendering, component composition, unit testing
* **Skills:**
  How create and run simple applications without any configuration? How to scaffold new projects using vue CLI? How to configure development environment? Understanding of data binding in vue application, rendering list of items, conditionally rendering content, code reuse and unit testing components.

#### [3 - Handling User Intent](./Chapter 3) - 25-30 pages

This chapter focuses on user interaction handling and we add two more components (cart and comment widget) to the application.

* **Summary:**
  * Listening to events
  * Form input bindings (Perceived 2-way data binding)
  * Handling custom events
  * Input components
  * Validating user input
  * Handling file uploads
  * Create review (comment & rating) component
  * Create cart component
  * Animating cart items (list transitions)
  * Animating state transitions
* **Level:** BASIC
* **Topics:** Event binding, event propagation, custom events, input components, validation, computed properties, watchers.
* **Skills:** Communication between various components.

#### [4 - Advanced Components](./Chapter 4) - 20-25 pages

This chapter talks about different types of components.

* **Summary:**
  * Review Component API
  * Single File Component
  * Component Registration
  * Types of component
    * Simple Component
    * Input Component
    * Functional Component
    * Recursive Component
    * Dynamic Component
    * Async Component
    * Async Component with Fallback
    * Component with inline template
    * Component as computed property
    * Abstract Component
  * Content Distribution
    * Slots
    * Named Slots
    * Scoped Slots
* **Level:** ADVANCED
* **Topics:**
  Components. Slots.
* **Skills:**
  Creating different kinds of components.

#### [5 - Integrating UI Frameworks](./Chapter 5)

This chapter talks about using UI frameworks.

* **Summary:**
  * Integrating UI frameworks like Quasar, BootstrapVue, Vuetify etc.
    * Anatomy of a vue plugin
    * Using a vue plugin
    * Using a UI framework
    * Using selected components from a framework
  * Integrating CSS frameworks Bootstrap, Bulma, Foundation etc.
    * Creating components with external styles
    * Creating a vue plugin
    * Publishing a vue plugin
* **Level:** MEDIUM
* **Topics:**
  Plugins. Shareable Components. UI Frameworks.
* **Skills:**
  Creating shareable components. Using prebuilt UI frameworks. Using/creating plugins.

...