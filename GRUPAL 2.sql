USE MASTER
CREATE DATABASE FRESCOBEB
USE FRESCOBEB


CREATE TABLE Productos (
Id_Producto INT PRIMARY KEY NOT NULL,
Nombre_Producto VARCHAR(2500),
Tipo_Producto VARCHAR(2500),
Volumen_Ml NUMERIC(18,2),
Ph_Minimo NUMERIC(18,2),
Ph_Maximo NUMERIC(18,2),
Densidad_Minima NUMERIC(18,2),
Densidad_Maxima NUMERIC(18,2),
Estado_Producto INT
)


CREATE TABLE Lotes_De_Produccion (
Id_Lote VARCHAR(2500) PRIMARY KEY NOT NULL,
Id_Producto INT NOT NULL,
Fecha_Produccion DATE,
Linea_Produccion VARCHAR(250),
Turno VARCHAR(250),
Cantidad_Botellas INT,
Estado_Lote VARCHAR(250)
)


CREATE TABLE Materia_Prima (
Id_Materia_Prima INT PRIMARY KEY NOT NULL,
Nombre_Materia_Prima VARCHAR(250),
Proveedor VARCHAR(250),
Fecha_Ingreso DATE,
Lote_Origen VARCHAR(250),
Cantidad_Total NUMERIC(18,2)
)


CREATE TABLE Consumo_Materia_Prima (
Id_Consumo INT PRIMARY KEY NOT NULL,
Id_Lote INT NOT NULL,
Id_Materia_Prima INT NOT NULL,
Cantidad_Usada NUMERIC(18,2)
)


CREATE TABLE Inspecciones_Calidad (
Id_Inspeccion_Calidad INT PRIMARY KEY NOT NULL,
Id_Lote INT NOT NULL,
Fase_Inspeccion VARCHAR(250),
Ph NUMERIC(18,2),
Temperatura NUMERIC(18,2),
Densidad NUMERIC(18,2),
Resultado_Inspeccion VARCHAR(250),
Inspector VARCHAR(250),
Observaciones_Inspeccion VARCHAR(2500)
)


CREATE TABLE Destinos_Envios (
Id_Destino_Envio INT PRIMARY KEY NOT NULL,
Nombre_Destino VARCHAR(250),
Tipo_Destino VARCHAR(250),
Ubicacion_Destino VARCHAR(250)
)


CREATE TABLE Envios_Lotes (
Id_Envio_Lote INT PRIMARY KEY NOT NULL,
IdLlote INT NOT NULL,
Id_Destino_Envio INT NOT NULL,
Fecha_Envio DATE
)