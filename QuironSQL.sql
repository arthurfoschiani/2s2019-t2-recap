create database M_Quiron

use M_Quiron

create table Doutores (
	IdDoutor int primary key identity
	, Nome varchar (255) not null
	, Crm varchar (255) not null unique
	, CrmUf varchar (255) not null
);

create table Pacientes (
	IdPaciente int primary key identity
	, Nome varchar (255) not null
	, DataNascimento date not null
	, Cpf varchar (255) unique not null
	, IdDoutor int foreign key references Doutores (IdDoutor)
)

insert into Doutores (Nome, Crm, CrmUf) 
values ('Raul Nicolas Drumond', '459673', 'SP'), ('Yuri Caio da Rocha', '458263', 'SP'), ('Julia Agatha Santos', '458236', 'RJ')

select * from Pacientes

insert into Pacientes (Nome, DataNascimento, Cpf, IdDoutor)
values ('Luan Kauê Antonio da Rocha', '1984-12-10', '07259809825', 2),
('Carolina Heloisa Mariane da Rocha', '1984-01-12', '29463128875', 2), 
('Isabel Malu Aline Dias', '1984-08-11', '75259870840', null),
('Luan Otávio Henrique da Rosa', '1984-09-19', '30241818818', 1),
('Marcos Mateus Rocha', '1984-01-26' , '49117819806', 1);

ALTER TABLE Doutores
ADD CONSTRAINT UC_Crm UNIQUE (Crm,CrmUf);