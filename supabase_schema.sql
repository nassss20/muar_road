-- Table structure for users (using Supabase's native auth is recommended long-term, but we'll use this for now to match your existing app)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (email, password_hash) VALUES
('admin@agency.com', '$2y$12$sjDuC9P3HoBWA3j7bOPw1.H6KKA7t2b3ZarBAz6dg/hxSwpkzrm6a');

-- Table structure for road_projects
DROP TABLE IF EXISTS road_projects;
CREATE TABLE road_projects (
  id SERIAL PRIMARY KEY,
  mix_category VARCHAR(100),
  road_name VARCHAR(255),
  start_km DECIMAL(10,3),
  end_km DECIMAL(10,3),
  length_km VARCHAR(100),
  longitude DECIMAL(11,8) DEFAULT NULL,
  latitude DECIMAL(10,8) DEFAULT NULL,
  route_no VARCHAR(100),
  lane_type VARCHAR(255),
  cost_rm DECIMAL(15,2),
  pavement_alternative VARCHAR(255),
  work_description TEXT,
  analysis_method VARCHAR(100),
  geometry_feature VARCHAR(100),
  distress_1_type VARCHAR(255),
  distress_1_severity VARCHAR(100),
  distress_2_type VARCHAR(255),
  distress_2_severity VARCHAR(100),
  recurring_distress VARCHAR(255),
  is_recurring VARCHAR(50)
);

INSERT INTO road_projects (mix_category, road_name, start_km, end_km, length_km, longitude, latitude, route_no, lane_type, cost_rm, pavement_alternative, work_description, analysis_method, geometry_feature, distress_1_type, distress_1_severity, distress_2_type, distress_2_severity, recurring_distress, is_recurring) VALUES 
('Specialty Mix', 'Muar By Pass', 3.0, 5.0, '2.0', NULL, NULL, 'FT 0224', 'L&R', 600000.0, 'Mill & Pave dan lain kerja berkaitan', '2022 - FASA 2', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 58.0, 59.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 999987.58, 'FT 0024', '2021 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 8.0, 9.0, 'CRMA', NULL, NULL, 'FT 0224', 'Localised', 949966.97, 'FT 0024', 'Mill & Pave, Regulate dan lain kerja berkaitan', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 12.0, 13.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 899977.18, 'LATEX', 'Mill & Pave, Regulate dan lain kerja berkaitan', 'SFM', 'Lurus', 'Tiada kerosakan', 'Kerosakan  Sederhana', 'Shoving', 'Pernah Rosak', 'Pothole, Crack & Corrugation', 'Ya'),
('Specialty Mix', 'Muar By Pass', 7.0, 8.0, 'CRMA', NULL, NULL, 'FT 0224', 'Localised', 1000000.0, '2022 - FASA 1', 'Mill & Pave, Regulate dan lain kerja berkaitan', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 44.0, 45.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 570000.0, '2021 - PEMERKASA', 'Mill & Pave, Regulate dan lain kerja berkaitan', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 53.0, 54.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 570000.0, '2021 - PEMERKASA', 'Mill & Pave, Regulate dan lain kerja berkaitan', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 62.0, 63.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 1230000.0, '2021 - PEMERKASA', '2022 - FASA 2', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 0.0, 1.0, '1.0', NULL, NULL, 'CRMA', '2021 - FASA 4 (280J)', 700000.0, 'Regulate / Mill In Lay', '2021 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 1.0, 2.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 1000000.0, 'Regulate / Mill In Lay', '2021 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 2.0, 3.0, '1.0', NULL, NULL, '2020 - FASA 1', 'LHS', 500000.0, 'Regulate & Overlay, Mill & Pave dan kerja-kerja berkaitan (Dual carriageway)', '2022 - FASA 2', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 3.0, 4.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 1000000.0, 'Regulate & Overlay, Mill & Pave dan kerja-kerja berkaitan (Dual carriageway)', '2022 - FASA 2', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 4.0, 5.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 800000.0, '2020 - FASA 2 (PRE 1)', '2021 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Yong Peng - Muar', 5.0, 6.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 700000.0, '2020 - FASA 2 (PRE 1)', '2022 - FASA 2', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Specialty Mix', 'Muar By Pass', 12.0, 13.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 1000000.0, '2020 - FASA 3 (PRE 2)', '2022 - FASA 2', '2020 - FASA 4 (PRE 3)', 'Lurus', 'Tiada kerosakan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 38.0, 39.0, 'CRMA', NULL, NULL, 'FT 0224', 'Selekoh', 900000.0, '2019 - CMA', '2021 - FASA 1', 'SFM', 'Lurus', 'Tiada kerosakan', 'Tidak', 'Shoving', 'Pernah Rosak', 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 60.0, 62.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 56.0, 58.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('CMA', 'Jalan Parit Yusof', 3.0, 5.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 33.0, 34.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 800000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('CMA', 'Jalan Parit Yusof', 10.0, 12.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('CMA', 'Jalan Parit Yusof', 1.0, 3.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('CMA', 'Jalan Parit Yusof', 13.0, 15.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('Tinggi', 'Yong Peng - Muar', 49.0, 51.0, '2.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('CMA', 'Jalan Parit Yusof', 5.0, 8.0, '3.0', NULL, NULL, 'FT 0224', 'Overlay', 1000000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('FT 0085', 'Johor Bahru - Melaka', 167.0, 169.0, '2.0', NULL, NULL, 'FT 0005', 'Overlay', 400000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('FT 0085', 'Johor Bahru - Melaka', 159.0, 160.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 400000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Kekerapan', NULL, NULL, NULL, 'Patching sebula sekali', NULL),
('FT 0085', 'Johor Bahru - Melaka', 172.0, 173.0, '1.0', NULL, NULL, 'FT 0224', 'utk kiraan = 20 years', 400000.0, 'Regulate & Overlay', '2019 - FASA 1', 'SFM', 'Lurus', 'Tiada kerosakan', 'Crack', 'Shoving', 'Pothole', 'Ya', 'Actual Maintenance Cost (6 month)');

-- Table structure for lcca_results
DROP TABLE IF EXISTS lcca_results;
CREATE TABLE lcca_results (
  id SERIAL PRIMARY KEY,
  alternative VARCHAR(100),
  initial_cost DECIMAL(15,2),
  maintenance_cost DECIMAL(15,2),
  cost_ratio DECIMAL(5,2),
  npv DECIMAL(15,2),
  ranking INT,
  distress_level VARCHAR(255),
  remark TEXT
);

-- Seeding LCCA results
INSERT INTO lcca_results (alternative, initial_cost, maintenance_cost, cost_ratio, npv, ranking, distress_level, remark) VALUES 
('CRMA', 933329.19, 167999.00, 0.18, 1035452.95, 1, 'Moderate', 'Most economical pavement alternative. Based on the projected maintenance schedules, SFM exhibits the lowest maintenance costs and best long-term cost-efficiency.'),
('SFM', 976666.67, 175800.00, 0.18, 1070914.94, 2, 'Moderate', 'Highly cost-effective. Performance is slightly below SFM but shows stable long-term structural integrity.'),
('CMA', 900000.00, 287333.33, 0.32, 1081995.58, 3, 'No damage', 'Moderate cost-efficiency. Pavements exhibit recurring defects, increasing projected maintenance costs over time.'),
('LATEX', 879992.39, 433528.54, 0.49, 1136719.39, 4, 'Recurring pothole & crack', 'Most uneconomical pavement alternative. High frequency of recurring defects (potholes and cracks) leads to excessive maintenance costs, making it the most expensive alternative overall.');
