INSERT INTO departments (department_name) VALUES

('Accounting'), ('Sales'), ('IT'), ('Customer Service'), ('CEO');

INSERT INTO roles (job_title, salary, department_id) VALUES
( 'CEO', 5000000, 5),
( 'Accountant', 50000, 1), 
( 'Accounting Manager', 70000, 1), 
( 'Salesman', 40000, 2), 
( 'Manager of Sales', 80000, 2),
( 'IT Support', 55000, 3),
( 'Network Administrator', 90000, 3),
( 'Customer Representative', 40000, 4),
( 'Customer Service Supervisor', 65000, 4);


INSERT INTO employees (first_name, last_name, role_id, department_id, salary) VALUES

  ('Marco', 'Polo', 1, 5, 5000000), 
  ('John', 'Doe', 3, 1, 70000),
  ('Jane', 'Smith', 2, 1, 50000),
  ('Bob', 'Johnson', 3, 2, 40000),
  ('Alice', 'Williams', 4,2, 80000),
  ('Charlie', 'Brown', 6, 3, 55000),
  ('Eva', 'Davis', 7, 3, 90000),
  ('Frank', 'Miller', 8, 4, 40000),
  ('Grace', 'Clark', 9, 4, 65000);