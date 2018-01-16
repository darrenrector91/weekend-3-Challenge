CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
);

INSERT INTO tasks (name, description) VALUES ('Laundry', 'Bedding and clothes');
INSERT INTO tasks (name, description) VALUES ('Dishes', 'plates, silverware and pots');

select * from tasks;

-- drop table tasks;

DELETE from tasks where id = 9;