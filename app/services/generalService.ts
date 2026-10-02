const BRAND_COLORS: Record<string, string> = {
  repsol: "#E4032E",
  cepsa: "#00529B",
  galp: "#6E2585",
  bp: "#00854A",
  shell: "#FBCE07",
  petronor: "#EF7D00",
  avia: "#004B93",
  q8: "#E30613",
  campsa: "#003DA5",
  esso: "#ED1C24",
  carrefour: "#004E9E",
  alcampo: "#E4032E",
};

const FALLBACK_PALETTE = [
  "#0EA5A0", "#7C6FE0", "#E0748C", "#3B82C4", "#C2884A", "#5FA85A",
];

export function getInitial(rotulo: string): string {
  return rotulo.trim().charAt(0).toUpperCase() || "?";
}

export function getBrandColor(rotulo: string): string {
  const normalized = rotulo.toLowerCase();
  const known = Object.keys(BRAND_COLORS).find((brand) =>
    normalized.includes(brand)
  );
  if (known) return BRAND_COLORS[known];
  return FALLBACK_PALETTE[hashString(rotulo) % FALLBACK_PALETTE.length];
}

export function getGoogleMapsUrl(rotulo: string, direccion: string, localidad?: string): string {
  var query = localidad ? rotulo+', '+direccion+', '+localidad : direccion;


  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}