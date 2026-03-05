# Estructura de Componentes - Vehicle Showcase

## 📁 Estructura de Archivos

```
resources/js/Pages/Products/
│
├── 🆕 VehicleShowcase.jsx          # Componente principal (contenedor)
│   │
│   ├── 🆕 EnhancedGallery.jsx      # Galería con thumbnails
│   ├── 🆕 FeatureHighlights.jsx    # Grid de specs destacadas con iconos
│   ├── 🆕 ColorSelector.jsx        # Selector de colores
│   └── 🆕 SpecificationsSection.jsx # Tabs: Interior, Exterior, etc.
│
├── 🆕 ShowVehicle.jsx              # Wrapper para cliente
├── 🆕 ShowVehicleadmin.jsx         # Wrapper para admin
│
├── ShowProduct.jsx                 # Wrapper original (cliente)
├── ShowProductadmin.jsx            # Wrapper original (admin)
├── Showcontent.jsx                 # Contenido original (cliente)
├── Showcontentadmin.jsx            # Contenido original (admin)
│
└── ProductGallery.jsx              # Galería original (simple)
```

---

## 🔄 Flujo de Datos

```
Backend (PHP/Laravel)
    │
    │ Inertia::render('Products/ShowVehicle', ['product' => $product])
    │
    ▼
ShowVehicle.jsx (Wrapper con Layout)
    │
    │ <VehicleShowcase product={product} />
    │
    ▼
VehicleShowcase.jsx (Componente Principal)
    │
    ├── <EnhancedGallery multimedia={...} />
    │   └── Muestra imágenes/videos con thumbnails
    │
    ├── <FeatureHighlights specifications={...} />
    │   └── Grid de 4 specs principales con iconos
    │
    ├── <ColorSelector colors={...} />
    │   └── Selector interactivo de colores
    │
    └── <SpecificationsSection features={...} activeTab={...} />
        └── Tabs con características detalladas
```

---

## 🎯 Comparación: Original vs Vehicle Showcase

| Sección | Showcontent.jsx (Original) | VehicleShowcase.jsx (Nuevo) |
|---------|---------------------------|----------------------------|
| **Hero** | 2 columnas: galería + detalles | 2 columnas: galería mejorada + info destacada |
| **Galería** | ProductGallery (grid simple) | EnhancedGallery (thumbnails + zoom fullscreen) |
| **Specs** | ❌ No incluidas | ✅ FeatureHighlights (4 iconos) |
| **Colores** | ❌ No incluido | ✅ ColorSelector interactivo |
| **Características** | ❌ No incluido | ✅ SpecificationsSection (5 tabs) |
| **CTA** | Añadir al carrito + WhatsApp | Comprar + Añadir al carrito |
| **Ficha Técnica** | ❌ No incluida | ✅ Botón de descarga PDF |
| **Layout** | Single section | Multi-section con backgrounds |

---

## 🧩 Componentes Detallados

### 1. VehicleShowcase.jsx
**Responsabilidad**: Orquestar todos los subcomponentes

**Props recibidas**:
- `product` (objeto completo del backend)

**Estado interno**:
- `selectedVariant` - Variante actualmente seleccionada
- `quantity` - Cantidad a añadir al carrito
- `adding` - Estado de carga del botón "añadir"
- `success` - Feedback visual al añadir
- `activeTab` - Tab activo en SpecificationsSection

**Secciones renderizadas**:
1. Hero (galería + info)
2. Color selector (si hay colores)
3. Características (tabs)
4. Selección de variante (si hay variantes)

---

### 2. EnhancedGallery.jsx
**Responsabilidad**: Mostrar multimedia con navegación

**Props recibidas**:
- `multimedia` - Array de objetos {url, type}
- `productName` - Nombre para alts

**Características**:
- Thumbnails clickeables (grid de 5 columnas)
- Imagen/video principal grande
- Modal fullscreen para zoom
- Navegación con flechas en modal
- Indicador visual de video en thumbnails
- Responsive (1 columna en móvil)

**Estado interno**:
- `selectedIndex` - Índice de media actual
- `isZoomOpen` - Modal abierto/cerrado

---

### 3. FeatureHighlights.jsx
**Responsabilidad**: Mostrar 4 specs principales con iconos

**Props recibidas**:
- `specifications` - Objeto con campos:
  - motor
  - potencia
  - combustible
  - transmision
  - cabina
  - capacidad_carga

**Layout**:
- Grid 2x2 en mobile
- Grid 4x1 en desktop
- Iconos SVG inline
- Hover effect

---

### 4. ColorSelector.jsx
**Responsabilidad**: Selector interactivo de colores

**Props recibidas**:
- `colors` - Array de {name, hex}
- `productName` - Nombre del producto
- `productImage` - URL de imagen principal

**Layout**:
- 2 columnas (info + imagen)
- Botones circulares con colores
- Imagen del producto con overlay de color seleccionado
- Badge con nombre del color

**Estado interno**:
- `selectedColor` - Color actualmente seleccionado

---

### 5. SpecificationsSection.jsx
**Responsabilidad**: Mostrar características en tabs

**Props recibidas**:
- `activeTab` - Tab activo ("interior", "exterior", etc.)
- `features` - Objeto con arrays:
  - interior[]
  - exterior[]
  - performance[]
  - seguridad[]
- `multimedia` - Para tab "galería"

**Tabs disponibles**:
1. **INTERIOR**: Grid 2 columnas con imágenes
2. **EXTERIOR**: Grid 2 columnas con imágenes
3. **PERFORMANCE**: Lista vertical de specs
4. **SEGURIDAD**: Lista vertical de features
5. **GALERÍA**: Grid de imágenes (2-3-4 columnas responsive)

**Placeholders**:
- Si no hay datos, muestra contenido por defecto
- Iconos genéricos para cada categoría

---

## 🎨 Sistema de Estilos

### Colores (Tailwind)
```javascript
darkGray: '#231f20'      // Texto principal
grayCustom: '#939191'    // Texto secundario
turquoise: '#01a387'     // Color de marca (botones, highlights)
darkTurquoise: '#165a4e' // Hover states
```

### Fuentes
```css
font-family: 'Playfair Display', serif  // Headings y títulos
font-family: 'Figtree', sans-serif      // Texto general
```

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Espaciado
- Padding hero: `py-10 px-4`
- Gap entre secciones: `gap-8 md:gap-12`
- Max width: `max-w-7xl mx-auto`

---

## 🔌 Integración con Backend

### Ruta Sugerida (web.php)
```php
Route::get('/vehiculos/{slug}/{product}', [ProductController::class, 'showVehicle'])
    ->name('vehicles.show');
```

### Controlador Sugerido
```php
public function showVehicle($slug, Product $product)
{
    $product->load([
        'multimedia' => fn($q) => $q->orderBy('sort_order'),
        'variants.attributeValues.attribute',
        'category'
    ]);

    return Inertia::render('Products/ShowVehicle', [
        'product' => $product
    ]);
}
```

### Modelo (Product.php)
```php
protected $casts = [
    'specifications' => 'array',
    'colors' => 'array',
    'features' => 'array',
];

protected $appends = ['multimedia'];

public function multimedia()
{
    return $this->hasMany(ProductMultimedia::class);
}

public function variants()
{
    return $this->hasMany(ProductVariant::class);
}
```

---

## 🚀 Cómo Usar

### Opción A: Nueva Ruta (Recomendado)
Crear rutas separadas para productos tipo vehículo:

```php
// Para vehículos
Route::get('/vehiculos/{slug}/{product}', [...], 'showVehicle');

// Para productos normales
Route::get('/productos/{slug}/{product}', [...], 'show');
```

### Opción B: Reemplazar Componente Existente
Reemplazar `Showcontent.jsx` con `VehicleShowcase.jsx`:

1. Renombrar `Showcontent.jsx` a `Showcontent.backup.jsx`
2. Copiar contenido de `VehicleShowcase.jsx` a nuevo `Showcontent.jsx`
3. Ajustar imports

### Opción C: Condicional en Controlador
Renderizar diferente componente según tipo de producto:

```php
public function show($slug, Product $product)
{
    $product->load(['multimedia', 'variants.attributeValues.attribute']);

    $component = $product->category->is_vehicle
        ? 'Products/ShowVehicle'
        : 'Products/ShowProduct';

    return Inertia::render($component, [
        'product' => $product
    ]);
}
```

---

## 📋 Checklist de Implementación

### Frontend
- [x] VehicleShowcase.jsx creado
- [x] EnhancedGallery.jsx creado
- [x] SpecificationsSection.jsx creado
- [x] ColorSelector.jsx creado
- [x] FeatureHighlights.jsx creado
- [x] ShowVehicle.jsx wrapper creado
- [x] ShowVehicleadmin.jsx wrapper creado

### Backend (Pendiente)
- [ ] Agregar campos JSON a tabla products:
  - `specifications` (json)
  - `colors` (json)
  - `features` (json)
  - `technical_sheet_url` (string)
- [ ] Actualizar modelo Product con casts
- [ ] Crear/actualizar controlador para vehículos
- [ ] Agregar rutas en web.php
- [ ] Poblar datos de prueba (seeder)

### Testing
- [ ] Probar con producto con TODOS los campos
- [ ] Probar con producto MÍNIMO (solo multimedia + variants)
- [ ] Probar responsive (mobile, tablet, desktop)
- [ ] Probar funcionalidad del carrito
- [ ] Probar navegación entre tabs
- [ ] Probar selector de colores
- [ ] Probar zoom de imágenes
- [ ] Probar descarga de ficha técnica

---

## 🐛 Debugging

### Console Logs Útiles
```javascript
// En VehicleShowcase.jsx, agregar:
console.log('Product data:', product);
console.log('Specifications:', specifications);
console.log('Features:', features);
console.log('Multimedia:', multimedia);
```

### React DevTools
1. Instalar extensión React DevTools
2. Inspeccionar componente VehicleShowcase
3. Ver props y state en tiempo real

### Network Tab
1. Verificar que la respuesta de Inertia incluya todos los datos
2. Revisar estructura del objeto `product`

---

**Última actualización**: Enero 2026
**Versión**: 1.0.0
**Autor**: Claude Code
