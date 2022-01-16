import React, { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber';
import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

function Model({ url }: {url: string}) {
  const [obj, set] = useState<Group>()
  useMemo(() => new OBJLoader().load(url, set), [url])
  
  return obj ? <primitive object={obj} /> : null
}

function App() {
  return (
    
      <Canvas>
          <Model url = 'https://ipfs.moralis.io:2053/ipfs/QmdbiLJ3hJUCAR3Qh6sWqBhjHopWja7nFxmnJAW5Wx4W9a'/>
      </Canvas>

  );
}

export default App;