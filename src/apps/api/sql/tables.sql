-- Create the table models
CREATE TABLE task_status (name VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE);

CREATE TABLE task (
  id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE
  , name VARCHAR(100) NOT NULL
  , deadline TIMESTAMP
  , created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  , status VARCHAR(50) NOT NULL
  , CONSTRAINT fk_status FOREIGN KEY(status) REFERENCES task_status(name)
);


CREATE TABLE task_label (
  id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE
  , name VARCHAR(50) NOT NULL
  , task_id VARCHAR(255) NOT NULL
  , CONSTRAINT fk_task FOREIGN KEY(task_id) REFERENCES task(id)
);

-- Insert the default data

INSERT INTO
  task_status (name)
VALUES
  ('Not started');

INSERT INTO
  task_status (name)
VALUES
  ('In progress');

INSERT INTO
  task_status (name)
VALUES
  ('Completed');


INSERT INTO
  task (id, name, status)
VALUES
  ('idultrasecreta', 'example task', 'Not started');