CREATE DATABASE tasks;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name varchar(255),
    task_desc varchar(255)
);

drop table tasks;

select * from tasks;

INSERT INTO tasks (task_name, task_desc) VALUES ('Laundry', 'Bedding and clothes');
INSERT INTO tasks (task_name, task_desc) VALUES ('Paint', 'Bedroom trim');

