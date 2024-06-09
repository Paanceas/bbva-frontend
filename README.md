
# Proyecto Frontend de Conversión de Divisas

Este proyecto consiste en una aplicación frontend desarrollada con Angular para la conversión de divisas. La aplicación consume un servicio REST que proporciona las tasas de cambio y permite convertir montos entre diferentes divisas.

## Requisitos Previos

1. Node.js 14.x o superior
2. Angular CLI 16.x o superior
3. Una herramienta para realizar peticiones HTTP (por ejemplo, Postman)
4. IDE de tu preferencia (por ejemplo, Visual Studio Code)

## Configuración del Proyecto

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Paanceas/bbva-frontend
   cd tu-repositorio
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `src/environments/environment.ts` con el siguiente contenido y ajusta la URL base de la API y la clave API:

   ```typescript
   export const environment = {
     production: false,
     baseUrl: 'http://localhost:8080/api/v1',
     apiKey: 'tu_api_key_aqui'
   };
   ```

## Estructura del Proyecto

- **Componentes:**
  - `app.component.ts`: Componente principal que maneja la lógica de la aplicación.
  - `currency-converter.component.ts`: Componente para la conversión de divisas.
  - `currency-symbols.component.ts`: Componente para mostrar los símbolos de las divisas.

- **Servicios:**
  - `api.service.ts`: Servicio que maneja las peticiones HTTP a la API backend.

- **Modelos:**
  - `conversion-request.model.ts`: Representa la solicitud de conversión de divisas.
  - `conversion-response.model.ts`: Representa la respuesta de la conversión de divisas.
  - `currency-symbols.model.ts`: Representa los símbolos de las divisas.

## Ejecución del Proyecto

1. **Compila y ejecuta la aplicación:**

   ```bash
   ng serve
   ```

2. **Accede a la aplicación en el navegador:**

   Navega a `http://localhost:4200` para ver la aplicación en funcionamiento.

## Dependencias

El proyecto utiliza las siguientes dependencias:

```json
{
  "dependencies": {
    "@angular/animations": "^16.2.0",
    "@angular/common": "^16.2.0",
    "@angular/compiler": "^16.2.0",
    "@angular/core": "^16.2.0",
    "@angular/forms": "^16.2.0",
    "@angular/platform-browser": "^16.2.0",
    "@angular/platform-browser-dynamic": "^16.2.0",
    "@angular/router": "^16.2.0",
    "@ng-bootstrap/ng-bootstrap": "^13.1.0",
    "bootstrap": "^5.3.3",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^16.2.4",
    "@angular/cli": "^16.2.4",
    "@angular/compiler-cli": "^16.2.0",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.1.3"
  }
}
```

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva característica'`).
4. Empuja la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
