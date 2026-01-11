import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const NauWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !pathRef.current || !labelRef.current) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const label = labelRef.current;

    // ====== Configs rápidas ======
    const STYLE = {
      primary: 0x00d4aa,      // Cor principal teal/verde-água
      secondary: 0x00ffcc,    // Cor secundária mais brilhante
      accent: 0x4fd1c5,       // Cor accent
      wireOpacity: 0.75,
      glowOpacity: 0.25,
      detailOpacity: 0.5,
      particles: 350,
      calloutOffsetX: 150,
      calloutOffsetY: -60,
      elbowX: 70,
      margin: 14
    };

    const cannonTexts: Record<number, string> = {
      1: "Criação de Website",
      2: "Integração de Agentes IA",
      3: "Gestão de SEO e Google Meu Negócio",
      4: "Branding e Criação de Logotipos",
      5: "Gestão de Redes Sociais",
      6: "Fotografia e Vídeo Profissional"
    };

    // ====== Three.js setup (alpha => fundo transparente) ======
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // rotação só no eixo vertical (trava a inclinação)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Enhanced Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(-3, 5, 3);
    scene.add(directionalLight);
    
    const rimLight = new THREE.PointLight(STYLE.secondary, 0.5, 20);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // ====== Materiais wireframe "holograma" profissional ======
    function makeWireMat(opacity: number, color = STYLE.primary) {
      return new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    }
    const matWire = makeWireMat(STYLE.wireOpacity);
    const matGlow = makeWireMat(STYLE.glowOpacity, STYLE.secondary);
    const matDetail = makeWireMat(STYLE.detailOpacity);

    // ====== Nau profissional (wireframe teal) ======
    const ship = new THREE.Group();
    scene.add(ship);

    // Hull (casco): mais detalhado e realista
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-2.4, 0.0);
    hullShape.bezierCurveTo(-2.2, -0.55, -1.1, -0.75, 0.0, -0.7);
    hullShape.bezierCurveTo(1.1, -0.65, 2.3, -0.35, 2.5, 0.05);
    hullShape.bezierCurveTo(1.4, 0.6, -1.2, 0.7, -2.4, 0.0);

    const hullGeo = new THREE.ExtrudeGeometry(hullShape, {
      depth: 1.8,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 3,
      steps: 2
    });
    hullGeo.center();

    const hull1 = new THREE.Mesh(hullGeo, matWire);
    const hull2 = new THREE.Mesh(hullGeo, matGlow);
    hull2.scale.set(1.02, 1.02, 1.02);
    ship.add(hull1, hull2);

    // Keel (quilha) - linha inferior do casco
    const keelGeo = new THREE.BoxGeometry(4.5, 0.06, 0.06);
    const keel = new THREE.Mesh(keelGeo, matDetail);
    keel.position.set(0, -0.75, 0);
    ship.add(keel);

    // Convés principal
    const deckGeo = new THREE.BoxGeometry(3.5, 0.12, 1.3);
    const deck1 = new THREE.Mesh(deckGeo, matWire);
    deck1.position.set(0.2, 0.55, 0);
    const deck2 = new THREE.Mesh(deckGeo, matGlow);
    deck2.position.copy(deck1.position);
    deck2.scale.set(1.02, 1.02, 1.02);
    ship.add(deck1, deck2);

    // Castelo de Proa (forecastle) - elevação na frente
    const forecastleGeo = new THREE.BoxGeometry(1.1, 0.45, 1.15);
    const forecastle1 = new THREE.Mesh(forecastleGeo, matWire);
    forecastle1.position.set(1.9, 0.85, 0);
    const forecastle2 = new THREE.Mesh(forecastleGeo, matGlow);
    forecastle2.position.copy(forecastle1.position);
    forecastle2.scale.set(1.02, 1.02, 1.02);
    ship.add(forecastle1, forecastle2);

    // Castelo de Popa (sterncastle) - elevação atrás
    const sterncastleGeo = new THREE.BoxGeometry(1.3, 0.6, 1.2);
    const sterncastle1 = new THREE.Mesh(sterncastleGeo, matWire);
    sterncastle1.position.set(-1.7, 0.9, 0);
    const sterncastle2 = new THREE.Mesh(sterncastleGeo, matGlow);
    sterncastle2.position.copy(sterncastle1.position);
    sterncastle2.scale.set(1.02, 1.02, 1.02);
    ship.add(sterncastle1, sterncastle2);

    // Cabine do capitão
    const cabinGeo = new THREE.BoxGeometry(0.8, 0.35, 0.7);
    const cabin = new THREE.Mesh(cabinGeo, matDetail);
    cabin.position.set(-1.7, 1.35, 0);
    ship.add(cabin);

    // Rails (grades laterais)
    const railGeo = new THREE.BoxGeometry(3.2, 0.08, 0.03);
    const railLeft = new THREE.Mesh(railGeo, matDetail);
    railLeft.position.set(0.1, 0.72, 0.65);
    const railRight = railLeft.clone();
    railRight.position.z = -0.65;
    ship.add(railLeft, railRight);

    // Mastros mais detalhados + velas curvas
    function addMast(x: number, h: number, hasSquareSail = true) {
      // Mastro principal
      const mastGeo = new THREE.CylinderGeometry(0.05, 0.07, h, 12, 1, true);
      const m1 = new THREE.Mesh(mastGeo, matWire);
      m1.position.set(x, 0.7 + h / 2, 0);
      const m2 = new THREE.Mesh(mastGeo, matGlow);
      m2.position.copy(m1.position);
      m2.scale.set(1.04, 1.01, 1.04);
      ship.add(m1, m2);

      // Cesto de vigia (crow's nest) no mastro principal
      if (x === 0.4) {
        const nestGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.12, 10);
        const nest = new THREE.Mesh(nestGeo, matDetail);
        nest.position.set(x, 0.7 + h * 0.7, 0);
        ship.add(nest);
      }

      // Verga (yard arm)
      const yardGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.5, 8, 1, true);
      const y1 = new THREE.Mesh(yardGeo, matWire);
      y1.rotation.z = Math.PI / 2;
      y1.position.set(x, 0.7 + h * 0.66, 0);
      const y2 = new THREE.Mesh(yardGeo, matGlow);
      y2.rotation.copy(y1.rotation);
      y2.position.copy(y1.position);
      y2.scale.set(1.05, 1.01, 1.05);
      ship.add(y1, y2);

      if (hasSquareSail) {
        // Verga secundária
        const yard2Geo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8);
        const yard2 = new THREE.Mesh(yard2Geo, matDetail);
        yard2.rotation.z = Math.PI / 2;
        yard2.position.set(x, 0.7 + h * 0.4, 0);
        ship.add(yard2);
      }

      // Vela com curvatura realista
      const sailGeo = new THREE.PlaneGeometry(1.4, 1.8, 12, 12);
      const positions = sailGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const px = positions.getX(i);
        const py = positions.getY(i);
        const z = Math.sin(px * 1.3) * 0.2 + Math.sin(py * 0.4) * 0.08;
        positions.setZ(i, z);
      }
      sailGeo.computeVertexNormals();
      
      const s1 = new THREE.Mesh(sailGeo, matWire);
      s1.position.set(x, 0.7 + h * 0.52, 0);
      s1.rotation.y = Math.PI * 0.03;
      const s2 = new THREE.Mesh(sailGeo, matGlow);
      s2.position.copy(s1.position);
      s2.rotation.copy(s1.rotation);
      s2.scale.set(1.01, 1.01, 1.01);
      ship.add(s1, s2);
    }
    
    addMast(-0.9, 2.6, false); // Mizzen mast (popa) - sem vela quadrada
    addMast(0.4, 3.2);         // Main mast - maior
    addMast(1.5, 2.3);         // Fore mast

    // Vela latina triangular no mastro da popa (típico das caravelas)
    const lateenShape = new THREE.Shape();
    lateenShape.moveTo(0, 0);
    lateenShape.lineTo(1.3, 1.7);
    lateenShape.lineTo(0, 2.0);
    lateenShape.lineTo(0, 0);
    const lateenGeo = new THREE.ShapeGeometry(lateenShape, 8);
    const lateen1 = new THREE.Mesh(lateenGeo, matWire);
    lateen1.position.set(-1.1, 0.95, 0.05);
    lateen1.rotation.y = 0.12;
    const lateen2 = new THREE.Mesh(lateenGeo, matGlow);
    lateen2.position.copy(lateen1.position);
    lateen2.rotation.copy(lateen1.rotation);
    lateen2.scale.set(1.01, 1.01, 1.01);
    ship.add(lateen1, lateen2);

    // Bowsprit (gurupés - mastro inclinado na proa)
    const bowspritGeo = new THREE.CylinderGeometry(0.03, 0.04, 1.6, 8);
    const bowsprit = new THREE.Mesh(bowspritGeo, matWire);
    bowsprit.rotation.z = Math.PI / 4;
    bowsprit.position.set(2.6, 0.7, 0);
    ship.add(bowsprit);

    // Jib sail (vela do gurupés)
    const jibShape = new THREE.Shape();
    jibShape.moveTo(0, 0);
    jibShape.lineTo(1.0, 0.7);
    jibShape.lineTo(0, 1.1);
    jibShape.lineTo(0, 0);
    const jibGeo = new THREE.ShapeGeometry(jibShape, 6);
    const jib = new THREE.Mesh(jibGeo, matDetail);
    jib.position.set(2.3, 0.55, 0.03);
    jib.rotation.y = -0.1;
    ship.add(jib);

    // Cordame (rigging lines)
    const lineMat = new THREE.LineBasicMaterial({ 
      color: STYLE.primary, 
      transparent: true, 
      opacity: 0.35 
    });
    
    const createLine = (from: THREE.Vector3, to: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      return new THREE.Line(geo, lineMat);
    };
    
    // Shrouds (cabos laterais dos mastros)
    ship.add(createLine(new THREE.Vector3(0.4, 0.6, 0.6), new THREE.Vector3(0.4, 3.5, 0)));
    ship.add(createLine(new THREE.Vector3(0.4, 0.6, -0.6), new THREE.Vector3(0.4, 3.5, 0)));
    ship.add(createLine(new THREE.Vector3(1.5, 0.6, 0.55), new THREE.Vector3(1.5, 2.8, 0)));
    ship.add(createLine(new THREE.Vector3(1.5, 0.6, -0.55), new THREE.Vector3(1.5, 2.8, 0)));
    
    // Stays (cabos de proa a popa)
    ship.add(createLine(new THREE.Vector3(0.4, 3.6, 0), new THREE.Vector3(2.8, 1.3, 0)));
    ship.add(createLine(new THREE.Vector3(0.4, 3.6, 0), new THREE.Vector3(-0.9, 2.9, 0)));

    // Bandeira portuguesa
    const flagShape = new THREE.Shape();
    flagShape.moveTo(0, 0);
    flagShape.lineTo(0.55, 0.08);
    flagShape.lineTo(0.5, 0.32);
    flagShape.lineTo(0, 0.25);
    flagShape.lineTo(0, 0);
    const flagGeo = new THREE.ShapeGeometry(flagShape, 4);
    const flag = new THREE.Mesh(flagGeo, matWire);
    flag.position.set(0.4, 3.65, 0);
    ship.add(flag);

    // Partículas melhoradas com efeito de spray
    const ptsGeo = new THREE.BufferGeometry();
    const pts = new Float32Array(STYLE.particles * 3);
    for (let i = 0; i < STYLE.particles; i++) {
      const isWaterSpray = i < STYLE.particles * 0.3;
      if (isWaterSpray) {
        // Partículas concentradas perto da água
        pts[i * 3 + 0] = (Math.random() - 0.5) * 7;
        pts[i * 3 + 1] = (Math.random() - 0.5) * 1.5 - 1;
        pts[i * 3 + 2] = (Math.random() - 0.5) * 4;
      } else {
        // Partículas ambiente
        const r = 5.5 * Math.random();
        const a = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.3) * 5;
        pts[i * 3 + 0] = Math.cos(a) * r;
        pts[i * 3 + 1] = y;
        pts[i * 3 + 2] = Math.sin(a) * r;
      }
    }
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const ptsMat = new THREE.PointsMaterial({
      color: STYLE.primary,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    ship.add(new THREE.Points(ptsGeo, ptsMat));

    // Superfície da água (grid subtil)
    const waterGeo = new THREE.PlaneGeometry(10, 7, 18, 12);
    const waterMat = new THREE.MeshBasicMaterial({
      color: STYLE.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.1;
    scene.add(water);

    // Posição e ângulo inicial - navio mais baixo para ficar 100% visível
    ship.position.y = -0.35;
    ship.rotation.y = -0.55;

    // ====== Canhões melhorados com montagens ======
    const cannons: { id: number; target: THREE.Mesh }[] = [];
    const clickTargets: THREE.Mesh[] = [];

    function addCannon(id: number, x: number, y: number, z: number) {
      // Canhão
      const geo = new THREE.CylinderGeometry(0.055, 0.075, 0.4, 10, 1, true);
      const m = new THREE.Mesh(geo, matWire);
      m.rotation.x = Math.PI / 2;
      m.position.set(x, y, z);
      ship.add(m);

      // Montagem do canhão
      const mountGeo = new THREE.BoxGeometry(0.1, 0.06, 0.12);
      const mount = new THREE.Mesh(mountGeo, matDetail);
      mount.position.set(x, y - 0.06, z * 0.85);
      ship.add(mount);

      // Target invisível para cliques
      const tGeo = new THREE.SphereGeometry(0.25, 12, 12);
      const tMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const t = new THREE.Mesh(tGeo, tMat);
      t.position.copy(m.position);
      t.userData.cannonId = id;
      ship.add(t);

      cannons.push({ id, target: t });
      clickTargets.push(t);
    }

    const yC = 0.42;
    const zSide = 0.95;

    // Lado A: 4 canhões
    addCannon(1, -1.4, yC, +zSide);
    addCannon(2, -0.5, yC, +zSide);
    addCannon(3, +0.4, yC, +zSide);
    addCannon(4, +1.3, yC, +zSide);

    // Lado B: mais 2 canhões (espelhado, serviços 5 e 6)
    addCannon(5, -0.5, yC, -zSide);
    addCannon(6, +0.4, yC, -zSide);

    // Âncora
    const anchorGeo = new THREE.TorusGeometry(0.1, 0.02, 6, 12, Math.PI);
    const anchor = new THREE.Mesh(anchorGeo, matDetail);
    anchor.position.set(2.15, 0.15, 0.35);
    anchor.rotation.z = Math.PI;
    ship.add(anchor);

    // ====== Raycaster (click/touch) ======
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let activeCannonId = 1; // Canhão 1 visível ao carregar

    function setActiveCannon(id: number) {
      activeCannonId = id;
      label.textContent = cannonTexts[id] || "";
      label.style.opacity = "1";
    }
    setActiveCannon(1);

    function onPointerMove(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickTargets, false);
      renderer.domElement.style.cursor = hits.length ? "pointer" : "grab";
    }

    function onPointerDown(ev: PointerEvent) {
      if (ev.pointerType === "touch") ev.preventDefault();

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickTargets, false);
      if (hits.length) {
        const id = hits[0].object.userData.cannonId;
        setActiveCannon(id);
      }
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });
    renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: false });

    // ====== Callout: 3D -> 2D, linha em cotovelo, sempre "para fora" ======
    const tmpV = new THREE.Vector3();
    const tmpCenter = new THREE.Vector3();

    function worldToScreen(v3: THREE.Vector3, rect: DOMRect) {
      const v = v3.clone().project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * rect.width,
        y: (-v.y * 0.5 + 0.5) * rect.height
      };
    }

    function updateCallout() {
      const rect = renderer.domElement.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

      const c = cannons.find(c => c.id === activeCannonId);
      if (!c) {
        path.setAttribute("d", "");
        label.style.opacity = "0";
        return;
      }

      // ponto do canhão (screen)
      c.target.getWorldPosition(tmpV);
      const start = worldToScreen(tmpV, rect);

      // centro da nau (screen) para decidir se está à direita/esquerda no ecrã
      ship.getWorldPosition(tmpCenter);
      const center = worldToScreen(tmpCenter, rect);

      // regra: direita quando está à direita, esquerda quando está à esquerda
      const dir = (start.x >= center.x) ? +1 : -1;

      let elbowX = start.x + dir * STYLE.elbowX;
      let elbowY = start.y;

      let endX = start.x + dir * STYLE.calloutOffsetX;
      let endY = start.y + STYLE.calloutOffsetY;

      // reorganizar para não sair fora do ecrã (mantendo o lado "para fora")
      endY = Math.max(STYLE.margin, Math.min(rect.height - STYLE.margin, endY));

      if (dir > 0) {
        endX = Math.max(center.x + STYLE.margin, endX);
        endX = Math.min(rect.width - STYLE.margin, endX);
      } else {
        endX = Math.min(center.x - STYLE.margin, endX);
        endX = Math.max(STYLE.margin, endX);
      }

      elbowX = start.x + dir * STYLE.elbowX;
      elbowX = Math.max(STYLE.margin, Math.min(rect.width - STYLE.margin, elbowX));

      const d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      path.setAttribute("d", d);

      label.style.left = `${endX}px`;
      label.style.top = `${endY}px`;
      label.style.transform = dir > 0
        ? "translate(12px, -50%)"
        : "translate(calc(-100% - 12px), -50%)";
    }

    // ====== Resize ======
    function resize() {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      updateCallout();
    }
    window.addEventListener('resize', resize);

    // ====== Render loop ======
    let animationId: number;
    function animate() {
      controls.update();
      updateCallout();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    resize();
    animate();

    // ====== Cleanup ======
    return () => {
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationId);
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        ref={containerRef} 
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
      />
      
      {/* Callout SVG */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        width="100%" 
        height="100%" 
        aria-hidden="true"
      >
        <path 
          ref={pathRef}
          d="" 
          fill="none"
          stroke="#00d4aa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-95"
        />
      </svg>
      
      {/* Callout Label */}
      <div 
        ref={labelRef}
        className="absolute font-sans text-base font-medium leading-tight whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-150"
        style={{ color: '#00d4aa', textShadow: '0 0 15px rgba(0,212,170,0.4)' }}
      />
    </div>
  );
};

export default NauWidget;
