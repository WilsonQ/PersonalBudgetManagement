CREATE DATABASE budget;

CREATE TABLE operations (
    operation_id SERIAL PRIMARY KEY,
    operation_date DATE NOT NULL,
    concept VARCHAR(30) NOT NULL,
    amount INT NOT NULL
);
-- CATEGORIES
CREATE TABLE categories (category_id SERIAL PRIMARY KEY, category VARCHAR(100)NOT NULL,available BOOLEAN NOT NULL)
-- OPERATIONS - CATEGORIES
CREATE TABLE operations_categories (
	category_id SERIAL, 
	operation_id SERIAL,
	fecha DATE,
	FOREIGN KEY(category_id)REFERENCES categories(category_id),
	FOREIGN KEY(operation_id)REFERENCES operations(operation_id),
	PRIMARY KEY(operation_id,category_id,fecha)
);

SELECT * FROM operations;

INSERT INTO operations(operation_date, concept, amount) VALUES('2021-01-20','compra de teclado para la pc', 1400);

ALTER TABLE operations
ADD COLUMN type VARCHAR(20); 

-- LOGIN
select * from 
users u  inner join operations o on u.user_id  = o.user_id
	inner join operations_categories oc on o.operation_id = oc.operation_id
	inner join categories c on oc.category_id = c.category_id;



-- LOGIN

CREATE TABLE operations (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    unique(email)
);
























select json_agg(p)
from (
	select json_build_object(
		'user_id',u.user_id,
		'name',u.name,
		'email',u.email,
		'surname',u.surname,
		'operations',
			(select json_agg(
				json_build_object(
					'operation_id', o.operation_id,
					'operation_date',o.operation_date,
					'concept', o.concept,
					'amount', o.amount,
					'type', o.type,
					'category',(
						select json_agg(c)
						from operations_categories oc inner join categories c using(category_id)
						where oc.operation_id = o.operation_id
					)
				)
			))) AS p
        -- where user_id filtrar por usuario
		from users u left join operations o  using(user_id)
		group by u.user_id
	
	)as T


---create function find users with operations

create or replace function find_user(
  user_id int
) 
	returns table (
		user_operation json
	) 
	language plpgsql
as $$
begin
	return query 
		select json_agg(p) as user_operation
from (
	select json_build_object(
		'user_id',u.user_id,
		'name',u.name,
		'email',u.email,
		'surname',u.surname,
		'operations',
			(select json_agg(
				json_build_object(
					'operation_id', o.operation_id,
					'operation_date',o.operation_date,
					'concept', o.concept,
					'amount', o.amount,
					'type', o.type,
					'category',(
						select json_agg(c)
						from operations_categories oc inner join categories c using(category_id)
						where oc.operation_id = o.operation_id
					)
				)
			))) AS p
        from users u left join operations o  using(user_id)
		where u.user_id = 8
		group by u.user_id
	
	)as T;
end;$$




create or replace function find_operation_type(
  user_id int,type_operations varchar
) 
	returns table (
		user_operation json
	) 
	language plpgsql
as $$
begin
	return query 
		select json_agg(p) as user_operation
from (
	select json_build_object(
		'user_id',u.user_id,
		'name',u.name,
		'email',u.email,
		'surname',u.surname,
		'operations',
			(select json_agg(
				json_build_object(
					'operation_id', o.operation_id,
					'operation_date',o.operation_date,
					'concept', o.concept,
					'amount', o.amount,
					'type', o.type,
					'category',(
						select json_agg(c)
						from operations_categories oc inner join categories c using(category_id)
						where oc.operation_id = o.operation_id
					)
				)
			))) AS p
        from users u left join operations o  using(user_id)
		where u.user_id = $1 and o.type = $2
		group by u.user_id
	
	)as T;
end;$$








create or replace function search_operations(
  user_id int,name_search varchar
) 
	returns table (
		user_operation json
	) 
	language plpgsql
as $$
begin
	return query 
		select json_agg(p) as user_operation
from (
	select json_build_object(
		'user_id',u.user_id,
		'name',u.name,
		'email',u.email,
		'surname',u.surname,
		'operations',
			(select json_agg(
				json_build_object(
					'operation_id', o.operation_id,
					'operation_date',o.operation_date,
					'concept', o.concept,
					'amount', o.amount,
					'type', o.type,
					'category',(
						select json_agg(c)
						from operations_categories oc inner join categories c using(category_id)
						where oc.operation_id = o.operation_id
					)
				)
			))) AS p
        from users u left join operations o  using(user_id)
		where u.user_id = $1 and LOWER(o.concept) like LOWER($2)
		group by u.user_id
	
	)as T;
end;$$