import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Définir les routes publiques qui n'ont pas besoin d'authentification
const PUBLIC_FILE = /\.(.*)$/; // Pour gérer les fichiers statiques (images, CSS, JS)
const PUBLIC_ROUTES = ['/login']; // Ajoutez ici les pages accessibles sans authentification

export function middleware(request: NextRequest) {
  // Récupérer le token des cookies
  const token = request.cookies.get('token')?.value;

  // Vérifier si la route est publique
  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname) || PUBLIC_FILE.test(request.nextUrl.pathname);

  // Si la route est publique, pas besoin de vérifier l'authentification
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Si le token est absent ou invalide, rediriger vers la page de login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Si le token est présent, continuer avec la requête
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Applique le middleware à toutes les pages sauf celles définies ici
};
