-- Create the table models
CREATE TABLE
  status (name VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE);

CREATE TABLE
  priority (name VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE);

CREATE TABLE
  account (
    id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  task (
    id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES status(name),
    CONSTRAINT fk_priority FOREIGN KEY (priority) REFERENCES priority(name)
  );

CREATE TABLE
  label (
    id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(35) NOT NULL
  );

CREATE TABLE
  task_label (
    id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    task_id VARCHAR(255) NOT NULL,
    label_id VARCHAR(255) NOT NULL,
    CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES task (id),
    CONSTRAINT fk_label FOREIGN KEY (label_id) REFERENCES label (id)
  );

-- Insert the default data in "status"
INSERT INTO
  status (name)
VALUES
  ('Not started');

INSERT INTO
  status (name)
VALUES
  ('In progress');

INSERT INTO
  status (name)
VALUES
  ('Completed');

-- Insert the default data in "priority"
INSERT INTO
  priority (name)
VALUES
  ('High');

INSERT INTO
  priority (name)
VALUES
  ('Medium');

INSERT INTO
  priority (name)
VALUES
  ('Low');