import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "projacademico-88d04", appId: "1:877499484696:web:22b8b7cd8897704b90916d", storageBucket: "projacademico-88d04.firebasestorage.app", apiKey: "AIzaSyBWo9qKqOUx3pRJn_gQcq1jIQ6m69crJiU", authDomain: "projacademico-88d04.firebaseapp.com", messagingSenderId: "877499484696" })), provideFirestore(() => getFirestore())]
};
