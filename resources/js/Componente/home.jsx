import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { createRoot } from 'react-dom/client';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

const Home = () => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const PortafolioHOme = useRef(null)
  const bienvenidoRef = useRef(null);
  const bienvenidoTextoRef = useRef(null);
  const bienvenido2Ref = useRef(null);
  const textoDespuesRef = useRef(null);
  const perfilRef = useRef(null);
  const nombreRef = useRef(null);
  const opcionesRef = useRef(null);

    useEffect(() => {
    gsap.fromTo(
      bienvenidoRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: animarTexto,
      }
    );
  }, []);

  const animarTexto = () => {
      const el = bienvenidoTextoRef.current;
      el.style.opacity = 1;
    const textoOriginal = el.textContent;
    el.innerHTML = "";
    const letras = textoOriginal.split("");

    letras.forEach((letra) => {
      const span = document.createElement("span");
      span.textContent = letra;
      span.style.display = "inline-block";
      span.style.opacity = 1;
      el.appendChild(span);
    });

    // Primer paso: Animar las letras desde el estado inicial
    gsap.from(el.querySelectorAll("span"), {
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Segundo paso: Animar el segundo elemento después de que la animación de las letras termine
    gsap.to(bienvenido2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };


  const handleClick = () => {
    gsap.to([bienvenidoTextoRef.current, bienvenido2Ref.current], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        gsap.to(bienvenidoRef.current, {
          width: "100%",
          height: "100%",
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(textoDespuesRef.current, {
              display: "block",
              scaleX: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });

            setTimeout(() => {
              mostrarElVerdaderoMenu();
            }, 1500);
          },
        });
      },
    });
  };

    const mostrarElVerdaderoMenu = () => {
    PortafolioHOme.current.style.background = "linear-gradient(to bottom right, rgb(47, 154, 14), rgb(46, 46, 152))";
    gsap.to(textoDespuesRef.current, {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "center",
      duration: 1,
      ease: "power2.in",
        onComplete: () => {

          gsap.to(bienvenidoRef.current, {

          scale: 0,
          borderRadius: "70%",
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => {
            setMostrarPerfil(true);
            gsap.from(perfilRef.current, {
              opacity: 0,
              scaleX: 0,
              scaleY: 0,
              transformOrigin: "top left",
              duration: 2,
              ease: "power2.out",
                onComplete: () => {
                document.body.style.height = "100%";
                gsap.from(nombreRef.current, {
                  scaleX: 2,
                  scaleY: 2,
                  transformOrigin: "center",
                  duration: 1,
                  ease: "power2.out",
                  onStart: () => {
                    nombreRef.current.style.opacity = 1;
                  },
                  onComplete: () => {
                    opcionesRef.current.style.opacity = 1;
                    gsap.from(opcionesRef.current, {
                      opacity: 0,
                      scaleY: 0,
                      transformOrigin: "top",
                      duration: 1,
                      ease: "power2.out",
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  };

  return (
    <div className="PortafolioHome" ref={PortafolioHOme}>
      {!mostrarPerfil && (
        <div className="Bienvenido" ref={bienvenidoRef} onClick={handleClick}>
          <h1 className="texto" ref={bienvenidoTextoRef}>
            Bienvenido
          </h1>
          <p id="Bienvenido2" ref={bienvenido2Ref}>
            Dale click para Abrir
          </p>
          <h1 className="TextodespuesdelTexto" ref={textoDespuesRef}>
            Mostrando el Portafolio
          </h1>
        </div>
      )}

      {mostrarPerfil && (
        <main className="MiPerfil" ref={perfilRef} style={{ display: "flex" }}>
          <div className="MiInformacion">
            <div
              className="group duration-500 hover:-skew-x-0 skew-x-6 hover:translate-x-2"
              id="MyNombre"
              ref={nombreRef}
              style={{ opacity: 0 }}
            >
              <div className="group-hover:duration-400 relative rounded-2xl w-72 h-36 bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12 before:rounded-2xl before:absolute before:content-[''] before:bg-neutral-700 before:right-3 before:top-0 before:w-72 before:h-32 before:-z-10">
                <span className="text-5xl font-bold">Pablo Lin</span>
                <p className="text-amber-300 font-thin">- FullStack Developer -</p>
              </div>
            </div>
          </div>

          <div className="misOpciones" ref={opcionesRef} style={{ opacity: 0 }}>
            <div className="OpcionesTitulo">
              <h1>Configuracion</h1>
            </div>
            <div className="Opciones">
              <Opcion img="/Imagenes/configuraciones.png" texto="Opciones" />
              <Opcion img="/Imagenes/insignia.png" texto="Sobre Mi" />
              <Opcion img="/Imagenes/conocimiento-administrativo.png" texto="Conocimientos" />
              <Opcion img="/Imagenes/portapapeles.png" texto="Proyecto" />
              <Opcion img="/Imagenes/curriculum-vitae.png" texto="Curriculum" />
              <Opcion img="/Imagenes/maletin.png" texto="Experiencia" />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

const Opcion = ({ img, texto }) => (
  <div className="LosOpciones">
    <img src={img} alt={texto} />
    <h1>{texto}</h1>
  </div>
);

if (document.getElementById("Home")) {
    createRoot(document.getElementById("Home")).render(<Home />);
  }
