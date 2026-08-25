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
  maintenance_cost DECIMAL(15,2),
  pavement_alternative VARCHAR(255),
  work_type VARCHAR(255),
  work_description TEXT,
  analysis_method VARCHAR(100),
  geometry_feature VARCHAR(100),
  distress_1_type VARCHAR(255),
  current_condition VARCHAR(255),
  distress_1_severity VARCHAR(100),
  distress_2_type VARCHAR(255),
  distress_2_severity VARCHAR(100),
  recurring_distress VARCHAR(255),
  is_recurring VARCHAR(50),
  construction_year INT,
  remarks TEXT
);

INSERT INTO road_projects (mix_category, road_name, start_km, end_km, length_km, route_no, lane_type, cost_rm, pavement_alternative, work_description, distress_1_type, is_recurring) VALUES 
('SFM', 'Yong Peng - Muar', 62.0, 63.0, '1.0', 'FT 0024', 'LHS', 1230000.00, 'Mill & Pave', '2021 - SFM Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('SFM', 'Muar By Pass', 3.0, 4.0, '1.0', 'FT 0224', 'RHS', 1000000.00, 'Regulate & Overlay', '2020 - SFM Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('SFM', 'Muar By Pass', 5.0, 6.0, '1.0', 'FT 0224', 'L&R', 700000.00, 'Regulate / Mill In Lay', '2020 - SFM Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CRMA', 'Yong Peng - Muar', 58.0, 59.0, '1.0', 'FT 0024', 'LHS', 999987.58, 'Regulate & Overlay', '2021 - CRMA Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CRMA', 'Muar By Pass', 1.0, 2.0, '1.0', 'FT 0224', 'RHS', 1000000.00, 'Regulate / Mill In Lay', '2020 - CRMA Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CRMA', 'Muar By Pass', 4.0, 5.0, '1.0', 'FT 0224', 'L&R', 800000.00, 'Regulate & Overlay', '2020 - CRMA Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CMA', 'Yong Peng - Muar', 33.0, 34.0, '1.0', 'FT 0024', 'LHS', 1000000.00, 'Regulate & Overlay', '2019 - CMA Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CMA', 'Johor Bahru - Melaka', 159.0, 160.0, '1.0', 'FT 0005', 'RHS', 850000.00, 'Overlay', '2019 - CMA Program', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('CMA', 'Johor Bahru - Melaka', 172.0, 173.0, '1.0', 'FT 0005', 'L&R', 850000.00, 'Regulate & Overlay', '2019 - CMA Program', 'Crack (Retak)', 'Ya'),
('LATEX', 'Muar By Pass', 12.0, 13.0, '1.0', 'FT 0224', 'LHS', 899977.18, 'Major Rehabilitation & Patching', '2022 - LATEX Program', 'Shoving (Anjakan / Engsutan Premix)', 'Ya'),
('LATEX', 'Yong Peng - Muar', 44.0, 45.0, '1.0', 'FT 0024', 'RHS', 870000.00, 'Corrective Maintenance', '2021 - LATEX Program', 'Crack (Retak)', 'Ya'),
('AC', 'Jalan Parit Yusof', 1.0, 3.0, '2.0', 'FT 0224', 'L&R', 600000.00, 'Mill & Pave', '2023 - Routine Maintenance', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('AC', 'Jalan Parit Yusof', 3.0, 5.0, '2.0', 'FT 0224', 'L&R', 650000.00, 'Regulate & Overlay', '2023 - Routine Maintenance', 'None / Healthy (Tiada Kerosakan)', 'Tidak'),
('AC', 'Johor Bahru - Melaka', 167.0, 169.0, '2.0', 'FT 0005', 'L&R', 750000.00, 'Mill In Lay', '2022 - Standard Resurfacing', 'None / Healthy (Tiada Kerosakan)', 'Tidak');

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
('CRMA', 933329.19, 167999.25, 0.18, 1035452.95, 1, 'Moderate', 'Most economical pavement alternative. Based on the projected maintenance schedules, SFM exhibits the lowest maintenance costs and best long-term cost-efficiency.'),
('SFM', 976666.67, 175800.00, 0.18, 1076293.44, 2, 'Moderate', 'Highly cost-effective. Performance is slightly below SFM but shows stable long-term structural integrity.'),
('CMA', 900000.00, 287333.33, 0.32, 1081995.59, 3, 'No damage', 'Moderate cost-efficiency. Pavements exhibit recurring defects, increasing projected maintenance costs over time.'),
('LATEX', 879992.39, 433528.54, 0.49, 1160270.54, 4, 'Recurring pothole & crack', 'Most uneconomical pavement alternative. High frequency of recurring defects (potholes and cracks) leads to excessive maintenance costs, making it the most expensive alternative overall.');
