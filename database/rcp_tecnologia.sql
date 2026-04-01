-- =====================================================
-- SCRIPT COMPLETO DO BANCO DE DADOS RCP TECNOLOGIA
-- Versão atualizada com criação de usuário
-- =====================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- =====================================================
-- 1. CRIAR BANCO DE DADOS
-- =====================================================
DROP DATABASE IF EXISTS `rcp_tecnologia`;
CREATE DATABASE IF NOT EXISTS `rcp_tecnologia`;
USE `rcp_tecnologia`;

-- =====================================================
-- 2. CRIAR USUÁRIO PARA O BACKEND
-- =====================================================
CREATE USER IF NOT EXISTS 'rcp_user'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON rcp_tecnologia.* TO 'rcp_user'@'%';
FLUSH PRIVILEGES;

-- =====================================================
-- 3. CRIAR TABELAS
-- =====================================================

-- --------------------------------------------------------
-- Tabela: admins
-- --------------------------------------------------------
CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: categories
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: clients
-- --------------------------------------------------------
CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: products
-- --------------------------------------------------------
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `brand` varchar(50) DEFAULT NULL,
  `warranty` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: offers
-- --------------------------------------------------------
CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount_percent` int(11) NOT NULL CHECK (`discount_percent` between 0 and 100),
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: orders
-- --------------------------------------------------------
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `shipping_cost` decimal(10,2) DEFAULT 0.00,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  `shipping_address` text DEFAULT NULL,
  `shipping_city` varchar(100) DEFAULT NULL,
  `shipping_state` varchar(2) DEFAULT NULL,
  `shipping_zip` varchar(10) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: order_items
-- --------------------------------------------------------
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `discount_percent` int(11) DEFAULT 0,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabela: order_status_history
-- --------------------------------------------------------
CREATE TABLE `order_status_history` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =====================================================
-- 4. INSERIR DADOS
-- =====================================================

-- --------------------------------------------------------
-- Dados da tabela admins
-- --------------------------------------------------------
INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(4, 'Administrador', 'admin@email.com', '$2a$10$WHh151/hY/vHcqXRRNZ3V.RvUehLP.cGw43VvYfTRBpOk//n5Qeo6', 'super_admin', '2026-03-24 03:40:49'),
(5, 'rubens', 'rubens@teste.com', '$2a$10$pbrCew2iZxnW8XQUqaOVV.SxhJRNh/Fjr3xEg5ajdl5UIJTMZpDr.', 'super_admin', '2026-03-24 04:53:57');

-- --------------------------------------------------------
-- Dados da tabela categories
-- --------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `description`, `active`, `created_at`) VALUES
(1, 'Processadores', 'CPUs e processadores de última geração', 1, '2026-03-24 01:19:13'),
(2, 'Placas de Vídeo', 'GPUs e placas gráficas para games e trabalho', 1, '2026-03-24 01:19:13'),
(3, 'Memórias RAM', 'Módulos de memória DDR4 e DDR5', 1, '2026-03-24 01:19:13'),
(4, 'Armazenamento', 'SSDs, HDs e NVMe', 1, '2026-03-24 01:19:13'),
(5, 'Placas Mãe', 'Motherboards para todos os processadores', 1, '2026-03-24 01:19:13'),
(6, 'Gabinetes', 'Gabinete e fontes de alimentação', 1, '2026-03-24 01:19:13'),
(7, 'Periféricos', 'Teclados, mouses e headsets', 1, '2026-03-24 01:19:13'),
(23, 'Monitor', 'Monitores VGA e HDMI', 1, '2026-03-25 18:27:44'),
(24, 'Fontes', 'Fontes ATX', 1, '2026-03-27 05:09:04');

-- --------------------------------------------------------
-- Dados da tabela clients
-- --------------------------------------------------------
INSERT INTO `clients` (`id`, `name`, `email`, `password`, `cpf`, `phone`, `address`, `city`, `state`, `zip_code`, `created_at`, `updated_at`) VALUES
(7, 'Teste', 'teste@teste.com', '$2a$10$F09DTZI7jX4oKp2JJHcqV.e1zxvtZcL73OXvCEzfnkx3mRwXDiU1a', NULL, NULL, 'Rua Costa Sousa, 100, 1904 - Benfica', 'Fortaleza', 'CE', '60020300', '2026-03-27 17:02:44', '2026-03-27 17:52:38');

-- --------------------------------------------------------
-- Dados da tabela products
-- --------------------------------------------------------
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `image_url`, `specifications`, `brand`, `warranty`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Processador Intel Core i9-13900K', 'Processador de 24 núcleos, 32 threads, até 5.8GHz', 3999.99, 10, 1, 'https://images.tcdn.com.br/img/img_prod/591628/processador_intel_core_i9_13900_2_0ghz_5_6ghz_turbo_lga1700_36mb_cache_13a_ger_bx8071513900_33901_1_0f2e0caba1d80a248cb15feb6852ee40.jpg', '{}', 'Intel', '', 1, '2026-03-24 01:19:13', '2026-03-27 04:51:34'),
(2, 'Placa de Vídeo NVIDIA RTX 4090', '24GB GDDR6X, Ray Tracing, DLSS 3', 12999.99, 5, 2, 'https://m.magazineluiza.com.br/a-static/420x420/placa-de-video-msi-geforce-rtx-4090-gaming-trio-24gb-gddr6x/bestgames/1742/ed8aa07c61f2c0d4f399771924506dc1.jpeg', '{}', 'NVIDIA', '', 1, '2026-03-24 01:19:13', '2026-03-27 04:51:38'),
(3, 'Memória RAM Corsair Vengeance 32GB', '2x16GB DDR5 6000MHz, RGB', 899.99, 18, 3, 'https://images.kabum.com.br/produtos/fotos/382749/memoria-corsair-vengeance-rgb-rs-32gb-3200mhz-ddr4-c16-preto-cmg32gx4m2e3200c16_1665431149_m.jpg', '{}', 'Corsair', '', 1, '2026-03-24 01:19:13', '2026-03-27 16:42:04'),
(7, 'SSD NVMe Samsung 1TB', 'Leitura até 7000MB/s, Escrita até 5000MB/s', 599.99, 14, 4, 'https://m.magazineluiza.com.br/a-static/1920x1920/ssd-samsung-990-pro-1tb-pcie-4-0-nvme-m-2-2280/nocnocestadosunidos/buybox-cpb0bhjf2vrn/c71c8b75fcc3c9e316acdfb039276bef.jpeg', '{\"capacidade\":\"1TB\",\"tipo\":\"NVMe M.2\",\"interface\":\"PCIe 4.0 x4\",\"leitura\":\"7000 MB/s\",\"escrita\":\"5000 MB/s\",\"tbw\":\"600 TBW\",\"controlador\":\"Phison E18\",\"cache\":\"DRAM\"}', 'Samsung', '', 1, '2026-03-24 01:56:46', '2026-03-27 19:25:37'),
(8, 'Processador AMD Ryzen 9 7950X', '16 núcleos, 32 threads, até 5.7GHz', 3599.99, 8, 1, 'https://m.magazineluiza.com.br/a-static/1280x1280/processador-amd-ryzen-9-7950x3d-am5-4-2ghz-144mb-com-video-s-cooler-100-100000908wof/gigantec/23853/943f7c9aef73a27c5a17e2c582f2fcc1.jpeg', '{}', 'AMD', '', 1, '2026-03-24 01:56:46', '2026-03-25 18:35:33'),
(9, 'Placa Mãe ASUS ROG Maximus Z790', 'LGA 1700, DDR5, PCIe 5.0', 2499.99, 12, 5, 'https://m.magazineluiza.com.br/a-static/1280x1280/placa-mae-asus-tuf-gaming-z790-plus-wifi-lga-1700-atx/nocnocestadosunidos/buybox-cpb0bqd58d96/b8558e4f02475ac200f98fe06ba9daed.jpeg', '{}', 'ASUS', '', 1, '2026-03-24 01:56:46', '2026-03-27 04:52:12'),
(10, 'Monitor Office 15,6\" LED HD TCN, 60Hz, HDMI/VGA', 'O Monitor TCN Office 15,6” é a escolha ideal para quem busca praticidade, economia de espaço e eficiência no dia a dia.', 350.00, 9, 23, 'https://lojaibyte.vteximg.com.br/arquivos/ids/448218-1200-1200/monitor-office-15-6-led-hd-tcn-60hz-hdmi-vga-ajuste-01.jpg?v=639046215511170000', '{}', 'TCN', '12 meses', 1, '2026-03-25 18:30:50', '2026-03-27 17:52:38'),
(11, 'Gabinete sem fonte Office TCN', 'Gabinete Office TCN sem fonte, ideal para uso em escritórios e computadores domésticos.', 100.00, 10, 6, 'https://lojaibyte.vteximg.com.br/arquivos/ids/444020-1200-1200/gabinete-sem-fonte-office-tcn-1.jpg?v=638966769349000000', '{\"Fabricante\":\"TCN\"}', 'TCN', '12 meses', 1, '2026-03-25 18:45:10', '2026-03-27 05:02:57'),
(12, 'Fonte Corsair RM850e, 850W, Cybenetics Gold, PCIe 5.1, Full Modular', 'As Fontes de alimentação CORSAIR RMe Series, totalmente modulares e com baixo ruído', 699.00, 8, 24, 'https://img.terabyteshop.com.br/produto/g/fonte-corsair-rm850e-850w-cybenetics-gold-pcie-51-full-modular-preto-cp-9020296-br_243631.jpg', '{\"potencia\":\"850W\",\"certificacao\":\"80 Plus Gold\",\"modular\":\"Full Modular\"}', 'Corsair', '12 meses', 1, '2026-03-27 05:11:32', '2026-03-27 19:13:00');

-- --------------------------------------------------------
-- Dados da tabela offers
-- --------------------------------------------------------
INSERT INTO `offers` (`id`, `product_id`, `discount_percent`, `start_date`, `end_date`, `active`, `created_at`) VALUES
(16, 12, 10, '2026-03-27 00:00:00', '2026-04-27 00:00:00', 1, '2026-03-27 19:14:13');

-- --------------------------------------------------------
-- Dados da tabela orders
-- --------------------------------------------------------
INSERT INTO `orders` (`id`, `order_number`, `client_id`, `total`, `subtotal`, `discount`, `shipping_cost`, `status`, `payment_method`, `payment_status`, `shipping_address`, `shipping_city`, `shipping_state`, `shipping_zip`, `notes`, `created_at`, `updated_at`) VALUES
(5, 'RCP177463101643750', 7, 699.00, 699.00, 0.00, 0.00, 'pending', 'PIX', 'pending', 'Rua Costa Sousa, 100, apto 1904 - Benfica', 'Fortaleza', 'CE', '60.020-300', NULL, '2026-03-27 17:03:36', '2026-03-27 17:03:36'),
(6, 'RCP1774633958454883', 7, 379.90, 350.00, 0.00, 29.90, 'pending', 'PIX', 'pending', 'Rua Costa Sousa, 100, 1904 - Benfica', 'Fortaleza', 'CE', '60020300', NULL, '2026-03-27 17:52:38', '2026-03-27 17:52:38'),
(7, 'RCP177463878063229', 7, 699.00, 699.00, 0.00, 0.00, 'processing', 'PIX', 'pending', 'Rua Costa Sousa, 100, 1904 - Benfica', 'Fortaleza', 'CE', '60020300', NULL, '2026-03-27 19:13:00', '2026-03-27 19:15:15'),
(8, 'RCP1774639537831170', 7, 599.99, 599.99, 0.00, 0.00, 'processing', 'PIX', 'pending', 'Rua Costa Sousa, 100, 1904 - Benfica', 'Fortaleza', 'CE', '60020300', NULL, '2026-03-27 19:25:37', '2026-03-27 19:26:38');

-- --------------------------------------------------------
-- Dados da tabela order_items
-- --------------------------------------------------------
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`, `discount`, `discount_percent`, `subtotal`, `image_url`, `created_at`) VALUES
(5, 5, 12, 'Fonte Corsair RM850e, 850W, Cybenetics Gold, PCIe 5.1, Full Modular, Preto', 1, 699.00, 0.00, 0, 699.00, 'https://img.terabyteshop.com.br/produto/g/fonte-corsair-rm850e-850w-cybenetics-gold-pcie-51-full-modular-preto-cp-9020296-br_243631.jpg', '2026-03-27 17:03:36'),
(6, 6, 10, 'Monitor Office 15,6\" LED HD TCN, 60Hz, HDMI/VGA', 1, 350.00, 0.00, 0, 350.00, 'https://lojaibyte.vteximg.com.br/arquivos/ids/448218-1200-1200/monitor-office-15-6-led-hd-tcn-60hz-hdmi-vga-ajuste-01.jpg?v=639046215511170000', '2026-03-27 17:52:38'),
(7, 7, 12, 'Fonte Corsair RM850e, 850W, Cybenetics Gold, PCIe 5.1, Full Modular, Preto', 1, 699.00, 0.00, 0, 699.00, 'https://img.terabyteshop.com.br/produto/g/fonte-corsair-rm850e-850w-cybenetics-gold-pcie-51-full-modular-preto-cp-9020296-br_243631.jpg', '2026-03-27 19:13:00'),
(8, 8, 7, 'SSD NVMe Samsung 1TB', 1, 599.99, 0.00, 0, 599.99, 'https://m.magazineluiza.com.br/a-static/1920x1920/ssd-samsung-990-pro-1tb-pcie-4-0-nvme-m-2-2280/nocnocestadosunidos/buybox-cpb0bhjf2vrn/c71c8b75fcc3c9e316acdfb039276bef.jpeg', '2026-03-27 19:25:37');

-- --------------------------------------------------------
-- Dados da tabela order_status_history
-- --------------------------------------------------------
INSERT INTO `order_status_history` (`id`, `order_id`, `status`, `notes`, `created_at`) VALUES
(6, 5, 'pending', 'Pedido criado', '2026-03-27 17:03:36'),
(7, 6, 'pending', 'Pedido criado', '2026-03-27 17:52:38'),
(8, 7, 'pending', 'Pedido criado', '2026-03-27 19:13:00'),
(9, 8, 'pending', 'Pedido criado', '2026-03-27 19:25:37');

-- =====================================================
-- 5. ADICIONAR ÍNDICES E CHAVES ESTRANGEIRAS
-- =====================================================

-- Índices da tabela admins
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

-- Índices da tabela categories
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

-- Índices da tabela clients
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`);

-- Índices da tabela products
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

-- Índices da tabela offers
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `idx_active_dates` (`active`,`start_date`,`end_date`);

-- Índices da tabela orders
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `client_id` (`client_id`);

-- Índices da tabela order_items
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

-- Índices da tabela order_status_history
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_id` (`order_id`);

-- =====================================================
-- 6. CONFIGURAR AUTO_INCREMENT
-- =====================================================
ALTER TABLE `admins` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `categories` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
ALTER TABLE `clients` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `products` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
ALTER TABLE `offers` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
ALTER TABLE `orders` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `order_items` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `order_status_history` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

-- =====================================================
-- 7. ADICIONAR CONSTRAINTS (CHAVES ESTRANGEIRAS)
-- =====================================================
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;