# React-three-fiber (R3F)

React-three-fiber is a React renderer for three.js. Everything that works in Threejs will work here without exception.

# 1. Initial setup

From this link setup the following things:

- Vite + React + JavaScript
- TailwindCSS

Install three.js and react-three-fiber:

```bash
npm install three @types/three @react-three/fiber
```

That's it. Now we're ready to create a scene.

Commit changes.

# Creating a scene

## Setting up the Canvas

We'll start by importing the `<Canvas />` component from `@react-three/fiber` and putting it in our React tree.

`App.jsx`

```jsx
import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas />
    </div>
  )
}
```

The `Canvas` component does some important setup work behind the scenes:

- It sets up a **Scene** and a **Camera**, the basic building blocks necessary for rendering
- It renders our scene every frame.

> [!NOTE]
> `Canvas` is responsive to fit the parent node, so you can control how big it is by changing the parents width and height, in this case `#canvas-container`.

## Adding a Mesh Component

To actually see something in our scene, we'll add a lowercase `<mesh />` native element (just like `<div />`), which is the direct equivalent to `new THREE.Mesh()`.

A `Mesh` is a basic scene object in `three.js`, and it's used to hold the `geometry` and the `material` needed to represent a shape in 3D space. We'll create a new mesh using a `boxGeometry` and a `meshStandardMaterial` which automatically attach to their parent.

`App.jsx`

```jsx
<Canvas>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</Canvas>
```

### Constructor arguments

According to the [docs for `BoxGeometry`](https://threejs.org/docs/#api/en/geometries/BoxGeometry) we can optionally pass three arguments for: `width`, `length` and `depth`.

In order to do this in Fiber we use the `args` prop, which _always_ takes an array. Modify the `App.jsx`:

```js
<boxGeometry args={[2, 2, 2]} />
```

## Adding lights

Next, we will add some lights to our scene:

`App.jsx`

```jsx
<Canvas>
  <ambientLight intensity={0.1} />
  <directionalLight color="red" position={[0, 0, 5]} />
```

### Props

Let's focus on our `ambientLight`, whose documentation tells us that we can optionally construct it with a color, but it can also receive props.

```jsx
<ambientLight intensity={0.1} />
```

The following props set light position and color:

```jsx
<directionalLight position={[0, 0, 5]} color="red" />
```

## The result

`App.jsx`

```jsx
import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
  )
}
```
