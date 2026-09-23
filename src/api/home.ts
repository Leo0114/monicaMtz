export interface Libro {
  titulo: string;
  descripcion: string;
  plataforma: string;
}

export interface Cortometraje {
  titulo: string;
  descripcion: string;
  fechaEstreno: string;
  lugar: string;
  elencoYEquipo: {
    productora: string;
    director: string;
    actrices: string[];
    entrevistador: string;
  };
}

export interface SerieContenido {
  nombre: string;
  descripcion: string;
}

export interface DatosHome {
  autora: string;
  lema: string;
  libro: Libro;
  cortometraje: Cortometraje;
  series: SerieContenido[];
  plataformasSociales: string[];
}

export const datosHome: DatosHome = {
  autora: "Mónica Martínez",
  lema: "Si yo puedo, tú también - Primero ser y después tener.",
  libro: {
    titulo: "El arte de mentirnos",
    descripcion:
      "Un libro lleno de dolor, emoción y honestidad bruta que reúne cuentos sobre mujeres, pérdidas, vínculos y verdades incómodas.",
    plataforma: "Amazon",
  },
  cortometraje: {
    titulo: "Las mujeres son como la muerte",
    descripcion:
      "Adaptación cinematográfica independiente de uno de los relatos del libro, creada junto a talento emergente del cine mexicano.",
    fechaEstreno: "23 de enero de 2026",
    lugar: "Museo de Arte Contemporáneo (MARCO) en Monterrey",
    elencoYEquipo: {
      productora: "Mónica Martínez",
      director: "Raúl Guzmán",
      actrices: ["Lorena Luna", "Mónica Muruato", "Hansy García"],
      entrevistador: "Daniel de la Garza (Bayonetta Medios)",
    },
  },
  series: [
    {
      nombre: "ENSDPS (Eso no se dice, pero sí)",
      descripcion: "Diálogos íntimos que nacen de lo que normalmente se calla.",
    },
    {
      nombre: "Tu Turno",
      descripcion:
        "Espacio de movimiento y bienestar con rutinas creadas por Mony para entrenar en el gimnasio o desde casa.",
    },
    {
      nombre: "Giveaways",
      descripcion: "Dinámicas mensuales para la comunidad.",
    },
  ],
  plataformasSociales: [
    "Instagram (Clips diarios y detrás de cámaras)",
    "Facebook (Clips diarios y comunidad)",
    "TikTok (Clips diarios y contenido corto)",
    "YouTube (Episodios completos todos los viernes)",
  ],
};
