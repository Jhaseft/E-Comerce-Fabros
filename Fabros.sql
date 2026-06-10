-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: paginas_e_comerce_fabros_bd:3306
-- Tiempo de generación: 19-05-2026 a las 21:55:27
-- Versión del servidor: 11.8.6-MariaDB-ubu2404
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Fabros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `admin_accounts`
--

INSERT INTO `admin_accounts` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Jhaseft', 'jhasesaat@gmail.com', '$2y$12$JQ0sy.ZxMHDCPiLcrw1bQuy4Ti6IvkKALAzRBZYcgYhY44Bw5ZmUu', '2025-11-17 05:55:06', '2025-11-17 05:55:06'),
(3, 'Fabros', 'fabros@gmail.com', '$2y$12$jhWJ/W60hzw9dwgwX5sGUO4ytLmsJ8K/pB58aGV.GsVB.pjKVZL6C', '2026-03-05 04:49:55', '2026-03-05 04:49:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas`
--

CREATE TABLE `caracteristicas` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `valor` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `caracteristicas`
--

INSERT INTO `caracteristicas` (`id`, `product_id`, `nombre`, `valor`, `created_at`, `updated_at`) VALUES
(1, 4, 'Kilometraje entre cambios', 'Hasta 100,000 - 150,000 km (o 500-1,000 horas), ideal para menos paradas.', '2026-02-28 06:00:21', '2026-02-28 06:00:21'),
(2, 4, 'Ahorro en combustible', 'Hasta 30%, perfecto con la escasez y precios altos en Bolivia.   Protección extra: Contra po', '2026-02-28 06:04:25', '2026-02-28 06:05:20'),
(3, 4, 'Protección extra', 'Contra polvo, altas temperaturas y altitudes, reduce averías costosas.', '2026-02-28 06:05:58', '2026-02-28 06:05:58'),
(4, 4, 'Menos mantenimiento', 'Intervalos largos = más tiempo trabajando y menos gastos.', '2026-02-28 06:06:09', '2026-02-28 06:06:09'),
(5, 4, 'Tecnología Low SAPS', 'Protege filtros DPF y sistemas de escape modernos.', '2026-02-28 06:06:17', '2026-02-28 06:06:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `parent_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`, `parent_id`, `image`) VALUES
(2, 'VEHICULOS', 'vehiculos', NULL, '2026-02-28 03:56:46', '2026-02-28 03:56:46', NULL, NULL),
(3, 'LUBRICANTES', 'lubricantes', NULL, '2026-02-28 03:57:09', '2026-02-28 03:57:09', NULL, NULL),
(4, 'REPUESTOS', 'repuestos', NULL, '2026-02-28 03:57:24', '2026-02-28 03:57:24', NULL, NULL),
(5, 'SERVICIOS', 'servicios', NULL, '2026-02-28 03:57:37', '2026-02-28 03:57:37', NULL, NULL),
(7, 'ACEITE  DE  MOTOR', 'aceite-de-motor', NULL, '2026-02-28 05:27:37', '2026-03-11 19:48:47', 3, NULL),
(8, 'ACEITE DE TRANSMISION', 'aceite-de-transmision', NULL, '2026-02-28 05:36:21', '2026-03-11 19:49:24', 3, NULL),
(9, 'ACEITE  HIDRAULICO', 'aceite-hidraulico', NULL, '2026-02-28 05:39:43', '2026-03-11 19:49:49', 3, NULL),
(10, 'ACEITE  PARA  MOTOCICLETAS', 'aceite-para-motocicletas', NULL, '2026-03-06 02:04:25', '2026-03-11 19:50:21', 3, NULL),
(12, 'ANTICONGELANTE', 'anticongelante', NULL, '2026-03-09 21:13:13', '2026-03-09 21:13:13', 3, NULL),
(13, 'GRASAS', 'grasas', NULL, '2026-03-09 21:14:34', '2026-03-09 21:14:34', 3, NULL),
(14, 'FILTROS', 'filtros', NULL, '2026-03-12 15:58:18', '2026-03-12 15:58:18', NULL, NULL),
(15, 'ACCESORIOS', 'accesorios', NULL, '2026-03-20 22:00:07', '2026-03-20 22:00:07', 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2026_05_01_010942_add_documento_multimedia_type', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia_type`
--

CREATE TABLE `multimedia_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_empty` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `multimedia_type`
--

INSERT INTO `multimedia_type` (`id`, `name`, `is_empty`) VALUES
(1, 'General', 0),
(7, 'Documento', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `status_id` int(11) NOT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `total` decimal(12,2) NOT NULL,
  `payment_proof` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `status_id`, `payment_method_id`, `total`, `payment_proof`, `created_at`, `updated_at`, `customer_name`, `customer_phone`, `customer_email`) VALUES
(18, 1, 1, 1400.00, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773115180/orders/payment_proofs/aieczbch2fnxbmvx80zc.png', '2026-03-10 03:59:39', '2026-03-10 03:59:39', 'Jhaseft Rene Saat Solares', '+59165359695', 'jhasesaat@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(17, 18, 5, 1, 1400.00, 1400.00, '2026-03-10 03:59:39', '2026-03-10 03:59:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_statuses`
--

CREATE TABLE `order_statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_statuses`
--

INSERT INTO `order_statuses` (`id`, `name`) VALUES
(2, 'Entregado'),
(1, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'QR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `longDescription` longtext DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `precio_anterior` decimal(10,2) DEFAULT 0.00,
  `precio_actual` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `longDescription`, `available`, `precio_anterior`, `precio_actual`, `created_at`, `updated_at`) VALUES
(4, 7, 'SHELL RIMULA R4 X 15W-40 – Balde 20 Litros', 'ACEITE DE MOTOR  HEAVY-DUTY DIÉSEL CON LOW SAPS QUE BARRE HOLLÍN COMO UN TORBELLINO', 'IMPLACABLES: HEAVY-DUTY DIÉSEL\r\nCON LOW SAPS QUE BARRE HOLLÍN\r\nCOMO UN TORBELLINO, SELLA\r\nCONTRA ÁCIDOS CORROSIVOS Y\r\nMANTIENE FLUJO EN CALOR\r\nEXTREMO. ¡ALARGA LA VIDA HASTA\r\n1M KM, CORTANDO MANTENIMIENTO\r\n30% – TU FLOTA ACELERA SIN\r\nFRENOS!', 1, 1375.00, 1200.00, '2026-02-28 05:28:35', '2026-03-11 18:07:41'),
(5, 7, 'SHELL RIMULA R5 E 10W40   –    BALDE  20 Litros', 'Semisintético premium para motores EURO 5/6 con EGR y SCR.', '¡PROTECCIÓN SINTÉTICA TOTAL\r\nPARA MOTORES EURO 5/6 QUE\r\nEXIGEN LO MÁXIMO! ACEITE\r\nSEMISINTÉTICO PREMIUM QUE\r\nMANTIENE PRESIÓN PERFECTA EN\r\nCARGAS EXTREMAS Y\r\nTEMPERATURAS ALTAS. IDEAL\r\nPARA FLOTAS VOLVO, SCANIA,\r\nMERCEDES Y MAN CON EGR/SCR.', 1, 1400.00, 1400.00, '2026-02-28 05:34:06', '2026-03-11 18:15:47'),
(6, 8, 'SHELL  SPIRAX S2 A 80W90    –    BALDE DE 20 LTS', 'ACEITE PARA DIFERENCIALES Y CAJAS. RESISTE CARGAS EXTREMAS', 'CONQUISTA TERRENOS\r\nBRUTALES SIN UN SOLO\r\nCHIRRIDO: GL-5 CON EP QUE\r\nSELLA CONTRA SCUFFING,\r\nMANTIENE PELÍCULA EN\r\nTORQUE EXTREMO Y RESISTE\r\nOXIDACIÓN EN POLVO\r\nBOLIVIANO. ¡EXTIENDE VIDA DE\r\nDIFERENCIALES 50%, EVITANDO\r\nAVERÍAS MILLONARIAS \r\nPOTENCIA QUE MULTIPLICA\r\nCARGAS!', 1, 1820.00, 1820.00, '2026-02-28 05:37:58', '2026-03-11 18:20:02'),
(7, 9, 'SHELL  TELLUS  S2  M 68    –    BALDE   DE  20 LTS', 'ACEITE HIDRAULICO  RESISTE BREAKDOWN TÉRMICOA  DE  ALTA ESTABILIDAD TERMICA.', 'PRECISIÓN LETAL EN CADA\r\nCICLO: RESISTE BREAKDOWN\r\nTÉRMICO, SEPARA AGUA 3X\r\nMEJOR Y MINIMIZA FOAM PARA\r\nFLUJO SIN INTERRUPCIONES EN\r\nCARGAS PESADAS. ¡ALARGA\r\nFILTROS 25% Y CORTA\r\nDOWNTIME EN EXCAVADORAS \r\nEFICIENCIA QUE ACELERA TU\r\nPRODUCTIVIDAD BOLIVIANA!', 1, 1453.00, 1453.00, '2026-02-28 05:40:45', '2026-03-11 18:24:51'),
(8, 9, 'SHELL TELLUS  S2  M46   –    TAMBOR 209 LTS', 'ACEITE HIDRAULICO  IDEAL PARA EXCAVADORAS, GRUAS Y MAQUINARIA PESADA.', '¡EL HIDRÁULICO QUE NUNCA SE\r\nRINDE BAJO EL SOL DE SANTA\r\nCRUZ!\r\nACEITE ISO VG 46 DE ALTÍSIMA\r\nESTABILIDAD TÉRMICA. TRABAJA\r\nPERFECTO DESDE -20 °C HASTA\r\n+100 °C SIN PERDER\r\nVISCOSIDAD. IDEAL PARA\r\nEXCAVADORAS,\r\nRETROEXCAVADORAS, GRÚAS Y\r\nPRENSAS QUE PARAN SOLO\r\nPARA DORMIR.', 1, NULL, NULL, '2026-02-28 05:41:39', '2026-03-11 18:28:54'),
(9, 9, 'SHELL TELLUS  S2  M46 – BALDE  20 LTS', 'ACEITE HIDRAULICO  HASTA  7.000 HORAS REALES DE  TRABAJO CONTINUO.', 'PRECISIÓN LETAL EN CADA\r\nMOVIMIENTO: RESISTE\r\nTEMPERATURAS EXTREMAS,\r\nSEPARA AGUA AL INSTANTE Y\r\nMANTIENE VISCOSIDAD\r\nPERFECTA AUNQUE LA\r\nMÁQUINA TRABAJE 18 HORAS\r\nBAJO 40°C. ¡OLVÍDATE DE\r\nCAMBIOS PREMATUROS Y\r\nBOMBAS QUEMADAS – ESTE\r\nACEITE HIDRÁULICO DURA\r\nHASTA 7.000 HORAS REALES EN\r\nOBRA!', 1, NULL, NULL, '2026-02-28 05:42:48', '2026-03-11 18:30:26'),
(14, 7, 'LUB SHELL HELIX HX3  20W50  -  TAMBOR 209 LTS', 'ACEITE DE MOTOR MINERAL PREMIUM QUE PREVIENE LODOS Y BARNIZ', 'REAVIVA MOTORES QUE HAN CONQUISTADO MILES DE KM: MINERAL PREMIUM QUE PREVIENE LODOS Y BARNIZ, REDUCE FUGAS EN ALTO MILLAJE Y ASEGURA LUBRICACIÓN IMPECABLE EN DIÉSEL ANTIGUOS. ¡PROTEGE CONTRA DESGASTE 40%, MANTENIENDO RUGIDO PURO – CALIDAD QUE REVIVE INVERSIONES SIN COSTOS EXTRAS!', 1, 14506.00, 14506.00, '2026-03-11 18:10:55', '2026-03-11 18:10:55'),
(15, 7, 'LUB SHELL HELIX HX5 20W50   -    GALON DE 4 LTS', 'ACEITE DE MOTOR  MULTIGRADO PREMIUM QUE DISUELVE LODOS, NEUTRALIZA ÁCIDOS CORROSIVOS', 'DESPIERTA EL ALMA DE TU BESTIA: MULTIGRADO PREMIUM QUE DISUELVE LODOS, NEUTRALIZA ÁCIDOS CORROSIVOS Y SELLA FUGAS EN ALTO MILLAJE CON TBN ALTO. ¡REDUCE VIBRACIONES 25% Y EXTIENDE INTERVALOS 40% – EFICIENCIA QUE TRANSFORMA GASTOS EN GANANCIAS!\r\nESPECIFICACIONES CLAVE: API SL/CF; ACEA A2/B2. VISCOSIDAD: 20W-50.', 1, 371.00, 371.00, '2026-03-11 18:13:20', '2026-03-11 19:47:10'),
(16, 12, 'SHELL ROTELLA  ELC   NF   50/ 50     -     GALON DE 3,78 LTS', 'ANTICONGELANTE DILUIDO  OAT SIN NITRITOS QUE BLINDA ALUMINIO CONTRA CORROSIÓN', 'MANTÉN FRESCO EL CORAZÓN DE TU MÁQUINA BAJO SOL ABRASADOR: OAT SIN NITRITOS QUE BLINDA ALUMINIO CONTRA CORROSIÓN, EXTIENDE VIDA HASTA 1M KM SIN SCAS(ADITIVOS SUPLEMENTARIOS PARA REFRIGERANTE)\r\nY MEJORA TRANSFERENCIA DE CALOR 8%. ¡EVITA BOIL-OVER Y OBSTRUCCIONES 50% – UPTIME MÁXIMA, CERO SORPRESAS!', 1, 239.00, 238.00, '2026-03-11 18:34:33', '2026-03-11 19:54:54'),
(17, 13, 'LUB SHELL GADUS S2 V220-2     -       BALDE  18 KG', 'GRASA MULTIUSO DE ALTO RENDIMIENTO QUE RESISTE HASTA 220°C', 'GRASA MULTIUSO DE ALTO RENDIMIENTO QUE RESISTE HASTA 220°C Y PROTEGE CRUCETAS Y CHUMACERAS BAJO CARGAS EXTREMAS. PERFECTA PARA MAQUINARIA QUE NO PARA, CON LAVADO A PRESIÓN O EN POLVO BOLIVIANO.\r\n¡DURA EL DOBLE QUE LAS GRASAS COMUNES Y MANTIENE LUBRICACIÓN SIN GOTEAR!', 1, 2762.00, 2762.00, '2026-03-11 18:37:41', '2026-03-11 18:37:41'),
(18, 13, 'LUB SHELL GADUS S3 V220-2      -     BALDE 18 KGS', 'GRASA DE COMPLEJO DE LITIO, DE ALTO RENDIMIENTO PARA CARGAS PESADAS', 'GRASA DE COMPLEJO DE LITIO DE ALTO RENDIMIENTO PARA CARGAS PESADAS Y ALTAS TEMPERATURAS, IDEAL PARA RODAMIENTOS INDUSTRIALES, MINERIA Y TRANSPORTE. OFRECE EXCELENTE ESTABILIDAD MECANICA, RESISTENCIA AL AGUA Y PROTECCION CONTRA LA CORROSION.', 1, 4386.00, 4386.00, '2026-03-11 18:39:33', '2026-03-11 18:52:02'),
(19, 10, 'LUB SHELL ADV 4T AX5 20W50    -    BOTELLA  DE  1 LT', 'ACEITE MINERAL  PARA  MOTOR MOTOCICLETA, ACEITE CONVENCIONAL PARA MOTOS CON MOTORES CUATRO TIEMPOS.', 'ESTA FORMULADO CON BASES MINERALES  Y ADITIVOS ESPECIFICOS CON TECNOLOGIA DE LIMPIEZA ACTIVA. LOS AGENTES UNICOS DE ESTA TECNOLOGIA AYUDAN A MANTENER LA LIMPIEZA DEL MOTOR PARA ASI ENTREGAR LA EFICIENCIA, RENDIMIENTO Y PROTECCION REQUERIDA.', 1, 97.00, 97.00, '2026-03-11 19:03:12', '2026-03-11 19:39:19'),
(20, 10, 'LUB SHELL ADV 4T AX7 15W50   -    BOTELLA  DE 1LT', 'ACEITE SEMISINTETICO PARA MOTOR DE MOTOCICLETA, ACEITE PREMIUM PARA MOTOS CON MOTORES CUATRO TIEMPOS.', 'LA FORMULACION CON TECNOLOGIA SINTETICA  CUENTA EN PARTE  CON BASES SINTETICAS Y ADITIVOS PARA MOTOS CON TECNOLOGIA DE LIMPIEZA ACTIVA.\r\nLA BASE SINTETICA DE ALTA CALIDAD COMBINADA CON LA UNICA TECNOLOGIA DE LIMPIEZA ACTIVA EN ADITIVOS AYUDA A MANTENERA LA LIMPIEZA DEL MOTOR. UN MOTOR LIMPIO SERA MAS EFICIENTE Y ESTARA  PROTEGIDO PROLONGANDO ASI SU VIDA UTIL.', 1, 116.00, 116.00, '2026-03-11 19:10:27', '2026-03-11 19:40:18'),
(21, 10, 'SHELL ADV 4T ULTRA  15W50    -     BOTELLA  DE  1LT', 'ACEITE FULL SINTETICO PARA MOTOR MOTOCICLETA. LA FORMULACION ESPECIAL DEL ACEITE MANTIENE LA VISCOSIDAD DENTRO DE SU GRADO POR MAS TIEMPO.', 'MEJOR PROTECCION CONTRA EL DESGASTE, ESPECIALMENTE DEL TREN DE VALVULAS. MEJOR LIMPIEZA, LIMPIANDO LADOS Y LOS DEPOSITOS DENTRO DEL MOTOR.', 1, 201.00, 201.00, '2026-03-11 19:17:12', '2026-03-11 19:41:57'),
(22, 10, 'LUB SHELL ADVANCE ULTRA 10W40    -    BOTELLA  DE 1LT', 'ACEITE  FULL SINTETICO DE PRIMERA CALIDAD PARA MOTORES DE MOTOCICLETAS DE CUATRO TIEMPOS, DISEÑADO PARA ALTO RENDIMIENTO.', 'INCORPORA LA TECNOLOGIA SHELL PURE PLUS (GAS  A  LIQUIDO) Y TECNOLOGIA DE LIMPIEZA ACTIVA PARA OFRECER MAXIMA PROTECCION, LIMPIEZA DEL  MOTOR, REDUCCION DE RUIDO/VIBRACIONES Y UN CAMBIO  DE MARCHAS SUAVE.', 1, 201.00, 201.00, '2026-03-11 19:27:04', '2026-03-11 19:43:03'),
(23, 14, 'FLEETGUARD  FILTRO  DE  ACEITE  LF9009', 'FILTRO COMBINADO DE ALTO RENDIMIENTO PARA MOTORES CUMMINS DIESEL DE SERVICIO  PESADO', 'APLICACION  PRINCIPAL MOTORES CUMMINS DIESEL  (L9,  B6.7,  C8.3,  ISC,  ISL,  ISM,  N14,  QSL 9,0).   \r\nCOMPATIBILIDAD CAMIONES FORD CARGO (1721, 2632), ENCAVA, BAETOCAMIONES, MAQUINARIA DE CONSTRUCCION Y MINERIA (CATERPILLAR, KOMATSU, VOLVO CON MOTORES CUMMINS', 1, NULL, NULL, '2026-03-13 22:00:40', '2026-03-13 22:00:40'),
(24, 14, 'FLEETGUARD  FILTRO DE AIRE  AF1004', 'ELEMENTO PRIMARIO DE SELLO RADIAL  TIPO MAGNUM RS  PARA  APLICACIONES  PESADAS', 'FILTRO DE AIRE PRIMARIO, CILINDRICO, SELLO RADIAL.\r\nDIMENSIONES 423 mm(L) x 236 mm(DIAMETRO EXT) x 132 mm(DIAMETRO INTERIOR)\r\nCOMPATIBLE CON MAQUINARIA PESADA COMO LIEBHER, CATERPILLAR, KOMATSU, VOLVO.', 1, 450.00, 360.00, '2026-03-13 22:16:48', '2026-03-17 15:14:58'),
(25, 14, 'FLEETGUARD  FILTRO DE AIRE AF821M', 'FILTRO SECUNDARIO O DE SEGURIDAD PARA APLICACIONES INDUSTRIALES Y PESADAS', 'FILTRO DE AIRE SECUNDARIO /SEGURIDAD (AXIAL SEAL).\r\nDIAMETRO 194mm, ALTURA 391mm.\r\nCOMPATIBILIDAD CON EQUIPOS DE CONSTRUCCION Y AGRICOLAS COMO KUBOTA, CATERPILLAR, CASE, CLARK, BOMAG, FIATALLIS Y MAQUINARIA DE PERFORACION.\r\nEQUIVALENCIAS: DONALDSON  P119370, WIX 4222, BALDWIN  PA1904, NAPA 2226, LUBER FINER LAF9085', 1, 380.00, 304.00, '2026-03-17 15:31:51', '2026-03-17 15:55:06'),
(26, 14, 'FLEETGUARD  FILTRO  SEPARADOR  FS19816', 'FILTRO SEPARADOR DE AGUA / COMBUSTIBLE\r\nSEPARADOR DE ALTA EFICIENCIA PARA MOTORES DIESEL PESADOS', 'FUNCION ELIMINA AGUA Y PARTICULAS, PROTEGE EL SISTEMA DE INYECCION Y PREVIENE CORROSION\r\nFILTRO ROSCADO SPIN-ON, CON CAPACIDAD DE PURGA, ROSCA 1 x 141\r\nCOMPATIBLE CON MOTORES DIESEL DE SERVICIO PESADO Y LIGERO, EN CAMIONES SCANIA , VOLVO, CAMIONES CHINOS, MAQUINARIA CATERPILLAR Y KOMATSU\r\nEQUIVALENCIAS: DONALDSON P\'551077, BALDWIN BF8818, FLEETGUARD FS36230', 1, 420.00, 336.00, '2026-03-18 14:41:27', '2026-03-18 14:41:27'),
(27, 14, 'FLEETGUARD  FILTRO  SEPARADOR  FS1003', 'FILTRO SEPARADOR DE AGUA / COMBUSTIBLE\r\nSEPARADOR SPIN-ON  DE ALTO RENDIMIENTO PARA MOTORES CUMMINS DIESEL', 'APLICACION PRINCIPAL  MOTORES CUMMINS ISB, ISM, QSB, QSM, M11\r\nCOMPATIBLE CON CAMIONES PESADOS COMO KENWORTH T300, MAQUINARIA AGRICOLA Y  DE  CONSTRUCCION (VOLVO, SCANIA, CAMIONES CHINOS CON MOTORES CUMMINS)\r\nFILTRO ROSCADO SPIN-ON  CON PUERTO PARA SENSOR Y DRENAJE PARA MAXIMA PROTECCION\r\nEQUIVALENCIAS: DONALDSON P551103, BALDWIN BF1293 SPS, CUMMINS 3406899, 4070601, 3958451', 1, 390.00, 312.00, '2026-03-18 15:02:09', '2026-03-18 15:02:09'),
(28, 14, 'FLEETGUARD  FILTRO HIDRAULICO SFH 6014PS', 'FILTRO HIDRAULICO SURE FILTER  SFH 6014PS\r\nELEMENTO DE RETORNO / PRESION ROBUSTO PARA MAQUINARIA PESADA', 'FILTRO HIDRAULICO (ELEMENTO DE RETORNO O PRESION) CON TAPAS DE METAL PARA MAYOR DURABILIDAD\r\nMAQUINARIA INDUSTRIAL Y AGRICOLA EN BOLIVIA (CATERPILLAR, KOMATSU, JOHN DEERE, VOLVO)\r\nCOMPATIBILIDAD SISTEMAS HIDRAULICOS DE EXCAVADORAS, CARGADORES Y TRACTORES EN OBRAS BOLIVIANAS', 1, 450.00, 360.00, '2026-03-18 15:20:14', '2026-03-18 15:20:14'),
(29, 14, 'FLEETGUARD  FILTRO  REFRIGERANTE  WF2074', 'FILTRO DE AGUA / REFRIGERANTE, CON ADITIVOS QUIMICOS DCA4, SPIN-ON CON TECNOLOGIA DCA4 PARA MOTORES DIESEL PESADOS', 'DIMENSIONES: ALTURA 137,21 mm, DIAMETRO EXTERIOR  93,22 - 93,70 mm, ROSCA 11/16-16 UN 2B\r\nAPLICACION MOTORES CUMMINS, CATERPILLAR, JOHN DEERE EN CAMIONES  FREIGHTLINER, KENWORTH, INTERNATIONAL Y MAQUINARIA PESADA', 1, 420.00, 336.00, '2026-03-18 15:31:50', '2026-03-18 15:31:50'),
(30, 14, 'FLEETGUARD  CARTUCHO SECADOR DE AIRE TB1374x', 'CARTUCHO DE ALTA CALIDAD PARA SISTEMAS DE FRENOS NEUMATICOS', 'CARTUCHO SECADOR DE AIRE CON SEPARACION DE ACEITE Y HUMEDAD \r\nDIMENSIONES \r\nAPLICACION EN CAMIONES Y AUTOBUSES INDUSTRIALES (MERCEDES BENZ)', 1, 380.00, 304.00, '2026-03-18 15:43:45', '2026-03-18 15:43:45'),
(31, 4, 'FAROL LH y RH Minibus', 'Farol de Minibus (unidades de iluminación de alta visibilidad).', 'Su diseño asimétrico optimiza la proyección de luz hacia el borde de la carretera para el conductor, sin afectar a los vehículos', 1, 698.00, 650.00, '2026-03-20 19:28:19', '2026-03-20 20:26:36'),
(32, 4, 'STOP LH Minibus', 'Iluminación integral de seguridad (freno, posición, giro, reversa).', 'El stop es una señal de tráfico diseñada para notificar a los conductores que deben detenerse por completo y asegurarse de que la intersección (o cruce ferroviario ) esté libre de vehículos y peatones antes de continuar.', 1, 200.00, 180.00, '2026-03-20 20:02:51', '2026-03-20 20:02:51'),
(33, 4, 'MASCARA CENTRAL MINIBUS', 'Es una pieza frontal de diseño estructural o embellecedor que se encuentra en la parte delantera', NULL, 1, NULL, 450.00, '2026-03-20 20:15:27', '2026-04-21 14:00:17'),
(34, 4, 'LOGO DELANTERO Minibus', 'Es un emblema metálico, generalmente cromado, que presenta un diseño estilizado y moderno', 'Representa la marca con una forma aerodinámica que simboliza movimiento, innovación y confiabilidad, posicionado de manera central para destacar la identidad de la empresa en la parte frontal.', 1, 120.00, 90.00, '2026-03-20 20:32:56', '2026-03-20 20:32:56'),
(35, 4, 'LETRAS KING LONG MINIBUS', 'Un accesorio de la parte trasera de minibús.', 'KING LONG', 1, 120.00, 90.00, '2026-03-20 20:54:14', '2026-03-20 20:55:33'),
(36, 4, 'HIDROVAC MINIBUS', NULL, 'Es un componente de seguridad esencial para minibus que permite un frenado más suave, rápido y eficiente, permitiendo detener el vehículo con menor esfuerzo físico.', 1, 890.00, 850.00, '2026-03-20 21:01:59', '2026-03-20 21:01:59'),
(37, 4, 'TAPA ARO MINIBUS KING LONG', 'Son accesorios exteriores diseñados para proteger las tuercas y mejorar la estética de las ruedas', NULL, 1, 250.00, 200.00, '2026-03-20 21:09:02', '2026-03-20 21:09:02'),
(38, 4, 'ARO DE MAGNESIO MINIBUS', 'Diseñados para mejorar el rendimiento, reducir el peso no suspendido y acelerar mejor', 'Sirven para optimizar la conducción, aumentar la eficiencia de combustible y mejorar la disipación de calor de los frenos.', 1, 710.00, 680.00, '2026-03-20 21:13:23', '2026-03-20 21:13:23'),
(39, 4, 'NEBLINERO LH y RH MINIBUS', 'Permite al conductor ver la carretera y los bordes del camino directamente frente al vehículo.', 'Se instala en la parte baja del parachoques para emitir un haz de luz ancho y bajo, reduciendo el reflejo y aumentando la seguridad.', 1, NULL, 230.00, '2026-03-20 21:23:25', '2026-04-28 20:42:02'),
(40, 4, 'PARACHOQUE DELANTERO MINIBUS', 'Amortigua golpes y pequeños choques, salvaguardando elementos costosos como el radiador o luces.', 'Es una estructura de seguridad (generalmente de plástico de alta resistencia o fibra) ubicada en la parte frontal para absorber impactos de baja intensidad', 1, 890.00, 850.00, '2026-03-20 21:29:43', '2026-03-20 21:29:43'),
(41, 4, 'VENTILADOR MINIBUS KING LONG', 'Es vital para el sistema de aire acondicionado del minibús, asegurando el enfriamiento de la cabina con bajo ruido y alta eficiencia.', 'Es un componente crítico del sistema de refrigeración del motor (radiador) o del aire acondicionado, diseñado para forzar el flujo de aire, enfriar el refrigerante y evitar sobrecalentamientos.', 1, 690.00, 650.00, '2026-03-20 21:37:12', '2026-03-20 21:39:04'),
(42, 4, 'ALTERNADOR COMPLETO MINIBUS', 'Es un componente electromecánico de alto rendimiento diseñado para transformar energía mecánica en eléctrica.', 'Su función principal es recargar la batería y suministrar energía constante a los sistemas eléctricos (luces, aire acondicionado, inyección) mientras el motor está encendido, garantizando el funcionamiento continuo.', 1, 1190.00, 1000.00, '2026-03-20 21:43:11', '2026-03-20 21:43:11'),
(43, 4, 'TERCERA DE LUZ DE FRENO MINIBUS', 'Es un elemento de seguridad esencial y a menudo obligatorio, diseñado para mejorar la visibilidad de frenado.', NULL, 1, NULL, 140.00, '2026-03-26 19:39:18', '2026-03-26 19:39:18'),
(44, 4, 'GUARDABARRO DELANTERO MINIBUS', 'Evita que el lodo, arena y piedras proyectadas rayen o abollen la pintura y el metal.', NULL, 1, NULL, 250.00, '2026-03-26 19:52:13', '2026-03-26 19:52:13'),
(45, 4, 'PARACHOQUE TRASERO MINIBUS', 'Amortigua impactos traseros, deformándose para reducir la fuerza del choque.', 'Estructura esencial de seguridad situada en la parte posterior, diseñada para absorber la energía cinética y minimizar daños en caso de colisión.', 1, NULL, 550.00, '2026-03-26 19:52:52', '2026-03-26 19:55:05'),
(46, 4, 'INTERRUPTOR DE LUCES Y LIMPIA PARABRISAS MINIBUS', 'Activa luces de posición, bajas, altas y, a menudo, luces direccionales.', 'Es el componente eléctrico central, generalmente ubicado tras el volante, que permite al conductor controlar la iluminación exterior (faros, direccionales) y el sistema de limpieza del parabrisas (velocidades, agua)', 1, NULL, 310.00, '2026-03-26 20:03:09', '2026-03-26 20:03:09'),
(47, 4, 'DISCO DE FRENO ARO 15  (MINIBUS)', 'Su correcto estado es vital para evitar ruidos, vibraciones y distancias de frenado cortas.', 'Es un componente de seguridad esencial, generalmente de acero o fundición, que se fija al buje de la rueda delantera. Al presionar el freno, las pastillas generan fricción sobre este disco, disipando energía cinética para detener el vehículo de forma segura. (2016)', 1, NULL, 280.00, '2026-03-26 20:13:21', '2026-03-26 20:13:21'),
(49, 4, 'CAJA DE TRANSMISIÓN MINIBUS', 'Ajusta las revoluciones del motor a la velocidad de las ruedas.', 'Conecta el motor a las ruedas, ajustando la potencia y el par (fuerza) para subir cuestas, acelerar y mantener velocidades constantes.', 1, NULL, 4580.00, '2026-03-26 20:22:20', '2026-03-26 20:23:31'),
(50, 4, 'PUERTA TRASERA LH RH ZNA RICH', NULL, NULL, 1, NULL, 2350.00, '2026-04-01 20:38:38', '2026-04-01 20:38:38'),
(51, 4, 'PUERTA DELANTERA LH RH MINIBUS', NULL, NULL, 1, NULL, 2700.00, '2026-04-01 20:42:56', '2026-04-01 20:42:56'),
(52, 10, 'LUB SHELL ADV 4T AX6 10W30', 'Lubricante semisintético de alto rendimiento para motores de motocicletas de 4 tiempos', 'Shell Advance 4T AX6 10W-30 es un lubricante semisintético de alto rendimiento para motores de motocicletas de 4 tiempos, diseñado con tecnología de limpieza activa. Ofrece un 25% más de protección a altas temperaturas y hasta 15% más limpieza, cumpliendo con las normas API SL y JASO MA2 para un cambio de marcha suave.', 1, 110.00, 96.00, '2026-04-16 01:12:19', '2026-04-16 01:12:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_attributes`
--

INSERT INTO `product_attributes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Talla', NULL, NULL),
(2, 'Color', NULL, NULL),
(3, 'Peso', NULL, NULL),
(4, 'Material', NULL, NULL),
(5, 'Capacidad', NULL, NULL),
(6, 'Longitud', NULL, NULL),
(7, 'Ancho', NULL, NULL),
(8, 'Altura', NULL, NULL),
(9, 'Estilo', NULL, NULL),
(10, 'Marca', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_attribute_values`
--

INSERT INTO `product_attribute_values` (`id`, `attribute_id`, `value`, `created_at`, `updated_at`) VALUES
(1, 1, 'XS', NULL, NULL),
(2, 1, 'S', NULL, NULL),
(3, 1, 'M', NULL, NULL),
(4, 1, 'L', NULL, NULL),
(5, 1, 'XL', NULL, NULL),
(6, 1, 'XXL', NULL, NULL),
(7, 2, 'Rojo', NULL, NULL),
(8, 2, 'Azul', NULL, NULL),
(9, 2, 'Verde', NULL, NULL),
(10, 2, 'Negro', NULL, NULL),
(11, 2, 'Blanco', NULL, NULL),
(12, 2, 'Amarillo', NULL, NULL),
(13, 2, 'Rosa', NULL, NULL),
(14, 3, '100g', NULL, NULL),
(15, 3, '250g', NULL, NULL),
(16, 3, '500g', NULL, NULL),
(17, 3, '1kg', NULL, NULL),
(18, 3, '2kg', NULL, NULL),
(19, 4, 'Algodón', NULL, NULL),
(20, 4, 'Poliéster', NULL, NULL),
(21, 4, 'Cuero', NULL, NULL),
(22, 4, 'Madera', NULL, NULL),
(23, 4, 'Plástico', NULL, NULL),
(24, 5, '250ml', NULL, NULL),
(25, 5, '500ml', NULL, NULL),
(26, 5, '1L', NULL, NULL),
(27, 5, '2L', NULL, NULL),
(28, 6, '10cm', NULL, NULL),
(29, 6, '20cm', NULL, NULL),
(30, 6, '30cm', NULL, NULL),
(31, 6, '50cm', NULL, NULL),
(32, 7, '5cm', NULL, NULL),
(33, 7, '10cm', NULL, NULL),
(34, 7, '15cm', NULL, NULL),
(35, 7, '20cm', NULL, NULL),
(36, 8, '5cm', NULL, NULL),
(37, 8, '10cm', NULL, NULL),
(38, 8, '15cm', NULL, NULL),
(39, 8, '20cm', NULL, NULL),
(40, 9, 'Moderno', NULL, NULL),
(41, 9, 'Clásico', NULL, NULL),
(42, 9, 'Deportivo', NULL, NULL),
(43, 9, 'Vintage', NULL, NULL),
(44, 10, 'Nike', NULL, NULL),
(45, 10, 'Adidas', NULL, NULL),
(46, 10, 'Puma', NULL, NULL),
(47, 10, 'Reebok', NULL, NULL),
(48, 10, 'Sony', NULL, NULL),
(49, 10, 'Samsung', NULL, NULL),
(58, 1, '4', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(59, 1, '6', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(60, 1, '8', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(61, 1, '10', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(62, 1, '12', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(63, 1, '14', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(64, 1, '16', '2025-12-15 16:52:25', '2025-12-15 16:52:25'),
(65, 1, '2XL', '2025-12-15 16:52:25', '2025-12-15 16:52:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_multimedia`
--

CREATE TABLE `product_multimedia` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `multimedia_type_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` enum('image','video','document') NOT NULL DEFAULT 'image',
  `sort_order` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_multimedia`
--

INSERT INTO `product_multimedia` (`id`, `product_id`, `multimedia_type_id`, `url`, `type`, `sort_order`, `created_at`, `updated_at`, `title`, `description`) VALUES
(7, 5, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772256849/products/5/epc7zoyvsfd1pjnv7xiv.png', 'image', 0, '2026-02-28 05:34:09', '2026-02-28 05:34:09', NULL, NULL),
(8, 4, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772256918/products/4/ytu3kfhoq1g0dn9qcaak.png', 'image', 0, '2026-02-28 05:35:18', '2026-02-28 05:35:18', NULL, NULL),
(9, 6, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772257082/products/6/vzyosvtxixkbfhjngwve.png', 'image', 0, '2026-02-28 05:38:01', '2026-02-28 05:38:01', NULL, NULL),
(10, 7, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772257248/products/7/pe1a2glukop0tykt1erk.png', 'image', 0, '2026-02-28 05:40:48', '2026-02-28 05:40:48', NULL, NULL),
(11, 8, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772257302/products/8/ozvu8735bqfng49spumq.png', 'image', 0, '2026-02-28 05:41:42', '2026-02-28 05:41:42', NULL, NULL),
(12, 9, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772257371/products/9/qxsrarvvhnupj3cwjuq9.png', 'image', 0, '2026-02-28 05:42:51', '2026-02-28 05:42:51', NULL, NULL),
(13, 4, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772260072/products/4/e11pofnm6phnp77ppuei.png', 'image', 0, '2026-02-28 06:27:52', '2026-02-28 06:27:52', NULL, NULL),
(14, 4, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1772260088/products/4/tllluf9indomksab28pu.png', 'image', 0, '2026-02-28 06:28:08', '2026-02-28 06:28:08', NULL, NULL),
(20, 14, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773772317/products/14/dhlpc6gol36jjbmhqpxi.png', 'image', 0, '2026-03-17 18:31:58', '2026-03-17 18:31:58', NULL, NULL),
(21, 15, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773772804/products/15/fkg1mqswstjadtdnhiuq.png', 'image', 0, '2026-03-17 18:40:05', '2026-03-17 18:40:05', NULL, NULL),
(22, 19, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773773051/products/19/sjzaoqsx8qab9hmykke9.png', 'image', 0, '2026-03-17 18:44:11', '2026-03-17 18:44:11', NULL, NULL),
(23, 20, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773773313/products/20/rkbswg0xombofnhhkjxy.jpg', 'image', 0, '2026-03-17 18:48:34', '2026-03-17 18:48:34', NULL, NULL),
(24, 21, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773773426/products/21/v1wvxmptfnim0osi81s9.jpg', 'image', 0, '2026-03-17 18:50:27', '2026-03-17 18:50:27', NULL, NULL),
(25, 22, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773773605/products/22/vp4zylqecz0hqt8smvpy.jpg', 'image', 0, '2026-03-17 18:53:25', '2026-03-17 18:53:25', NULL, NULL),
(26, 16, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773773763/products/16/dj6licjrbuqmo5gxb0mv.jpg', 'image', 0, '2026-03-17 18:56:03', '2026-03-17 18:56:03', NULL, NULL),
(27, 17, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773774583/products/17/azuhffvmqby6ttn5nifz.jpg', 'image', 0, '2026-03-17 19:09:45', '2026-03-17 19:09:45', NULL, NULL),
(29, 18, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773774847/products/18/v1xwvlegnx9lhulstutz.png', 'image', 0, '2026-03-17 19:14:07', '2026-03-17 19:14:07', NULL, NULL),
(30, 23, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773775428/products/23/gt4eprlkgodimv9kme5y.png', 'image', 0, '2026-03-17 19:23:49', '2026-03-17 19:23:49', NULL, NULL),
(31, 24, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773775600/products/24/rcajeejdceaizxsuyypq.jpg', 'image', 0, '2026-03-17 19:26:41', '2026-03-17 19:26:41', NULL, NULL),
(32, 25, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773775693/products/25/xcblpdw8xtqtcygsvdh3.jpg', 'image', 0, '2026-03-17 19:28:13', '2026-03-17 19:28:13', NULL, NULL),
(33, 26, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773864298/products/26/wrql3oknr1zdvba3dwya.jpg', 'image', 0, '2026-03-18 20:04:59', '2026-03-18 20:04:59', NULL, NULL),
(35, 29, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773864835/products/29/co6k6vfdimmogjpl0mxn.png', 'image', 0, '2026-03-18 20:13:55', '2026-03-18 20:13:55', NULL, NULL),
(36, 30, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773865450/products/30/ksgq1fnanb1wyedpglgb.png', 'image', 0, '2026-03-18 20:24:11', '2026-03-18 20:24:11', NULL, NULL),
(39, 27, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773866622/products/27/t98ggwvvnk15iq7aehwz.png', 'image', 0, '2026-03-18 20:43:42', '2026-03-18 20:43:42', NULL, NULL),
(40, 28, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1773868096/products/28/h793cwm8eg945zivwcll.png', 'image', 0, '2026-03-18 21:08:17', '2026-03-18 21:08:17', NULL, NULL),
(41, 31, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774034899/products/31/xdp6z0oyzwa1mioj2fpf.jpg', 'image', 0, '2026-03-20 19:28:19', '2026-03-20 19:28:19', NULL, NULL),
(42, 32, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774036971/products/32/n35mjhve0idqw3gosbbe.jpg', 'image', 0, '2026-03-20 20:02:52', '2026-03-20 20:02:52', NULL, NULL),
(43, 33, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774037727/products/33/jwiar3nulnfj8rkokh0g.jpg', 'image', 0, '2026-03-20 20:15:28', '2026-03-20 20:15:28', NULL, NULL),
(44, 34, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774038776/products/34/q3m5kogmbppnpctwhxty.jpg', 'image', 0, '2026-03-20 20:32:57', '2026-03-20 20:32:57', NULL, NULL),
(45, 35, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774040055/products/35/zmmtjxejwvseqvvhsne2.jpg', 'image', 0, '2026-03-20 20:54:15', '2026-03-20 20:54:15', NULL, NULL),
(46, 36, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774040519/products/36/wfce757xwggl0ujwesr8.jpg', 'image', 0, '2026-03-20 21:02:00', '2026-03-20 21:02:00', NULL, NULL),
(47, 36, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774040520/products/36/mjgqfaqbe9vseyabegjd.jpg', 'image', 0, '2026-03-20 21:02:00', '2026-03-20 21:02:00', NULL, NULL),
(48, 37, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774040943/products/37/hxikluccc7t4dovhptyq.jpg', 'image', 0, '2026-03-20 21:09:03', '2026-03-20 21:09:03', NULL, NULL),
(49, 38, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774041203/products/38/vkecte50ne2e80jxja73.png', 'image', 0, '2026-03-20 21:13:24', '2026-03-20 21:13:24', NULL, NULL),
(50, 39, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774041805/products/39/gijucmlvtknftfkoxgqg.jpg', 'image', 0, '2026-03-20 21:23:25', '2026-03-20 21:23:25', NULL, NULL),
(51, 39, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774041805/products/39/yllxoqcu7hvgxolnowse.jpg', 'image', 0, '2026-03-20 21:23:26', '2026-03-20 21:23:26', NULL, NULL),
(52, 39, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774041806/products/39/uodsvgepfh6s7svaaua8.jpg', 'image', 0, '2026-03-20 21:23:26', '2026-03-20 21:23:26', NULL, NULL),
(53, 40, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774042183/products/40/ckdmpfdvyuisuttngtpx.jpg', 'image', 0, '2026-03-20 21:29:44', '2026-03-20 21:29:44', NULL, NULL),
(54, 41, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774042633/products/41/n338dza8vnowipuklcfa.png', 'image', 0, '2026-03-20 21:37:13', '2026-03-20 21:37:13', NULL, NULL),
(55, 41, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774042633/products/41/jj9n2vbkjifjpstmo00j.png', 'image', 0, '2026-03-20 21:37:14', '2026-03-20 21:37:14', NULL, NULL),
(56, 42, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774042992/products/42/bztiowmmoz2dl8iqj4me.jpg', 'image', 0, '2026-03-20 21:43:12', '2026-03-20 21:43:12', NULL, NULL),
(57, 43, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774553958/products/43/dceyzztlfbtqg2dnof2r.png', 'image', 0, '2026-03-26 19:39:18', '2026-03-26 19:39:18', NULL, NULL),
(58, 43, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774553959/products/43/f3oelqt2ebnq2qmsfx7e.jpg', 'image', 0, '2026-03-26 19:39:19', '2026-03-26 19:39:19', NULL, NULL),
(59, 43, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774553959/products/43/iwfpepbbwekmq64o7o79.jpg', 'image', 0, '2026-03-26 19:39:20', '2026-03-26 19:39:20', NULL, NULL),
(60, 44, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774554733/products/44/rgr3rrxbjxjyahtzfd38.jpg', 'image', 0, '2026-03-26 19:52:14', '2026-03-26 19:52:14', NULL, NULL),
(61, 44, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774554734/products/44/f8iomiwwenpsrbmb5kjf.png', 'image', 0, '2026-03-26 19:52:15', '2026-03-26 19:52:15', NULL, NULL),
(63, 45, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774554906/products/45/jdu1avgozo9enaq3v3u9.jpg', 'image', 0, '2026-03-26 19:55:07', '2026-03-26 19:55:07', NULL, NULL),
(64, 45, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774554940/products/45/nt5xavwxwrbd8bwjbs63.jpg', 'image', 0, '2026-03-26 19:55:41', '2026-03-26 19:55:41', NULL, NULL),
(65, 46, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774555389/products/46/ai2wyuf3jpgwbbywuwka.jpg', 'image', 0, '2026-03-26 20:03:10', '2026-03-26 20:03:10', NULL, NULL),
(66, 46, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774555390/products/46/it2gzyvbkpfkvzihquii.jpg', 'image', 0, '2026-03-26 20:03:10', '2026-03-26 20:03:10', NULL, NULL),
(67, 46, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774555390/products/46/ilyriwxtn4wepojgg0xp.jpg', 'image', 0, '2026-03-26 20:03:11', '2026-03-26 20:03:11', NULL, NULL),
(68, 47, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774556002/products/47/kpnlaid79pybt6jnghkw.jpg', 'image', 0, '2026-03-26 20:13:22', '2026-03-26 20:13:22', NULL, NULL),
(69, 47, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774556002/products/47/soaofriu9beargfciwez.jpg', 'image', 0, '2026-03-26 20:13:23', '2026-03-26 20:13:23', NULL, NULL),
(70, 47, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774556003/products/47/vftxpzahvli2egf420z3.jpg', 'image', 0, '2026-03-26 20:13:23', '2026-03-26 20:13:23', NULL, NULL),
(74, 49, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1774556561/products/49/gut4zf61uc8pykl8zspi.png', 'image', 0, '2026-03-26 20:22:42', '2026-03-26 20:22:42', NULL, NULL),
(75, 50, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1775075918/products/50/iuiniks6j5tssyjhmwc4.jpg', 'image', 0, '2026-04-01 20:38:40', '2026-04-01 20:38:40', NULL, NULL),
(76, 51, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1775076176/products/51/plf5zqkxngo1kdrttrcp.jpg', 'image', 0, '2026-04-01 20:42:57', '2026-04-01 20:42:57', NULL, NULL),
(77, 51, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1775076177/products/51/e48ghbgrt5b6xrxh3yyo.jpg', 'image', 0, '2026-04-01 20:42:58', '2026-04-01 20:42:58', NULL, NULL),
(78, 52, 1, 'https://res.cloudinary.com/dnbklbswg/image/upload/v1776301939/products/52/nn4xhjskhn4w77y5jbye.jpg', 'image', 0, '2026-04-16 01:12:20', '2026-04-16 01:12:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_variants`
--

INSERT INTO `product_variants` (`id`, `sku`, `product_id`, `price`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'SKU-5-45C48C', 5, 12.00, 2, '2026-02-28 06:14:56', '2026-02-28 06:14:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_variant_values`
--

CREATE TABLE `product_variant_values` (
  `id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `attribute_value_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_variant_values`
--

INSERT INTO `product_variant_values` (`id`, `variant_id`, `attribute_value_id`, `created_at`, `updated_at`) VALUES
(1, 1, 9, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1W35SniI9WlA0iJV05nTdBjXTq7N9AOg9obiWvTO', NULL, '10.11.0.16', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlZRSGZlVGFVdEZKSTh6RXlHOVVQRzhWd0JrM3c3NVNLVVNUQ3BZSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779205343),
('3JhBmdb0tmIb0wP5HPvVkdaXP0S1dr5IpM1yLq4N', NULL, '10.11.0.16', 'Mozilla/5.0 (compatible; MJ12bot/v2.0.5; http://mj12bot.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmVxQmc0QmRhb0ljWlBGSUhvdWw0REU3WHdkUkN0WjNOSlpEV1h1VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779225667),
('4QcbCGYxrVN8G54QPfpm5ZNnSgMSweDcXiFyXnAV', NULL, '10.11.0.16', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRXFKc2doV1Q2YzF2d3ZqenZhNEg0aUlETWlwUm0xdUxrZmJadFdOdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779217766),
('7nundBtI96aAM7memYdkQ9vW3MPA4HSUz0nDxLje', NULL, '10.11.0.16', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUkY1aWpmVXRlODZOMFFPY2lxcFhUUktDWUg2N3JIMXVkeUZUekJYSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2NhcnJpdG8vZGF0YSI7czo1OiJyb3V0ZSI7czoxMjoiY2Fycml0by5kYXRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779218192),
('8qxURYQChXnrt7Ge8OJrwM5paNL35gUXSrpJdIkU', NULL, '10.11.0.16', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicHpocnFSb1ZNUXAyTkcwMWR5YzVPOVg0eTQ3OFhLeHMyam84NW1lMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2luZGV4LnBocCI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779203857),
('9l4r2cyaFLL1GY0m5ExpcNXvXYj0y6QDQkKGGZ6W', NULL, '10.11.0.16', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR0lYMnBEdTcyaDByR09PQmk5WktTV0hLSFFQVVJkbHN5UjI2MzE5aiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779208018),
('fyGgV2F11UWn4zH6t3op7XWf8e6mivgeEfbJSW9n', NULL, '10.11.0.16', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWTZCaWJDa0hvaWNVWWNiM0hka3B4cENEdzZMYk1nZlRFOUlQc1ZCYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779219662),
('hII4AvFIFAXUCXp5dNkmPHF4iU0QDMVbJRjo01zl', NULL, '10.11.0.16', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTEp5d2ljU1ZYTE50cld5cU93UHBMMTNJM0pldHdkSktRU0VMaUtveCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2NhcnJpdG8vZGF0YSI7czo1OiJyb3V0ZSI7czoxMjoiY2Fycml0by5kYXRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779203878),
('keMRgvn2sJyNM7Rowj3KI4IKnvE69aXy4JNg2Jd7', NULL, '10.11.0.16', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNGJSbVd0bldIWG44ZWlxS2dWcW9yY3M5WmFjZTd2bk9aSXNOdEcybSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779205510),
('LuZYSQLkKi3OEf3ykwN38knTeJ7HRe9mk1IDrSGg', NULL, '10.11.0.16', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRXoxdnpQZE9pd1NOTEpXcHRFT3RCbHFuR1FVSHFoeThvYmNNR0RVUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL3Byb2R1Y3RzL2x1YnJpY2FudGVzIjtzOjU6InJvdXRlIjtzOjE4OiJwcm9kdWN0cy5jYXRlZ29yaWEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779219902),
('n5cwz22opM9D9FU9vQCJuTfS9pRT4ACxNHhAcbiI', NULL, '10.11.0.16', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlFlUG85TzVFM3BmZnhKU3hwVlg2SDcxbVRxNzdPNXZ2Sk91eXFGTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2NhcnJpdG8vZGF0YSI7czo1OiJyb3V0ZSI7czoxMjoiY2Fycml0by5kYXRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779224179),
('NigviQjJtEVsoxSTcVyezYIG78IAymDGAGOwjeqg', NULL, '10.11.0.16', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.141 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoic0JPOEVqSkJ0VlRwNXcxYXo0NFp0NGswWXNpN0tyeGQ3dnpBcmNaMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779209198),
('nZCwZFSaC4QfTSfak9yWVTmc1uh1zNQFIn2aamhJ', NULL, '10.11.0.16', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibXBnRTNKeXlMUnk1bnFOQ2JOMFJ1Y1RmTVQyMDBseW9CR25YcENvdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NzE6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL3Byb2R1Y3RzL3NoZWxsLXJpbXVsYS1yNS1lLTEwdzQwLWJhbGRlLTIwLWxpdHJvcy81IjtzOjU6InJvdXRlIjtzOjEzOiJwcm9kdWN0cy5zaG93Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779211637),
('Q0KwtFM9MtZHIi6tpnLllGHELEMdiEgZGtXA63sT', NULL, '10.11.0.16', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGhoNTNPZTZhaXhNamxMZGtaR3AxVXNHRDZLS1l6ZzFheTV1UmpCYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjA6Imh0dHA6Ly9mYWJyb3MuY29tLmJvIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1779224146),
('s52DjhHAWyJkwtCnGyVqFsU5mYyuPKzqFF9SVfmP', NULL, '10.11.0.16', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaDNWNWJWR1dCY1lCaDhaamxYc1BnSmk0TWYzUng1dVRDdElTeXVYUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2NhcnJpdG8vZGF0YSI7czo1OiJyb3V0ZSI7czoxMjoiY2Fycml0by5kYXRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779218533),
('wf8R4HPNLFEIjsHY0jAWOpb2N3kS1sAL6fhn36XF', NULL, '10.11.0.16', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkVVc1RXNWVWc01CaUNHNEM1czUxZTR6YXI1SnVsS3VqRDhyVlBFeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9mYWJyb3MuY29tLmJvL2NhcnJpdG8vZGF0YSI7czo1OiJyb3V0ZSI7czoxMjoiY2Fycml0by5kYXRhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779209208);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'JHASEFT RENE SAAT SOLARES', '202300683@est.umss.edu', '+59165359695', NULL, '$2y$12$NsW0RTAqfCGLCo0V.6jF3.cCS4VpgUxjMib7OCSQ9Fhnj83zqtxLK', NULL, '2026-02-28 07:07:13', '2026-02-28 07:08:58'),
(3, 'Fatima Solares', 'fatycbba@gmail.com', '5911014798559', NULL, '$2y$12$mXm6UlIdkn3Vzi7cxsLhTuBmWZsvfI5xhJQhveaXnmG4N4uPJulDy', NULL, '2026-02-28 07:17:23', '2026-02-28 07:17:30'),
(4, 'Jhaseft Rene Saat Solares', 'jhasesaat@gmail.com', '+59165359695', NULL, '$2y$12$p4bxA3LUsQmq2m7uQQIQa.pLFALjwSCjsdCw56cKl0jEicyqX/SZO', NULL, '2026-03-02 02:52:47', '2026-03-02 02:53:27'),
(5, 'Jaime Cuellar', 'jaimeluismamanicuellar@gmail.com', '74048209', NULL, '$2y$12$LHqBxzTJtYwJNdtcjh/OTOyVOH/wbGaZyH7HbcsS1zbpSy.mQzNNm', NULL, '2026-03-07 14:31:12', '2026-03-07 14:31:25'),
(6, 'Jhaseft Rene Saat Solares', 'palo@gmail.com', '+59165359692', NULL, '$2y$12$S5xggZzXUQRtBLTQUiTlSu9G.CW/F3W7vqe2zhV55Zy9ZqS8J4z7.', NULL, '2026-03-09 07:20:38', '2026-03-09 07:20:38'),
(7, 'Jhoel Paredes pava', 'jhoeldespava@gmail.com', '68506534', NULL, '$2y$12$JYL7a7BThYwGivpy8DdhBOKw2hePMrthBQz12FLaM0whhZIyZzJNK', NULL, '2026-04-28 03:44:11', '2026-04-28 03:44:33'),
(8, 'jhoel paredes', 'jhoelparedespava@gmail.com', '+59168506534', NULL, '$2y$12$a4h1Y4bNNQa0B6qEpbkAze47CT7AuzRTOaTICbgZfSTBkvD4p6Vpq', NULL, '2026-05-01 02:34:55', '2026-05-01 02:34:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `address` text NOT NULL,
  `reference` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin_accounts`
--
ALTER TABLE `admin_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `categories_parent_slug_unique` (`parent_id`,`slug`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `multimedia_type`
--
ALTER TABLE `multimedia_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name` (`name`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indices de la tabla `product_multimedia`
--
ALTER TABLE `product_multimedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `idx_multimedia_type_id` (`multimedia_type_id`);

--
-- Indices de la tabla `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `product_variant_values`
--
ALTER TABLE `product_variant_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variant_id` (`variant_id`),
  ADD KEY `attribute_value_id` (`attribute_value_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `multimedia_type`
--
ALTER TABLE `multimedia_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `product_multimedia`
--
ALTER TABLE `product_multimedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `product_variant_values`
--
ALTER TABLE `product_variant_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  ADD CONSTRAINT `caracteristicas_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `order_statuses` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `product_attributes` (`id`);

--
-- Filtros para la tabla `product_multimedia`
--
ALTER TABLE `product_multimedia`
  ADD CONSTRAINT `product_multimedia_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_multimedia_ibfk_2` FOREIGN KEY (`multimedia_type_id`) REFERENCES `multimedia_type` (`id`);

--
-- Filtros para la tabla `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `product_variant_values`
--
ALTER TABLE `product_variant_values`
  ADD CONSTRAINT `product_variant_values_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`),
  ADD CONSTRAINT `product_variant_values_ibfk_2` FOREIGN KEY (`attribute_value_id`) REFERENCES `product_attribute_values` (`id`);

--
-- Filtros para la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
