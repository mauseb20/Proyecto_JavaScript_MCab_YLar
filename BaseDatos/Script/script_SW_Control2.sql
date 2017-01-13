/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     05/01/2017 17:10:36                          */
/*==============================================================*/


drop table if exists LABORATORIO;

drop table if exists LABORATORIO_MATERIA;

drop table if exists LABORATORIO_PROGRAMA;

drop table if exists MATERIA;

drop table if exists MATERIA_PROG;

drop table if exists PROGRAMA;

/*==============================================================*/
/* Table: LABORATORIO                                           */
/*==============================================================*/
create table LABORATORIO
(
   ID_LABORATORIO       smallint not null auto_increment,
   NOMBRE_LAB           char(10) not null,
   NUM_AULA             smallint not null,
   CAPACIDAD            smallint not null,
   DESC_UBICACION       varchar(100),
   NUM_ORDENADORES      smallint not null,
   PROY_EMPOTRADO       char(2) not null,
   primary key (ID_LABORATORIO)
);

/*==============================================================*/
/* Table: LABORATORIO_MATERIA                                   */
/*==============================================================*/
create table LABORATORIO_MATERIA
(
   ID_LABORATORIO       smallint not null,
   ID_MATERIA           smallint not null,
   GRUPO                char(4) not null,
   primary key (ID_LABORATORIO, ID_MATERIA, GRUPO)
);

/*==============================================================*/
/* Table: LABORATORIO_PROGRAMA                                  */
/*==============================================================*/
create table LABORATORIO_PROGRAMA
(
   ID_LABORATORIO       smallint not null,
   ID_PROGRAMA          smallint not null,
   primary key (ID_LABORATORIO, ID_PROGRAMA)
);

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA
(
   ID_MATERIA           smallint not null auto_increment,
   CODIGO_MAT           char(6) not null,
   NOMBRE_MAT           varchar(100) not null,
   primary key (ID_MATERIA)
);

/*==============================================================*/
/* Table: MATERIA_PROG                                          */
/*==============================================================*/
create table MATERIA_PROG
(
   ID_PROGRAMA          smallint not null,
   ID_MATERIA           smallint not null,
   ESTADO               varchar(12) not null,
   primary key (ID_PROGRAMA, ID_MATERIA)
);

/*==============================================================*/
/* Table: PROGRAMA                                              */
/*==============================================================*/
create table PROGRAMA
(
   ID_PROGRAMA          smallint not null auto_increment,
   NOMBRE_PROG          char(30) not null,
   TIPO                 char(20) not null,
   SERVICIO             char(15),
   CATEGORIA            char(10) not null,
   VERSION              char(10) not null,
   ANIO                 char(10),
   primary key (ID_PROGRAMA)
);

alter table LABORATORIO_MATERIA add constraint FK_LABORATORIO_MATERIA foreign key (ID_LABORATORIO)
      references LABORATORIO (ID_LABORATORIO) on delete restrict on update restrict;

alter table LABORATORIO_MATERIA add constraint FK_LABORATORIO_MATERIA2 foreign key (ID_MATERIA)
      references MATERIA (ID_MATERIA) on delete restrict on update restrict;

alter table LABORATORIO_PROGRAMA add constraint FK_LABORATORIO_PROGRAMA foreign key (ID_LABORATORIO)
      references LABORATORIO (ID_LABORATORIO) on delete restrict on update restrict;

alter table LABORATORIO_PROGRAMA add constraint FK_LABORATORIO_PROGRAMA2 foreign key (ID_PROGRAMA)
      references PROGRAMA (ID_PROGRAMA) on delete restrict on update restrict;

alter table MATERIA_PROG add constraint FK_MATERIA_PROGRAMA foreign key (ID_PROGRAMA)
      references PROGRAMA (ID_PROGRAMA) on delete restrict on update restrict;

alter table MATERIA_PROG add constraint FK_MATERIA_PROGRAMA2 foreign key (ID_MATERIA)
      references MATERIA (ID_MATERIA) on delete restrict on update restrict;

