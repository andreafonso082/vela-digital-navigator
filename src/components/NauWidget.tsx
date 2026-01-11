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
      red: 0xff2b2b,
      wireOpacity: 0.55,
      glowOpacity: 0.16,
      particles: 220,
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
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.8, 6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // rotação só no eixo vertical (trava a inclinação)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // ====== Materiais wireframe "holograma" ======
    function makeWireMat(opacity: number) {
      return new THREE.MeshBasicMaterial({
        color: STYLE.red,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    }
    const matWire = makeWireMat(STYLE.wireOpacity);
    const matGlow = makeWireMat(STYLE.glowOpacity);

    // ====== Nau "por aproximação" (wireframe vermelho) ======
    const ship = new THREE.Group();
    scene.add(ship);

    // Hull (casco): extrusão simples
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-2.2, 0.0);
    hullShape.bezierCurveTo(-2.0, -0.5, -1.0, -0.7, 0.0, -0.65);
    hullShape.bezierCurveTo(1.0, -0.6, 2.1, -0.3, 2.2, 0.05);
    hullShape.bezierCurveTo(1.3, 0.55, -1.1, 0.65, -2.2, 0.0);

    const hullGeo = new THREE.ExtrudeGeometry(hullShape, {
      depth: 1.7,
      bevelEnabled: false,
      steps: 1
    });
    hullGeo.center();

    const hull1 = new THREE.Mesh(hullGeo, matWire);
    const hull2 = new THREE.Mesh(hullGeo, matGlow);
    hull2.scale.set(1.01, 1.01, 1.01);
    ship.add(hull1, hull2);

    // Convés
    const deckGeo = new THREE.BoxGeometry(3.3, 0.35, 1.25);
    const deck1 = new THREE.Mesh(deckGeo, matWire);
    deck1.position.set(0.2, 0.55, 0);
    const deck2 = new THREE.Mesh(deckGeo, matGlow);
    deck2.position.copy(deck1.position);
    deck2.scale.set(1.02, 1.02, 1.02);
    ship.add(deck1, deck2);

    // Mastros + velas
    function addMast(x: number, h: number) {
      const mastGeo = new THREE.CylinderGeometry(0.06, 0.08, h, 12, 1, true);
      const m1 = new THREE.Mesh(mastGeo, matWire);
      m1.position.set(x, 0.7 + h / 2, 0);
      const m2 = new THREE.Mesh(mastGeo, matGlow);
      m2.position.copy(m1.position);
      m2.scale.set(1.05, 1.02, 1.05);
      ship.add(m1, m2);

      const yardGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.4, 10, 1, true);
      const y1 = new THREE.Mesh(yardGeo, matWire);
      y1.rotation.z = Math.PI / 2;
      y1.position.set(x, 0.7 + h * 0.66, 0);
      const y2 = new THREE.Mesh(yardGeo, matGlow);
      y2.rotation.copy(y1.rotation);
      y2.position.copy(y1.position);
      y2.scale.set(1.06, 1.02, 1.06);
      ship.add(y1, y2);

      const sailGeo = new THREE.PlaneGeometry(1.35, 1.75, 7, 8);
      const s1 = new THREE.Mesh(sailGeo, matWire);
      s1.position.set(x, 0.7 + h * 0.52, 0);
      s1.rotation.y = Math.PI * 0.03;
      const s2 = new THREE.Mesh(sailGeo, matGlow);
      s2.position.copy(s1.position);
      s2.rotation.copy(s1.rotation);
      s2.scale.set(1.01, 1.01, 1.01);
      ship.add(s1, s2);
    }
    addMast(-0.9, 2.6);
    addMast(0.4, 3.1);
    addMast(1.5, 2.2);

    // Partículas
    const ptsGeo = new THREE.BufferGeometry();
    const pts = new Float32Array(STYLE.particles * 3);
    for (let i = 0; i < STYLE.particles; i++) {
      const r = 5.2 * Math.random();
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.2) * 4.2;
      pts[i * 3 + 0] = Math.cos(a) * r;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = Math.sin(a) * r;
    }
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const ptsMat = new THREE.PointsMaterial({
      color: STYLE.red,
      size: 0.03,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    ship.add(new THREE.Points(ptsGeo, ptsMat));

    // Ângulo inicial
    ship.rotation.y = -0.55;

    // ====== Canhões (1 frente, 2 meio, 3 trás; outro lado espelhado) ======
    const cannons: { id: number; target: THREE.Mesh }[] = [];
    const clickTargets: THREE.Mesh[] = [];

    function addCannon(id: number, x: number, y: number, z: number) {
      const geo = new THREE.CylinderGeometry(0.07, 0.09, 0.45, 10, 1, true);
      const m = new THREE.Mesh(geo, matWire);
      m.rotation.x = Math.PI / 2;
      m.position.set(x, y, z);
      ship.add(m);

      const tGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const tMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const t = new THREE.Mesh(tGeo, tMat);
      t.position.copy(m.position);
      t.userData.cannonId = id;
      ship.add(t);

      cannons.push({ id, target: t });
      clickTargets.push(t);
    }

    const yC = 0.35;
    const zSide = 0.92;

    // Lado A (visível no screenshot): frente(-x), meio(0), trás(+x)
    addCannon(1, -1.25, yC, +zSide); // frente
    addCannon(2, 0.00, yC, +zSide); // meio
    addCannon(3, +1.25, yC, +zSide); // trás

    // Lado B espelhado
    addCannon(4, -1.25, yC, -zSide); // frente
    addCannon(5, 0.00, yC, -zSide); // meio
    addCannon(6, +1.25, yC, -zSide); // trás

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
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-95"
        />
      </svg>
      
      {/* Callout Label */}
      <div 
        ref={labelRef}
        className="absolute text-white font-sans text-base leading-tight whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-150"
        style={{ textShadow: '0 0 10px rgba(255,255,255,0.25)' }}
      />
    </div>
  );
};

export default NauWidget;
