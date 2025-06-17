-- Seed data here
USE job_board;

-- Seed users
INSERT INTO users (email, password, role, name) VALUES
('employer1@example.com', '$2a$12$m7v9C9Lb1UJN5Zx3QkQZ.e5vXeJN3vY1Wz1cVnXkY3dJvXkY3dJvXk', 'employer', 'Tech Company Inc.'),
('employer2@example.com', '$2a$12$m7v9C9Lb1UJN5Zx3QkQZ.e5vXeJN3vY1Wz1cVnXkY3dJvXkY3dJvXk', 'employer', 'Marketing Agency LLC'),
('jobseeker1@example.com', '$2a$12$m7v9C9Lb1UJN5Zx3QkQZ.e5vXeJN3vY1Wz1cVnXkY3dJvXkY3dJvXk', 'job_seeker', 'John Doe'),
('jobseeker2@example.com', '$2a$12$m7v9C9Lb1UJN5Zx3QkQZ.e5vXeJN3vY1Wz1cVnXkY3dJvXkY3dJvXk', 'job_seeker', 'Jane Smith');

-- Seed jobs
INSERT INTO jobs (title, description, company, location, remote, employer_id) VALUES
('Senior React Developer', 'We are looking for an experienced React developer to join our team.', 'Tech Company Inc.', 'New York', TRUE, 1),
('Marketing Specialist', 'Looking for a marketing specialist with 3+ years of experience.', 'Marketing Agency LLC', 'Chicago', FALSE, 2),
('Full Stack Developer', 'Join our team as a full stack developer working with Node.js and React.', 'Tech Company Inc.', 'San Francisco', TRUE, 1),
('Content Writer', 'Remote content writing position for tech blogs.', 'Marketing Agency LLC', 'Boston', TRUE, 2);

-- Seed applications
INSERT INTO applications (job_id, user_id, cover_letter) VALUES
(1, 3, 'I have 5 years of experience with React and would love to join your team.'),
(1, 4, 'As a passionate React developer, I believe I would be a great fit for this position.'),
(3, 3, 'I have experience with both Node.js and React and would love to work remotely.'),
(4, 4, 'I have been writing tech content for 3 years and would enjoy this opportunity.');