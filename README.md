# Table of Contents <!-- omit in toc -->

- [1. Initial setup](#1-initial-setup)
- [2. Creating a scene](#2-creating-a-scene)
  - [2.1. Setting up the Canvas](#21-setting-up-the-canvas)
  - [2.2. Adding a Mesh Component](#22-adding-a-mesh-component)
    - [2.2.1. Constructor arguments](#221-constructor-arguments)
  - [2.3. Adding lights](#23-adding-lights)
    - [2.3.1. Props](#231-props)
  - [2.4. 3D view (rotate)](#24-3d-view-rotate)
  - [2.5. Changing position](#25-changing-position)
  - [2.6. The result](#26-the-result)
- [3. Events and Interaction](#3-events-and-interaction)
  - [3.1. User Interaction](#31-user-interaction)
- [4. Loading Models](#4-loading-models)
  - [Loading GLTF models](#loading-gltf-models)
  - [Showing a loader](#showing-a-loader)

# React-three-fiber (R3F) <!-- omit in toc -->

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

# 2. Creating a scene

## 2.1. Setting up the Canvas

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

## 2.2. Adding a Mesh Component

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

### 2.2.1. Constructor arguments

According to the [docs for `BoxGeometry`](https://threejs.org/docs/#api/en/geometries/BoxGeometry) we can optionally pass three arguments for: `width`, `length` and `depth`.

In order to do this in Fiber we use the `args` prop, which _always_ takes an array. Modify the `App.jsx`:

```js
<boxGeometry args={[2, 2, 2]} />
```

## 2.3. Adding lights

Next, we will add some lights to our scene:

`App.jsx`

```jsx
<Canvas>
  <ambientLight intensity={0.1} />
  <directionalLight color="white" intensity={3} position={[0, 0, 5]} />
```

### 2.3.1. Props

Let's focus on our `ambientLight`, whose documentation tells us that we can optionally construct it with a color, but it can also receive props.

```jsx
<ambientLight intensity={0.1} />
```

The following props set light position, light color and intensity:

```jsx
<directionalLight position={[0, 0, 5]} intensity={3} color="white" />
```

## 2.4. 3D view (rotate)

Add `rotation` to the `mesh` along `x` and `y` axis to get the 3D view:

```jsx
<mesh rotation={[0.4, 0.6, 0]}>
```

## 2.5. Changing position

We can change the position of the `mesh` using `position`.

```jsx
<mesh position={[2, 0, 0]}>
```

## 2.6. The result

`App.jsx`

```jsx
import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" intensity={3} position={[0, 0, 5]} />

        <mesh rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
      </Canvas>
    </div>
  )
}
```

# 3. Events and Interaction

Let's make our meshes react to user input. In this part let's attach a click handler to the cube and make it bigger on click.

## 3.1. User Interaction

Any `Three.js` `Object3D` object that has a `raycast()` method, can receive a large number of events, for instance a `mesh`:

```jsx
<mesh
  onClick={(e) => console.log("click")}
  onContextMenu={(e) => console.log("context menu")}
  onDoubleClick={(e) => console.log("double click")}
  onWheel={(e) => console.log("wheel spins")}
  onPointerUp={(e) => console.log("up")}
  onPointerDown={(e) => console.log("down")}
  onPointerOver={(e) => console.log("over")}
  onPointerOut={(e) => console.log("out")}
  onPointerEnter={(e) => console.log("enter")}
  onPointerLeave={(e) => console.log("leave")}
  onPointerMove={(e) => console.log("move")}
  onPointerMissed={() => console.log("missed")}
  onUpdate={(self) => console.log("props have been updated")}
/>
```

Let's add an 'onClick' event:

`App.jsx`

```jsx
<mesh onClick={() => alert("Hello")}>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color="royalblue" />
</mesh>
```

Now let's make it actually animate our mesh.

Let's start by setting some state to check if the mesh is active:

`App.jsx`

```jsx
import { useState } from "react"

export default function App() {
  const [active, setActive] = useState(false)
  // ......
```

Then we can set the scale with a ternary operator like so:

```jsx
<mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
  <boxGeometry />
  <meshPhongMaterial color="royalblue" />
</mesh>
```

If you try to click on your mesh now, it scales up and down.

Let's use `onPointerOver` and `onPointerOut` to change the props of the mesh on hover events.

Create another piece of state:

```jsx
const [hovered, setHovered] = useState(false)
```

Then

```jsx
<mesh
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color={hovered ? "lightblue" : "royalblue"} />
</mesh>
```

Now if you hover over your mesh, it changes color.

# 4. Loading Models

There are many types of 3D model extensions, in this page we will focus on loading the most common ones: `GLTF`, `FBX`, `OBJ` and `STL`. All of these will use the `useLoader` function but in slightly different ways.

This whole section will assume you have placed your models in the public folder or in a place in your application where you can import them easily. You can download any free 3D model from [Sketchfab](https://sketchfab.com/) or [Turbosquid](https://www.turbosquid.com/).

## Loading GLTF models

Starting with the open standard and the one that has more support in React Three Fiber we will load a `.gltf` model.

First, we will split our previous code into files. Create `src/components/CreateScene.jsx` and move the following code from `App.jsx` there:

`src/components/CreateScene.jsx`

```jsx
import { useState } from "react"

export default function CreateScene() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      rotation={[0.4, 0.6, 0]}
      position={[2, 0, 0]}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "lightblue" : "royalblue"} />
    </mesh>
  )
}
```

Now import the `CreateScene` component in `App.jsx`:

`App.jsx`

```jsx
import { Canvas } from "@react-three/fiber"
import CreateScene from "./components/CreateScene"

export default function App() {
  return (
    <div>
      <div id="canvas-container" className=" h-screen w-screen">
        <Canvas>
          <CreateScene />
        </Canvas>
      </div>
    </div>
  )
}
```

Let's check that everything works as before.

Now, create `src/components/LoadModel.jsx`.

Let's start by importing the two things we need:

```jsx
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
```

With this we can create a Model component and place it in our scene like so:

```jsx
export default function LoadModel() {
  const gltf = useLoader(GLTFLoader, "/Poimandres.gltf")
  return <primitive object={gltf.scene} scale={0.4} />
}
```

In `App.jsx`, import the `LoadModel` component and add orbit controls and an HDRI background:

```jsx
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import LoadModel from "./components/LoadModel"
import { Suspense } from "react"

export default function App() {
  return (
    <div>
      <div id="canvas-container" className=" h-screen w-screen">
        <Canvas>
          <Suspense fallback={null}>
            <LoadModel />
            <OrbitControls />
            <Environment preset="city" background />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
```

## Showing a loader

If your model is big and takes a while to load, it's always good to show a small loader. Import built-in `Loader` component from `@react-three/drei` and place it outside the `Canvas`:

`src/App.jsx`

```jsx
{ Loader } from "@react-three/drei"

export default function App() {
  return (
    <div>
      <div className="App">
        <Canvas>
          <Suspense fallback={null}>
            <LoadModel />
            <OrbitControls />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  )
}
```

You can override `Loader` styles, too.

```jsx
<Loader
  containerStyles={...container} // Flex layout styles
  innerStyles={...inner} // Inner container styles
  barStyles={...bar} // Loading-bar styles
  dataStyles={...data} // Text styles
  dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
  initialState={(active) => active} // Initial black out state
>
```

# Loading Textures

We can download textures from sites like [cc0textures](https://cc0textures.com/).

## Using useTexture

using `useTexture` from `@react-three/drei`, is slightly easier than other methods.

It's better to explain with code, let's say you downloaded [this texture](https://cc0textures.com/view?id=PavingStones092) and placed it in the public folder of your site. Create a new file `src/components/LoadTexture.jsx`. To get the color map from it you could do:

`src/components/LoadTexture.jsx`

```jsx
import { useTexture } from "@react-three/drei"

export default function LoadTexture() {
  const colorMap = useTexture("PavingStones092_1K-JPG_Color.jpg")
  ...

```

Let's then with this information create a small scene where we can use this texture:

`src/components/LoadTexture.jsx`

```jsx
import { useTexture } from "@react-three/drei"

export default function LoadTexture() {
  const colorMap = useTexture("PavingStones092_1K-JPG_Color.jpg")

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial />
      </mesh>
    </>
  )
}
```

If everything went according to plan, you should now be able to apply this texture to the sphere like so:

```jsx
<meshStandardMaterial map={colorMap} />
```

Awesome! That works but we have a lot more textures.

We can use an array to pass all the textures we have and the maps will be returned and ready to use:

```jsx
import { useTexture } from "@react-three/drei"

export default function LoadTexture() {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "PavingStones092_1K-JPG_Color.jpg",
      "PavingStones092_1K-JPG_Displacement.jpg",
      "PavingStones092_1K-JPG_Normal.jpg",
      "PavingStones092_1K-JPG_Roughness.jpg",
      "PavingStones092_1K-JPG_AmbientOcclusion.jpg",
    ])

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          displacementScale={0.2}
        />
      </mesh>
    </>
  )
}
```

The displacement will probably be too much, usually setting it to `0.2` will make it look good:

```jsx
<meshStandardMaterial
  displacementScale={0.2}
  map={colorMap}
  displacementMap={displacementMap}
  normalMap={normalMap}
  roughnessMap={roughnessMap}
  aoMap={aoMap}
/>
```

You can also use object-notation which is the most convenient:

```jsx
const props = useTexture({
  map: "PavingStones092_1K-JPG_Color.jpg",
  displacementMap: "PavingStones092_1K-JPG_Displacement.jpg",
  normalMap: "PavingStones092_1K-JPG_Normal.jpg",
  roughnessMap: "PavingStones092_1K-JPG_Roughness.jpg",
  aoMap: "PavingStones092_1K-JPG_AmbientOcclusion.jpg",
})

return (
  <mesh>
    <sphereGeometry args={[1, 100, 100]} />
    <meshStandardMaterial displacementScale={0.2} {...props} />
  </mesh>
)
```

Check that everything works fine.
